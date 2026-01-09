// frontend/src/pages/ReservarServicio.jsx
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';


import TableTreatments from '../components/treatments/Table';
import storeAuth from '../context/storeAuth';


const ReservarServicio = () => {
  const [servicios, setServicios] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState('');
  const [detallesAdicionales, setDetallesAdicionales] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [horarios, setHorarios] = useState([]); // <-- Estado para los horarios
  const [loadingHorarios, setLoadingHorarios] = useState(true);
  const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');
  // --- NUEVO: Estados separados para errores ---
  const [fechaError, setFechaError] = useState('');
  const [horaError, setHoraError] = useState('');
  // --- FIN NUEVO ---
  const { fetchDataBackend } = useFetch();
  const navigate = useNavigate();
  const location = useLocation();


  const [atenciones, setAtenciones] = useState([]);
  const [loadingHistorial, setLoadingHistorial] = useState(true);

  const { token } = storeAuth(); // Para obtener el token del usuario autenticado




  // Función para cargar el historial de atenciones del cliente
const cargarHistorial = async () => {
try {
if (!token) {
console.error("No hay token disponible.");
return;
}
const storedUser = JSON.parse(localStorage.getItem("auth-token"));
if (!storedUser || !storedUser.state || !storedUser.state.token) {
console.error("No se pudo obtener el token del almacenamiento local.");
return;
}

// Extraer el ID del cliente del token JWT
let idCliente;
try {
const tokenPayload = JSON.parse(atob(storedUser.state.token.split('.')[1]));
idCliente = tokenPayload.id;
} catch (decodeError) {
console.error("Error al decodificar el token:", decodeError);
return;
}

if (!idCliente) {
console.error("No se pudo obtener el ID del cliente del token.");
return;
}

const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/${idCliente}`;
const headers = {
"Content-Type": "application/json",
Authorization: `Bearer ${storedUser.state.token}`,
};

const response = await fetchDataBackend(url, null, "GET", headers);

// Asegurarse de que la respuesta tenga el formato correcto
if (response && Array.isArray(response.atencions)) {
setAtenciones(response.atencions);
} else {
setAtenciones([]);
}
} catch (error) {
console.error("Error al cargar historial:", error);
setAtenciones([]); // Limpiar el estado en caso de error
} finally {
setLoadingHistorial(false);
}
};

// Efecto para cargar el historial al montar el componente
useEffect(() => {
cargarHistorial();
}, [token]); // Recarga si cambia el token










  // Cargar servicios al montar el componente
  const listServicios = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/servicios?activo=true`;
    const storedUser = JSON.parse(localStorage.getItem("auth-token"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedUser.state.token}`,
    };
    try {
      const response = await fetchDataBackend(url, null, "GET", headers);
      setServicios(response || []);
    } catch (error) {
      console.error("Error al listar servicios:", error);
    }
  };

  // --- NUEVO: Función para cargar horarios activos ---
  const cargarHorarios = async () => {
    try {
      // Usamos la ruta pública que ya tienes configurada
      const url = `${import.meta.env.VITE_BACKEND_URL}/horarios-activos2`;
      const response = await fetchDataBackend(url, null, "GET", null); // Sin token
      setHorarios(response || []);
    } catch (error) {
      console.error("Error al cargar horarios:", error);
    } finally {
      setLoadingHorarios(false);
    }
  };

  // --- NUEVO: Función para validar la fecha ---
  const validarFecha = (fecha) => {
    if (!fecha) return false;
    const [year, month, day] = fecha.split('-');
    // Creamos la fecha usando el constructor de Date con los números separados.
    // Esto crea la fecha a las 00:00 en la zona horaria LOCAL del usuario.
    const fechaObj = new Date(Number(year), Number(month) - 1, Number(day));
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    // Validar que la fecha no sea pasada
    if (fechaObj < hoy) {
      setFechaError("No puedes seleccionar una fecha pasada.");
      return false;
    }
    // Obtener el día de la semana (0=Domingo, 1=Lunes, ..., 6=Sábado)
    const diaSemana = fechaObj.getDay();
    let nombreDia;
    switch (diaSemana) {
      case 0:
        nombreDia = "Domingo";
        break;
      case 1:
        nombreDia = "Lunes";
        break;
      case 2:
        nombreDia = "Martes";
        break;
      case 3:
        nombreDia = "Miércoles";
        break;
      case 4:
        nombreDia = "Jueves";
        break;
      case 5:
        nombreDia = "Viernes";
        break;
      case 6:
        nombreDia = "Sábado";
        break;
      default:
        return false;
    }
    // Buscar el horario correspondiente
    const horarioDelDia = horarios.find(h => h.dia === nombreDia);
    if (!horarioDelDia) {
      setFechaError(`No atendemos los ${nombreDia.toLowerCase()}.`);
      return false; // Día no laborable
    }
    // Si llega aquí, la validación de fecha es exitosa
    setFechaError('');
    return true;
  };

  // --- NUEVO: Función para validar la hora ---
    // --- NUEVO: Función para validar la hora (SÓLO el rango horario) ---
  const validarHora = (fecha, hora) => {
    if (!fecha || !hora) return false;

    // Si no hay error de fecha, procedemos a validar la hora.
    // (La validación del día ya se hizo en 'validarFecha')
    const [year, month, day] = fecha.split('-');
    const fechaObj = new Date(Number(year), Number(month) - 1, Number(day));
    const diaSemana = fechaObj.getDay();
    let nombreDia;
    switch (diaSemana) {
      case 0:
        nombreDia = "Domingo";
        break;
      case 1:
        nombreDia = "Lunes";
        break;
      case 2:
        nombreDia = "Martes";
        break;
      case 3:
        nombreDia = "Miércoles";
        break;
      case 4:
        nombreDia = "Jueves";
        break;
      case 5:
        nombreDia = "Viernes";
        break;
      case 6:
        nombreDia = "Sábado";
        break;
      default:
        return false;
    }

    // Buscar el horario correspondiente
    const horarioDelDia = horarios.find(h => h.dia === nombreDia);

    // Si no encontramos el horario, significa que no atendemos ese día.
    // Pero esto NO debería pasar si la fecha ya pasó la validación.
    // Para evitar errores, manejamos este caso.
    if (!horarioDelDia) {
      // En lugar de mostrar un mensaje de "día no laborable", mostramos un error genérico.
      setHoraError(`No tenemos horarios definidos para ${nombreDia}.`);
      return false;
    }

    // Validar que la hora esté dentro del rango
    const [horaInput, minutoInput] = hora.split(':').map(Number);
    const [horaApertura, minutoApertura] = horarioDelDia.horaApertura.split(':').map(Number);
    const [horaCierre, minutoCierre] = horarioDelDia.horaCierre.split(':').map(Number);
    const tiempoInput = horaInput * 60 + minutoInput;
    const tiempoApertura = horaApertura * 60 + minutoApertura;
    const tiempoCierre = horaCierre * 60 + minutoCierre;

    // La hora debe ser mayor o igual a la apertura y menor que el cierre
    if (tiempoInput < tiempoApertura || tiempoInput >= tiempoCierre) {
      setHoraError(`Nuestros horarios para ${nombreDia} son de ${horarioDelDia.horaApertura} a ${horarioDelDia.horaCierre}. Por favor, elige otra hora.`);
      return false;
    }

    // Si llega aquí, la validación de hora es exitosa
    setHoraError('');
    return true;
  };

  // --- NUEVO: Efecto para validar cuando cambia la fecha ---
  useEffect(() => {
    if (fechaCita) {
      validarFecha(fechaCita);
    }
  }, [fechaCita]);

  // --- NUEVO: Efecto para validar cuando cambia la hora ---
  useEffect(() => {
    if (fechaCita && horaCita) {
      validarHora(fechaCita, horaCita);
    }
  }, [horaCita, fechaCita]);

  // Cargar servicios y horarios al montar el componente
  useEffect(() => {
    listServicios();
    cargarHorarios(); // <-- Llamada aquí
  }, []);

  // Si llegamos aquí desde una tarjeta, usamos el servicio pasado en el estado
  useEffect(() => {
    if (location.state?.servicio) {
      setServicioSeleccionado(location.state.servicio._id);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!servicioSeleccionado) {
      alert("Por favor, selecciona un servicio.");
      return;
    }
    // VALIDAR FECHA Y HORA ANTES DE ABRIR EL MODAL
    if (!fechaCita || !horaCita) {
      alert("Por favor, selecciona una fecha y hora válidas.");
      return;
    }
    // La validación ya se hace en tiempo real, pero volvemos a validar para estar seguros
    const fechaValida = validarFecha(fechaCita);
    const horaValida = validarHora(fechaCita, horaCita);

    if (!fechaValida || !horaValida) {
      // El mensaje de error ya se muestra en los estados 'fechaError' y 'horaError'
      return;
    }

    // Si pasa la validación, proceder a mostrar el modal
    const servicio = servicios.find(s => s._id === servicioSeleccionado);
    if (!servicio) {
      alert("Servicio no encontrado.");
      return;
    }
    setShowModal(true);
  };

  // Función para enviar la reserva después de la confirmación
  const confirmarReserva = async () => {
    const clienteId = getClienteIdFromToken();
    if (!clienteId) {
      alert("No se pudo obtener tu ID. Por favor, inicia sesión nuevamente.");
      return;
    }
    const servicio = servicios.find(s => s._id === servicioSeleccionado);
    if (!servicio) {
      alert("Servicio no encontrado.");
      return;
    }
    const datosAtencion = {
      cliente: clienteId,
      nombre: servicio.nombre,
      descripcion: detallesAdicionales || 'Solicitud de servicio.',
      prioridad: 'Media',
      precio: servicio.precio,
      estadoPago: 'Pendiente',
      // Añadir fecha y hora
      fechaCita: fechaCita,
      horaCita: horaCita
    };
    const url = `${import.meta.env.VITE_BACKEND_URL}/atencion/registro`;
    const storedUser = JSON.parse(localStorage.getItem("auth-token"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedUser.state.token}`,
    };
    try {
      const response = await fetchDataBackend(url, datosAtencion, "POST", headers);
      if (response) {
        // Limpiar el formulario
        setServicioSeleccionado('');
        setDetallesAdicionales('');
        setFechaCita('');
        setHoraCita('');
        // Redirigir a la página de historial o dashboard
        navigate(`/dashboard/reservar-servicio`);

        window.location.reload();
      }
    } catch (error) {
      console.error("Error al reservar servicio:", error);
      // El toast de error ya lo maneja `fetchDataBackend`
    };
  };

  // Función para obtener el ID del cliente desde el token JWT
  const getClienteIdFromToken = () => {
    const storedUser = JSON.parse(localStorage.getItem("auth-token"));
    if (storedUser && storedUser.state && storedUser.state.token) {
      try {
        const tokenPayload = JSON.parse(atob(storedUser.state.token.split('.')[1]));
        return tokenPayload.id;
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
      }
    }
    return null;
  };

  if (servicios.length === 0) {
    return (
      <div>
        <h1 className='font-black text-4xl text-gray-500'>Reservar Servicio</h1>
        <hr className='my-4 border-t-2 border-gray-300' />
        <p className='mb-8'>Este módulo te permite solicitar un servicio disponible.</p>
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">No existen servicios disponibles para reservar actualmente.</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <h1 className='font-black text-4xl text-gray-500'>Reservar Servicio</h1>
      <hr className='my-4 border-t-2 border-gray-300' />
      <p className='mb-8'>Este módulo te permite solicitar un servicio disponible.</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* --- NUEVA TABLA DE HORARIOS --- */}

        <div className="mt-8 bg-white p-6 rounded-lg shadow w-full lg:max-w-2xl">


          <h2 className="text-xl font-bold mb-4">Horarios de Atención</h2>
          {loadingHorarios ? (
            <div className="text-center py-4">Cargando horarios...</div>
          ) : horarios.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No hay horarios definidos.</div>
          ) : (
            <table className="w-full table-auto">
              <thead className="bg-emerald-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Día</th>
                  <th className="px-4 py-2 text-left">Apertura</th>
                  <th className="px-4 py-2 text-left">Cierre</th>
                </tr>
              </thead>
              <tbody>
                {horarios.map((horario) => (
                  <tr key={horario._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3">{horario.dia}</td>
                    <td className="px-4 py-3">{horario.horaApertura} hs</td>
                    <td className="px-4 py-3">{horario.horaCierre} hs</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl w-full mx-auto border-2 border-gray-300 p-6 rounded-lg shadow-lg"
        >

          <div className="mb-4">
            <label htmlFor="servicio" className="block text-sm font-semibold mb-1">
              Selecciona un Servicio <span className="text-red-600">*</span>
            </label>
            <select
              id="servicio"
              value={servicioSeleccionado}
              onChange={(e) => setServicioSeleccionado(e.target.value)}
              className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
              required
            >
              <option value="">-- Seleccionar --</option>
              {servicios.map((servicio) => (
                <option key={servicio._id} value={servicio._id}>
                  {servicio.nombre} - $ {servicio.precio}
                </option>
              ))}
            </select>
          </div>

          {/* Campo de Fecha */}
          <div className="mb-4">
            <label htmlFor="fechaCita" className="block text-sm font-semibold mb-1">
              Fecha <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              id="fechaCita"
              value={fechaCita}
              onChange={(e) => setFechaCita(e.target.value)}
              className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
              min={new Date().toISOString().split('T')[0]} // No permitir fechas pasadas
              required
            />
            {/* Mensaje de error específico para la fecha */}
            {fechaError && (
              <div className="mt-1 p-2 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm">
                {fechaError}
              </div>
            )}
          </div>

          {/* Campo de Hora */}
          <div className="mb-4">
            <label htmlFor="horaCita" className="block text-sm font-semibold mb-1">
              Hora <span className="text-red-600">*</span>
            </label>
            <input
              type="time"
              id="horaCita"
              value={horaCita}
              onChange={(e) => setHoraCita(e.target.value)}
              className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
              required
            />
            {/* Mensaje de error específico para la hora */}
            {horaError && (
              <div className="mt-1 p-2 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm">
                {horaError}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="detalles" className="block text-sm font-semibold mb-1">
              Detalles Adicionales
            </label>
            <textarea
              id="detalles"
              value={detallesAdicionales}
              onChange={(e) => setDetallesAdicionales(e.target.value)}
              className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
              placeholder="Agrega cualquier detalle importante sobre la reserva..."
              rows="3"
            />
          </div>

          {/* Botón de reserva, deshabilitado si hay error de validación */}
          <button
            type="submit"
            className={`bg-green-800 w-full p-2 text-slate-300 uppercase font-bold rounded-lg hover:bg-green-700 cursor-pointer transition-all ${fechaError || horaError ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!!fechaError || !!horaError} // Deshabilitar si hay algún error
          >
            Reservar Servicio
          </button>
        </form>



         
          




        {/* Modal de confirmación */}
        <ConfirmModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={confirmarReserva}
          service={servicios.find(s => s._id === servicioSeleccionado)}
          additionalDetails={detallesAdicionales}
          fechaCita={fechaCita}
          horaCita={horaCita}
        />
      </div>


          
        
        {!loadingHistorial && (
            <div className="mt-8 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4"></h2>
              {atenciones.length === 0 ? (
                <p className="text-gray-500">Registros.</p>
              ) : (
                <TableTreatments treatments={atenciones} listPatient={cargarHistorial} showEditButton={true} />
              )}
            </div>
          )}





    </div>
  );
};

export default ReservarServicio;
// frontend/src/pages/ReservarServicio.jsx
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom'; // <-- Importa useLocation
import ConfirmModal from '../components/ConfirmModal'; // <-- Importar el nuevo componente

const ReservarServicio = () => {
  const [servicios, setServicios] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState('');
  const [detallesAdicionales, setDetallesAdicionales] = useState('');
  const [showModal, setShowModal] = useState(false); // <-- Estado para mostrar el modal

  const [horarios, setHorarios] = useState([]); // <-- Nuevo estado para los horarios

  const [loadingHorarios, setLoadingHorarios] = useState(true);


  const { fetchDataBackend } = useFetch();
  const navigate = useNavigate();
  const location = useLocation(); // <-- Usa useLocation para obtener el estado



  const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');


  



  // Si llegamos aquí desde una tarjeta, usamos el servicio pasado en el estado
  useEffect(() => {
    if (location.state?.servicio) {
      setServicioSeleccionado(location.state.servicio._id);
    }
  }, [location.state]);

  // Función para cargar servicios
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

    // Cargar servicios y horarios al montar el componente
    useEffect(() => {
        listServicios();
        cargarHorarios(); // <-- Llamada aquí
    }, []);

    // --------------




        // NUEVA: Función para validar la fecha y hora
    const validarFechaYHora = (fecha, hora) => {
        if (!fecha || !hora) return false;

        const fechaObj = new Date(fecha);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        // Validar que la fecha no sea pasada
        if (fechaObj < hoy) {
            return false;
        }

        // Obtener el día de la semana (Lunes=1, Domingo=7)
        const diaSemana = fechaObj.getDay();
        let nombreDia;
        switch(diaSemana) {
            case 0: nombreDia = "Domingo"; break;
            case 1: nombreDia = "Lunes"; break;
            case 2: nombreDia = "Martes"; break;
            case 3: nombreDia = "Miércoles"; break;
            case 4: nombreDia = "Jueves"; break;
            case 5: nombreDia = "Viernes"; break;
            case 6: nombreDia = "Sábado"; break;
            default: return false;
        }

        // Buscar el horario correspondiente
        const horarioDelDia = horarios.find(h => h.dia === nombreDia);

        if (!horarioDelDia) {
            return false; // Día no laborable
        }

        // Validar que la hora esté dentro del rango
        const [horaInput, minutoInput] = hora.split(':').map(Number);
        const [horaApertura, minutoApertura] = horarioDelDia.horaApertura.split(':').map(Number);
        const [horaCierre, minutoCierre] = horarioDelDia.horaCierre.split(':').map(Number);

        const tiempoInput = horaInput * 60 + minutoInput;
        const tiempoApertura = horaApertura * 60 + minutoApertura;
        const tiempoCierre = horaCierre * 60 + minutoCierre;

        // La hora debe ser mayor o igual a la apertura y menor que el cierre
        return tiempoInput >= tiempoApertura && tiempoInput < tiempoCierre;
    };





    // ---------------


      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!servicioSeleccionado) {
            alert("Por favor, selecciona un servicio.");
            return;
        }

        //  VALIDAR FECHA Y HORA ANTES DE ABRIR EL MODAL
        if (!fechaCita || !horaCita) {
            alert("Por favor, selecciona una fecha y hora válidas.");
            return;
        }

        if (!validarFechaYHora(fechaCita, horaCita)) {
            alert("La fecha y hora seleccionadas no están dentro de nuestros horarios de atención. Por favor, elige otra opción.");
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
        navigate(`/dashboard/historial`);
      }
    } catch (error) {
      console.error("Error al reservar servicio:", error);
      // El toast de error ya lo maneja `fetchDataBackend`
    }
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

  useEffect(() => {
    listServicios();
  }, []);

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
      <form onSubmit={handleSubmit} className="max-w-md mx-auto border-2 border-gray-300 p-6 rounded-lg shadow-lg">
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
        <button
          type="submit"
          className="bg-green-800 w-full p-2 text-slate-300 uppercase font-bold rounded-lg hover:bg-green-700 cursor-pointer transition-all"
        >
          Reservar Servicio
        </button>
      </form>




      {/* --- NUEVA TABLA DE HORARIOS --- */}
            <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
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







      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmarReserva}
        service={servicios.find(s => s._id === servicioSeleccionado)}
        additionalDetails={detallesAdicionales}
        fechaCita={fechaCita} // <-- 
        horaCita={horaCita}   // <-- 
      />
    </div>
  );
};

export default ReservarServicio;
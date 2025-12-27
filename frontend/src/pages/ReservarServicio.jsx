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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!servicioSeleccionado) {
      alert("Por favor, selecciona un servicio.");
      return;
    }
    // Obtener los detalles del servicio seleccionado
    const servicio = servicios.find(s => s._id === servicioSeleccionado);
    if (!servicio) {
      alert("Servicio no encontrado.");
      return;
    }
    // Mostrar el modal de confirmación
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
            Fecha de la Cita <span className="text-red-600">*</span>
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
            Hora de la Cita <span className="text-red-600">*</span>
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
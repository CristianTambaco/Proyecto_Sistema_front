// frontend/src/pages/ListServiciosCliente.jsx
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom'; // Importamos Link para la navegación

const ListServiciosCliente = () => {
  const [servicios, setServicios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { fetchDataBackend } = useFetch();

  const listServicios = async () => {
    // Filtrar solo servicios activos
    const url = `${import.meta.env.VITE_BACKEND_URL}/servicios-publicos?page=${currentPage}&limit=3`;
    const storedUser = JSON.parse(localStorage.getItem("auth-token"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedUser.state.token}`,
    };
    try {
      const response = await fetchDataBackend(url, null, "GET", headers);
      setServicios(response?.servicios || []);
      setTotalPages(response?.pagination?.pages || 1);
    } catch (error) {
      console.error("Error al listar servicios:", error);
      // El toast de error ya lo maneja `fetchDataBackend`
    }
  };

  useEffect(() => {
    listServicios();
  }, [currentPage]);

  if (servicios.length === 0) {
    return (
      <div>
        <h1 className='font-black text-4xl text-gray-500'>Servicios Disponibles</h1>
        <hr className='my-4 border-t-2 border-gray-300' />
        <p className='mb-8'>Este módulo te permite visualizar los servicios disponibles.</p>
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">No existen servicios disponibles actualmente.</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <h1 className='font-black text-4xl text-gray-500'>Servicios Disponibles</h1>
      <hr className='my-4 border-t-2 border-gray-300' />
      <p className='mb-8'>Este módulo te permite visualizar los servicios disponibles.</p>

      {/* Contenedor de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicios.map((servicio) => (
          <div key={servicio._id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col">
            {/* Imagen del servicio */}
            <div className="mb-4">
              {servicio.imagen ? (
                <img
                  src={servicio.imagen}
                  alt={servicio.nombre}
                  className="w-full h-40 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600">Sin imagen</span>
                </div>
              )}
            </div>
            {/* Nombre del servicio */}
            <h3 className="text-xl font-bold text-emerald-700 mb-2">{servicio.nombre}</h3>
            {/* Descripción del servicio */}
            <p className="text-gray-800 mb-4 flex-grow">{servicio.descripcion}</p>
            {/* Precio y Duración */}
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-green-800">💲 ${servicio.precio}</span>
              <span className="text-sm text-blue-800 px-2 py-1 rounded">
                {servicio.duracionEstimada} min
              </span>
            </div>
            {/* Botón Reservar */}
            <Link
              to="/dashboard/reservar-servicio"
              state={{ servicio: servicio }} // Pasamos el objeto del servicio al componente de reserva
              className="mt-auto bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:scale-105 transition"
            >
              Reservar
            </Link>
          </div>
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          aria-label="Página anterior"
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Anterior
        </button>
        <span className="px-4 py-2 self-center text-gray-800">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          aria-label="Página siguiente"
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ListServiciosCliente;
// frontend/src/pages/ListServiciosCliente.jsx
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { ToastContainer } from 'react-toastify';

const ListServiciosCliente = () => {
  const [servicios, setServicios] = useState([]);
  const { fetchDataBackend } = useFetch();

  const listServicios = async () => {
    // Filtrar solo servicios activos
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
      // Opcional: Mostrar toast de error si fetchDataBackend no lo hace
      // toast.error("Error al cargar los servicios.");
    }
  };

  useEffect(() => {
    listServicios();
  }, []);

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
      <table className="w-full mt-5 table-auto shadow-lg bg-white">
        <thead className="bg-gray-800 text-slate-400">
          <tr>
            {["Nombre", "Descripción", "Precio", "Duración (min)"].map((header) => (
              <th key={header} className="p-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {servicios.map((servicio) => (
            <tr className="hover:bg-gray-300 text-center" key={servicio._id}>
              <td>{servicio.nombre}</td>
              <td>{servicio.descripcion}</td>
              <td>$ {servicio.precio}</td>
              <td>{servicio.duracionEstimada}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListServiciosCliente;
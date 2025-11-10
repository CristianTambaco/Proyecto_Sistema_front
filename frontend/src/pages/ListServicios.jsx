// frontend/src/pages/ListServicios.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { ToastContainer } from 'react-toastify';
import storeAuth from '../context/storeAuth';

const ListServicios = () => {
  const [servicios, setServicios] = useState([]);
  const { fetchDataBackend } = useFetch();
  const { rol } = storeAuth(); // Asegura que solo admin acceda aquí via PrivateRouteWithRole

  const listServicios = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/servicios`;
    const storedUser = JSON.parse(localStorage.getItem("auth-token"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedUser.state.token}`,
    };
    try {
      const response = await fetchDataBackend(url, null, "GET", headers);
      setServicios(response || []); // Manejar caso donde response es null
    } catch (error) {
      console.error("Error al listar servicios:", error);
      // fetchDataBackend ya maneja el toast de error
    }
  };

  useEffect(() => {
    listServicios();
  }, []);

  const eliminarServicio = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este servicio?")) {
      const url = `${import.meta.env.VITE_BACKEND_URL}/servicio/${id}`;
      const storedUser = JSON.parse(localStorage.getItem("auth-token"));
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedUser.state.token}`,
      };
      try {
        const response = await fetchDataBackend(url, undefined, "DELETE", headers); // Usar undefined como data
        if (response) { // Si la eliminación lógica fue exitosa
          listServicios(); // Refresca la lista
        }
      } catch (error) {
        console.error("Error al eliminar servicio:", error);
        // fetchDataBackend ya maneja el toast de error
      }
    }
  };

  if (servicios.length === 0) {
    return (
      <div>
        <h1 className='font-black text-4xl text-gray-500'>Gestión de Servicios</h1>
        <hr className='my-4 border-t-2 border-gray-300' />
        <p className='mb-8'>Este módulo te permite gestionar los servicios ofrecidos por el negocio.</p>
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">No existen servicios registrados.</span>
        </div>
        <Link to="/dashboard/servicios/crear" className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700">
          Crear Servicio
        </Link>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <h1 className='font-black text-4xl text-gray-500'>Gestión de Servicios</h1>
      <hr className='my-4 border-t-2 border-gray-300' />
      <p className='mb-8'>Este módulo te permite gestionar los servicios ofrecidos por el negocio.</p>
      <Link to="/dashboard/servicios/crear" className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 mb-4">
        Crear Servicio
      </Link>
      <table className="w-full mt-5 table-auto shadow-lg bg-white">
        <thead className="bg-gray-800 text-slate-400">
          <tr>
            {["Nombre", "Descripción", "Precio", "Duración (min)", "Estado", "Acciones"].map((header) => (
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
              <td>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                  servicio.estado ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {servicio.estado ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className='py-2 text-center'>
                <Link
                  to={`/dashboard/servicios/actualizar/${servicio._id}`}
                  className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 hover:text-blue-600"
                  title="Actualizar"
                >
                  ✏️ {/* Puedes usar un icono real */}
                </Link>
                <button
                  onClick={() => eliminarServicio(servicio._id)}
                  className="h-7 w-7 text-red-900 cursor-pointer inline-block hover:text-red-600"
                  title="Eliminar"
                >
                  🗑️ {/* Puedes usar un icono real */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListServicios;
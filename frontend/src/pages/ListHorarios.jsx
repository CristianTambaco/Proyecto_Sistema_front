// frontend/src/pages/ListHorarios.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { ToastContainer } from 'react-toastify';
import storeAuth from '../context/storeAuth';

const ListHorarios = () => {
  const [horarios, setHorarios] = useState([]);
  const { fetchDataBackend } = useFetch();
  const { rol } = storeAuth(); // Asegura que solo admin acceda aquí via PrivateRouteWithRole

  const listHorarios = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/horarios`;
    const storedUser = JSON.parse(localStorage.getItem("auth-token"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedUser.state.token}`,
    };
    try {
      const response = await fetchDataBackend(url, null, "GET", headers);
      setHorarios(response || []); // Manejar caso donde response es null
    } catch (error) {
      console.error("Error al listar horarios:", error);
      // fetchDataBackend ya maneja el toast de error
    }
  };

  useEffect(() => {
    listHorarios();
  }, []);

  const eliminarHorario = async (id) => {
  if (window.confirm("¿Estás seguro de que deseas eliminar este horario?")) {
    const url = `${import.meta.env.VITE_BACKEND_URL}/horario/${id}`;
    const storedUser = JSON.parse(localStorage.getItem("auth-token"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedUser.state.token}`,
    };

    try {
      // ❌ Esto es incorrecto. No se debe enviar un cuerpo en una DELETE.
      // const response = await fetchDataBackend(url, null, "DELETE", headers);

      // ✅ CORRECTO: Enviar la solicitud DELETE SIN cuerpo.
      // Solo necesitas la URL y los headers.
      const response = await fetchDataBackend(url, undefined, "DELETE", headers);

      if (response) { // Si la eliminación fue exitosa
        listHorarios(); // Refresca la lista
      }
    } catch (error) {
      console.error("Error al eliminar horario:", error);
      // fetchDataBackend ya maneja el toast de error
    }
  }
};

  if (horarios.length === 0) {
    return (
      <div>
        <h1 className='font-black text-4xl text-gray-500'>Horarios de Atención</h1>
        <hr className='my-4 border-t-2 border-gray-300' />
        <p className='mb-8'>Este módulo te permite gestionar los horarios de atención del negocio.</p>
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">No existen horarios registrados.</span>
        </div>
        <Link to="/dashboard/horarios/crear" className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700">
          Crear Horario
        </Link>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <h1 className='font-black text-4xl text-gray-500'>Horarios de Atención</h1>
      <hr className='my-4 border-t-2 border-gray-300' />
      <p className='mb-8'>Este módulo te permite gestionar los horarios de atención del negocio.</p>
      <Link to="/dashboard/horarios/crear" className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 mb-4">
        Crear Horario
      </Link>
      <table className="w-full mt-5 table-auto shadow-lg bg-white">
        <thead className="bg-gray-800 text-slate-400">
          <tr>
            {["Día", "Apertura", "Cierre", "Estado", "Acciones"].map((header) => (
              <th key={header} className="p-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario) => (
            <tr className="hover:bg-gray-300 text-center" key={horario._id}>
              <td>{horario.dia}</td>
              <td>{horario.horaApertura}</td>
              <td>{horario.horaCierre}</td>
              <td>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                  horario.estado ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {horario.estado ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className='py-2 text-center'>
                <Link
                  to={`/dashboard/horarios/actualizar/${horario._id}`}
                  className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 hover:text-blue-600"
                  title="Actualizar"
                >
                  ✏️ {/* Puedes usar un icono real */}
                </Link>
                <button
                  onClick={() => eliminarHorario(horario._id)}
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

export default ListHorarios;
// frontend/src/pages/ListServicios.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { ToastContainer } from 'react-toastify';
import storeAuth from '../context/storeAuth';

const ListServicios = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroDescripcion, setFiltroDescripcion] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos'); // 'todos', 'activo', 'inactivo'
  const { fetchDataBackend } = useFetch();
  const { rol } = storeAuth();

  const [filtroImagen, setFiltroImagen] = useState('todos'); // 'todos', 'con', 'sin'

  const listServicios = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/servicios`;
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
      // fetchDataBackend ya maneja el toast de error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listServicios();
  }, []);

  // Función para aplicar los filtros
  const filtrarServicios = () => {
    if (!servicios || servicios.length === 0) return [];

    let resultados = [...servicios];

    // Filtro por nombre
    if (filtroNombre.trim() !== '') {
      const term = filtroNombre.toLowerCase();
      resultados = resultados.filter(servicio =>
        servicio.nombre.toLowerCase().includes(term)
      );
    }

    // Filtro por descripción
    if (filtroDescripcion.trim() !== '') {
      const term = filtroDescripcion.toLowerCase();
      resultados = resultados.filter(servicio =>
        servicio.descripcion.toLowerCase().includes(term)
      );
    }

    // Filtro por estado
    if (filtroEstado !== 'todos') {
      const estadoBoolean = filtroEstado === 'activo';
      resultados = resultados.filter(servicio => servicio.estado === estadoBoolean);
    }

    //  Filtro por imagen
    if (filtroImagen === 'con') {
      resultados = resultados.filter(servicio => servicio.imagen);
    } else if (filtroImagen === 'sin') {
      resultados = resultados.filter(servicio => !servicio.imagen);
    }

    return resultados;
  };

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

  if (servicios.length === 0 && !loading) {
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

  const serviciosFiltrados = filtrarServicios();

  return (
    <div>
      <ToastContainer />
      <h1 className='font-black text-4xl text-gray-500'>Gestión de Servicios</h1>
      <hr className='my-4 border-t-2 border-gray-300' />
      <p className='mb-8'>Este módulo te permite gestionar los servicios ofrecidos por el negocio.</p>

      {/* Botón para crear servicio */}
      <div className="mb-4">
        <Link to="/dashboard/servicios/crear" className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700">
          Crear Servicio
        </Link>
      </div>

      {/* Controles de filtro */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Filtro por nombre */}
        <div className="flex-1 max-w-md">
          <label htmlFor="filtroNombre" className="block text-sm font-semibold mb-2">
            Filtrar por Nombre
          </label>
          <input
            id="filtroNombre"
            type="text"
            placeholder="Buscar por nombre..."
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
          />
        </div>
        {/* Filtro por descripción */}
        <div className="flex-1 max-w-md">
          <label htmlFor="filtroDescripcion" className="block text-sm font-semibold mb-2">
            Filtrar por Descripción
          </label>
          <input
            id="filtroDescripcion"
            type="text"
            placeholder="Buscar por descripción..."
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
            value={filtroDescripcion}
            onChange={(e) => setFiltroDescripcion(e.target.value)}
          />
        </div>
        {/* Filtro por estado */}
        <div className="max-w-xs">
          <label htmlFor="filtroEstado" className="block text-sm font-semibold mb-2">
            Estado
          </label>
          <select
            id="filtroEstado"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
          >
            <option value="todos">Todos</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        {/* Filtro por imagen */}
        <div className="max-w-xs">
          <label htmlFor="filtroImagen" className="block text-sm font-semibold mb-2">
            Imagen
          </label>
          <select
            id="filtroImagen"
            value={filtroImagen}
            onChange={(e) => setFiltroImagen(e.target.value)}
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
          >
            <option value="todos">Todos</option>
            <option value="con">Con imagen</option>
            <option value="sin">Sin imagen</option>
          </select>
        </div>





      </div>

      {/* Tabla de servicios */}
      <table className="w-full mt-5 table-auto shadow-lg bg-white">
        <thead className="bg-gray-800 text-slate-400">
          <tr>
            {["Imagen", "Nombre", "Descripción", "Precio", "Duración (min)", "Estado", "Acciones"].map((header) => (
              <th key={header} className="p-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {serviciosFiltrados.map((servicio) => (
            <tr className="hover:bg-gray-300 text-center" key={servicio._id}>
              <td>
                {servicio.imagen ? (
                  <img
                    src={servicio.imagen}
                    alt={servicio.nombre}
                    className="w-16 h-16 object-cover rounded-md mx-auto"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-md mx-auto flex items-center justify-center">
                    <span className="text-xs text-gray-500">Sin imagen</span>
                  </div>
                )}
              </td>
              <td>{servicio.nombre}</td>
              <td>{servicio.descripcion}</td>
              <td>$ {servicio.precio}</td>
              <td>{servicio.duracionEstimada}</td>
              <td>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                  servicio.estado ? " text-green-600" : " text-red-600"
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
                  ✏️
                </Link>
                <button
                  onClick={() => eliminarServicio(servicio._id)}
                  className="h-7 w-7 text-red-900 cursor-pointer inline-block hover:text-red-600"
                  title="Eliminar"
                >
                  🗑️
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
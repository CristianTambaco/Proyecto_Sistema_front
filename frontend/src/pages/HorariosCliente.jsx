// frontend/src/pages/HorariosCliente.jsx
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { ToastContainer } from 'react-toastify';

const HorariosCliente = () => {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchDataBackend } = useFetch();

  const listHorarios = async () => {
    try {
      // Usar la nueva ruta específica para horarios activos
      const url = `${import.meta.env.VITE_BACKEND_URL}/horarios-activos`;
      const storedUser = JSON.parse(localStorage.getItem("auth-token"));
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedUser.state.token}`,
      };
      const response = await fetchDataBackend(url, null, "GET", headers);
      // Asegurar que response sea un array
      setHorarios(response || []);
    } catch (error) {
      console.error("Error al listar horarios cliente:", error);
      // fetchDataBackend ya maneja el toast de error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listHorarios();
  }, []);

  if (loading) {
    return <div>Cargando horarios...</div>;
  }

  if (horarios.length === 0) {
    return (
      <div>
        <h1 className='font-black text-4xl text-gray-500'>Horarios de Atención</h1>
        <hr className='my-4 border-t-2 border-gray-300' />
        <p className='mb-8'>Este módulo te permite visualizar los horarios de atención del negocio.</p>
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">No existen horarios activos registrados.</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <h1 className='font-black text-4xl text-gray-500'>Horarios de Atención</h1>
      <hr className='my-4 border-t-2 border-gray-300' />
      <p className='mb-8'>Este módulo te permite visualizar los horarios de atención del negocio.</p>

      {/* Contenedor principal */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        {/* Encabezado de la tabla */}
        <div className="grid grid-cols-3 gap-4 bg-emerald-600 text-white font-bold py-3 px-4 rounded-t-xl">
          <div>Día</div>
          <div>Hora de Apertura</div>
          <div>Hora de Cierre</div>
        </div>

        {/* Cuerpo de la tabla */}
        <div className="divide-y divide-gray-200">
          {horarios.map((horario) => (
            <div key={horario._id} className="grid grid-cols-3 gap-4 py-3 px-4 hover:bg-gray-50">
              <div className="font-medium">{horario.dia}</div>
              <div>{horario.horaApertura} hs</div>
              <div>{horario.horaCierre} hs</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorariosCliente;
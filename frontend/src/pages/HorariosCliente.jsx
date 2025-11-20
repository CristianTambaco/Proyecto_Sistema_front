// frontend/src/pages/HorariosCliente.jsx
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { ToastContainer } from 'react-toastify';

const HorariosCliente = () => {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
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
      setLoading(false); // Detener la carga
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
      <table className="w-full mt-5 table-auto shadow-lg bg-white">
        <thead className="bg-gray-800 text-slate-400">
          <tr>
            {["Día", "Apertura", "Cierre"].map((header) => ( // No mostrar estado para cliente
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
              {/* No se muestra el estado para el cliente */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HorariosCliente;

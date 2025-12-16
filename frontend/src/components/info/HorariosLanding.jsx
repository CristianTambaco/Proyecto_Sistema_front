// frontend/src/components/info/HorariosLanding.jsx
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { ToastContainer } from "react-toastify";

const HorariosLanding = () => {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchDataBackend } = useFetch();

  const listHorarios = async () => {
    try {
        // ❌ El cuarto parámetro es null, lo que significa que no se envían headers.
        const url = `${import.meta.env.VITE_BACKEND_URL}/horarios-activos2`;
        const response = await fetchDataBackend(url, null, "GET", null); // <-- headers = null
        setHorarios(response || []);
    } catch (error) {
        console.error("Error al listar horarios en landing:", error);
        // fetchDataBackend ya maneja el toast de error
    } finally {
        setLoading(false);
    }
};

  useEffect(() => {
    listHorarios();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Cargando horarios...</div>;
  }

  if (horarios.length === 0) {
    return <div className="text-center py-4 text-gray-500">Horarios próximamente.</div>;
  }

  // Definir el orden correcto de los días
  const ordenDias = [
    "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"
  ];

  // Ordenar los horarios obtenidos según el orden definido
  const horariosOrdenados = horarios.sort((a, b) => ordenDias.indexOf(a.dia) - ordenDias.indexOf(b.dia));

  return (
  <div className="py-12 bg-white">
    <div className="container mx-auto px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Horarios de Atención
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow">
          <thead className="bg-emerald-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Día
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Hora de Apertura
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Hora de Cierre
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {horariosOrdenados.map((horario) => (
              <tr key={horario._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {horario.dia}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {horario.horaApertura} hs
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {horario.horaCierre} hs
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <ToastContainer />
  </div>
);

};

export default HorariosLanding;
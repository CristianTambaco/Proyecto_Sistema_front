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
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Horarios de Atención</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {horariosOrdenados.map((horario) => (
            <div key={horario._id} className="bg-gray-50 p-6 rounded-2xl shadow text-center">
              <h3 className="text-xl font-bold text-emerald-600 mb-2">{horario.dia}</h3>
              <p className="text-gray-700">
                <span className="font-semibold">Apertura:</span> {horario.horaApertura} hs
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Cierre:</span> {horario.horaCierre} hs
              </p>
              <span className={`inline-block mt-2 text-xs font-medium px-2.5 py-0.5 rounded ${
                horario.estado ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}>
                {horario.estado ? "Activo" : "Inactivo"}
              </span>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default HorariosLanding;
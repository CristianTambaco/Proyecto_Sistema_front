// frontend/src/pages/HistorialTrabajos.jsx
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import storeAuth from "../context/storeAuth";
const HistorialTrabajos = () => {
  const [trabajos, setTrabajos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, rol } = storeAuth();
  const { fetchDataBackend } = useFetch();

  const cargarTrabajos = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/trabajos-realizados`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetchDataBackend(url, null, "GET", headers);
      setTrabajos(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Error al cargar historial de trabajos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (rol === "estilista" || rol === "administrador") {
      cargarTrabajos();
    }
  }, [token, rol]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando historial...</div>;
  }

  if (trabajos.length === 0) {
    return (
      <div>
        <h1 className="font-black text-4xl text-gray-500">Historial de Trabajos Realizados</h1>
        <hr className="my-4 border-t-2 border-gray-300" />
        <p className="mb-8">No se han registrado trabajos aún.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-black text-4xl text-gray-500">Historial de Trabajos Realizados</h1>
      <hr className="my-4 border-t-2 border-gray-300" />
      <p className="mb-8">
        {rol === "estilista"
          ? "Aquí puedes ver los trabajos que has registrado."
          : "Historial completo de todos los trabajos realizados por estilistas."}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full mt-5 table-auto shadow-lg bg-white">
          <thead className="bg-gray-800 text-slate-400">
            <tr>
              <th className="p-2">Fecha</th>
              <th className="p-2">Cliente / Mascota</th>
              <th className="p-2">Servicio</th>
              <th className="p-2">Descripción</th>
              <th className="p-2">Prioridad</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Observaciones</th>
              {rol === "administrador" && <th className="p-2">Estilista</th>}
            </tr>
          </thead>
          <tbody>
            {trabajos.map((trabajo) => (
              <tr key={trabajo._id} className="hover:bg-gray-100 text-center">
                <td>
                  {new Date(trabajo.fechaRealizacion).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>
                  {trabajo.cliente?.nombrePropietario || "—"}<br />
                  <small className="text-gray-500">{trabajo.cliente?.nombreMascota || "–"}</small>
                </td>
                <td>{trabajo.nombreServicio}</td>
                <td className="max-w-xs truncate px-2">{trabajo.descripcion}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      trabajo.prioridad === "Alta"
                        ? "bg-red-100 text-red-800"
                        : trabajo.prioridad === "Media"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {trabajo.prioridad}
                  </span>
                </td>
                <td>$ {trabajo.precio.toFixed(2)}</td>
                <td className="max-w-xs truncate px-2">{trabajo.observaciones || "— sin observaciones —"}</td>
                {rol === "administrador" && (
                  <td>
                    {trabajo.estilista?.nombre || "—"} {trabajo.estilista?.apellido || ""}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistorialTrabajos;
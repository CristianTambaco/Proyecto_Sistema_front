// frontend/src/pages/HistorialTrabajos.jsx
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import storeAuth from "../context/storeAuth";
import { ToastContainer } from "react-toastify";

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

  const eliminarTrabajo = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este registro del historial?")) return;

    const url = `${import.meta.env.VITE_BACKEND_URL}/trabajo-realizado/${id}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      // ✅ DELETE sin cuerpo
      await fetchDataBackend(url, undefined, "DELETE", headers);
      // Recargar lista
      cargarTrabajos();
    } catch (error) {
      console.error("Error al eliminar trabajo:", error);
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
        <p className="mb-8">
          {rol === "estilista"
            ? "No has registrado trabajos aún."
            : "No se han registrado trabajos."}
        </p>
      </div>
    );
  }

  // Obtener ID del usuario autenticado
  const userId = JSON.parse(localStorage.getItem("auth-token"))?.state?._id;

  return (
    <div>
      <ToastContainer />
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
              <th className="p-2">Cliente</th>
              <th className="p-2">Servicio</th>
              <th className="p-2">Descripción</th>

              {/* <th className="p-2">Prioridad</th> */}

              <th className="p-2">Precio</th>
              <th className="p-2">Observaciones</th>
              {rol === "administrador" && <th className="p-2">Estilista</th>}


              {/* <th className="p-2">Acciones</th> */}

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

                  {/* <small className="text-gray-500">{trabajo.cliente?.nombreMascota || "–"}</small> */}                  
                  
                </td>
                <td>{trabajo.nombreServicio}</td>

                <td className="max-w-xs truncate px-2">{trabajo.descripcion}</td>

                {/* <td> */}

                  {/* <span
                    className={`px-2 py-1 rounded text-xs ${
                      trabajo.prioridad === "Alta"
                        ? " text-red-800"
                        : trabajo.prioridad === "Media"
                        ? " text-yellow-800"
                        : " text-green-800"
                    }`}
                  >
                    {trabajo.prioridad}
                  </span> */}


                {/* </td> */}
                

                <td>$ {trabajo.precio.toFixed(2)}</td>
                <td className="max-w-xs truncate px-2">
                  {trabajo.observaciones || "— sin observaciones —"}
                </td>
                {rol === "administrador" && (
                  <td>
                    {trabajo.estilista?.nombre || "—"} {trabajo.estilista?.apellido || ""}
                  </td>
                )}


                {/* <td>
                  {((rol === "administrador" || rol === "estilista") ||
                    (rol === "estilista" && trabajo.estilista?._id === userId)) && (
                    <button
                      onClick={() => eliminarTrabajo(trabajo._id)}
                      className="text-red-600 hover:text-red-800 ml-2"
                      title="Eliminar del historial"
                    >
                      🗑️
                    </button>
                  )}
                </td> */}


              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistorialTrabajos;
// frontend/src/pages/AgendaCitas.jsx
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const AgendaCitas = () => {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const { fetchDataBackend } = useFetch();

    const cargarCitas = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/atenciones-todas`;
        const storedUser = JSON.parse(localStorage.getItem("auth-token"));
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.state.token}`
        };
        try {
            const response = await fetchDataBackend(url, null, "GET", headers);
            // Ordenar por fecha de registro (createdAt)
            const citasOrdenadas = (response || []).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            setCitas(citasOrdenadas);
        } catch (error) {
            console.error("Error al cargar citas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarCitas();
    }, []);

    if (loading) return <div>Cargando agenda...</div>;

    return (
        <div>
            <h1 className="font-black text-4xl text-gray-500">Agenda de Citas</h1>
            <hr className="my-4 border-t-2 border-gray-300" />
            <p className="mb-8">Listado de citas registradas de todas las mascotas (ordenadas por fecha de registro).</p>

            {citas.length === 0 ? (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                    No hay citas registradas.
                </div>
            ) : (
                <table className="w-full mt-5 table-auto shadow-lg bg-white">
                    <thead className="bg-gray-800 text-slate-400">
                        <tr>
                            <th className="p-2">Fecha Registro</th>
                            <th className="p-2">Servicio</th>
                            <th className="p-2">Cliente / Mascota</th>
                            <th className="p-2">Estado Pago</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map((cita, index) => (
                            <tr key={cita._id || index} className="hover:bg-gray-300 text-center">
                                <td>
                                    {new Date(cita.createdAt).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </td>
                                <td>{cita.nombre}</td>
                                <td>
                                    {cita.cliente?.nombrePropietario || 'N/A'}<br />
                                    <small className="text-gray-500">{cita.cliente?.nombreMascota || '–'}</small>
                                </td>
                                <td>
                                    <span className={`px-2 py-1 rounded text-xs ${
                                        cita.estadoPago === 'Pagado' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {cita.estadoPago}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AgendaCitas;
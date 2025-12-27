// frontend/src/pages/AgendaCitas.jsx
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const AgendaCitas = () => {
    const [citasOriginales, setCitasOriginales] = useState([]);
    const [citasFiltradas, setCitasFiltradas] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [orden, setOrden] = useState("fecha-desc"); // valor inicial
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
            setCitasOriginales(response || []);
            setCitasFiltradas(response || []);
        } catch (error) {
            console.error("Error al cargar citas:", error);
        } finally {
            setLoading(false);
        }
    };

    // Función para aplicar filtro y orden
    useEffect(() => {
        let resultado = [...citasOriginales];

        // 1. Aplicar búsqueda/filtro (por nombre de servicio, cliente o mascota)
        if (filtro.trim() !== "") {
            const term = filtro.toLowerCase();
            resultado = resultado.filter(cita =>
                cita.nombre.toLowerCase().includes(term) ||
                (cita.cliente?.nombrePropietario || '').toLowerCase().includes(term) ||
                (cita.cliente?.nombreMascota || '').toLowerCase().includes(term)
            );
        }

        // 2. Aplicar orden
        switch (orden) {
            case "fecha-desc":
                resultado.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case "fecha-asc":
                resultado.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case "servicio-asc":
                resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
                break;
            case "cliente-asc":
                resultado.sort((a, b) =>
                    (a.cliente?.nombrePropietario || '').localeCompare(b.cliente?.nombrePropietario || '')
                );
                break;
            default:
                break;
        }

        setCitasFiltradas(resultado);
    }, [filtro, orden, citasOriginales]);

    useEffect(() => {
        cargarCitas();
    }, []);

    if (loading) return <div>Cargando agenda...</div>;

    return (
        <div>
            <h1 className="font-black text-4xl text-gray-500">Agenda de Citas</h1>
            <hr className="my-4 border-t-2 border-gray-300" />
            <p className="mb-8">Listado de citas registradas.</p>

            {/* Fila de controles: búsqueda + dropdown de orden */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Búsqueda general */}
                <div className="flex-1 max-w-md">
                    <label htmlFor="filtro" className="block text-sm font-semibold mb-2">
                        Buscar
                    </label>
                    <input
                        id="filtro"
                        type="text"
                        placeholder="Cliente o servicio..."
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                </div>

                {/* Dropdown de orden */}
                <div className="max-w-xs">
                    <label htmlFor="orden" className="block text-sm font-semibold mb-2">
                        Ordenar por
                    </label>
                    <select
                        id="orden"
                        value={orden}
                        onChange={(e) => setOrden(e.target.value)}
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
                    >
                        <optgroup label="Fecha de registro">
                            <option value="fecha-desc">Más reciente primero</option>
                            <option value="fecha-asc">Más antigua primero</option>
                        </optgroup>
                        <optgroup label="Alfabético">
                            <option value="servicio-asc">Servicio (A–Z)</option>
                            <option value="cliente-asc">Cliente (A–Z)</option>
                        </optgroup>
                    </select>
                </div>
            </div>

            {citasFiltradas.length === 0 ? (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                    No hay citas que coincidan con los criterios.
                </div>
            ) : (
                <table className="w-full mt-5 table-auto shadow-lg bg-white">
                    <thead className="bg-gray-800 text-slate-400">
                        <tr>
                            <th className="p-2">Fecha de la Cita</th>
                            <th className="p-2">Hora</th>
                            <th className="p-2">Servicio</th>
                            <th className="p-2">Cliente</th>

                            {/* <th className="p-2">Estado Pago</th> */}

                        </tr>
                    </thead>
                    <tbody>
                        {citasFiltradas.map((cita, index) => (
                            <tr key={cita._id || index} className="hover:bg-gray-300 text-center">
                                <td>
                                    {cita.fechaCita ? (
                                        <>
                                            {new Date(cita.fechaCita).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                timeZone: 'UTC'
                                            })}

                                            <br />
                                            {/* <span className="text-gray-500">
                                                {cita.horaCita}
                                            </span> */}
                                        </>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                                
                                <td>{cita.horaCita}</td>

                                <td>{cita.nombre}</td>
                                <td>
                                    {cita.cliente?.nombrePropietario || 'N/A'}<br />

                                    {/* <small className="text-gray-500">{cita.cliente?.nombreMascota || '–'}</small> */}

                                </td>

                                {/* <td>
                                    <span className={`px-2 py-1 rounded text-xs ${
                                        cita.estadoPago === 'Pagado' 
                                            ? ' text-green-600' 
                                            : ' text-yellow-600'
                                    }`}>
                                        {cita.estadoPago}
                                    </span>
                                </td> */}

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AgendaCitas;
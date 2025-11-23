// frontend/src/pages/HistorialGeneral.jsx
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import TableTreatments from "../components/treatments/Table";

const HistorialGeneral = () => {
    const [atencionesOriginales, setAtencionesOriginales] = useState([]);
    const [atencionesFiltradas, setAtencionesFiltradas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState("");
    const [loading, setLoading] = useState(true);
    const { fetchDataBackend } = useFetch();

    // Cargar todas las atenciones
    const cargarAtenciones = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/atenciones-todas`;
        const storedUser = JSON.parse(localStorage.getItem("auth-token"));
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.state.token}`
        };
        try {
            const response = await fetchDataBackend(url, null, "GET", headers);
            setAtencionesOriginales(response || []);
            setAtencionesFiltradas(response || []);
        } catch (error) {
            console.error("Error al cargar historial general:", error);
        }
    };

    // Cargar lista de clientes activos
    const cargarClientes = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/clientes`;
        const storedUser = JSON.parse(localStorage.getItem("auth-token"));
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.state.token}`
        };
        try {
            const response = await fetchDataBackend(url, null, "GET", headers);
            setClientes(response || []);
        } catch (error) {
            console.error("Error al cargar clientes:", error);
        }
    };

    // Manejar el cambio de selección
    const handleClienteChange = (e) => {
        const id = e.target.value;
        setClienteSeleccionado(id);
        if (!id) {
            setAtencionesFiltradas(atencionesOriginales);
        } else {
            const filtradas = atencionesOriginales.filter(
                atencion => atencion.cliente?._id === id
            );
            setAtencionesFiltradas(filtradas);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([cargarAtenciones(), cargarClientes()]);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) return <div>Cargando historial...</div>;

    return (
        <div>
            <h1 className="font-black text-4xl text-gray-500">Historial General de Atenciones</h1>
            <hr className="my-4 border-t-2 border-gray-300" />
            <p className="mb-4">Este módulo muestra el historial de atenciones de todas las mascotas registradas.</p>

            {/* Dropdown de selección de cliente */}
            <div className="mb-6 max-w-md">
                <label htmlFor="cliente-select" className="block text-sm font-semibold mb-2">
                    Cliente
                    {/* Filtrar por cliente */}
                </label>
                <select
                    id="cliente-select"
                    value={clienteSeleccionado}
                    onChange={handleClienteChange}
                    className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
                >
                    <option value="">-- Todos los clientes --</option>
                    {clientes.map(cliente => (
                        <option key={cliente._id} value={cliente._id}>
                            {cliente.nombreMascota} - {cliente.nombrePropietario}
                        </option>
                    ))}
                </select>
            </div>

            {atencionesFiltradas.length === 0 ? (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                    No se encontraron atenciones.
                </div>
            ) : (
                <TableTreatments treatments={atencionesFiltradas} listPatient={cargarAtenciones} />
            )}
        </div>
    );
};

export default HistorialGeneral;
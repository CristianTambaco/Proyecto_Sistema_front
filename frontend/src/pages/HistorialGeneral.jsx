// frontend/src/pages/HistorialGeneral.jsx
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import TableTreatments from "../components/treatments/Table";

const HistorialGeneral = () => {
    const [atenciones, setAtenciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const { fetchDataBackend } = useFetch();

    const cargarAtenciones = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/atenciones-todas`;
        const storedUser = JSON.parse(localStorage.getItem("auth-token"));
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.state.token}`
        };
        try {
            const response = await fetchDataBackend(url, null, "GET", headers);
            setAtenciones(response || []);
        } catch (error) {
            console.error("Error al cargar historial general:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarAtenciones();
    }, []);

    if (loading) return <div>Cargando historial...</div>;

    return (
        <div>
            <h1 className="font-black text-4xl text-gray-500">Historial General de Atenciones</h1>
            <hr className="my-4 border-t-2 border-gray-300" />
            <p className="mb-8">Este módulo muestra el historial de atenciones de todas las mascotas registradas.</p>
            {atenciones.length === 0 ? (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                    No existen atenciones registradas.
                </div>
            ) : (
                <TableTreatments treatments={atenciones} listPatient={cargarAtenciones} />
            )}
        </div>
    );
};

export default HistorialGeneral;
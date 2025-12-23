// frontend/src/pages/EditarMascota.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormMascota from "../components/mascotas/FormMascota";
import useFetch from "../hooks/useFetch";
import { ToastContainer } from "react-toastify";

const EditarMascota = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchDataBackend } = useFetch();
    const [mascota, setMascota] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchMascota = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/mascotas/${id}`;
        const storedUser = JSON.parse(localStorage.getItem("auth-token"));
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.state.token}`,
        };
        try {
            const response = await fetchDataBackend(url, null, "GET", headers);
            setMascota(response);
        } catch (error) {
            console.error("Error al obtener mascota:", error);
        } finally {
            setLoading(false);
        }
    };

    const actualizarMascota = async (data) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/mascotas/${id}`;
            const storedUser = JSON.parse(localStorage.getItem("auth-token"));
            const headers = {
                Authorization: `Bearer ${storedUser.state.token}`,
            };

            // Preparar FormData
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                if (key === "imagen" && data.imagen?.[0]) {
                    formData.append("imagen", data.imagen[0]);
                } else {
                    formData.append(key, data[key]);
                }
            });

            const response = await fetchDataBackend(url, formData, "PUT", headers);
            if (response) {
                setTimeout(() => {
                    navigate("/dashboard/listar-mascotas");
                }, 2000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchMascota();
        }
    }, [id]);

    if (loading) {
        return <div>Cargando mascota...</div>;
    }

    if (!mascota) {
        return <div>Mascota no encontrada.</div>;
    }

    return (
        <div>
            <ToastContainer />
            <h1 className='font-black text-4xl text-gray-500'>Editar Mascota</h1>
            <hr className='my-4 border-t-2 border-gray-300' />
            <p className='mb-8'>Este módulo te permite editar los datos de tu mascota.</p>
            <FormMascota mascota={mascota} onSubmit={actualizarMascota} />
        </div>
    );
};

export default EditarMascota;
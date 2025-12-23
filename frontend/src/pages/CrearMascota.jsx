// frontend/src/pages/CrearMascota.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormMascota from "../components/mascotas/FormMascota";
import useFetch from "../hooks/useFetch";
import { ToastContainer } from "react-toastify";

const CrearMascota = () => {
    const navigate = useNavigate();
    const { fetchDataBackend } = useFetch();
    const [loading, setLoading] = useState(false);

    const crearMascota = async (data) => {
        setLoading(true);
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/mascotas`;
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

            const response = await fetchDataBackend(url, formData, "POST", headers);
            if (response) {
                setTimeout(() => {
                    navigate("/dashboard/listar-mascotas");
                }, 2000);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <ToastContainer />
            <h1 className='font-black text-4xl text-gray-500'>Registrar Mascota</h1>
            <hr className='my-4 border-t-2 border-gray-300' />
            <p className='mb-8'>Este módulo te permite registrar una nueva mascota.</p>
            <FormMascota onSubmit={crearMascota} />
        </div>
    );
};

export default CrearMascota;
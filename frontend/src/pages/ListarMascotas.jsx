// frontend/src/pages/ListarMascotas.jsx
import { useEffect, useState } from "react";
import TableMascotas from "../components/mascotas/TableMascotas";
import useFetch from "../hooks/useFetch";
import { ToastContainer } from "react-toastify";
import storeAuth from "../context/storeAuth";
import { Link } from "react-router-dom";

import storeProfile from '../context/storeProfile';

const ListarMascotas = () => {
    const [mascotas, setMascotas] = useState([]);
    const { fetchDataBackend } = useFetch();
    const { rol } = storeAuth();
    const [loading, setLoading] = useState(true);


    const { user } = storeProfile();


    const listMascotas = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/mascotas`;
        const storedUser = JSON.parse(localStorage.getItem("auth-token"));
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.state.token}`,
        };
        try {
            const response = await fetchDataBackend(url, null, "GET", headers);
            setMascotas(response || []);
        } catch (error) {
            console.error("Error al listar mascotas:", error);
        } finally {
            setLoading(false);
        }
    };

    // Función para recargar la lista
    const recargarLista = () => {
        listMascotas();
    };

    useEffect(() => {
        listMascotas();
    }, []);

    if (loading) {
        return <div>Cargando mascotas...</div>;
    }

    return (
        <div>
            <ToastContainer />
            <h1 className='font-black text-4xl text-gray-500'>Mis Mascotas</h1>
            <hr className='my-4 border-t-2 border-gray-300' />
            <p className='mb-8'>Este módulo te permite gestionar tus mascotas.</p>



            <div className="mb-6 flex items-center gap-3 p-4 bg-white rounded-lg ">
                <div className="flex items-center justify-center w-10 h-10 bg-green-100 text-green-700 rounded-full">
                    👤
                </div>
                <div>
                    <p className="text-xs text-gray-400">Cliente:</p>
                    <p className="text-sm font-semibold text-gray-800">
                        {user?.nombre || user?.nombrePropietario}
                    </p>
                </div>


                {/* Botón para registrar mascota */}
            <div className="ml-auto">
                <Link to="/dashboard/crear-mascota" className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700">
                    Registrar Mascota
                </Link>
            </div>


            </div>





            

            <TableMascotas mascotas={mascotas} onEdit={(mascota) => console.log("Editar:", mascota)} onDelete={recargarLista} />
        </div>
    );

};

export default ListarMascotas;
// frontend/src/pages/DetallesMascota.jsx
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useParams, Link } from "react-router-dom";
import storeAuth from "../context/storeAuth";

const DetallesMascota = () => {
    const { id } = useParams();
    const [mascota, setMascota] = useState(null);
    const { fetchDataBackend } = useFetch();
    const { rol } = storeAuth();

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
        }
    };

    useEffect(() => {
        if (id) {
            fetchMascota();
        }
    }, [id]);

    if (!mascota) {
        return <div>Cargando mascota...</div>;
    }

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Detalles de la Mascota</h1>
            <hr className='my-4 border-t-2 border-gray-300' />
            <p className='mb-8'>Este módulo te permite ver los detalles de tu mascota.</p>
            <div className="bg-white p-6 rounded-lg shadow-md">


                {/* {mascota.avatar && (
                    <div className="mb-4 flex justify-center">
                        <img
                            src={mascota.avatar}
                            alt="Avatar de la mascota"
                            className="w-40 h-40 object-cover rounded-full"
                        />
                    </div>
                )} */}



                <div className="flex gap-8">


                <div className="flex-grow space-y-4 ml-3">
                    <div>
                        <label className="block text-sm font-semibold">Nombre</label>
                        <p className="mt-1">{mascota.nombre}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Sociable con otros animales</label>
                        <p className="mt-1">{mascota.tipoPelaje === 'si' ? 'Sí' : 'No'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Características</label>
                        <p className="mt-1">{mascota.caracteristicas}</p>
                    </div>
                    {mascota.fechaNacimiento && (
                        <div>
                            <label className="block text-sm font-semibold">Fecha de Nacimiento</label>
                            <p className="mt-1">{new Date(mascota.fechaNacimiento).toLocaleDateString()}</p>
                        </div>
                    )}



                    {/* --- MOSTRAR LOS NUEVOS CAMPOS --- */}
                    {/* Mostrar Tamaño */}
                    {mascota.tamaño && (
                    <div>
                        <label className="block text-sm font-semibold">Tamaño</label>
                        <p className="mt-1">{mascota.tamaño.charAt(0).toUpperCase() + mascota.tamaño.slice(1)}</p>
                    </div>
                    )}

                    {/* Mostrar Esterilizado */}
                    <div>
                    <label className="block text-sm font-semibold">Esterilizado/a</label>
                    <p className="mt-1">{mascota.esterilizado ? 'Sí' : 'No'}</p>
                    </div>




                    <div>
                        <label className="block text-sm font-semibold">Estado</label>
                        <span className={`px-2 py-1 rounded text-xs ${
                            mascota.estado ? " text-green-600" : " text-red-600"
                        }`}>
                            {mascota.estado ? "Activo" : "Inactivo"}
                        </span>
                    </div>




                    





                </div>



                    {/* Imagen a la DERECHA */}
                    {mascota.avatar && (
                    <div className="flex-shrink-0">
                        <img
                        src={mascota.avatar}
                        alt="Avatar de la mascota"
                        className="w-90 h-90 object-cover rounded-full mr-6"
                        />
                    </div>
                    )}


                    </div>




                <div className="mt-6 flex justify-between">
                    <Link
                        to="/dashboard/listar-mascotas"
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                        Volver a Mis Mascotas
                    </Link>
                    <Link
                        to={`/dashboard/editar-mascota/${id}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mr-4"
                    >
                        Editar Mascota
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DetallesMascota;
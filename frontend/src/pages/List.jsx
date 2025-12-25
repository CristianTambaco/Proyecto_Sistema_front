// frontend/src/pages/List.jsx
import { useEffect, useState } from "react";
import Table from "../components/list/Table";
import storeAuth from "../context/storeAuth";
import { Link } from 'react-router';
import { ToastContainer } from 'react-toastify';
import useFetch from '../hooks/useFetch';

const List = () => {
    const { rol } = storeAuth();
    const [filtroNombreMascota, setFiltroNombreMascota] = useState('');
    const [filtroNombreUsuario, setFiltroNombreUsuario] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('todos'); // 'todos', 'activo', 'inactivo'
    const [clientes, setClientes] = useState([]);
    const [clientesOriginales, setClientesOriginales] = useState([]);

    const { fetchDataBackend } = useFetch(); // Asegúrate de importar useFetch si no lo tienes

    const listClientes = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/clientes`;
        const storedUser = JSON.parse(localStorage.getItem("auth-token"));
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.state.token}`,
        };
        try {
            const response = await fetchDataBackend(url, null, "GET", headers);
            setClientesOriginales(response || []);
            setClientes(response || []);
        } catch (error) {
            console.error("Error al listar clientes:", error);
        }
    };

    useEffect(() => {
        listClientes();
    }, []);

    // Función para aplicar los filtros
    const filtrarClientes = () => {
        if (!clientesOriginales || clientesOriginales.length === 0) return [];

        let resultados = [...clientesOriginales];

        // Filtro por nombre de mascota
        if (filtroNombreMascota.trim() !== '') {
            const term = filtroNombreMascota.toLowerCase();
            resultados = resultados.filter(cliente =>
                cliente.nombreMascota.toLowerCase().includes(term)
            );
        }

        // Filtro por nombre de usuario
        if (filtroNombreUsuario.trim() !== '') {
            const term = filtroNombreUsuario.toLowerCase();
            resultados = resultados.filter(cliente =>
                cliente.nombrePropietario.toLowerCase().includes(term)
            );
        }

        // Filtro por estado
        if (filtroEstado !== 'todos') {
            const estadoBoolean = filtroEstado === 'activo';
            resultados = resultados.filter(cliente => cliente.estadoMascota === estadoBoolean);
        }

        return resultados;
    };

    const clientesFiltrados = filtrarClientes();



    // Definir el título según el rol
    const titulo = rol === "administrador"
        ? "Clientes"
        : rol === "estilista"
        ? "Clientes registrados"
        : rol === "cliente"
        ? "Cliente"
        : "Usuarios";



    return (
        <div>
            
            <h1 className='font-black text-4xl text-gray-500'>{titulo}</h1>
            <hr className='my-4 border-t-2 border-gray-300' />
            {/* Mensaje según el rol */}
            <p className='mb-8'>
                {(() => {
                    if (rol === "administrador") {
                        return "Este módulo te permite gestionar clientes.";
                    } else if (rol === "estilista") {
                        return "Este módulo te permite ver los clientes.";
                    } else if (rol === "cliente") {
                        return "Gestión de información.";
                    } else {
                        return "Este módulo te permite gestionar .";
                    }
                })()}
            </p>

            {/* Botón para registrar cliente - Solo para administrador */}
            {rol === 'administrador' && (
                <div className="mb-4">

                <Link to="/dashboard/crear-cliente" className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 mb-4">
                    Registrar cliente
                </Link>

                </div>
            )}

            
            {/* Controles de filtro */}

            {rol === 'administrador' && (
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Filtro por nombre de mascota */}

                {/* {rol === 'administrador' && (
                <div className="flex-1 max-w-md">
                    <label htmlFor="filtroNombreMascota" className="block text-sm font-semibold mb-2">
                        Filtrar por Nombre de Mascota
                    </label>
                    <input
                        id="filtroNombreMascota"
                        type="text"
                        placeholder="Buscar por nombre de mascota..."
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
                        value={filtroNombreMascota}
                        onChange={(e) => setFiltroNombreMascota(e.target.value)}
                    />
                </div>
                )} */}


                {/* Filtro por nombre de usuario */}

                {rol === 'administrador' && (

                <div className="flex-1 max-w-md">
                    <label htmlFor="filtroNombreUsuario" className="block text-sm font-semibold mb-2">
                        Filtrar por Nombre de Usuario
                    </label>
                    <input
                        id="filtroNombreUsuario"
                        type="text"
                        placeholder="Buscar por nombre de usuario..."
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
                        value={filtroNombreUsuario}
                        onChange={(e) => setFiltroNombreUsuario(e.target.value)}
                    />
                </div>
                )}




                {/* Filtro por estado */}

                {rol === 'administrador' && (
                <div className="max-w-xs">
                    <label htmlFor="filtroEstado" className="block text-sm font-semibold mb-2">
                        Estado
                    </label>
                    <select
                        id="filtroEstado"
                        value={filtroEstado}
                        onChange={(e) => setFiltroEstado(e.target.value)}
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
                    >
                        <option value="todos">Todos</option>
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>
                </div>

                )}


            </div>

            )}

            <Table clientes={clientesFiltrados} />

            <ToastContainer />
        </div>
    );
};

export default List;
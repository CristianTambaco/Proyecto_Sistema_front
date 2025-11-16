import { Link, Outlet, useLocation } from 'react-router';
import storeAuth from '../context/storeAuth';
import storeProfile from '../context/storeProfile';


import { FaUser, FaList, FaPlus, FaComments, FaSignOutAlt, FaClock, FaCut, FaUsers, FaCalendarPlus } from 'react-icons/fa'; // Añadir FaUsers, FaCalendarPlus

const Dashboard = () => {
    const location = useLocation();
    const urlActual = location.pathname;
    const { clearToken, rol } = storeAuth();
    const { user } = storeProfile();

    

    return (
        <div className="flex flex-col h-screen bg-slate-50 text-gray-800">

            {/* Sidebar con color dinámico según rol */}
            <aside
                className={`w-full flex flex-wrap items-center justify-between px-6 py-4 text-slate-200 shadow-md ${
                    rol === 'administrador'
                    ? 'bg-slate-800'
                    : rol === 'estilista'
                    ? 'bg-orange-800'
                    : rol === 'cliente'
                    ? 'bg-green-800'
                    : 'bg-slate-800'
                }`}
            >


                {/* Logo y usuario */}
                <div className="flex items-center gap-4 mb-2 sm:mb-0">
                    <img
                        src="https://img.freepik.com/vector-premium/peluqueria-perros-gatos-simbolo-peluqueria-canina-simbolo-peluqueria-animales_662695-70.jpg"
                        alt="img-client"
                        className="w-12 h-12 border-2 border-sky-300 rounded-full"
                    />
                    <div>
                        <h2 className="text-xl font-extrabold text-sky-300">Módulos</h2>
                        <p className="text-sm text-slate-300">
                            Bienvenido:{' '}
                            <span className="text-white font-semibold">
                                {user?.nombre || user?.nombrePropietario}
                            </span>
                        </p>
                        <p className="text-xs text-sky-300 mt-1">Rol: {user?.rol}</p>
                    </div>
                </div>

                {/* Nav items */}
                <nav>
                    <ul className="flex flex-wrap gap-4 text-md font-medium justify-center">
                        <li>
                            <Link
                                to="/dashboard"
                                className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                    urlActual === '/dashboard'
                                        ? 'bg-sky-500 text-white'
                                        : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                }`}
                            >
                                <FaUser /> Perfil
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/dashboard/listar"
                                className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                    urlActual === '/dashboard/listar'
                                        ? 'bg-sky-500 text-white'
                                        : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                }`}
                            >
                                {/* cliente. titulo*/}
                                <FaList /> Cliente
                            </Link>
                        </li>



                        {/* {(rol === 'administrador') && (
                            <li>
                                <Link
                                    to="/dashboard/crear"
                                    className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                        urlActual === '/dashboard/crear'
                                            ? 'bg-sky-500 text-white'
                                            : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                    }`}
                                >
                                    <FaPlus /> Registrar cliente.
                                </Link>
                            </li>
                        )} */}


                        <li>
                            {/* <Link
                                to="/dashboard/chat"
                                className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                                    urlActual === '/dashboard/chat' ? 'bg-sky-500 text-white' : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                }`}
                            >
                                <FaComments /> Chat
                            </Link> */}
                        </li>


                        
                        {/* Nueva condición para mostrar enlaces de horarios solo al administrador */}
                        {rol === 'administrador' && (
                        <>
                            <li>
                            <Link
                                to="/dashboard/horarios"
                                className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                urlActual === '/dashboard/horarios'
                                    ? 'bg-sky-500 text-white'
                                    : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                }`}
                            >
                                <FaClock /> Horarios
                            </Link>
                            </li>


                            {/* <li>
                            <Link
                                to="/dashboard/horarios/crear"
                                className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                urlActual === '/dashboard/horarios/crear'
                                    ? 'bg-sky-500 text-white'
                                    : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                }`}
                            >
                                <FaPlus /> Crear Horario
                            </Link>
                            </li> */}

                        </>
                        )}




                        {/* Nueva condición para mostrar enlaces de servicios solo al administrador */}
                        {rol === 'administrador' && (
                        <>
                            <li>
                            <Link
                                to="/dashboard/servicios"
                                className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                urlActual === '/dashboard/servicios'
                                    ? 'bg-sky-500 text-white'
                                    : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                }`}
                            >
                                <FaCut /> Servicios
                            </Link>
                            </li>


                            {/* <li>
                            <Link
                                to="/dashboard/servicios/crear"
                                className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                urlActual === '/dashboard/servicios/crear'
                                    ? 'bg-sky-500 text-white'
                                    : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                }`}
                            >
                                <FaPlus /> Crear Servicio
                            </Link>
                            </li> */}



                        </>
                        )}



                        {/* Nueva condición para mostrar enlaces de usuarios solo al administrador */}
                        {rol === 'administrador' && (
                        <>
                            <li>
                            <Link
                                to="/dashboard/usuarios"
                                className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                urlActual === '/dashboard/usuarios'
                                    ? 'bg-sky-500 text-white'
                                    : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                }`}
                            >
                                <FaUsers /> Usuarios
                            </Link>
                            </li>


                            {/* <li>
                            <Link
                                to="/dashboard/crear-usuario/estilista"
                                className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                urlActual === '/dashboard/crear-usuario/estilista'
                                    ? 'bg-sky-500 text-white'
                                    : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                }`}
                            >
                                <FaPlus /> Crear Estilista
                            </Link>
                            </li> */}


                            {/* Opcional: Enlace para crear administrador */}
                            {/* <li>
                            <Link
                                to="/dashboard/crear-usuario/administrador"
                                className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                urlActual === '/dashboard/crear-usuario/administrador'
                                    ? 'bg-sky-500 text-white'
                                    : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                }`}
                            >
                                <FaPlus /> Crear Admin
                            </Link>
                            </li> */}
                        </>
                        )}





                        {/* Nueva condición para mostrar enlaces de servicios al cliente y administrador */}
                        {(rol === 'cliente' ) && ( // Ajusta los roles según necesites
                        <>
                            <li>
                            <Link
                                to="/dashboard/servicios-cliente"
                                className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                urlActual === '/dashboard/servicios-cliente'
                                    ? 'bg-sky-500 text-white'
                                    : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                }`}
                            >
                                <FaCut /> Servicios
                            </Link>
                            </li>
                            {/* Agrega el enlace para reservar servicios */}
                            <li>
                            <Link
                                to="/dashboard/reservar-servicio"
                                className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                urlActual === '/dashboard/reservar-servicio'
                                    ? 'bg-sky-500 text-white'
                                    : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                }`}
                            >
                                <FaCalendarPlus /> Reservar
                            </Link>
                            </li>
                        </>
                        )}





                    </ul>
                </nav>




                {/* Botón salir */}
                <div className="flex items-center gap-3 mt-3 sm:mt-0">

                    {/* <img
                        src="https://cdn-icons-png.freepik.com/512/1177/1177568.png"
                        alt="img-client"
                        className="w-10 h-10 border-2 border-white rounded-full"
                    /> */}


                    <button
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                        onClick={clearToken}
                    >
                        <FaSignOutAlt /> Salir
                    </button>
                </div>


            </aside>


            {/* Contenido principal */}
            <div className="flex-1 flex flex-col">
                <main className="flex-1 overflow-y-auto px-6 py-4 bg-slate-50">
                    <Outlet />
                </main>

                <footer className="bg-white border-t border-gray-200 py-3 text-center text-sm text-gray-500">
                    © Todos los derechos reservados
                </footer>
            </div>
        </div>
    );
};

export default Dashboard;

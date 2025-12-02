import { Link, Outlet, useLocation } from 'react-router-dom';
import storeAuth from '../context/storeAuth';
import storeProfile from '../context/storeProfile';

import { useEffect, useState } from "react"




import { FaUser, FaList, FaHome, FaPlus, FaComments, FaSignOutAlt, FaClock, FaCut, FaUsers, FaCalendarPlus, FaHistory, FaRegClock, FaDog, FaRegClipboard, FaCalendarAlt, FaTachometerAlt } from 'react-icons/fa'; // Añadir FaUsers, FaCalendarPlus

const Dashboard = () => {
    const location = useLocation();
    const urlActual = location.pathname;
    const { clearToken, rol } = storeAuth();
    const { user } = storeProfile();

    const [isMenuOpen, setIsMenuOpen] = useState(false);


    // Mostrar el botón SOLO si estás dentro de /dashboard/... (pero NO en /dashboard)
    const showDashboardButton = location.pathname.startsWith('/dashboard/') && location.pathname !== '/dashboard';

    const isInsideDashboard = location.pathname.startsWith('/dashboard/') && location.pathname !== '/dashboard';

    

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

                {/* <div className="flex items-center gap-4 mb-2 sm:mb-0">
                    <img
                        src="https://img.freepik.com/vector-premium/peluqueria-perros-gatos-simbolo-peluqueria-canina-simbolo-peluqueria-animales_662695-70.jpg"
                        alt="img-client"
                        className="w-12 h-12 border-2 border-sky-300 rounded-full"
                    />
                    <div>
                        <h2 className="text-xl font-extrabold text-sky-300">EstéticaCanina</h2>
                        <p className="text-sm text-slate-300">
                            Bienvenido:{' '}
                            <span className="text-white font-semibold">
                                {user?.nombre || user?.nombrePropietario}
                            </span>
                        </p>
                        <p className="text-xs text-sky-300 mt-1">Rol: {user?.rol}</p>
                    </div>
                </div> */}





                {/* Logo y usuario */}
                <div className="flex items-center gap-4 mb-2 sm:mb-0">
                    <img
                        src="https://img.freepik.com/vector-premium/peluqueria-perros-gatos-simbolo-peluqueria-canina-simbolo-peluqueria-animales_662695-70.jpg"
                        alt="img-client"
                        className="w-12 h-12 border-2 border-sky-300 rounded-full"
                    />
                    <div>

                        {/* <h2 className="text-xl font-extrabold text-sky-300">EstéticaCanina</h2> */}

                        <Link to="/" className="text-xl font-extrabold text-sky-300 hover:text-sky-100">
                            EstéticaCanina
                        </Link>





                        {/* <p className="text-sm text-slate-300">
                            Bienvenido:{' '}
                            <span className="text-white font-semibold">
                                {user?.nombre || user?.nombrePropietario}
                            </span>
                        </p>
                        <p className="text-xs text-sky-300 mt-1">Rol: {user?.rol}</p> */}



                    </div>
                </div>






                

                {/* Nav items */}

                
                <nav>
                    <ul className="flex flex-wrap gap-4 text-md font-medium justify-center">




                        {/* <li>
                            <Link
                                to="/" 
                                className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                    urlActual === '/' 
                                        ? 'bg-sky-500 text-white'
                                        : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                }`}
                                
                            >
                                <FaHome />Página principal
                            </Link>
                        </li> */}






                        {showDashboardButton && (
                        <li>
                            <Link
                            to="/dashboard"
                            className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                urlActual === '/dashboard'
                                ? 'bg-sky-500 text-white'
                                : 'hover:bg-sky-400 hover:text-white text-slate-300'
                            }`}
                            >
                            <FaTachometerAlt /> Dashboard
                            </Link>
                        </li>
                        )}


                        {/* <li>
                            <Link
                                to="/dashboard/perfil"
                                className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                    urlActual === '/dashboard/perfil'
                                        ? 'bg-sky-500 text-white'
                                        : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                }`}
                            >
                                <FaUser /> Perfil
                            </Link>
                        </li> */}
                        

                        {showDashboardButton && (
                        <li>
                            <Link
                                to="/dashboard/listar"
                                className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                    urlActual === '/dashboard/listar'
                                        ? 'bg-sky-500 text-white'
                                        : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                }`}
                            >
                                
                                <FaList /> Cliente
                            </Link>
                        </li>
                        )}


                        
                        {/* {rol === 'administrador' && isInsideDashboard && (
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
                        {rol === 'administrador' && isInsideDashboard && (
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





                        {/* Enlace para horarios - Solo para cliente y opcionalmente admin */}
                        {(rol === 'cliente' ) && isInsideDashboard && ( // Ajusta los roles según se necesite
                        <>

                            <li>
                            <Link
                                to="/dashboard/horarios-cliente" // <-- Nueva ruta
                                className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                urlActual === '/dashboard/horarios-cliente' // <-- Ajustar condición de activo
                                    ? 'bg-sky-500 text-white'
                                    : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                }`}
                            >
                                <FaRegClock /> Horarios 
                            </Link>
                            </li>


                        </>
                        )}




                        {/* Nueva condición para mostrar enlaces de servicios solo al administrador */}
                        {rol === 'administrador' && isInsideDashboard && (
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
                        {rol === 'administrador' && isInsideDashboard && (
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
                        {(rol === 'cliente' ) && isInsideDashboard && ( // Ajusta los roles según necesites
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



                        {rol === 'cliente' && isInsideDashboard && (
                        <>

                            <li>
                            <Link
                                to="/dashboard/historial"
                                className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                urlActual === '/dashboard/historial'
                                    ? 'bg-sky-500 text-white'
                                    : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                }`}
                            >
                                <FaHistory /> Historial
                            </Link>
                            </li>

                        </>
                        )}


                        {/* Nueva condición para mostrar enlaces de usuarios solo al administrador */}
                        
                        {/* {rol === 'administrador' && (
                        <>
                            
                            <li>
                            <Link
                                to="/dashboard/crear-cliente"
                                className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                urlActual === '/dashboard/crear-cliente'
                                    ? 'bg-sky-500 text-white'
                                    : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                }`}
                            >
                                <FaPlus /> Crear Cliente,,
                            </Link>
                            </li>
                        </>
                        )} */}



                        {/* {rol === 'estilista' && (
                        <li>
                            <Link
                            to="/dashboard/mis-clientes"
                            className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                urlActual === '/dashboard/mis-clientes'
                                ? 'bg-sky-500 text-white'
                                : 'hover:bg-sky-400 hover:text-white text-slate-300'
                            }`}
                            >
                            <FaDog /> Mis Clientes
                            </Link>
                        </li>
                        )} */}


                        



                        {rol === 'estilista' && isInsideDashboard && (


                            <li>

                                <Link
                                    to="/dashboard/agenda-citas"
                                    className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                        urlActual === '/dashboard/agenda-citas'
                                            ? 'bg-sky-500 text-white'
                                            : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                    }`}
                                >
                                    <FaCalendarAlt /> Agenda de Citas
                                </Link>

                            </li>
                            
                        )}
                        




                        {rol === 'estilista' && isInsideDashboard && (
                            <>


                                <li>
                                    <Link
                                        to="/dashboard/historial-general"
                                        className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                            urlActual === '/dashboard/historial-general'
                                                ? 'bg-sky-500 text-white'
                                                : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                        }`}
                                    >
                                        <FaHistory /> Historial General
                                    </Link>
                                </li>
                                
                            </>
                        )}





                        



                        {rol === 'estilista' && isInsideDashboard && (
                        <>                            

                            <li>
                            <Link
                                to="/dashboard/registrar-trabajo"
                                className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                urlActual === '/dashboard/registrar-trabajo' 
                                    ? 'bg-sky-500 text-white'
                                    : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                }`}
                            >
                                <FaRegClipboard /> Registrar Trabajo 
                            </Link>
                            </li>


                        </>
                        )}



                        {(rol === 'estilista' || rol === 'administrador' ) && isInsideDashboard && (

                        <li>

                            {/* <Link
                            to="/dashboard/historial-trabajos"
                            className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                urlActual === '/dashboard/historial-trabajos'
                                ? 'bg-sky-500 text-white'
                                : 'hover:bg-sky-400 hover:text-white text-slate-300'
                            }`}
                            >
                            <FaHistory /> Historial Trabajos
                            </Link> */}

                        </li>
                        
                        )}



                        





                    </ul>
                </nav>




                {/* Botón salir */}
                <div className="flex items-center gap-3 mt-3 sm:mt-0">
    {/* Avatar y menú desplegable */}
    <div className="relative">
        <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}            

            
            className={`flex items-center gap-2 bg-gray-800 text-white px-3 py-1 rounded-md  ${
                    rol === 'administrador'
                    ? 'bg-slate-800'
                    : rol === 'estilista'
                    ? 'bg-orange-800'
                    : rol === 'cliente'
                    ? 'bg-green-800'
                    : 'bg-slate-800'
                }`}

        >
            <img
                src="https://cdn-icons-png.freepik.com/512/1177/1177568.png"
                alt="img-client"
                className="w-8 h-8 border-2 border-white rounded-full"
            />
            <span className="text-sm">{user?.nombre || user?.nombrePropietario}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        </button>
        {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <Link
                    to="/dashboard/perfil"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Ver perfil
                </Link>


                {/* Mostrar "Editar perfil" solo si el rol NO es 'cliente' */}
                {rol !== 'cliente' && (
                    <Link
                        to="/dashboard/editar-perfil"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Editar perfil
                    </Link>
                )}




                {rol == 'cliente' && (
                    <Link
                        to="/dashboard/listar"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Actualizar información
                    </Link>
                )}


                <Link
                    to="/dashboard/cambiar-contraseña"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Cambiar contraseña
                </Link>
                <hr className="my-1" />
                <button
                    onClick={() => {
                        clearToken();
                        setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                    Cerrar sesión
                </button>
            </div>
        )}
    </div>
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

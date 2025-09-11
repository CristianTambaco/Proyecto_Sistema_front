import { Link, Outlet, useLocation } from 'react-router';
import storeAuth from '../context/storeAuth';
import storeProfile from '../context/storeProfile';
import { FaUser, FaList, FaPlus, FaComments, FaSignOutAlt } from 'react-icons/fa';

const Dashboard = () => {
    const location = useLocation();
    const urlActual = location.pathname;
    const { clearToken, rol } = storeAuth();
    const { user } = storeProfile();

    return (
        <div className="flex h-screen bg-slate-50 text-gray-800">

            {/* Sidebar */}
            <aside className="w-64 bg-slate-800 text-slate-200 flex flex-col px-4 py-6">
                {/* Logo y usuario */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-extrabold text-sky-300">Módulos</h2>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png"
                        alt="img-client"
                        className="mx-auto mt-4 p-1 border-2 border-sky-300 rounded-full"
                        width={90}
                        height={90}
                    />
                    <p className="mt-3 text-sm text-slate-300">
                        Bienvenido: <span className="text-white font-semibold">{user?.nombre || user?.nombrePropietario}</span>
                    </p>
                    <p className="text-xs text-sky-300 mt-1">Rol: {user?.rol}</p>
                </div>

                {/* Nav items */}
                <nav className="flex-1">
                    <ul className="space-y-2 text-md font-medium">
                        <li>
                            <Link
                                to="/dashboard"
                                className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                                    urlActual === '/dashboard' ? 'bg-sky-500 text-white' : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                }`}
                            >
                                <FaUser /> Perfil
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/listar"
                                className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                                    urlActual === '/dashboard/listar' ? 'bg-sky-500 text-white' : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                }`}
                            >
                                <FaList /> Listar
                            </Link>
                        </li>
                        {rol === 'veterinario' && (
                            <li>
                                <Link
                                    to="/dashboard/crear"
                                    className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                                        urlActual === '/dashboard/crear' ? 'bg-sky-500 text-white' : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                    }`}
                                >
                                    <FaPlus /> Crear
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link
                                to="/dashboard/chat"
                                className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                                    urlActual === '/dashboard/chat' ? 'bg-sky-500 text-white' : 'hover:bg-sky-400 hover:text-white text-slate-300'
                                }`}
                            >
                                <FaComments /> Chat
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>


            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">

                {/* Header */}
                <header className="bg-sky-500 h-16 flex items-center justify-between px-6 shadow-md">
                    <div className="text-white font-semibold text-lg">
                        Usuario - {user?.nombre || user?.nombrePropietario}
                    </div>
                    <div className="flex items-center gap-4">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png"
                            alt="img-client"
                            className="w-10 h-10 border-2 border-white rounded-full"
                        />
                        <button
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                            onClick={clearToken}
                        >
                            <FaSignOutAlt /> Salir
                        </button>
                    </div>
                </header>


                {/* Outlet Content */}
                <main className="flex-1 overflow-y-auto px-6 py-4 bg-slate-50">
                    <Outlet />
                </main>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-200 py-3 text-center text-sm text-gray-500">
                    © Todos los derechos reservados
                </footer>
            </div>
        </div>
    );
};

export default Dashboard;

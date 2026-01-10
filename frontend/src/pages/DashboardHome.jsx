// src/pages/DashboardHome.jsx
import { Link } from 'react-router-dom';
import { FaList, FaClipboard, FaUsers, FaChartLine, FaCalendarAlt, FaUserCog, FaClock, FaHistory, FaCut, FaBook, FaUserAlt, FaDog } from 'react-icons/fa';
import storeAuth from '../context/storeAuth'; // <-- Importar storeAuth

const DashboardHome = () => {
  const { rol: userRole } = storeAuth(); // <-- Obtener el rol real del usuario

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Bienvenido a EstéticaCanina</h1>
      <p className="mb-8 text-gray-600">Selecciona un módulo para comenzar.</p>

     
    {/* <Link
    to="/dashboard/perfil"
    className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
    >
    Perfil
    </Link> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Clientes - visible para todos los roles */}

        {userRole === 'administrador' && (
        <Link
          to="/dashboard/listar"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center justify-center h-40"
        >
          <FaUsers className="text-4xl text-blue-600 mb-3" />
          <span className="text-center text-sm font-medium text-gray-700">Gestión Clientes</span>
        </Link>
        )}




        {/* {userRole === 'cliente' && (
        <Link
          to="/dashboard/listar"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center justify-center h-40"
        >
          <FaUserAlt className="text-4xl text-blue-600 mb-3" />
          <span className="text-center text-sm font-medium text-gray-700">Cliente</span>
        </Link>
        )} */}





        {userRole === 'cliente' && (
        <Link
          to="/dashboard/listar-mascotas"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center justify-center h-40"
        >
          <FaDog className="text-4xl text-blue-600 mb-3" />
          <span className="text-center text-sm font-medium text-gray-700">Mascotas</span>
        </Link>
        )}





        {userRole === 'estilista' && (
        <Link
          to="/dashboard/listar"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center justify-center h-40"
        >
          <FaUsers className="text-4xl text-blue-600 mb-3" />
          <span className="text-center text-sm font-medium text-gray-700">Clientes registrados</span>
        </Link>
        )}




        {/* Horarios - solo administrador */}
        {userRole === 'administrador' && (
          <Link
            to="/dashboard/horarios"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center justify-center h-40"
          >
            <FaClock className="text-4xl text-green-600 mb-3" />
            <span className="text-center text-sm font-medium text-gray-700">Gestión Horarios</span>
          </Link>
        )}

        {/* Servicios - solo administrador */}
        {userRole === 'administrador' && (
          <Link
            to="/dashboard/servicios"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center justify-center h-40"
          >
            <FaList className="text-4xl text-purple-600 mb-3" />
            <span className="text-center text-sm font-medium text-gray-700">Gestión Servicios</span>
          </Link>
        )}



        {/* Usuarios - estilista y administrador */}
        {(userRole === 'administrador') && (
          <Link
            to="/dashboard/usuarios"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center justify-center h-40"
          >
            <FaUserCog className="text-4xl text-cyan-600 mb-3" />
            <span className="text-center text-sm font-medium text-gray-700">Gestión Estilistas y administradores</span>
          </Link>
        )}



        {userRole === 'estilista' && (
          <Link
            to="/dashboard/agenda-citas"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center justify-center h-40"
          >
            <FaCalendarAlt className="text-4xl text-cyan-600 mb-3" />
            <span className="text-center text-sm font-medium text-gray-700">Agenda de Citas</span>
          </Link>
        )}





        {userRole === 'estilista' && (
          <Link
            to="/dashboard/historial-general"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center justify-center h-40"
          >
            <FaHistory className="text-4xl text-green-800 mb-3" />
            <span className="text-center text-sm font-medium text-gray-700">Historial General</span>
          </Link>
        )}        

        

        {/* Registrar Trabajo - solo estilista */}
        {/* {userRole === 'estilista' && (
          <Link
            to="/dashboard/registrar-trabajo"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center justify-center h-40"
          >
            <FaCut className="text-4xl text-red-600 mb-3" />
            <span className="text-center text-sm font-medium text-gray-700">Registrar Trabajo</span>
          </Link>
        )} */}




        {/* Horarios de atención - cliente */}
        {(userRole === 'cliente') && (
          <Link
            to="/dashboard/horarios-cliente"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center justify-center h-40"
          >
            <FaClock className="text-4xl text-emerald-600 mb-3" />
            <span className="text-center text-sm font-medium text-gray-700">Horarios de Atención</span>
          </Link>
        )}





        {/* Servicios disponibles - solo cliente */}
        {userRole === 'cliente' && (
          <Link
            to="/dashboard/servicios-cliente"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center justify-center h-40"
          >
            <FaList className="text-4xl text-indigo-600 mb-3" />
            <span className="text-center text-sm font-medium text-gray-700">Servicios Disponibles</span>
          </Link>
        )}

        {/* Reservar Servicio - solo cliente */}
        {userRole === 'cliente' && (
          <Link
            to="/dashboard/reservar-servicio"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center justify-center h-40"
          >
            <FaCalendarAlt className="text-4xl text-amber-600 mb-3" />
            <span className="text-center text-sm font-medium text-gray-700">Reservar Servicio</span>
          </Link>
        )}

        {/* Historial de Atenciones - solo cliente */}
        {userRole === 'cliente' && (
          <Link
            to="/dashboard/historial"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center justify-center h-40"
          >
            <FaHistory className="text-4xl text-cyan-600 mb-3" />
            <span className="text-center text-sm font-medium text-gray-700">Historial de Atenciones</span>
          </Link>
        )}





        {/* Historial de Trabajos - estilista y administrador */}

        {(userRole === 'estilista' ) && (
          <Link
            to="/dashboard/historial-trabajos"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center justify-center h-40"
          >
            <FaBook className="text-4xl text-orange-600 mb-3" />
            <span className="text-center text-sm font-medium text-gray-700">Historial</span>
          </Link>
        )}



        




      </div>
    </div>
  );
};

export default DashboardHome;
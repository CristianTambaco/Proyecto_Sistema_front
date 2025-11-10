// frontend/src/pages/ListUsuarios.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { ToastContainer } from 'react-toastify';
import storeAuth from '../context/storeAuth';

const ListUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [tipoUsuario, setTipoUsuario] = useState('estilista'); // 'estilista' o 'administrador'
  const { fetchDataBackend } = useFetch();
  const { rol } = storeAuth();

  const listUsuarios = async () => {
    if (rol !== 'administrador') return; // Solo admin puede acceder
    let url = '';
    if (tipoUsuario === 'estilista') {
      url = `${import.meta.env.VITE_BACKEND_URL}/estilistas`;
    } else if (tipoUsuario === 'administrador') {
      url = `${import.meta.env.VITE_BACKEND_URL}/administradores`;
    }
    if (!url) return;

    const storedUser = JSON.parse(localStorage.getItem("auth-token"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedUser.state.token}`,
    };
    try {
      const response = await fetchDataBackend(url, null, "GET", headers);
      setUsuarios(response || []);
    } catch (error) {
      console.error(`Error al listar ${tipoUsuario === 'estilista' ? 'estilistas' : 'administradores'}:`, error);
    }
  };

  useEffect(() => {
    listUsuarios();
  }, [tipoUsuario]);

  if (rol !== 'administrador') {
    return <div>Acceso denegado. Solo administradores pueden gestionar usuarios.</div>;
  }

  if (usuarios.length === 0) {
    return (
      <div>
        <h1 className='font-black text-4xl text-gray-500'>Gestión de Usuarios</h1>
        <hr className='my-4 border-t-2 border-gray-300' />
        <div className="flex mb-4">
          <button
            className={`px-4 py-2 mr-2 rounded-lg ${tipoUsuario === 'estilista' ? 'bg-slate-800 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setTipoUsuario('estilista')}
          >
            Estilistas
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${tipoUsuario === 'administrador' ? 'bg-slate-800 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setTipoUsuario('administrador')}
          >
            Administradores
          </button>
        </div>
        <p className='mb-8'>Este módulo te permite gestionar usuarios del sistema.</p>
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">No existen {tipoUsuario === 'estilista' ? 'estilistas' : 'administradores'} registrados.</span>
        </div>
        <Link to={`/dashboard/crear-usuario/${tipoUsuario}`} className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700">
          Crear {tipoUsuario === 'estilista' ? 'Estilista' : 'Administrador'}
        </Link>
      </div>
    );
  }


  const eliminarUsuario = async (id, tipoUsuario) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar (desactivar) este ${tipoUsuario}?`)) {
      return; // Si el usuario cancela, no hace nada
    }

    let url = '';
    if (tipoUsuario === 'estilista') {
      url = `${import.meta.env.VITE_BACKEND_URL}/estilista/${id}`;
    } else if (tipoUsuario === 'administrador') {
      url = `${import.meta.env.VITE_BACKEND_URL}/administrador/${id}`;
    }
    if (!url) return;

    const storedUser = JSON.parse(localStorage.getItem("auth-token"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedUser.state.token}`,
    };
    try {
      const response = await fetchDataBackend(url, undefined, "DELETE", headers); // Usar undefined como data
      if (response) { // Si la eliminación lógica fue exitosa
        listUsuarios(); // Refresca la lista
      }
    } catch (error) {
      console.error(`Error al eliminar ${tipoUsuario}:`, error);
      // fetchDataBackend ya maneja el toast de error
    }
  };

  return (
    <div>
      <ToastContainer />
      <h1 className='font-black text-4xl text-gray-500'>Gestión de Usuarios</h1>
      <hr className='my-4 border-t-2 border-gray-300' />
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded-lg ${tipoUsuario === 'estilista' ? 'bg-slate-800 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setTipoUsuario('estilista')}
        >
          Estilistas
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${tipoUsuario === 'administrador' ? 'bg-slate-800 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setTipoUsuario('administrador')}
        >
          Administradores
        </button>
      </div>
      <p className='mb-8'>Este módulo te permite gestionar usuarios del sistema.</p>
      <Link to={`/dashboard/crear-usuario/${tipoUsuario}`} className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 mb-4">
        Crear {tipoUsuario === 'estilista' ? 'Estilista' : 'Administrador'}
      </Link>
      <table className="w-full mt-5 table-auto shadow-lg bg-white">
        <thead className="bg-gray-800 text-slate-400">
          <tr>
            {["Nombre", "Apellido", "Email", "Teléfono", "Dirección", "Acciones"].map((header) => (
              <th key={header} className="p-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr className="hover:bg-gray-300 text-center" key={usuario._id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.email}</td>
              <td>{usuario.celular || 'N/A'}</td>
              <td>{usuario.direccion || 'N/A'}</td>
              <td className='py-2 text-center'>
                <Link
                  to={`/dashboard/actualizar-usuario/${tipoUsuario}/${usuario._id}`}
                  className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 hover:text-blue-600"
                  title="Actualizar"
                >
                  ✏️ {/* Puedes usar un icono real */}
                </Link>

                {/* Botón de eliminar (lógico) */}

                {/* <button
                  onClick={() => eliminarUsuario(usuario._id, tipoUsuario)}
                  className="h-7 w-7 text-red-900 cursor-pointer inline-block hover:text-red-600 ml-2"
                  title={`Eliminar (Desactivar) ${tipoUsuario}`}
                >
                  🗑️ 
                </button> */}
                

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUsuarios;
// frontend/src/pages/Perfil.jsx
import { useEffect, useState } from 'react';
import storeProfile from '../context/storeProfile';
import { ToastContainer } from 'react-toastify';

const Perfil = () => {
  const { user, profile } = storeProfile();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      await profile();
      setLoading(false);
    };
    loadProfile();
  }, []);

  if (loading) {
    return <div>Cargando perfil...</div>;
  }

  if (!user) {
    return <div>Error al cargar el perfil.</div>;
  }

  // Determinar qué tipo de usuario es para mostrar los campos correctos
  const isCliente = user.rol === 'cliente';
  const isEstilistaOAdmin = user.rol === 'estilista' || user.rol === 'administrador';

  return (
    <div>
      <ToastContainer />
      <h1 className='font-black text-4xl text-gray-500'>Perfil</h1>
      <hr className='my-4 border-t-2 border-gray-300' />
      <p className='mb-8'>Este módulo muestra el perfil del usuario.</p>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 md:col-span-2 max-w-xl mx-auto">


        {/* Información del usuario */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Información Personal</h2>
          {isCliente ? (
            <>

              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://cdn-icons-png.freepik.com/512/1177/1177568.png"
                  alt="img-client"
                  className="w-16 h-16 border-2 border-gray-300 rounded-full"
                />
                <div>
                  <p className="font-bold">{user.nombre || user.nombrePropietario}</p>
                  <p className="text-gray-600">Rol: {user.rol}</p>
                </div>
              </div>


              <div className="mb-4">
                <label className="block text-sm font-semibold">Nombre</label>
                <p className="mt-1">{user.nombrePropietario}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Cédula</label>
                <p className="mt-1">{user.cedulaPropietario}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Correo electrónico</label>
                <p className="mt-1">{user.emailPropietario}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Teléfono</label>
                <p className="mt-1">{user.celularPropietario}</p>
              </div>
              {/* <div className="mb-4">
                <label className="block text-sm font-semibold">Mascota</label>
                <p className="mt-1">{user.nombreMascota}</p>
              </div> */}
              

            </>
          ) : (
            <>


              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://cdn-icons-png.freepik.com/512/1177/1177568.png"
                  alt="img-client"
                  className="w-16 h-16 border-2 border-gray-300 rounded-full"
                />
                <div>
                  <p className="font-bold">{user.nombre || user.nombrePropietario}</p>
                  <p className="text-gray-600">Rol: {user.rol}</p>
                </div>
              </div>



              <div className="mb-4">
                <label className="block text-sm font-semibold">Nombre</label>
                <p className="mt-1">{user.nombre}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Apellido</label>
                <p className="mt-1">{user.apellido}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Dirección</label>
                <p className="mt-1">{user.direccion}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Teléfono</label>
                <p className="mt-1">{user.celular}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Correo electrónico</label>
                <p className="mt-1">{user.email}</p>
              </div>
            </>
          )}
        </div>

        {/* Resumen / Tarjeta de perfil */}

        {/* <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Resumen</h2>
          <div className="flex items-center gap-4 mb-4">
            <img
              src="https://cdn-icons-png.freepik.com/512/1177/1177568.png"
              alt="img-client"
              className="w-16 h-16 border-2 border-gray-300 rounded-full"
            />
            <div>
              <p className="font-bold">{user.nombre || user.nombrePropietario}</p>
              <p className="text-gray-600">Rol: {user.rol}</p>
            </div>
          </div>
          <div className="space-y-2">
            <p><strong>Nombre:</strong> {user.nombre || user.nombrePropietario}</p>
            <p><strong>Correo:</strong> {user.email || user.emailPropietario}</p>
            <p><strong>Teléfono:</strong> {user.celular || user.celularPropietario}</p>
            {isCliente && (
              <p><strong>Mascota:</strong> {user.nombreMascota}</p>
            )}
          </div>
        </div> */}



      </div>
    </div>
  );
};

export default Perfil;
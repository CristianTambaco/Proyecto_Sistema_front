// frontend/src/pages/Update.jsx
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import useFetch from "../hooks/useFetch"
import { Form } from "../components/create/Form"
import storeAuth from "../context/storeAuth" // <-- Importar storeAuth
import { ToastContainer } from 'react-toastify'
import storeProfile from '../context/storeProfile' // <-- Importar storeProfile

const Update = () => {
  const { id } = useParams()
  const [patient, setPatient] = useState({})
  const { fetchDataBackend } = useFetch()
  const { rol } = storeAuth() // <-- Obtener el rol
  const { user } = storeProfile() // <-- Opcional: obtener el usuario logueado

  const searchPatient = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/clienteac/${id}`
    const storedUser = JSON.parse(localStorage.getItem("auth-token"))
    const headers= {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedUser.state.token}`
    }
    const response = await fetchDataBackend(url, null, "GET", headers)
    setPatient(response || {})
  }

  useEffect(() => {
    if(id) {
      searchPatient()
    }
  }, [id])

  // Función para actualizar la contraseña (solo para administrador)
  // Reemplaza la función updatePassword con esta versión:
const updatePassword = async (data) => {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/actualizarpassword-admin/${id}`; // <-- NUEVA RUTA
    const storedUser = JSON.parse(localStorage.getItem("auth-token"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedUser.state.token}`,
    };
    const response = await fetchDataBackend(url, { passwordnuevo: data.passwordnuevo }, "PUT", headers);
    if (response) {
      // toast.success("Contraseña actualizada correctamente.");
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div>
      <ToastContainer />
      <h1 className='font-black text-4xl text-gray-500'>Actualizar</h1>
      <hr className='my-4 border-t-2 border-gray-300' />
      <p className='mb-8'>Este módulo te permite actualizar la información</p>

      {Object.keys(patient).length != 0 ?
        (
          <>
            {/* Mostrar el formulario de actualización de datos */}
            <Form patient={patient} />

            {/* Si el rol es administrador, mostrar un formulario adicional para cambiar contraseña */}
            {rol === 'administrador' && (
              <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Cambiar Contraseña</h2>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  updatePassword({
                    passwordactual: e.target.passwordactual.value,
                    passwordnuevo: e.target.passwordnuevo.value
                  });
                  setPasswordNueva(""); // limpia el campo
                }}>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Nueva Contraseña</label>
                    <input
                      type="password"
                      name="passwordnuevo"
                      placeholder="Ingrese la nueva contraseña"
                      className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 w-full p-2 mt-5 text-slate-300 uppercase font-bold rounded-lg hover:bg-blue-700 cursor-pointer transition-all"
                  >
                    Actualizar Contraseña
                  </button>
                </form>
              </div>
            )}
          </>
        )
        :
        (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {/* <span className="font-medium">No existen registros </span> */}
          </div>
        )
      }
    </div>
  )
}

export default Update
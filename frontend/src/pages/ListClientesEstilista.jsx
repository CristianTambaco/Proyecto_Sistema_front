// frontend/src/pages/ListClientesEstilista.jsx
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Table from "../components/list/Table"; // Reutilizamos la tabla existente
import storeAuth from "../context/storeAuth";
import { ToastContainer } from "react-toastify";
import ModalTreatments from "../components/treatments/Modal";

const ListClientesEstilista = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchDataBackend } = useFetch();
  const { rol, token } = storeAuth();
  const { modal, toggleModal } = storeAuth(); // <-- Importar toggleModal desde storeAuth
  const [selectedClienteId, setSelectedClienteId] = useState(null); // <-- Estado local para el cliente seleccionado

  // Función segura para obtener el ID del estilista desde el token
  const getEstilistaIdFromToken = () => {
    if (!token) return null;
    try {
      // Decodificar el token JWT
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      // Verificar que el payload tenga el campo 'id'
      if (tokenPayload && typeof tokenPayload.id === 'string') {
        return tokenPayload.id;
      }
    } catch (error) {
      console.error("Error decodificando token:", error);
      // No lanzar un error, simplemente devolver null
    }
    return null;
  };

  const listClientes = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/clientes`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetchDataBackend(url, null, "GET", headers);
      const estilistaId = getEstilistaIdFromToken();
      // Filtrar solo los clientes asignados al estilista actual
      const clientesFiltrados = response?.filter(
        (cliente) => cliente.estilista?._id === estilistaId
      ) || [];
      setClientes(clientesFiltrados);
    } catch (error) {
      console.error("Error al listar clientes:", error);
      // fetchDataBackend ya maneja el toast de error, así que no hacemos nada aquí
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listClientes();
  }, [token]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando clientes...</div>;
  }

  if (clientes.length === 0) {
    return (
      <div className="p-6">
        <h1 className='font-black text-4xl text-gray-500'>Mis Clientes</h1>
        <hr className='my-4 border-t-2 border-gray-300' />
        <p className='mb-8'>Este módulo te permite gestionar los clientes asignados a ti.</p>
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">No tienes clientes asignados.</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <h1 className='font-black text-4xl text-gray-500'>Mis Clientes</h1>
      <hr className='my-4 border-t-2 border-gray-300' />
      <p className='mb-8'>Este módulo te permite gestionar los clientes asignados a ti.</p>
      <table className="w-full mt-5 table-auto shadow-lg bg-white">
        <thead className="bg-gray-800 text-slate-400">
          <tr>
            {["N°", "Nombre mascota", "Nombre usuario", "Email", "Celular", "Acciones"].map((header) => (
              <th key={header} className="p-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr className="hover:bg-gray-300 text-center" key={cliente._id}>
              <td>{index + 1}</td>
              <td>{cliente.nombreMascota}</td>
              <td>{cliente.nombrePropietario}</td>
              <td>{cliente.emailPropietario}</td>
              <td>{cliente.celularPropietario}</td>
              <td className='py-2 text-center'>
                <button
                  className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                  onClick={() => {
                    setSelectedClienteId(cliente._id); // Establecer el ID del cliente seleccionado
                    toggleModal("treatments"); // Abrir el modal
                  }}
                >
                  Registrar Trabajo
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* El modal se renderiza en el componente principal */}
      {modal === "treatments" && (
        <ModalTreatments patientID={selectedClienteId} />
      )}
    </>
  );
};

export default ListClientesEstilista;
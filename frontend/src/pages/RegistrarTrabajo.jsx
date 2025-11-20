// frontend/src/pages/RegistrarTrabajo.jsx
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import ModalTreatments from "../components/treatments/Modal";
import storeAuth from "../context/storeAuth";
import storeTreatments from "../context/storeTreatments"; // <-- Importación CORRECTA
import { ToastContainer } from "react-toastify";

const RegistrarTrabajo = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [loading, setLoading] = useState(true);
  const { fetchDataBackend } = useFetch();
  const { rol, token } = storeAuth();
  const { modal, toggleModal, setSelectedClientId } = storeTreatments(); // <-- Importar desde storeTreatments

  const listClientes = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/clientes`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetchDataBackend(url, null, "GET", headers);
      // Filtrar solo clientes activos
      const clientesActivos = response?.filter(cliente => cliente.estadoMascota === true) || [];
      setClientes(clientesActivos);
    } catch (error) {
      console.error("Error al listar clientes:", error);
      // fetchDataBackend ya maneja el toast de error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (rol === 'estilista') {
      listClientes();
    }
  }, [token, rol]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando clientes...</div>;
  }

  if (clientes.length === 0) {
    return (
      <div className="p-6">
        <h1 className='font-black text-4xl text-gray-500'>Registrar Trabajo</h1>
        <hr className='my-4 border-t-2 border-gray-300' />
        <p className='mb-8'>No hay clientes activos disponibles para registrar un trabajo.</p>
      </div>
    );
  }

  const handleClienteChange = (e) => {
    const id = e.target.value;
    setClienteSeleccionado(id);
  };

  const handleAbrirModal = () => {
    if (clienteSeleccionado) {
      setSelectedClientId(clienteSeleccionado); // <-- Usa la función de storeTreatments
      toggleModal("treatments"); // <-- Usa la función de storeTreatments
    } else {
      alert("Por favor, selecciona un cliente.");
    }
  };

  return (
    <>
      <ToastContainer />
      <h1 className='font-black text-4xl text-gray-500'>Registrar Trabajo</h1>
      <hr className='my-4 border-t-2 border-gray-300' />
      <p className='mb-8'>Este módulo te permite registrar un trabajo realizado a un cliente.</p>

      <div className="mb-6">
        <label htmlFor="cliente-select" className="block text-sm font-semibold mb-2">
          Seleccionar Cliente
        </label>
        <select
          id="cliente-select"
          value={clienteSeleccionado}
          onChange={handleClienteChange}
          className="block w-full max-w-md rounded-md border border-gray-300 py-2 px-3 text-gray-500 shadow-sm focus:border-sky-500 focus:ring-sky-500"
        >
          <option value="">-- Seleccionar Cliente --</option>
          {clientes.map((cliente) => (
            <option key={cliente._id} value={cliente._id}>
              {cliente.nombreMascota} - {cliente.nombrePropietario}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAbrirModal}
        className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700"
      >
        Registrar Trabajo para Cliente Seleccionado
      </button>

      {/* El modal se renderiza en el componente principal */}
      {modal === "treatments" && (
        <ModalTreatments patientID={clienteSeleccionado} />
      )}
    </>
  );
};

export default RegistrarTrabajo;
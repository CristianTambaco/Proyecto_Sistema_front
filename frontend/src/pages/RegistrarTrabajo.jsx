// frontend/src/pages/RegistrarTrabajo.jsx
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import storeAuth from "../context/storeAuth";
import { ToastContainer, toast } from "react-toastify";

const RegistrarTrabajo = () => {
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [loading, setLoading] = useState(true);

  const { fetchDataBackend } = useFetch();
  const { token, rol } = storeAuth();

  // Cargar clientes activos
  const cargarClientes = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/clientes-activos-todos`;
      const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
      const response = await fetchDataBackend(url, null, "GET", headers);
      setClientes(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
    }
  };

  // Cargar servicios activos
  const cargarServicios = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/servicios?activo=true`;
      const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
      const response = await fetchDataBackend(url, null, "GET", headers);
      setServicios(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Error al cargar servicios:", error);
    }
  };

  useEffect(() => {
    if (rol === "estilista") {
      Promise.all([cargarClientes(), cargarServicios()]).finally(() => setLoading(false));
    }
  }, [token, rol]);

  const registrarTrabajo = async () => {
    if (!clienteSeleccionado || !servicioSeleccionado) {
      toast.error("Selecciona un cliente y un servicio.");
      return;
    }

    const servicio = servicios.find(s => s._id === servicioSeleccionado);
    if (!servicio) {
      toast.error("Servicio no válido.");
      return;
    }

    const payload = {
      cliente: clienteSeleccionado,
      nombreServicio: servicio.nombre,
      descripcion: servicio.descripcion,
      prioridad: "Media", // o podrías añadir prioridad en el modelo Servicio
      precio: servicio.precio,
      observaciones: observaciones.trim() || "",
    };

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/trabajo-realizado/registro`;
      const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
      await fetchDataBackend(url, payload, "POST", headers);
      // Reset
      setClienteSeleccionado("");
      setServicioSeleccionado("");
      setObservaciones("");
      // toast.success("Trabajo registrado correctamente");
    } catch (error) {
      console.error("Error al registrar trabajo:", error);
      toast.error("No se pudo registrar el trabajo.");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  if (clientes.length === 0) {
    return (
      <div className="p-6">
        <h1 className="font-black text-4xl text-gray-500">Registrar Trabajo</h1>
        <hr className="my-4 border-t-2 border-gray-300" />
        <p className="mb-8">No hay clientes activos disponibles.</p>
      </div>
    );
  }

  if (servicios.length === 0) {
    return (
      <div className="p-6">
        <h1 className="font-black text-4xl text-gray-500">Registrar Trabajo</h1>
        <hr className="my-4 border-t-2 border-gray-300" />
        <p className="mb-8">No hay servicios activos disponibles.</p>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <h1 className="font-black text-4xl text-gray-500">Registrar Trabajo Realizado</h1>
      <hr className="my-4 border-t-2 border-gray-300" />
      <p className="mb-8">Selecciona un cliente y un servicio para registrar el trabajo.</p>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Cliente */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Cliente <span className="text-red-600">*</span>
          </label>
          <select
            value={clienteSeleccionado}
            onChange={(e) => setClienteSeleccionado(e.target.value)}
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
          >
            <option value="">-- Seleccionar cliente --</option>
            {clientes.map((c) => (
              <option key={c._id} value={c._id}>
                {c.nombrePropietario}
              </option>
            ))}
          </select>
        </div>

        {/* Servicio */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Servicio <span className="text-red-600">*</span>
          </label>
          <select
            value={servicioSeleccionado}
            onChange={(e) => setServicioSeleccionado(e.target.value)}
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
          >
            <option value="">-- Seleccionar servicio --</option>
            {servicios.map((s) => (
              <option key={s._id} value={s._id}>
                {s.nombre} — $ {s.precio.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        {/* Observaciones (opcional) */}
        <div>
          <label className="block text-sm font-semibold mb-2">Observaciones</label>
          <textarea
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
            rows="3"
            placeholder="Notas adicionales (opcional)"
          />
        </div>

        {/* Botón */}
        <button
          type="button"
          onClick={registrarTrabajo}
          className="bg-green-700 w-full p-3 text-white uppercase font-bold rounded-lg hover:bg-green-800 transition"
        >
          Registrar Trabajo
        </button>
      </div>
    </div>
  );
};

export default RegistrarTrabajo;
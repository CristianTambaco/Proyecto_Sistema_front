// frontend/src/pages/RegistrarTrabajo.jsx
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import useFetch from "../hooks/useFetch";
import storeAuth from "../context/storeAuth";

const RegistrarTrabajo = () => {
  const { token, rol } = storeAuth();
  const { fetchDataBackend } = useFetch();

  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Cargar todos los clientes activos
  const cargarClientes = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/clientes-activos-todos`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetchDataBackend(url, null, "GET", headers);
      setClientes(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
      toast.error("No se pudieron cargar los clientes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (rol === "estilista") {
      cargarClientes();
    }
  }, [token, rol]);

  // Registrar el trabajo
  const registrarTrabajo = async (data) => {
    try {
      const payload = {
        cliente: data.cliente,
        nombreServicio: data.nombreServicio,
        descripcion: data.descripcion,
        prioridad: data.prioridad,
        precio: parseFloat(data.precio),
        observaciones: data.observaciones || "",
      };

      const url = `${import.meta.env.VITE_BACKEND_URL}/trabajo-realizado/registro`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      await fetchDataBackend(url, payload, "POST", headers);
      reset(); // Limpiar formulario
      toast.success("Trabajo registrado correctamente");
    } catch (error) {
      console.error("Error al registrar trabajo:", error);
      toast.error("No se pudo registrar el trabajo.");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando clientes...</div>;
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

  return (
    <div>
      <ToastContainer />
      <h1 className="font-black text-4xl text-gray-500">Registrar Trabajo Realizado</h1>
      <hr className="my-4 border-t-2 border-gray-300" />
      <p className="mb-8">Registra un trabajo realizado para cualquier cliente activo.</p>

      <form onSubmit={handleSubmit(registrarTrabajo)} className="max-w-2xl mx-auto space-y-6">
        {/* Selección de cliente */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Cliente <span className="text-red-600">*</span>
          </label>
          <select
            {...register("cliente", { required: "Debes seleccionar un cliente" })}
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
          >
            <option value="">-- Seleccionar --</option>
            {clientes.map((cliente) => (
              <option key={cliente._id} value={cliente._id}>
                {cliente.nombreMascota} • {cliente.nombrePropietario}
              </option>
            ))}
          </select>
          {errors.cliente && <p className="text-red-600 text-sm">{errors.cliente.message}</p>}
        </div>

        {/* Nombre del servicio */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Nombre del Servicio <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            {...register("nombreServicio", {
              required: "El nombre del servicio es obligatorio",
              minLength: { value: 3, message: "Mínimo 3 caracteres" },
            })}
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
            placeholder="Ej. Baño y corte"
          />
          {errors.nombreServicio && <p className="text-red-600 text-sm">{errors.nombreServicio.message}</p>}
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Descripción <span className="text-red-600">*</span>
          </label>
          <textarea
            {...register("descripcion", {
              required: "La descripción es obligatoria",
              minLength: { value: 5, message: "Mínimo 5 caracteres" },
            })}
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
            rows="3"
            placeholder="Detalles del trabajo realizado"
          />
          {errors.descripcion && <p className="text-red-600 text-sm">{errors.descripcion.message}</p>}
        </div>

        {/* Prioridad */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Prioridad <span className="text-red-600">*</span>
          </label>
          <select
            {...register("prioridad", { required: "Selecciona una prioridad" })}
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
          >
            <option value="">-- Seleccionar --</option>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
          {errors.prioridad && <p className="text-red-600 text-sm">{errors.prioridad.message}</p>}
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Precio ($) <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            {...register("precio", {
              required: "El precio es obligatorio",
              min: { value: 0, message: "El precio no puede ser negativo" },
              valueAsNumber: true,
            })}
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
            placeholder="0.00"
          />
          {errors.precio && <p className="text-red-600 text-sm">{errors.precio.message}</p>}
        </div>

        {/* Observaciones (opcional) */}
        <div>
          <label className="block text-sm font-semibold mb-2">Observaciones</label>
          <textarea
            {...register("observaciones")}
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700"
            rows="2"
            placeholder="Notas adicionales (opcional)"
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="bg-green-700 w-full p-3 text-white uppercase font-bold rounded-lg hover:bg-green-800 transition"
        >
          Registrar Trabajo
        </button>
      </form>
    </div>
  );
};

export default RegistrarTrabajo;
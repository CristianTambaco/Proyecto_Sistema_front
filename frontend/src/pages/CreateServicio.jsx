// frontend/src/pages/CreateServicio.jsx
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { ToastContainer } from 'react-toastify';

const CreateServicio = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { fetchDataBackend } = useFetch();

  const crearServicio = async (data) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/servicio`;
    const storedUser = JSON.parse(localStorage.getItem("auth-token"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedUser.state.token}`,
    };
    try {
      const response = await fetchDataBackend(url, data, "POST", headers);
      if (response) { // Si la creación fue exitosa
        setTimeout(() => {
          navigate("/dashboard/servicios"); // Redirige a la lista
        }, 2000);
      }
    } catch (error) {
      console.error("Error al crear servicio:", error);
      // fetchDataBackend ya maneja el toast de error
    }
  };

  return (
    <div>
      <ToastContainer />
      <h1 className='font-black text-4xl text-gray-500'>Crear Servicio</h1>
      <hr className='my-4 border-t-2 border-gray-300' />
      <p className='mb-8'>Este módulo te permite crear un nuevo servicio.</p>
      <form onSubmit={handleSubmit(crearServicio)}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Nombre <span className="text-red-600">*</span></label>
          <input
            type="text"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            placeholder="Nombre del servicio"
            {...register("nombre", {
              required: "El nombre es obligatorio.",
              minLength: {
                value: 2,
                message: "El nombre debe tener al menos 2 caracteres"
              },
              maxLength: {
                value: 50,
                message: "El nombre no puede superar los 50 caracteres"
              },
              pattern: {
                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\,\.]+$/,
                message: "El nombre solo puede contener letras, espacios y signos comunes."
              }
            })}
          />
          {errors.nombre && <p className="text-red-800">{errors.nombre.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Descripción <span className="text-red-600">*</span></label>
          <textarea
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            placeholder="Descripción del servicio"
            {...register("descripcion", {
              required: "La descripción es obligatoria.",
              minLength: {
                value: 5,
                message: "La descripción debe tener al menos 5 caracteres"
              },
              maxLength: {
                value: 200,
                message: "La descripción no puede superar los 200 caracteres"
              }
            })}
          />
          {errors.descripcion && <p className="text-red-800">{errors.descripcion.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Precio <span className="text-red-600">*</span></label>
          <input
            type="number"
            step="0.01"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            placeholder="Precio del servicio"
            {...register("precio", {
              required: "El precio es obligatorio.",
              min: {
                value: 0,
                message: "El precio no puede ser negativo."
              },
              validate: value => {
                if (value === "" || isNaN(value)) return "Por favor ingrese un número válido.";
              }
            })}
          />
          {errors.precio && <p className="text-red-800">{errors.precio.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Duración Estimada (min) <span className="text-red-600">*</span></label>
          <input
            type="number"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            placeholder="Duración en minutos"
            {...register("duracionEstimada", {
              required: "La duración es obligatoria.",
              min: {
                value: 1,
                message: "La duración debe ser al menos 1 minuto."
              },
              validate: value => {
                if (value === "" || isNaN(value)) return "Por favor ingrese un número válido.";
              }
            })}
          />
          {errors.duracionEstimada && <p className="text-red-800">{errors.duracionEstimada.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Estado</label>
          <select
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            {...register("estado")}
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>

        <input
          type="submit"
          value="Crear Servicio"
          className="bg-gray-800 w-full p-2 mt-5 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-600 cursor-pointer transition-all"
        />
      </form>
    </div>
  );
};

export default CreateServicio;
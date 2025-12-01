// frontend/src/pages/CreateServicio.jsx

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { ToastContainer } from 'react-toastify';

const CreateServicio = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const { fetchDataBackend } = useFetch();

  const crearServicio = async (data) => {
    // Crear FormData
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "imagen" && data.imagen?.[0]) {
        // Si es el campo 'imagen' y tiene un archivo, agregarlo a FormData
        formData.append("imagen", data.imagen[0]);
      } else {
        // Para otros campos, agregarlos como texto
        formData.append(key, data[key]);
      }
    });

    const url = `${import.meta.env.VITE_BACKEND_URL}/servicio`;
    const storedUser = JSON.parse(localStorage.getItem("auth-token"));
    const headers = {
      // No especificar Content-Type aquí, ya que FormData lo maneja automáticamente
      Authorization: `Bearer ${storedUser.state.token}`,
    };

    try {
      const response = await fetchDataBackend(url, formData, "POST", headers);
      if (response) {
        setTimeout(() => {
          navigate("/dashboard/servicios");
        }, 2000);
      }
    } catch (error) {
      console.error("Error al crear servicio:", error);
      // El toast de error ya lo maneja fetchDataBackend
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
                value: 5,
                message: "El nombre debe tener al menos 5 caracteres"
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
              max: {
                value: 1000,
                message: "El precio no puede superar los $1000."
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
              max: {
                value: 480,
                message: "La duración no puede ser mayor a 480 minutos (8 horas)."
              },
              validate: value => {
                if (value === "" || isNaN(value)) return "Por favor ingrese un número válido.";
              }
            })}
          />
          {errors.duracionEstimada && <p className="text-red-800">{errors.duracionEstimada.message}</p>}
        </div>

        {/* Campo para subir la imagen */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Imagen del Servicio</label>
          <div className="flex items-center gap-4">
            {/* Botón para seleccionar archivo */}
            <button
              type="button"
              onClick={() => document.getElementById('fileInput').click()}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-200 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M15 12L12 9m0 0L9 12m3-3v12" />
              </svg>
              Seleccionar archivo
            </button>
            {/* Mostrar nombre del archivo seleccionado */}
            {watch("imagen")?.[0] ? (
              <span className="text-sm text-gray-600 truncate max-w-xs">
                {watch("imagen")[0].name}
              </span>
            ) : (
              <span className="text-sm text-gray-500">Sin archivos seleccionados</span>
            )}
            {/* Input oculto */}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              {...register("imagen")}
            />
            {/* Vista previa de la imagen (opcional) */}
            {watch("imagen")?.[0] && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(watch("imagen")[0])}
                  alt="Vista previa"
                  className="w-20 h-20 object-cover rounded-md border border-gray-300"
                />
              </div>
            )}
          </div>
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
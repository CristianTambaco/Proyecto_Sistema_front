// frontend/src/pages/UpdateServicio.jsx
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { ToastContainer } from 'react-toastify';

const [imagenPreview, setImagenPreview] = useState(null);


const UpdateServicio = () => {
  const { id } = useParams();
  const [servicio, setServicio] = useState(null); // Estado para cargar el servicio existente
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const { fetchDataBackend } = useFetch();

  const obtenerServicio = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/servicio/${id}`;
    const storedUser = JSON.parse(localStorage.getItem("auth-token"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedUser.state.token}`,
    };
    try {
      const response = await fetchDataBackend(url, null, "GET", headers);
      if (response) {
        setServicio(response);
        // Reinicia el formulario con los datos existentes
        reset({
          nombre: response.nombre,
          descripcion: response.descripcion,
          precio: response.precio,
          duracionEstimada: response.duracionEstimada,
          estado: response.estado.toString() // Convierte booleano a string para el select
        });
      }
    } catch (error) {
      console.error("Error al obtener servicio:", error);
      // fetchDataBackend ya maneja el toast de error
    }
  };

    if (response) {
    setServicio(response);
    setImagenPreview(response.imagen); // <-- URL actual de Cloudinary
    reset({
      nombre: response.nombre,
      descripcion: response.descripcion,
      precio: response.precio,
      duracionEstimada: response.duracionEstimada,
      estado: response.estado.toString()
    });
  }

  const actualizarServicio = async (data) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/servicio/${id}`;
    const storedUser = JSON.parse(localStorage.getItem("auth-token"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedUser.state.token}`,
    };
    try {
      const response = await fetchDataBackend(url, data, "PUT", headers);
      if (response) { // Si la actualización fue exitosa
        setTimeout(() => {
          navigate("/dashboard/servicios"); // Redirige a la lista
        }, 2000);
      }
    } catch (error) {
      console.error("Error al actualizar servicio:", error);
      // fetchDataBackend ya maneja el toast de error
    }
  };

  useEffect(() => {
    if (id) {
      obtenerServicio();
    }
  }, [id]);

  if (!servicio) {
    return <div>Cargando servicio...</div>; // O un spinner
  }

  return (
    <div>
      <ToastContainer />
      <h1 className='font-black text-4xl text-gray-500'>Actualizar Servicio</h1>
      <hr className='my-4 border-t-2 border-gray-300' />
      <p className='mb-8'>Este módulo te permite actualizar un servicio existente.</p>
      <form onSubmit={handleSubmit(actualizarServicio)}>
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


        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Imagen del Servicio</label>
          <input
            type="file"
            accept="image/*"
            {...register("imagen")}
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
          />
        </div>






        <input
          type="submit"
          value="Actualizar Servicio"
          className="bg-gray-800 w-full p-2 mt-5 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-600 cursor-pointer transition-all"
        />
      </form>
    </div>
  );
};

export default UpdateServicio;
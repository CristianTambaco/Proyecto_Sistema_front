// frontend/src/pages/UpdateUsuario.jsx
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { ToastContainer } from 'react-toastify';
import storeAuth from '../context/storeAuth';

const UpdateUsuario = () => {
  const { tipoUsuario, id } = useParams(); // 'estilista' o 'administrador' y el ID
  const [usuario, setUsuario] = useState(null); // Estado para cargar el usuario existente
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const { fetchDataBackend } = useFetch();
  const { rol } = storeAuth();

  const obtenerUsuario = async () => {


    if (rol !== 'administrador') return; // Solo admin puede actualizar

    let url = '';
    if (tipoUsuario === 'estilista') {
      url = `${import.meta.env.VITE_BACKEND_URL}/estilista/${id}`; // Asumiendo ruta para estilista
    } else if (tipoUsuario === 'administrador') {
      url = `${import.meta.env.VITE_BACKEND_URL}/administrador/${id}`; // Asumiendo ruta para admin
    }
    if (!url) return;

    const storedUser = JSON.parse(localStorage.getItem("auth-token"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedUser.state.token}`,
    };
    try {
      const response = await fetchDataBackend(url, null, "GET", headers);
      if (response) {
        setUsuario(response);
        // Reinicia el formulario con los datos existentes
        reset({
          nombre: response.nombre,
          apellido: response.apellido,
          direccion: response.direccion,
          celular: response.celular,
          email: response.email,
          // No se reinicia la contraseña aquí
        });
      }
    } catch (error) {
      console.error(`Error al obtener ${tipoUsuario}:`, error);
    }
  };

  const actualizarUsuario = async (data) => {
    if (rol !== 'administrador') return; // Solo admin puede actualizar

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
      const response = await fetchDataBackend(url, data, "PUT", headers);
      if (response) { // Si la actualización fue exitosa
        setTimeout(() => {
          navigate(`/dashboard/usuarios`); // Redirige a la lista de usuarios
        }, 2000);
      }
    } catch (error) {
      console.error(`Error al actualizar ${tipoUsuario}:`, error);
      // fetchDataBackend ya maneja el toast de error
    }
  };

  useEffect(() => {
    if (id && rol === 'administrador') {
      obtenerUsuario();
    }
  }, [id, rol]);

  if (rol !== 'administrador') {
    return <div>Acceso denegado. Solo administradores pueden actualizar usuarios.</div>;
  }

  if (!usuario) {
    return <div>Cargando {tipoUsuario}...</div>; // O un spinner
  }

  const titulo = tipoUsuario === 'estilista' ? 'Actualizar Estilista' : 'Actualizar Administrador';
  const rolTexto = tipoUsuario === 'estilista' ? 'Estilista' : 'Administrador';

  return (
    <div>
      <ToastContainer />
      <h1 className='font-black text-4xl text-gray-500'>{titulo}</h1>
      <hr className='my-4 border-t-2 border-gray-300' />
      <p className='mb-8'>Este módulo te permite actualizar un {rolTexto} existente.</p>
      <form onSubmit={handleSubmit(actualizarUsuario)}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Nombre <span className="text-red-600">*</span></label>
          <input
            type="text"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            placeholder={`Nombre del ${rolTexto}`}
            {...register("nombre", {
              required: `El nombre es obligatorio.`,
              minLength: {
                value: 5,
                message: `El nombre debe tener al menos 5 caracteres`
              },
              pattern: {
                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                message: `El nombre solo puede contener letras`
              }
            })}
          />
          {errors.nombre && <p className="text-red-800">{errors.nombre.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Apellido <span className="text-red-600">*</span></label>
          <input
            type="text"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            placeholder={`Apellido del ${rolTexto}`}
            {...register("apellido", {
              required: `El apellido es obligatorio.`,
              minLength: {
                value: 5,
                message: `El apellido debe tener al menos 5 caracteres`
              },
              pattern: {
                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                message: `El apellido solo puede contener letras`
              }
            })}
          />
          {errors.apellido && <p className="text-red-800">{errors.apellido.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Dirección</label>
          <input
            type="text"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            placeholder={`Dirección del ${rolTexto}`}
            {...register("direccion")}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Teléfono</label>
          <input
            type="number"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            placeholder={`Teléfono del ${rolTexto}`}
            {...register("celular", {
              pattern: {
                value: /^[0-9]+$/,
                message: "El teléfono solo puede contener números"
              },
              minLength: {
                value: 10, // Ajusta según necesites
                message: "El teléfono debe tener al menos 10 dígitos"
              },
              maxLength: {
                value: 10, // Ajusta según necesites
                message: "El teléfono debe tener máximo 10 dígitos"
              },
              validate: value => {
                if (value && /^0+$/.test(value)) return "Número inválido"; // todo ceros
              }
            })}
          />
          {errors.celular && <p className="text-red-800">{errors.celular.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Correo electrónico <span className="text-red-600">*</span></label>
          <input
            type="email"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            placeholder={`Correo del ${rolTexto}`}
            {...register("email", {
              required: `El correo electrónico es obligatorio.`,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Ingresa un correo electrónico válido"
              }
            })}
          />
          {errors.email && <p className="text-red-800">{errors.email.message}</p>}
        </div>

        {/* No se incluye el campo de contraseña aquí, se manejaría en otra sección o modal */}
        {/* <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Nueva Contraseña</label>
          <input
            type="password"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            placeholder={`Nueva contraseña del ${rolTexto}`}
            {...register("nuevaPassword", {
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres"
              }
            })}
          />
          {errors.nuevaPassword && <p className="text-red-800">{errors.nuevaPassword.message}</p>}
        </div> */}

        <input
          type="submit"
          value={`Actualizar ${rolTexto}`}
          className="bg-gray-800 w-full p-2 mt-5 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-600 cursor-pointer transition-all"
        />
      </form>
    </div>
  );
};

export default UpdateUsuario;
// frontend/src/pages/CreateUsuario.jsx
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { ToastContainer } from 'react-toastify';
import storeAuth from '../context/storeAuth';

const CreateUsuario = () => {
  const { tipoUsuario } = useParams(); // 'estilista' o 'administrador'
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { fetchDataBackend } = useFetch();
  const { rol } = storeAuth();

  const crearUsuario = async (data) => {
    if (rol !== 'administrador') return; // Solo admin puede crear

    let url = '';
    if (tipoUsuario === 'estilista') {
      url = `${import.meta.env.VITE_BACKEND_URL}/registro`; // Ruta de estilista
    } else if (tipoUsuario === 'administrador') {
      url = `${import.meta.env.VITE_BACKEND_URL}/administrador`; // Ruta de admin
    }
    if (!url) return;

    // Asegurar el rol correcto
    data.rol = tipoUsuario;

    const storedUser = JSON.parse(localStorage.getItem("auth-token"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedUser.state.token}`,
    };
    try {
      const response = await fetchDataBackend(url, data, "POST", headers);
      if (response) { // Si la creación fue exitosa
        setTimeout(() => {
          navigate(`/dashboard/usuarios?tipo=${tipoUsuario}`);
        }, 2000);
      }
    } catch (error) {
      console.error(`Error al crear ${tipoUsuario}:`, error);
      // fetchDataBackend ya maneja el toast de error
    }
  };

  if (rol !== 'administrador') {
    return <div>Acceso denegado. Solo administradores pueden crear usuarios.</div>;
  }

  const titulo = tipoUsuario === 'estilista' ? 'Crear Estilista' : 'Crear Administrador';
  const rolTexto = tipoUsuario === 'estilista' ? 'Estilista' : 'Administrador';

  return (
    <div>
      <ToastContainer />
      <h1 className='font-black text-4xl text-gray-500'>{titulo}</h1>
      <hr className='my-4 border-t-2 border-gray-300' />
      <p className='mb-8'>Este módulo te permite crear un nuevo {rolTexto}.</p>
      <form onSubmit={handleSubmit(crearUsuario)}>
        {/* Campos comunes */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Nombre <span className="text-red-600">*</span></label>
          <input
            type="text"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            placeholder={`Nombre del ${rolTexto}`}
            {...register("nombre", {
              required: `El nombre es obligatorio.`,
              minLength: {
                value: 3,
                message: `El nombre debe tener al menos 3 caracteres`
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
                value: 3,
                message: `El apellido debe tener al menos 3 caracteres`
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
          <label className="block text-sm font-semibold mb-1">Dirección<span className="text-red-600">*</span></label>
          <input
            type="text"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            placeholder={`Dirección del ${rolTexto}`}
            {...register("direccion", {
              required: "La dirección es obligatoria", // Campo requerido
              minLength: {
                value: 3,
                message: "La dirección debe tener al menos 3 caracteres", // Mínimo de 3 caracteres
              },
              maxLength: {
                value: 100,
                message: "La dirección no puede tener más de 100 caracteres", // Máximo de 100 caracteres
              },
              // pattern: {
              //   value: /^[a-zA-Z0-9\s,.'-]*$/,
              //   message: "La dirección contiene caracteres no permitidos", // Regex para caracteres válidos
              // }
            })}
          />
          {errors.direccion && (
            <p className="text-red-800">{errors.direccion.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Teléfono<span className="text-red-600">*</span></label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={10}
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            placeholder={`Teléfono del ${rolTexto}`}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
            }}
            {...register("celular", {
              required: `El campo es obligatorio.`,
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
                message: "El teléfono debe tener 10 dígitos"
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
            type="emaile"
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

        {/* 👇 NUEVO: Campo de Cédula solo para Administrador */}
        {tipoUsuario === 'administrador' && (
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Cédula <span className="text-red-600">*</span></label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={10}
              className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
              placeholder={`Cédula del ${rolTexto}`}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              {...register("cedula", {
                required: `La cédula es obligatoria.`,
                minLength: {
                  value: 10,
                  message: "La cédula debe tener 10 dígitos"
                },
                maxLength: {
                  value: 10,
                  message: "La cédula debe tener 10 dígitos"
                },
                validate: {
                  soloNumeros: (value) =>
                    /^\d+$/.test(value) || "La cédula solo debe contener números",
                },
              })}
            />
            {errors.cedula && <p className="text-red-800">{errors.cedula.message}</p>}
          </div>
        )}


        {/* Campo de Cédula para estilista */}
        {tipoUsuario === 'estilista' && (
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Cédula <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={10}
              className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
              placeholder={`Cédula del ${rolTexto}`}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              {...register("cedula", {
                required: `La cédula es obligatoria.`,
                minLength: { value: 10, message: "Debe tener 10 dígitos" },
                maxLength: { value: 10, message: "Debe tener 10 dígitos" },
                validate: {
                  soloNumeros: (value) => /^\d+$/.test(value) || "Solo números"
                }
              })}
            />
            {errors.cedula && <p className="text-red-800">{errors.cedula.message}</p>}
          </div>
        )}




        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Contraseña <span className="text-red-600">*</span></label>
          <input
            type="password"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            placeholder={`Contraseña del ${rolTexto}`}
            {...register("password", {
              required: `La contraseña es obligatoria.`,
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres"
              },
              maxLength: {
                value: 12,
                message: "La contraseña no puede superar los 12 caracteres"
              },
              //  Validaciones condicionales según el tipo de usuario
              validate: (value) => {
                // Si el usuario que se está creando es admin → exigir mayúscula
                if (tipoUsuario === "administrador" && !/[A-Z]/.test(value)) {
                  return "La contraseña del administrador debe incluir una letra mayúscula.";
                }
                // Regla general para todos (admin y estilista)
                if (!/[A-Za-z]/.test(value) || !/\d/.test(value) || !/[@$!%*#?&]/.test(value)) {
                  return "Debe tener letras, números y caracteres especiales";
                }
                return true;
              },
            })}
          />
          {errors.password && <p className="text-red-800">{errors.password.message}</p>}
        </div>

        <input
          type="submit"
          value={`Crear ${rolTexto}`}
          className="bg-gray-800 w-full p-2 mt-5 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-600 cursor-pointer transition-all"
        />
      </form>
    </div>
  );
};


export default CreateUsuario;
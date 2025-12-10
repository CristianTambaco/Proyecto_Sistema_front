// frontend/src/pages/EditarPerfil.jsx
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import storeProfile from '../context/storeProfile';
import { ToastContainer, toast } from 'react-toastify';

const EditarPerfil = () => {
  const { user, updateProfile } = storeProfile();
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();

  // Estado para manejar el rol del usuario
  const [rol, setRol] = useState('');

  useEffect(() => {
    if (user) {
      // Establecer el rol
      setRol(user.rol);
      // Resetear el formulario con los datos actuales
      reset({
        nombre: user.nombre,
        apellido: user.apellido,
        direccion: user.direccion,
        celular: user.celular,
        email: user.email,
        // Para cliente
        nombrePropietario: user.nombrePropietario,
        cedulaPropietario: user.cedulaPropietario,
        emailPropietario: user.emailPropietario,
        celularPropietario: user.celularPropietario,
        nombreMascota: user.nombreMascota,
        tipoPelajeMascota: user.tipoPelajeMascota,
        caracteristicasMascota: user.caracteristicasMascota,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      // Preparar los datos según el rol
      let dataToUpdate = {};
      if (rol === 'cliente') {
        dataToUpdate = {
          nombrePropietario: data.nombrePropietario,
          cedulaPropietario: data.cedulaPropietario,
          emailPropietario: data.emailPropietario,
          celularPropietario: data.celularPropietario,
          nombreMascota: data.nombreMascota,
          tipoPelajeMascota: data.tipoPelajeMascota,
          caracteristicasMascota: data.caracteristicasMascota,
        };
      } else {
        dataToUpdate = {
          nombre: data.nombre,
          apellido: data.apellido,
          direccion: data.direccion,
          celular: data.celular,
          email: data.email,
        };
      }
      await updateProfile(dataToUpdate, user._id);
    //   toast.success("Perfil actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      toast.error("Error al actualizar el perfil.");
    }
  };

  if (!user) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div>
      <ToastContainer />
      <h1 className='font-black text-4xl text-gray-500'>Editar Perfil</h1>
      <hr className='my-4 border-t-2 border-gray-300' />
      <p className='mb-8'>Este módulo te permite editar tu información personal.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
        {rol === 'cliente' ? (
          <>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Nombre del propietario <span className="text-red-600">*</span></label>
              <input
                type="text"
                className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                {...register("nombrePropietario", {
                  required: "El nombre del propietario es obligatorio.",
                  minLength: {
                    value: 5,
                    message: "Debe tener al menos 5 caracteres"
                  },
                  maxLength: {
                    value: 50,
                    message: "No puede superar los 50 caracteres"
                  },
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                    message: "Solo letras y espacios"
                  }
                })}
              />
              {errors.nombrePropietario && <p className="text-red-800">{errors.nombrePropietario.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Cédula <span className="text-red-600">*</span></label>
              <input
                type="number"
                className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                {...register("cedulaPropietario", {
                  required: "La cédula es obligatoria",
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
                    noCeroInicial: (value) =>
                      !/^0/.test(value) || "La cédula no puede comenzar con 0",
                  },
                })}
              />
              {errors.cedulaPropietario && <p className="text-red-800">{errors.cedulaPropietario.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Correo electrónico <span className="text-red-600">*</span></label>
              <input
                type="email"
                className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                {...register("emailPropietario", {
                  required: "El correo electrónico es obligatorio.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Ingresa un correo electrónico válido"
                  }
                })}
              />
              {errors.emailPropietario && <p className="text-red-800">{errors.emailPropietario.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Teléfono <span className="text-red-600">*</span></label>
              <input
                type="number"
                className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                {...register("celularPropietario", {
                  required: "El teléfono es obligatorio",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "El teléfono solo puede contener números"
                  },
                  minLength: {
                    value: 10,
                    message: "El teléfono debe tener 10 dígitos"
                  },
                  maxLength: {
                    value: 10,
                    message: "El teléfono debe tener 10 dígitos"
                  },
                  validate: value => {
                    if (/^0+$/.test(value)) return "Número inválido"; // todo ceros
                  },
                })}
              />
              {errors.celularPropietario && <p className="text-red-800">{errors.celularPropietario.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Nombre de la mascota <span className="text-red-600">*</span></label>
              <input
                type="text"
                className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                {...register("nombreMascota", {
                  required: "El nombre de la mascota es obligatorio.",
                  minLength: {
                    value: 3,
                    message: "El nombre debe tener al menos 3 caracteres"
                  },
                  pattern: {
                    value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                    message: "El nombre solo puede contener letras"
                  },
                  maxLength: {
                    value: 20,
                    message: "El nombre no puede superar los 20 caracteres"
                  }
                })}
              />
              {errors.nombreMascota && <p className="text-red-800">{errors.nombreMascota.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Sociable con otros animales <span className="text-red-600">*</span></label>
              <select
                className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                {...register("tipoPelajeMascota", { required: "Seleccione una opción" })}
              >
                <option value="">-- Seleccionar --</option>
                <option value="si">Si</option>
                <option value="no">No</option>
              </select>
              {errors.tipoPelajeMascota && <p className="text-red-800">{errors.tipoPelajeMascota.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Detalles adicionales <span className="text-red-600">*</span></label>
              <textarea
                className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                rows="3"
                {...register("caracteristicasMascota", {
                  required: "Las características son obligatorias.",
                  minLength: {
                    value: 5,
                    message: "Debe existir al menos 5 caracteres"
                  },
                })}
              />
              {errors.caracteristicasMascota && <p className="text-red-800">{errors.caracteristicasMascota.message}</p>}
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Nombre <span className="text-red-600">*</span></label>
              <input
                type="text"
                className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                {...register("nombre", {
                  required: "El nombre es obligatorio.",
                  minLength: {
                    value: 3,
                    message: "El nombre debe tener al menos 3 caracteres"
                  },
                  maxLength: {
                    value: 20,
                    message: "El nombre no puede superar los 20 caracteres"
                  },
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                    message: "El nombre solo puede contener letras"
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
                {...register("apellido", {
                  required: "El apellido es obligatorio.",
                  minLength: {
                    value: 5,
                    message: "El apellido debe tener al menos 5 caracteres"
                  },
                  maxLength: {
                    value: 20,
                    message: "El apellido no puede superar los 20 caracteres"
                  },
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                    message: "El apellido solo puede contener letras"
                  }
                })}
              />
              {errors.apellido && <p className="text-red-800">{errors.apellido.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Dirección <span className="text-red-600">*</span></label>
              <input
                type="text"
                className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                {...register("direccion", {
                  required: "La dirección es obligatoria.",
                  minLength: {
                    value: 5,
                    message: "La dirección debe tener al menos 5 caracteres"
                  },
                  maxLength: {
                    value: 100,
                    message: "La dirección no puede tener más de 100 caracteres"
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9\s,.'-]*$/,
                    message: "La dirección contiene caracteres no permitidos"
                  }
                })}
              />
              {errors.direccion && <p className="text-red-800">{errors.direccion.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Teléfono <span className="text-red-600">*</span></label>
              <input
                type="number"
                className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                {...register("celular", {
                  required: "El teléfono es obligatorio.",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "El teléfono solo puede contener números"
                  },
                  minLength: {
                    value: 10,
                    message: "El teléfono debe tener al menos 10 dígitos"
                  },
                  maxLength: {
                    value: 10,
                    message: "El teléfono debe tener 10 dígitos"
                  },
                  validate: value => {
                    if (/^0+$/.test(value)) return "Número inválido"; // todo ceros
                  },
                })}
              />
              {errors.celular && <p className="text-red-800">{errors.celular.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Correo electrónico <span className="text-red-600">*</span></label>
              <input
                type="email"
                className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                {...register("email", {
                  required: "El correo electrónico es obligatorio.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Ingresa un correo electrónico válido"
                  }
                })}
              />
              {errors.email && <p className="text-red-800">{errors.email.message}</p>}
            </div>
          </>
        )}

        <input
          type="submit"
          value="Actualizar Perfil"
          className="bg-gray-800 w-full p-2 mt-5 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-600 cursor-pointer transition-all"
        />
      </form>
    </div>
  );
};

export default EditarPerfil;
// frontend/src/components/profile/FormProfileCliente.jsx
import { useEffect } from "react";
import storeProfile from "../../context/storeProfile";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const FormProfileCliente = () => {
  const { user, updateProfile } = storeProfile();
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

  const updateUser = async (data) => {
    // Asegurarse de que solo se envíen los campos permitidos para el cliente
    const dataToSend = {
      nombrePropietario: data.nombrePropietario,
      cedulaPropietario: data.cedulaPropietario,
      emailPropietario: data.emailPropietario,
      celularPropietario: data.celularPropietario,
      nombreMascota: data.nombreMascota,
      tipoPelajeMascota: data.tipoPelajeMascota,
      caracteristicasMascota: data.caracteristicasMascota,
    };

    try {
      // Asegurarse de que user._id esté disponible antes de llamar a updateProfile
      if (!user || !user._id) {
        toast.error("No se pudo obtener el ID del usuario.");
        return;
      }
      await updateProfile(dataToSend, user._id);
      // toast.success("Perfil actualizado correctamente"); // El éxito ya lo maneja storeProfile
    } catch (error) {
      // El error ya debería estar siendo manejado por storeProfile
      console.error("Error al actualizar perfil:", error);
    }
  };

  // Cargar los datos iniciales del usuario en los campos del formulario
  useEffect(() => {
    if (user) {
      // Usar setValue para campos específicos del cliente
      setValue("nombrePropietario", user.nombrePropietario || "");
      setValue("cedulaPropietario", user.cedulaPropietario || "");
      setValue("emailPropietario", user.emailPropietario || "");
      setValue("celularPropietario", user.celularPropietario || "");
      setValue("nombreMascota", user.nombreMascota || "");
      setValue("tipoPelajeMascota", user.tipoPelajeMascota || ""); // Esto debería mostrar la opción seleccionada
      setValue("caracteristicasMascota", user.caracteristicasMascota || "");
    }
  }, [user, setValue]); // Asegurar que useEffect se ejecute cuando cambie 'user' o 'setValue'

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit(updateUser)}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Nombre del Propietario <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            {...register("nombrePropietario", {
              required: "El nombre del propietario es obligatorio",
              minLength: { value: 5, message: "Mínimo 5 caracteres" },
              maxLength: { value: 50, message: "Máximo 50 caracteres" },
              pattern: { value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, message: "Solo letras y espacios" },
            })}
          />
          {errors.nombrePropietario && <p className="text-red-800 text-sm">{errors.nombrePropietario.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Cédula del Propietario <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            {...register("cedulaPropietario", {
              required: "La cédula es obligatoria",
              minLength: { value: 10, message: "Debe tener 10 dígitos" },
              maxLength: { value: 10, message: "Debe tener 10 dígitos" },
              pattern: { value: /^\d+$/, message: "Solo números" },
            })}
          />
          {errors.cedulaPropietario && <p className="text-red-800 text-sm">{errors.cedulaPropietario.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Correo Electrónico <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            {...register("emailPropietario", {
              required: "El correo es obligatorio",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Correo inválido" },
            })}
          />
          {errors.emailPropietario && <p className="text-red-800 text-sm">{errors.emailPropietario.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Celular del Propietario <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            {...register("celularPropietario", {
              required: "El celular es obligatorio",
              minLength: { value: 10, message: "Mínimo 10 dígitos" },
              maxLength: { value: 10, message: "Máximo 10 dígitos" },
              pattern: { value: /^\d+$/, message: "Solo números" },
            })}
          />
          {errors.celularPropietario && <p className="text-red-800 text-sm">{errors.celularPropietario.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Nombre de la Mascota <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            {...register("nombreMascota", {
              required: "El nombre de la mascota es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
              maxLength: { value: 30, message: "Máximo 30 caracteres" },
              pattern: { value: /^[a-zA-Z\s]+$/, message: "Solo letras y espacios" },
            })}
          />
          {errors.nombreMascota && <p className="text-red-800 text-sm">{errors.nombreMascota.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Sociable con otros animales <span className="text-red-600">*</span>
          </label>
          <select
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            {...register("tipoPelajeMascota", { required: "Este campo es obligatorio" })}
          >
            <option value="">-- Seleccionar --</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
            {/* Opcional: Añadir una opción predeterminada si el valor es nulo */}
            {/* <option value="otro">Otro</option> */}
          </select>
          {errors.tipoPelajeMascota && <p className="text-red-800 text-sm">{errors.tipoPelajeMascota.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Características de la Mascota <span className="text-red-600">*</span>
          </label>
          <textarea
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            rows="3"
            {...register("caracteristicasMascota", {
              required: "Las características son obligatorias",
              minLength: { value: 10, message: "Mínimo 10 caracteres" },
            })}
          />
          {errors.caracteristicasMascota && <p className="text-red-800 text-sm">{errors.caracteristicasMascota.message}</p>}
        </div>

        <input
          type="submit"
          value="Actualizar Perfil"
          className="bg-gray-800 w-full p-2 mt-5 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-600 cursor-pointer transition-all"
        />
      </form>
    </div>
  );
};

export default FormProfileCliente;
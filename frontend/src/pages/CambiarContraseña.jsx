// frontend/src/pages/CambiarContraseña.jsx
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import storeAuth from '../context/storeAuth';
import storeProfile from '../context/storeProfile';

const CambiarContraseña = () => {
  const { updatePasswordProfile } = storeProfile();
  const { user } = storeAuth(); // <-- Obtener el ID del usuario desde el token

  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onChangePassword = async (data) => {
    try {
      // Llamar a la función para cambiar la contraseña
      await updatePasswordProfile(data, user?._id); // Asegurarse de que user._id esté disponible
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      // El error ya debería ser manejado por updatePasswordProfile
    }
  };

  return (
    <div>
      <ToastContainer />
      <h1 className='font-black text-4xl text-gray-500'>Cambiar Contraseña</h1>
      <hr className='my-4 border-t-2 border-gray-300' />
      <p className='mb-8'>Este módulo te permite cambiar tu contraseña.</p>

      <form onSubmit={handleSubmit(onChangePassword)} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Contraseña actual <span className="text-red-600">*</span></label>
          <input
            type="password"
            placeholder="Ingresa tu contraseña actual"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            {...register("passwordactual", { required: "La contraseña actual es obligatoria." })}
          />
          {errors.passwordactual && <p className="text-red-800">{errors.passwordactual.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Nueva contraseña <span className="text-red-600">*</span></label>
          <input
            type="password"
            placeholder="Ingresa la nueva contraseña"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            {...register("passwordnuevo", {
              required: "La nueva contraseña es obligatoria.",
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres"
              },
              maxLength: { 
                value: 12, 
                message: "La contraseña no puede superar los 12 caracteres" 
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/,
                message:
                "Debe tener letras, números y caracteres especiales"
              }                            
            })}
          />
          {errors.passwordnuevo && <p className="text-red-800">{errors.passwordnuevo.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Confirmar nueva contraseña <span className="text-red-600">*</span></label>
          <input
            type="password"
            placeholder="Confirma la nueva contraseña"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            {...register("confirmPassword", {
              required: "La confirmación de contraseña es obligatoria.",
              validate: value => {
                if (value !== watch("passwordnuevo")) return "Las contraseñas no coinciden.";
              }
            })}
          />
          {errors.confirmPassword && <p className="text-red-800">{errors.confirmPassword.message}</p>}
        </div>
        <input
          type="submit"
          value="Cambiar Contraseña"
          className="bg-gray-800 w-full p-2 mt-5 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-600 cursor-pointer transition-all"
        />
      </form>
    </div>
  );
};

export default CambiarContraseña;
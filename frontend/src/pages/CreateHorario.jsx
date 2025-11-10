// frontend/src/pages/CreateHorario.jsx
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { ToastContainer } from 'react-toastify';

const CreateHorario = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { fetchDataBackend } = useFetch();

  const crearHorario = async (data) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/horario`;
    const storedUser = JSON.parse(localStorage.getItem("auth-token"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedUser.state.token}`,
    };
    try {
      const response = await fetchDataBackend(url, data, "POST", headers);
      if (response) { // Si la creación fue exitosa
        setTimeout(() => {
          navigate("/dashboard/horarios"); // Redirige a la lista
        }, 2000);
      }
    } catch (error) {
      console.error("Error al crear horario:", error);
      // fetchDataBackend ya maneja el toast de error
    }
  };

  return (
    <div>
      <ToastContainer />
      <h1 className='font-black text-4xl text-gray-500'>Crear Horario</h1>
      <hr className='my-4 border-t-2 border-gray-300' />
      <p className='mb-8'>Este módulo te permite crear un nuevo horario de atención.</p>
      <form onSubmit={handleSubmit(crearHorario)}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Día <span className="text-red-600">*</span></label>
          <select
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            {...register("dia", { required: "El día es obligatorio." })}
          >
            <option value="">-- Seleccionar --</option>
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miércoles">Miércoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
            <option value="Sábado">Sábado</option>
            <option value="Domingo">Domingo</option>
          </select>
          {errors.dia && <p className="text-red-800">{errors.dia.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Hora Apertura <span className="text-red-600">*</span></label>
          <input
            type="time"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            {...register("horaApertura", {
              required: "La hora de apertura es obligatoria.",
              pattern: {
                value: /^([01]\d|2[0-3]):([0-5]\d)$/,
                message: "Formato de hora inválido (HH:MM)."
              }
            })}
          />
          {errors.horaApertura && <p className="text-red-800">{errors.horaApertura.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Hora Cierre <span className="text-red-600">*</span></label>
          <input
            type="time"
            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            {...register("horaCierre", {
              required: "La hora de cierre es obligatoria.",
              pattern: {
                value: /^([01]\d|2[0-3]):([0-5]\d)$/,
                message: "Formato de hora inválido (HH:MM)."
              }
            })}
          />
          {errors.horaCierre && <p className="text-red-800">{errors.horaCierre.message}</p>}
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
          value="Crear Horario"
          className="bg-gray-800 w-full p-2 mt-5 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-600 cursor-pointer transition-all"
        />
      </form>
    </div>
  );
};

export default CreateHorario;
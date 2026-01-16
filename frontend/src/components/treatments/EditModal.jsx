// frontend/src/components/treatments/EditModal.jsx
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";

// Función para obtener el día de la semana en español desde una cadena YYYY-MM-DD
const getDayName = (dateString) => {
  // Asegurarse de que la fecha esté en formato válido
  if (!dateString || dateString.length !== 10) return "";
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day); // Meses en JS son 0-indexados
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  return days[date.getDay()];
};

// Función para validar si un día tiene horario activo
const isBusinessDay = (dayName, horariosActivos) => {
  return horariosActivos?.some(h => h.dia === dayName && h.estado === true);
};

// Función para obtener el horario de un día específico
const getHorarioByDay = (dayName, horariosActivos) => {
  return horariosActivos?.find(h => h.dia === dayName && h.estado === true);
};

// Función para convertir "HH:mm" a minutos desde medianoche
const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

// Función para validar si una fecha es hoy o futura (sin considerar zona horaria)
const isValidDate = (dateString) => {
  if (!dateString) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(dateString);
  selectedDate.setHours(0, 0, 0, 0);
  return selectedDate >= today;
};

const EditModal = ({ treatment, onClose, onRefresh, horariosActivos }) => {
  const [formData, setFormData] = useState({
    nombre: treatment.nombre,
    descripcion: treatment.descripcion,
    prioridad: treatment.prioridad,
    precio: treatment.precio,
    fechaCita: treatment.fechaCita ? treatment.fechaCita.split('T')[0] : "", // Solo YYYY-MM-DD
    horaCita: treatment.horaCita,
  });

  // Estados para los mensajes de error
  const [fechaError, setFechaError] = useState("");
  const [horaError, setHoraError] = useState("");

  const { fetchDataBackend } = useFetch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar el error del campo que se está modificando
    if (name === 'fechaCita') setFechaError('');
    if (name === 'horaCita') setHoraError('');
  };

  // Validar fecha cuando cambia
  useEffect(() => {
    if (!formData.fechaCita || !horariosActivos) return;

    // Validar que no sea una fecha pasada
    if (!isValidDate(formData.fechaCita)) {
      setFechaError("No puedes seleccionar una fecha pasada.");
      return;
    }

    const diaSemana = getDayName(formData.fechaCita);

    // Validar que sea un día laborable
    if (!isBusinessDay(diaSemana, horariosActivos)) {
      setFechaError(`No atendemos los ${diaSemana.toLowerCase()}.`);
      return;
    }

    setFechaError(""); // Fecha válida
  }, [formData.fechaCita, horariosActivos]);

  // Validar hora cuando cambia
  useEffect(() => {
    if (!formData.fechaCita || !formData.horaCita || !horariosActivos) return;

    const diaSemana = getDayName(formData.fechaCita);
    const horarioDia = getHorarioByDay(diaSemana, horariosActivos);

    if (!horarioDia) {
      setHoraError(`No hay horario definido para ${diaSemana}.`);
      return;
    }

    const horaInputMin = timeToMinutes(formData.horaCita);
    const aperturaMin = timeToMinutes(horarioDia.horaApertura);
    const cierreMin = timeToMinutes(horarioDia.horaCierre);

    // Validar que la hora esté dentro del rango
    if (horaInputMin < aperturaMin || horaInputMin >= cierreMin) {
      setHoraError(
        `Nuestro horario para ${diaSemana} es de ${horarioDia.horaApertura} a ${horarioDia.horaCierre}.`
      );
      return;
    }

    setHoraError(""); // Hora válida
  }, [formData.horaCita, formData.fechaCita, horariosActivos]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones finales antes de enviar
    if (!formData.fechaCita || !formData.horaCita) {
      toast.error("Por favor, completa la fecha y la hora.");
      return;
    }

    if (fechaError || horaError) {
      toast.error("Corrige los errores en la fecha o la hora antes de guardar.");
      return;
    }

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/atencion/${treatment._id}`;
      const storedUser = JSON.parse(localStorage.getItem("auth-token"));
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedUser.state.token}`,
      };

      const dataToUpdate = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        prioridad: formData.prioridad,
        precio: parseFloat(formData.precio),
        fechaCita: formData.fechaCita, // Ya está en formato YYYY-MM-DD
        horaCita: formData.horaCita,
      };

      const response = await fetchDataBackend(url, dataToUpdate, "PUT", headers);

      if (response) {
        onClose();
        onRefresh();
      }
    } catch (error) {
      console.error("Error al actualizar la atención:", error);
      toast.error("No se pudo actualizar la reserva.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Editar Reserva</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold">
              Fecha de la cita <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
              value={formData.fechaCita}
              onChange={handleChange}
              name="fechaCita"
              required
              min={new Date().toISOString().split('T')[0]} // Esto también puede tener problemas de zona horaria
            />
            {fechaError && <p className="text-red-600 text-sm mt-1">{fechaError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">
              Hora de la cita <span className="text-red-600">*</span>
            </label>
            <input
              type="time"
              className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
              value={formData.horaCita}
              onChange={handleChange}
              name="horaCita"
              required
            />
            {horaError && <p className="text-red-600 text-sm mt-1">{horaError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">
              Detalles Adicionales <span className="text-red-600">*</span>
            </label>
            <textarea
              className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
              value={formData.descripcion}
              onChange={handleChange}
              name="descripcion"
              required
            />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              disabled={!!fechaError || !!horaError}
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
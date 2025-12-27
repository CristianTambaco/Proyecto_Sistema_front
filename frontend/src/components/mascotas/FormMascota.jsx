// frontend/src/components/mascotas/FormMascota.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import { ToastContainer } from "react-toastify";

const FormMascota = ({ mascota, onSubmit }) => {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
    const { fetchDataBackend } = useFetch();

    useEffect(() => {
        if (mascota) {
            setValue("nombre", mascota.nombre || "");
            setValue("tipoPelaje", mascota.tipoPelaje || "");
            setValue("caracteristicas", mascota.caracteristicas || "");
            setValue("fechaNacimiento", mascota.fechaNacimiento ? new Date(mascota.fechaNacimiento).toISOString().split('T')[0] : "");
            setValue("estado", mascota.estado !== undefined ? mascota.estado.toString() : "true");

            // --- NUEVOS CAMPOS ---
            setValue("tamaño", mascota.tamaño || "mediano");
            setValue("esterilizado", mascota.esterilizado !== undefined ? mascota.esterilizado.toString() : "");
                }
    }, [mascota, setValue]);

    const handleImageUpload = (e) => {
        // Esta función se puede implementar si quieres mostrar una vista previa
    };




    const today = new Date().toISOString().split("T")[0];

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 30);
    const minDateFormatted = minDate.toISOString().split("T")[0];





    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ToastContainer />
            {/* Nombre */}
            <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Nombre <span className="text-red-600">*</span></label>
                <input
                    type="text"
                    className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                    {...register("nombre", {
                        required: "El nombre es obligatorio",
                        minLength: {
                            value: 3,
                            message: "El nombre debe tener al menos 3 caracteres"
                        },
                        maxLength: {
                            value: 20,
                            message: "El nombre no puede superar los 20 caracteres"
                        },
                        pattern: {
                            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                            message: "El nombre solo puede contener letras"
                        }
                    })}
                />
                {errors.nombre && <p className="text-red-800">{errors.nombre.message}</p>}
            </div>

            {/* Tipo de Pelaje */}
            <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Sociable con otros animales <span className="text-red-600">*</span></label>
                <select
                    className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                    {...register("tipoPelaje", { required: "Seleccione una opción" })}
                >
                    <option value="">-- Seleccionar --</option>
                    <option value="si">Si</option>
                    <option value="no">No</option>
                </select>
                {errors.tipoPelaje && <p className="text-red-800">{errors.tipoPelaje.message}</p>}
            </div>

            {/* Características */}
            <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Características <span className="text-red-600">*</span></label>
                <textarea
                    className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                    rows="3"
                    {...register("caracteristicas", {
                        required: "Las características son obligatorias.",
                        minLength: {
                            value: 3,
                            message: "Debe existir al menos 3 caracteres"
                        },
                    })}
                />
                {errors.caracteristicas && <p className="text-red-800">{errors.caracteristicas.message}</p>}
            </div>

            {/* Fecha de Nacimiento */}
            <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                    Fecha de Nacimiento
                </label>
                <input
                    type="date"
                    className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                    min={minDateFormatted}
                    max={today}
                    {...register("fechaNacimiento", {
                        validate: {
                            notFuture: (value) =>
                                !value || value <= today || "La fecha no puede ser futura",
                            notTooOld: (value) =>
                                !value || value >= minDateFormatted || "La mascota no puede tener más de 30 años",
                        },
                    })}
                />
                {errors.fechaNacimiento && (
                    <p className="text-red-800">{errors.fechaNacimiento.message}</p>
                )}
            </div>



            {/* --- NUEVOS CAMPOS --- */}
            {/* --- TAMAÑO  --- */}
            <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Tamaño<span className="text-red-600">*</span></label>
            <select
                className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                {...register("tamaño", { required: "El tamaño es obligatorio" })}
            >
                <option value="">-- Seleccionar --</option>
                <option value="pequeño">Pequeño</option>
                <option value="mediano">Mediano</option>
                <option value="grande">Grande</option>
            </select>
            {errors.tamaño && <p className="text-red-800">{errors.tamaño.message}</p>}
            </div>

            {/* --- ESTERILIZADO  --- */}
            <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">¿Está esterilizado/a?<span className="text-red-600">*</span></label>
            <select
                className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                {...register("esterilizado", { required: "Este campo es obligatorio" })}
            >
                <option value="">-- Seleccionar --</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
            </select>
            {errors.esterilizado && <p className="text-red-800">{errors.esterilizado.message}</p>}
            </div>





            {/* Estado */}

            {/* <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Estado</label>
                <select
                    className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                    {...register("estado")}
                >
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                </select>
            </div> */}

            {/* Subir Imagen */}


            <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Imagen de la Mascota</label>
                <div className="flex items-center gap-4">
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
                    {watch("imagen")?.[0] ? (
                        <span className="text-sm text-gray-600 truncate max-w-xs">
                            {watch("imagen")[0].name}
                        </span>
                    ) : (
                        <span className="text-sm text-gray-500">Sin archivos seleccionados</span>
                    )}
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        {...register("imagen")}
                    />
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
                value={mascota ? "Actualizar Mascota" : "Registrar Mascota"}
                className="bg-gray-800 w-full p-2 mt-5 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-600 cursor-pointer transition-all"
            />
        </form>
    );
};

export default FormMascota;
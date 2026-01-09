// frontend/src/components/treatments/EditModal.jsx
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { ToastContainer, toast } from "react-toastify";

const EditModal = ({ treatment, onClose, onRefresh }) => {
    const [formData, setFormData] = useState({
        nombre: treatment.nombre,
        descripcion: treatment.descripcion,
        prioridad: treatment.prioridad,
        precio: treatment.precio,
        fechaCita: treatment.fechaCita
            ? new Date(treatment.fechaCita).toISOString().split("T")[0]
            : "",
        horaCita: treatment.horaCita,
    });

    const { fetchDataBackend } = useFetch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/atencion/${treatment._id
                }`;
            const storedUser = JSON.parse(localStorage.getItem("auth-token"));
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedUser.state.token}`,
            };
            // Preparar los datos para actualizar
            const dataToUpdate = {
                nombre: formData.nombre,
                descripcion: formData.descripcion,
                prioridad: formData.prioridad,
                precio: parseFloat(formData.precio), // Asegurar que sea número
                fechaCita: formData.fechaCita,
                horaCita: formData.horaCita,
            };
            const response = await fetchDataBackend(
                url,
                dataToUpdate,
                "PUT",
                headers
            );
            if (response) {
                // toast.success("Atención actualizada correctamente.");

                onClose(); // Cerrar el modal
                onRefresh(); // Refrescar la lista
            }
        } catch (error) {
            console.error("Error al actualizar la atención:", error);
            toast.error("No se pudo actualizar la atención.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Editar</h2>
                <form onSubmit={handleSubmit}>


                    {/* <div className="mb-4">
                        <label className="block text-sm font-semibold">
                            Nombre <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                            value={formData.nombre}
                            onChange={handleChange}
                            name="nombre"
                            required
                        />
                    </div> */}

                    
                    
                    {/* <div className="mb-4">
                        <label className="block text-sm font-semibold">
                            Prioridad <span className="text-red-600">*</span>
                        </label>
                        <select
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                            value={formData.prioridad}
                            onChange={handleChange}
                            name="prioridad"
                            required
                        >
                            <option value="Baja">Baja</option>
                            <option value="Media">Media</option>
                            <option value="Alta">Alta</option>
                        </select>
                    </div> */}


                    {/* <div className="mb-4">
                        <label className="block text-sm font-semibold">
                            Precio <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                            value={formData.precio}
                            onChange={handleChange}
                            name="precio"
                            required
                            min="0"
                        />
                    </div> */}

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
                        />
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

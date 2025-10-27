import { useForm } from "react-hook-form";
import storeTreatments from "../../context/storeTreatments";


import storeAuth from "../../context/storeAuth"


const ModalTreatments = ({patientID}) => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { toggleModal, registerTreatments } = storeTreatments()


    const { rol } = storeAuth()


    const registerTreatmentsForm = (data) => {
        const newData = { ...data, cliente: patientID }
        registerTreatments(newData)
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-gray-700 rounded-lg shadow-lg overflow-y-auto p-6 max-w-lg w-full border border-gray-700 relative">

                <p className="text-white font-bold text-lg text-center mt-4">
                    
                    {
                        rol === "estilista" ? "Nuevo Registro" :
                        rol === "administrador" ? "Nuevo Registro" :
                        rol === "cliente" ? "--Nuevo Registro" :
                        "--Nuevo Registro.--"
                        }
                    </p>



                <form className="p-10" onSubmit={handleSubmit(registerTreatmentsForm)}>
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-50">Nombre</label>
                        <input
                            type="text"
                            placeholder="Ingresa el nombre"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5 bg-gray-50"
                            {...register("nombre", { required: "El nombre es obligatorio",

                                minLength: {
                                    value: 2,
                                    message: "El nombre debe tener al menos 2 caracteres"
                                },
                                pattern: {
                                    value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                    message: "El nombre solo puede contener letras"
                                }

                             })}
                        />
                            {errors.nombre && <p className="text-red-500">{errors.nombre.message}</p>}
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-50">Descripción</label>
                        <textarea
                            type="text"
                            placeholder="Ingresa la descripción"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5 bg-gray-50"
                            {...register("descripcion", { required: "La descripción es obligatorio",

                                minLength: {
                                    value: 2,
                                    message: "La descripción debe tener al menos 2 caracteres"
                                },
                                pattern: {
                                    value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                    message: "La descripción solo puede contener letras"
                                }


                             })}
                        />
                            {errors.descripcion && <p className="text-red-500">{errors.descripcion.message}</p>}
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-50">Prioridad</label>
                        <select
                            id="prioridad"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5 bg-gray-50"
                            {...register("prioridad", { required: "La prioridad es obligatorio" })}
                        >
                            <option value="">--- Seleccionar ---</option>
                            <option value="Baja">Baja</option>
                            <option value="Media">Media</option>
                            <option value="Alta">Alta</option>
                        </select>
                            {errors.prioridad && <p className="text-red-500">{errors.prioridad.message}</p>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-50">Precio</label>
                        <input
                            type="number"
                            step="any" 
                            placeholder="Ingresa el precio"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5 bg-gray-50"
                            {...register("precio", {
                                required: "El precio es obligatorio",
                                
                                min: { 
                                    value: 0, message: "El precio no puede ser negativo" 
                                },
                                max: {
                                    value: 1000, // <-- Valor máximo permitido
                                    message: "El precio no puede ser mayor a 1000"
                                }
                            })}
                        />
                        {errors.precio && <p className="text-red-500">{errors.precio.message}</p>}
                    </div>

                    <div className="flex justify-center gap-5">
                        <input
                            type="submit"
                            className="bg-green-700 px-6 text-slate-300 rounded-lg hover:bg-green-900 cursor-pointer"
                            value="Registrar"
                        />
                        <button className="sm:w-auto leading-3 text-center text-white px-6 py-4 rounded-lg bg-red-500 hover:bg-red-900"
                            onClick={() => { toggleModal() }}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalTreatments;

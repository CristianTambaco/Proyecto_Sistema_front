// frontend/src/components/create/Form.jsx
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import {generateAvatar,convertBlobToBase64} from "../../helpers/consultarIA"
import { toast, ToastContainer } from "react-toastify"
import storeAuth from "../../context/storeAuth"; // <-- Importar storeAuth

export const Form = ({patient}) => {

    const [avatar, setAvatar] = useState({
        image: "https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_1280.png",
        prompt: "",
        loading: false
    })

    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm()
    const { fetchDataBackend } = useFetch()
    const { rol } = storeAuth(); // <-- Obtener el rol del usuario autenticado

    const selectedOption = watch("imageOption")

    const handleGenerateImage = async () => {
        setAvatar(prev => ({ ...prev, loading: true }))
        const blob = await generateAvatar(avatar.prompt)
        if (blob.type === "image/jpeg") {
            // blob:http://localhost/ea27cc7d-
            const imageUrl = URL.createObjectURL(blob)
            // data:image/png;base64,iVBORw0KGg
            const base64Image = await convertBlobToBase64(blob)
            setAvatar(prev => ({ ...prev, image: imageUrl, loading: false }))
            setValue("avatarMascotaIA", base64Image)
        }
        else {
            toast.error("Error al generar la imagen, vuelve a intentarlo dentro de 1 minuto");
            setAvatar(prev => ({ ...prev, image: "https://cdn-icons-png.flaticon.com/512/2138/2138440.png", loading: false }))
            setValue("avatarMascotaIA", avatar.image)
        }
    }

    const registerPatient = async (data) => {
        const formData = new FormData()
        Object.keys(data).forEach((key) => {
            if (key === "imagen") {
                formData.append("imagen", data.imagen[0])
            } else {
                formData.append(key, data[key])
            }
        })

        let url = `${import.meta.env.VITE_BACKEND_URL}/cliente/registro`
        const storedUser = JSON.parse(localStorage.getItem("auth-token"))
        const headers= {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${storedUser.state.token}`
            }

        let response
        if (patient?._id) {
            url = `${import.meta.env.VITE_BACKEND_URL}/cliente/actualizar/${patient._id}`
            response = await fetchDataBackend(url, formData, "PUT", headers)
        }
        else{
            response = await fetchDataBackend(url, formData, "POST", headers)
        }
        if (response) {
            setTimeout(() => {
                navigate("/dashboard/listar")
            }, 2000);
        }
    }

    useEffect(() => {
        if (patient) {
            reset({
                cedulaPropietario: patient?.cedulaPropietario,
                nombrePropietario: patient?.nombrePropietario,
                emailPropietario: patient?.emailPropietario,
                celularPropietario: patient?.celularPropietario,
                nombreMascota: patient?.nombreMascota,
                tipoPelajeMascota: patient?.tipoPelajeMascota,
                caracteristicasMascota: patient?.caracteristicasMascota,
                estadoMascota: patient.estadoMascota?.toString(), // Convertir booleano a string para el select
            })
        }
    }, [patient, reset])

    return (
        <form onSubmit={handleSubmit(registerPatient)}>
            <ToastContainer />

            {/* Información del propietario */}
            <fieldset className="border-2 border-gray-500 p-6 rounded-lg shadow-lg">
                <legend className="text-xl font-bold text-gray-700 bg-gray-200 px-4 py-1 rounded-md">
                    Información del propietario
                </legend>
                {/* Cédula */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">
                        Cédula <span className="text-red-600">*</span>
                    </label>
                    <div className="flex items-center gap-10 mb-5">
                        <input
                            type="number"
                            placeholder="Ingresa la cédula"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                            {...register("cedulaPropietario", { required: "La cédula es obligatoria",
                                minLength: {
                                    value: 10,
                                    message: "La cédula debe tener al menos 10 dígitos",
                                },
                                maxLength: {
                                    value: 10,
                                    message: "La cédula no puede tener más de 10 dígitos",
                                },
                                validate: {
                                    soloNumeros: (value) =>
                                        /^\d+$/.test(value) || "La cédula solo debe contener números",
                                    noCeroInicial: (value) =>
                                        !/^0/.test(value) || "La cédula no puede comenzar con 0",
                                },
                            })}
                        />
                    </div>
                    {errors.cedulaPropietario && <p className="text-red-800">{errors.cedulaPropietario.message}</p>}
                </div>

                {/* Nombre completo */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">
                        Nombres completos <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Ingresa nombre y apellido"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        {...register("nombrePropietario", { required: "El campo es obligatorio",
                            minLength: {
                                value: 5,
                                message: "Debe tener al menos 5 caracteres",
                            },
                            maxLength: {
                                value: 50,
                                message: "No puede superar los 50 caracteres",
                            },
                            pattern: {
                                value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                                message: "Solo se permiten letras y espacios",
                            },
                            validate: {
                                sinEspaciosDobles: (value) =>
                                    !/\s{2,}/.test(value) || "No se permiten espacios dobles",
                                sinEspaciosExtremos: (value) =>
                                    value.trim() === value || "No debe iniciar o terminar con espacios",
                            },
                        })}
                    />
                    {errors.nombrePropietario && <p className="text-red-800">{errors.nombrePropietario.message}</p>}
                </div>

                {/* Correo electrónico */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">
                        Correo electrónico <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="emaile"
                        placeholder="Ingresa el correo electrónico"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        {...register("emailPropietario", { required: "El correo electrónico es obligatorio",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Ingresa un correo electrónico válido"
                            }
                        })}
                    />
                    {errors.emailPropietario && <p className="text-red-800">{errors.emailPropietario.message}</p>}
                </div>

                {/* Celular */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">
                        Celular <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Ingresa el celular"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        {...register("celularPropietario", { required: "El celular es obligatorio",
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
                                    message: "El teléfono debe tener máximo 10 dígitos"
                                },
                                validate: value => {
                                if (/^0+$/.test(value)) return "Teléfono inválido"; // todo ceros
                                }
                        })}
                    />
                    {errors.celularPropietario && <p className="text-red-800">{errors.celularPropietario.message}</p>}
                </div>
            </fieldset>

            {/* Información de la mascota */}
            <fieldset className="border-2 border-gray-500 p-6 rounded-lg shadow-lg mt-10">
                <legend className="text-xl font-bold text-gray-700 bg-gray-200 px-4 py-1 rounded-md">
                    Información de la mascota
                </legend>

                {/* Nombre de la mascota */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">
                        Nombre <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Ingresar nombre"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        {...register("nombreMascota", { required: "El campo es obligatorio",
                            minLength: {
                                value: 5,
                                message: "El nombre debe tener al menos 5 caracteres"
                            },
                            pattern: {
                                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                message: "El nombre solo puede contener letras"
                            },
                            maxLength: {
                                    value: 20,
                                    message: "El nombre no puede superar los 20 caracteres"
                                },
                        })}
                    />
                    {errors.nombreMascota && <p className="text-red-800">{errors.nombreMascota.message}</p>}
                </div>

                {/* Tipo de mascota */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">
                        Sociable con otros animales <span className="text-red-600">*</span>
                    </label>
                    <select
                        id='prioridad'
                        className='block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5'
                        {...register("tipoPelajeMascota", { required: "Seleccione una opción" })}
                    >
                        <option value="">--- Seleccionar ---</option>
                        <option value="si">Si</option>
                        <option value="no">No</option>
                    </select>
                    {errors.tipoPelajeMascota && <p className="text-red-800">{errors.tipoPelajeMascota.message}</p>}
                </div>

                {/* Detalles */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">
                        Detalles adicionales <span className="text-red-600">*</span>
                    </label>
                    <textarea
                        placeholder="Detalles"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        {...register("caracteristicasMascota", { required: "El campo es obligatorio",
                            minLength: {
                                    value: 5,
                                    message: "Debe existir al menos 5 caracteres"
                                },
                        })}
                    />
                    {errors.caracteristicasMascota && <p className="text-red-800">{errors.caracteristicasMascota.message}</p>}
                </div>

                {/* Estado de la mascota - Ocultar si el rol es cliente */}
                {patient && rol !== 'cliente' && ( // Mostrar solo si es edición Y el rol no es cliente
                    <div>
                        <label className="mb-2 block text-sm font-semibold">
                            Estado <span className="text-red-600">*</span>
                        </label>
                        <select
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                            {...register("estadoMascota", { required: "El estado es obligatorio." })}
                        >
                            <option value={true}>Activo</option>
                            <option value={false}>Inactivo</option>
                        </select>
                        {errors.estadoMascota && <p className="text-red-800">{errors.estadoMascota.message}</p>}
                    </div>
                )}
            </fieldset>

            {/* Botón de submit */}
            <input
                type="submit"
                className="bg-gray-800 w-full p-2 mt-5 text-slate-300 uppercase font-bold rounded-lg 
                hover:bg-gray-600 cursor-pointer transition-all"
                value={patient ? "Actualizar" : "Registrar"}
            />
        </form>
    )
}
// frontend/src/pages/CreateCliente.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import useFetch from "../hooks/useFetch";

const CreateCliente = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { fetchDataBackend } = useFetch(); // Usar el hook de fetch

    const password = watch("passwordPropietario"); // Para validar confirmación

    const crearCliente = async (data) => {
        // Validar que las contraseñas coincidan antes de enviar
        if (data.passwordPropietario !== data.confirmPassword) {
            toast.error("Las contraseñas no coinciden.");
            return;
        }

        try {
            // Preparar los datos para enviar al backend
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                if (key === "imagen" && data.imagen?.[0]) {
                    formData.append("imagen", data.imagen[0]);
                } else if (key !== "confirmPassword") { // No enviar confirmPassword al backend
                    formData.append(key, data[key]);
                }
            });

            const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/registro-admin`; // <-- Nueva URL
            const storedUser = JSON.parse(localStorage.getItem("auth-token"));
            const headers = {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${storedUser.state.token}`,
            };

            const response = await fetchDataBackend(url, formData, "POST", headers);
            if (response) { // Si la creación fue exitosa según el backend

                // toast.success("Cliente creado exitosamente.");

                setTimeout(() => {
                    navigate("/dashboard/listar"); // Redirige a la lista de clientes
                }, 2000);
            }
        } catch (error) {
            console.log(error);
            // El error ya debería ser manejado por fetchDataBackend
        }
    };

    return (
        <div>
            <ToastContainer />
            <h1 className='font-black text-4xl text-gray-500'>Registrar Cliente.</h1>
            <hr className='my-4 border-t-2 border-gray-300' />
            <p className='mb-8'>Este módulo te permite registrar un nuevo cliente.</p>

            <form onSubmit={handleSubmit(crearCliente)}>
                {/* Información del propietario */}
                <fieldset className="border-2 border-gray-500 p-6 rounded-lg shadow-lg">
                    <legend className="text-xl font-bold text-gray-700 bg-gray-200 px-4 py-1 rounded-md">
                        Información del propietario
                    </legend>
                    {/* Cédula */}
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Cédula <span className="text-red-600">*</span></label>
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={10}
                            placeholder="Ingresa la cédula"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/\D/g, "");
                            }}
                            {...register("cedulaPropietario", {
                                required: "La cédula es obligatoria",
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
                                    
                                    
                                },
                            })}
                        />
                        {errors.cedulaPropietario && <p className="text-red-800">{errors.cedulaPropietario.message}</p>}
                    </div>
                    {/* Nombre completo */}
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Nombres completos <span className="text-red-600">*</span></label>
                        <input
                            type="text"
                            placeholder="Ingresa nombre y apellido"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                            {...register("nombrePropietario", {
                                required: "El nombre completo es obligatorio",
                                minLength: {
                                    value: 3,
                                    message: "Debe tener al menos 3 caracteres",
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
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Correo electrónico <span className="text-red-600">*</span></label>
                        <input
                            type="emaile"
                            placeholder="Ingresa el correo electrónico"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                            {...register("emailPropietario", {
                                required: "El correo electrónico es obligatorio",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Ingresa un correo electrónico válido",
                                },
                            })}
                        />
                        {errors.emailPropietario && <p className="text-red-800">{errors.emailPropietario.message}</p>}
                    </div>
                    {/* Celular */}
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Celular <span className="text-red-600">*</span></label>
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={10}
                            placeholder="Ingresa el celular"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/\D/g, "");
                            }}
                            {...register("celularPropietario", {
                                required: "El celular es obligatorio",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "El teléfono solo puede contener números",
                                },
                                minLength: {
                                    value: 10,
                                    message: "El teléfono debe tener al menos 10 dígitos",
                                },
                                maxLength: {
                                    value: 10,
                                    message: "El teléfono debe tener 10 dígitos",
                                },
                                validate: (value) => {
                                    if (/^0+$/.test(value)) return "Teléfono inválido"; // todo ceros
                                },
                            })}
                        />
                        {errors.celularPropietario && <p className="text-red-800">{errors.celularPropietario.message}</p>}
                    </div>
                    {/* Contraseña */}
                    <div className="mb-3 relative">
                        <label className="mb-2 block text-sm font-semibold">Contraseña <span className="text-red-600">*</span></label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Ingresa la contraseña"
                                className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 pr-10"
                                {...register("passwordPropietario", {
                                    required: "La contraseña es obligatoria",
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
                                            },

                                    // Puedes añadir más validaciones aquí (patrón, etc.)
                                })}
                            />
                            {errors.passwordPropietario && <p className="text-red-800">{errors.passwordPropietario.message}</p>}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>
                    {/* Confirmar Contraseña */}
                    <div className="mb-3 relative">
                        <label className="mb-2 block text-sm font-semibold">Confirmar Contraseña <span className="text-red-600">*</span></label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirma la contraseña"
                                className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 pr-10"
                                {...register("confirmPassword", {
                                    required: "La confirmación de contraseña es obligatoria",
                                    validate: (value) => value === password || "Las contraseñas no coinciden",
                                })}
                            />
                            {errors.confirmPassword && <p className="text-red-800">{errors.confirmPassword.message}</p>}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>
                </fieldset>

                {/* Información de la mascota */}
                <fieldset className="border-2 border-gray-500 p-6 rounded-lg shadow-lg mt-10">
                    <legend className="text-xl font-bold text-gray-700 bg-gray-200 px-4 py-1 rounded-md">
                        Información de la mascota
                    </legend>
                    {/* Nombre de la mascota */}
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Nombre <span className="text-red-600">*</span></label>
                        <input
                            type="text"
                            placeholder="Ingresar nombre"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                            {...register("nombreMascota", {
                                required: "El campo es obligatorio",
                                minLength: {
                                    value: 3,
                                    message: "El nombre debe tener al menos 3 caracteres",
                                },
                                pattern: {
                                    value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                    message: "El nombre solo puede contener letras",
                                },
                                maxLength: {
                                    value: 20,
                                    message: "El nombre no puede superar los 20 caracteres",
                                },
                            })}
                        />
                        {errors.nombreMascota && <p className="text-red-800">{errors.nombreMascota.message}</p>}
                    </div>
                    {/* Tipo de pelaje */}
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Sociable con otros animales <span className="text-red-600">*</span></label>
                        <select
                            id="prioridad"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                            {...register("tipoPelajeMascota", { required: "Seleccione una opción" })}
                        >
                            <option value="">--- Seleccionar ---</option>
                            <option value="si">Si</option>
                            <option value="no">No</option>
                        </select>
                        {errors.tipoPelajeMascota && (
                            <p className="text-red-800">{errors.tipoPelajeMascota.message}</p>
                        )}
                    </div>
                    {/* Detalles adicionales */}
                    <div className="mb-3">
                        <label className="mb-2 block text-sm font-semibold">Detalles adicionales <span className="text-red-600">*</span></label>
                        <textarea
                            placeholder="Detalles"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                            {...register("caracteristicasMascota", {
                                required: "El campo es obligatorio",
                                minLength: {
                                    value: 3,
                                    message: "Debe existir al menos 3 caracteres",
                                },
                            })}
                        />
                        {errors.caracteristicasMascota && (
                            <p className="text-red-800">{errors.caracteristicasMascota.message}</p>
                        )}
                    </div>
                </fieldset>

                {/* Botón de submit */}
                <input
                    type="submit"
                    className="bg-gray-800 w-full p-2 mt-5 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-600 cursor-pointer transition-all"
                    value="Registrar Cliente"
                />
            </form>

            <div className="mt-5 text-xs border-b-2 py-4 ">
            </div>
            <div className="mt-3 text-sm flex justify-between items-center">
                <Link to="/dashboard/listar" className="underline text-sm text-gray-400 hover:text-gray-900">Volver a Clientes</Link>
            </div>
        </div>
    );
};

export default CreateCliente;
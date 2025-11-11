import { useEffect } from "react"
import storeProfile from "../../context/storeProfile"
import { useForm } from "react-hook-form"

const FormularioPerfil = () => {
    const { user,updateProfile } = storeProfile()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const updateUser = async(data) => {
        updateProfile(data,user._id)
    }

    useEffect(() => {
        if (user) {
            reset({
                nombre: user?.nombre,
                apellido: user?.apellido,
                direccion: user?.direccion,
                celular: user?.celular,
                email: user?.email,
            })
        }
    }, [user])


    return (
        <form onSubmit={handleSubmit(updateUser)}>
            <div>
                <label className="mb-2 block text-sm font-semibold">
                    Nombre <span className="text-red-600">*</span>
                </label>

                <input
                    type="text"
                    placeholder="Ingresa tu nombre"
                    className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                    {...register("nombre", { required: "El nombre es obligatorio", 

                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "El nombre solo puede contener letras"
                        },
                        minLength: {
                            value: 5,
                            message: "El nombre debe tener al menos 5 caracteres"
                        },
                        maxLength: {
                            value: 20,
                            message: "El nombre no puede exceder 20 caracteres"
                        }

                    })}
                />
                {errors.nombre && <p className="text-red-800">{errors.nombre.message}</p>}
            </div>
            <div>

                <label className="mb-2 block text-sm font-semibold">
                    Apellido <span className="text-red-600">*</span>
                </label>

                <input
                    type="text"
                    placeholder="Ingresa tu apellido"
                    className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                    {...register("apellido", { required: "El apellido es obligatorio",
                        
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "El apellido solo puede contener letras"
                        },
                        minLength: {
                            value: 5,
                            message: "El apellido debe tener al menos 5 caracteres"
                        },
                        maxLength: {
                            value: 20,
                            message: "El apellido no puede exceder 20 caracteres"
                        }

                    })}
                />
                {errors.apellido && <p className="text-red-800">{errors.apellido.message}</p>}

            </div>
            <div>

                <label className="mb-2 block text-sm font-semibold">
                    Dirección <span className="text-red-600">*</span>
                </label>

                <input
                    type="text"
                    placeholder="Ingresa tu dirección"
                    className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                    {...register("direccion", { required: "La dirección es obligatoria",

                        pattern: {
                            value: /^[A-Za-z0-9\s.,#-]+$/,
                            message: "La dirección contiene caracteres inválidos"
                        },
                        minLength: {
                            value: 5,
                            message: "La dirección debe tener al menos 5 caracteres"
                        },
                        maxLength: {
                            value: 100,
                            message: "La dirección no puede exceder 100 caracteres"
                        }


                    })}
                />
                {errors.direccion && <p className="text-red-800">{errors.direccion.message}</p>}

            </div>
            <div>


                <label className="mb-2 block text-sm font-semibold">
                    Teléfono <span className="text-red-600">*</span>
                </label>

                <input
                    type="number"
                    placeholder="Ingresa tu teléfono"
                    className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                    {...register("celular", { required: "El celular es obligatorio",
                        
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "El teléfono solo puede contener números"
                        },
                        minLength: {
                            value: 10,
                            message: "El teléfono debe tener 10 dígitos."
                        },
                        maxLength: {
                            value: 10,
                            message: "El teléfono debe tener 10 dígitos"
                        },

                        validate: value => {                
                        if (/^0+$/.test(value)) return "Teléfono inválido"; // todo ceros                
                        }

                    })}
                />
                {errors.celular && <p className="text-red-800">{errors.celular.message}</p>}

            </div>
            <div>


                <label className="mb-2 block text-sm font-semibold">
                    Correo electrónico <span className="text-red-600">*</span>
                </label>


                <input
                    type="emaile"
                    placeholder="Ingresa tu correo"
                    className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                    {...register("email", { required: "El correo es obligatorio",
                        
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Ingresa un correo electrónico válido"
                        }

                    })}
                />
                {errors.email && <p className="text-red-800">{errors.email.message}</p>}

            </div>

            <input
                type="submit"
                className="bg-gray-800 w-full p-2 mt-5 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-600 cursor-pointer transition-all"
                value="Actualizar"
            />
        </form>
    );
};

export default FormularioPerfil;

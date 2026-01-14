import {Link} from 'react-router'
import {useForm} from 'react-hook-form';
import useFetch from '../hooks/useFetch';
import {ToastContainer} from 'react-toastify';


export const Forgot = () => {

    const{register,handleSubmit,formState:{errors}}= useForm()

    const {fetchDataBackend} = useFetch()

    const sendMail = async (data) => {
        // Modificar el cuerpo del formulario para enviar también el rol
        const payload = {
            email: data.email,
            rol: data.rol // <-- Añadir el rol seleccionado
        };

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/recuperarpassword`; // <-- Asumiendo que esta ruta manejará todos los roles
            const response = await fetchDataBackend(url, payload, 'POST');
            if (response) {
                // Puedes mostrar un mensaje más específico
                // toast.success("Revisa tu correo para restablecer la contraseña.");
            }
        } catch (error) {
            console.log(error);
            // El toast de error ya lo maneja fetchDataBackend
        }
    };

    return (
        <div className="flex flex-col sm:flex-row h-screen">
            <ToastContainer />
            
            {/* Contenedor de formulario */}
            <div className="w-full sm:w-1/2 h-screen bg-white flex justify-center items-center">
                <div className="md:w-4/5 sm:w-full">
                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500">!Olvidaste tu contraseña¡</h1>
                    <small className="text-gray-400 block my-4 text-sm">No te preocupes</small>
                    <form onSubmit={handleSubmit(sendMail)}>
                        <div className="mb-1">
                            <label className="mb-2 block text-sm font-semibold">Correo electrónico</label>
                            <input
                                type="emaile"
                                placeholder="Ingresa un correo electrónico válido"
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                {...register("email", { required: "El correo electrónico es requerido" })}
                            />
                            {errors.email && <p className='text-red-800'>{errors.email.message}</p>}
                        </div>

                        {/* Selector de Rol */}
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Rol</label>
                            <select
                                {...register("rol")}
                                className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                            >
                                <option value="">-- Seleccione --</option>
                                <option value="cliente">Cliente</option>
                                <option value="estilista">Estilista</option>
                                {/* <option value="administrador">Administrador</option> */}
                            </select>
                            {errors.rol && <p className="text-red-800">{errors.rol.message}</p>}
                        </div>

                        <div className="mb-3">
                            <button className="bg-gray-600 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">Enviar correo</button>
                        </div>
                    </form>
                    <div className="mt-5 text-xs border-b-2 py-4 ">
                    </div>
                    <div className="mt-3 text-sm flex justify-between items-center">
                        <p>¿Ya posees una cuenta?</p>
                        <Link to="/login" className="py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">Iniciar sesión</Link>
                    </div>
                </div>
            </div>

            {/* Imagen de fondo */}
            <div className="w-full sm:w-1/2 h-screen bg-[url('/public/images/imageforgot.jpeg')]
                bg-no-repeat bg-cover bg-center sm:block hidden">
            </div>
        </div>
    );
}
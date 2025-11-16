// frontend/src/pages/Profile.jsx
import CardPassword from '../components/profile/CardPassword'
import { CardProfile } from '../components/profile/CardProfile'
import { CardProfileOwner } from '../components/profile/CardProfileOwner'
import FormProfileCliente from '../components/profile/FormProfileCliente'
import FormProfile from '../components/profile/FormProfile' // <-- Añadir esta línea
import storeProfile from '../context/storeProfile'
import { useEffect } from 'react'

const Profile = () => {
    const { user, profile } = storeProfile()

    useEffect(() => {
        profile();
    }, [profile]);

    if (!user) {
        return <div>Cargando perfil...</div>;
    }

    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Perfil</h1>
                <hr className='my-4 border-t-2 border-gray-300' />
                <p className='mb-8'>Este módulo muestra el perfil del usuario</p>
            </div>
            {
                user?.rol === "cliente"
                    ? (
                        <div className='flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap'>
                            <div className='w-full md:w-1/2'>
                                <FormProfileCliente />
                            </div>
                            <div className='w-full md:w-1/2'>
                                <CardProfileOwner />
                                <CardPassword />
                            </div>
                        </div>
                    )
                    : (
                        // Lógica existente para estilista/administrador
                        <div className='flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap'>
                            <div className='w-full md:w-1/2'>
                                <FormProfile /> {/* <-- Cambiar a FormProfile */}
                            </div>
                            <div className='w-full md:w-1/2'>
                                <CardProfile />
                                <CardPassword />
                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default Profile
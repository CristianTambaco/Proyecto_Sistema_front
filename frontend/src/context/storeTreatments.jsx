import { create } from "zustand"
import axios from "axios";
import { toast } from "react-toastify";


const storeTreatments = create(set => ({
    modal: false,
    selectedClientId: null, // <-- NUEVO ESTADO
    toggleModal: (modalType) => set((state) => ({ 
        modal: state.modal === modalType ? null : modalType,
        selectedClientId: state.modal === modalType ? null : state.selectedClientId // Si se cierra, limpiar cliente
    })),
    setSelectedClientId: (id) => set({ selectedClientId: id }), // <-- NUEVA FUNCIÓN
    registerTreatments: async (data) => {
        try {
        const storedUser = JSON.parse(localStorage.getItem("auth-token"))
        const url = `${import.meta.env.VITE_BACKEND_URL}/atencion/registro`;
        const options = {
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.state.token}`,
            }
        }
        const respuesta = await axios.post(url, data, options)
        set((state) => ({ modal: !state.modal, selectedClientId: null })) // Limpiar cliente seleccionado
        toast.success(respuesta.data.msg)
        } catch (error) {
        console.error(error)
        }
    },
    deleteTreatments:async(id)=>{
        const isConfirmed  = confirm("Vas a eliminar el registro ¿Estás seguro de realizar esta acción?")
        if (isConfirmed ) {
            try {
                const storedUser = JSON.parse(localStorage.getItem("auth-token"))
                const url = `${import.meta.env.VITE_BACKEND_URL}/atencion/${id}`;
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedUser.state.token}`,
                    }
                }
                const respuesta = await axios.delete(url,options)
                toast.success(respuesta.data.msg)
            } catch (error) {
                console.error(error)
            }
        }
    },
    payTreatments:async(data)=>{
        try {
            const storedUser = JSON.parse(localStorage.getItem("auth-token"))
            const url = `${import.meta.env.VITE_BACKEND_URL}/atencion/pago`
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedUser.state.token}`,
                }
            }
            const respuesta = await axios.post(url,data,options)
            set((state)=>({modal:!state.modal}))
            toast.success(respuesta.data.msg)
        } catch (error) {
            console.error(error)
        }
        
    }
}))


export default storeTreatments

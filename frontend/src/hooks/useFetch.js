import axios from "axios";
import { toast } from "react-toastify";

function useFetch() {
    const fetchDataBackend = async (url, data = null, method = "GET",headers = {}) => {
        const loadingToast = toast.loading("Procesando solicitud...");
        try {
            // Crea las opciones básicas de la solicitud
            const options = {
            method,
            url,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            data,
            }



            // Solo agrega el cuerpo si el método no es DELETE y data no es null/undefined
            if (method !== "DELETE" && data !== null && data !== undefined) {
                options.data = data;
            }

            // Si es DELETE, asegúrate de que no haya cuerpo
            if (method === "DELETE") {
                delete options.data; // Elimina cualquier propiedad data que pueda existir
            }







            const response = await axios(options)
            toast.dismiss(loadingToast); 
            toast.success(response?.data?.msg)
            return response?.data
        } catch (error) {
            toast.dismiss(loadingToast); 
            console.error(error)
            toast.error(error.response?.data?.msg)
        }
    }

    return { fetchDataBackend }
}

export default useFetch;

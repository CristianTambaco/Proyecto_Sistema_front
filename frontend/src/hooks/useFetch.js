import axios from "axios";
import { toast } from "react-toastify";

function useFetch() {
  const fetchDataBackend = async (url, data = null, method = "GET", headers = {}) => {
    const loadingToast = toast.loading("Procesando solicitud...");
    try {
      // Detectar si es FormData
      const isFormData = data instanceof FormData;

      // No forzar Content-Type si es FormData
      const finalHeaders = isFormData
        ? { Authorization: headers.Authorization || "" } // Deja que el navegador ponga el Content-Type
        : { "Content-Type": "application/json", ...headers };

      const options = {
        method,
        url,
        headers: finalHeaders,
        data: method !== "DELETE" && data !== null && data !== undefined ? data : undefined,
      };



            // Solo agrega el cuerpo si el método no es DELETE y data no es null/undefined
            if (method !== "DELETE" && data !== null && data !== undefined) {
                options.data = data;
            }

            // Si es DELETE, asegúrate de que no haya cuerpo
            if (method === "DELETE") {
                delete options.data; // Elimina cualquier propiedad data que pueda existir
            }




            const response = await axios(options);
      toast.dismiss(loadingToast);
      toast.success(response?.data?.msg);
      return response?.data;
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error(error);
      toast.error(error.response?.data?.msg || "Error en la solicitud");
    }
  };
  return { fetchDataBackend };
}

export default useFetch;

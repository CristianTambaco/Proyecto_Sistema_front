// frontend/src/context/storeProfile.jsx
import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const getAuthHeaders = () => {
    const storedUser = JSON.parse(localStorage.getItem("auth-token"));
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser?.state?.token}`,
        },
    };
};

const storeProfile = create((set) => ({
    user: null,
    clearUser: () => set({ user: null }),
    profile: async () => {
        try {
            const storedUser = JSON.parse(localStorage.getItem("auth-token"));
            if (!storedUser || !storedUser.state || !storedUser.state.token) {
                throw new Error("No se encontró el token de autenticación.");
            }
            const rol = storedUser.state.rol;

            let url;
            if (rol === "cliente") {
                url = `${import.meta.env.VITE_BACKEND_URL}/cliente/perfil`;
            } else {
                url = `${import.meta.env.VITE_BACKEND_URL}/perfil`;
            }

            const respuesta = await axios.get(url, getAuthHeaders());
            set({ user: respuesta.data });
        } catch (error) {
            console.error("Error en storeProfile.profile:", error);
            toast.error(error.response?.data?.msg || "Error al cargar el perfil");
        }
    },
    updateProfile: async (data, id) => {
        try {
            const storedUser = JSON.parse(localStorage.getItem("auth-token"));
            const rol = storedUser.state.rol;

            let url;
            if (rol === "cliente") {
                url = `${import.meta.env.VITE_BACKEND_URL}/cliente/actualizar/${id}`;
            } else if (rol === "administrador") {
                url = `${import.meta.env.VITE_BACKEND_URL}/administrador/${id}`;
            } else if (rol === "estilista") {
                url = `${import.meta.env.VITE_BACKEND_URL}/estilista/${id}`;
            } else {
                throw new Error("Rol no válido para actualizar perfil");
            }

            const respuesta = await axios.put(url, data, getAuthHeaders());
            set({ user: respuesta.data });
            toast.success("Perfil actualizado correctamente");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.msg || "Error al actualizar el perfil");
        }
    },
    updatePasswordProfile: async (data, id) => {
        try {
            const storedUser = JSON.parse(localStorage.getItem("auth-token"));
            const rol = storedUser.state.rol;

            let url;
            if (rol === "cliente") {
                url = `${import.meta.env.VITE_BACKEND_URL}/cliente/actualizarpassword/${id}`;
            } else if (rol === "administrador") {
                url = `${import.meta.env.VITE_BACKEND_URL}/administrador/actualizarpassword/${id}`;
            } else if (rol === "estilista") {
                url = `${import.meta.env.VITE_BACKEND_URL}/estilista/actualizarpassword/${id}`;
            } else {
                throw new Error("Rol no válido para actualizar contraseña");
            }

            const respuesta = await axios.put(url, data, getAuthHeaders());
            toast.success(respuesta?.data?.msg || "Contraseña actualizada.");
            return respuesta;
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.msg || "Error al actualizar la contraseña");
        }
    }
}))

export default storeProfile;
import { Navigate, Outlet } from "react-router"
import storeAuth from "../context/storeAuth"

const PublicRoute = () => {
    const token = storeAuth((state) => state.token)

    // Si hay un token (usuario logueado) Y está intentando acceder a la raíz '/',
    // renderiza <Outlet /> para que se muestre Home.jsx.
    // Si hay un token y accede a cualquier otra ruta pública (como /login, /register),
    // redirigir al dashboard.
    const currentPath = window.location.pathname;

    if (token) {
        if (currentPath === '/') {
            // Usuario logueado accediendo a '/'
            return <Outlet />; // Mostrar Home.jsx
        } else {
            // Usuario logueado accediendo a otra ruta pública como /login
            return <Navigate to="/dashboard" replace />;
        }
    }

    // Si no hay token (usuario no logueado), renderizar Outlet normalmente
    return <Outlet />
}

export default PublicRoute
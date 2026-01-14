// frontend/src/routes/ProtectedRoute.jsx
import { Navigate, Outlet, useNavigate } from "react-router";
import storeAuth from "../context/storeAuth";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const token = storeAuth(state => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // Hacer una llamada rápida al perfil para verificar estado
      fetch(`${import.meta.env.VITE_BACKEND_URL}/cliente/perfil`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        if (res.status === 403) {
          // Cuenta inactiva → cerrar sesión y redirigir
          storeAuth.getState().clearToken();
          navigate('/login');
        }
      })
      .catch(() => {
        // Error de red o token inválido → tratar como no autenticado
        storeAuth.getState().clearToken();
        navigate('/login');
      });
    }
  }, [token, navigate]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
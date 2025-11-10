// frontend/src/routes/PrivateRouteWithRole.jsx
import storeAuth from '../context/storeAuth';
import { Forbidden } from '../pages/Forbidden';
import { Navigate } from 'react-router';

export default function PrivateRouteWithRole({ children, allowedRoles = ["administrador"] }) {
  const { rol } = storeAuth();

  // Verifica si el rol del usuario está en la lista de roles permitidos
  if (allowedRoles.includes(rol)) {
    return children;
  }

  // Si no está permitido, redirige al Forbidden o a otra ruta
  return <Forbidden />; // O <Navigate to="/otra-ruta" replace />
}
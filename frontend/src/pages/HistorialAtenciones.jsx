// frontend/src/pages/HistorialAtenciones.jsx
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import TableTreatments from "../components/treatments/Table";
import storeAuth from "../context/storeAuth";

const HistorialAtenciones = () => {
  const [atenciones, setAtenciones] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const { fetchDataBackend } = useFetch();
  const { token } = storeAuth();

  const cargarAtenciones = async () => {
    try {
      if (!token) {
        console.error("No hay token disponible.");
        return;
      }

      const storedUser = JSON.parse(localStorage.getItem("auth-token"));
      if (!storedUser || !storedUser.state || !storedUser.state.token) {
        console.error("No se pudo obtener el token del almacenamiento local.");
        return;
      }

      // Extraer el ID del cliente del token JWT
      let idCliente;
      try {
        // Decodificar el token JWT para obtener el ID
        const tokenPayload = JSON.parse(atob(storedUser.state.token.split('.')[1]));
        idCliente = tokenPayload.id;
      } catch (decodeError) {
        console.error("Error al decodificar el token:", decodeError);
        return;
      }

      if (!idCliente) {
        console.error("No se pudo obtener el ID del cliente del token.");
        return;
      }

      const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/${idCliente}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedUser.state.token}`,
      };

      const response = await fetchDataBackend(url, null, "GET", headers);

      // Asegurarse de que la respuesta tenga el formato correcto
      if (response && Array.isArray(response.atencions)) {
        setAtenciones(response.atencions);
      } else {
        setAtenciones([]);
      }
    } catch (error) {
      console.error("Error al cargar historial:", error);
      setAtenciones([]); // Limpiar el estado en caso de error
    } finally {
      setLoading(false); // Terminar la carga
    }
  };

  useEffect(() => {
    cargarAtenciones();
  }, [token]);

  if (loading) {
    return <div>Cargando historial...</div>;
  }

  if (atenciones.length === 0) {
    return (
      <div>
        <h1 className="font-black text-4xl text-gray-500">Historial de Atenciones</h1>
        <hr className="my-4 border-t-2 border-gray-300" />
        <p className="mb-8">Este módulo te permite visualizar el historial de servicios de tu mascota.</p>
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">No existen atenciones registradas.</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-black text-4xl text-gray-500">Historial de Atenciones</h1>
      <hr className="my-4 border-t-2 border-gray-300" />
      <p className="mb-8">Este módulo te permite visualizar el historial de servicios de tu mascota.</p>
      <TableTreatments treatments={atenciones} listPatient={() => cargarAtenciones()} />
    </div>
  );
};

export default HistorialAtenciones;
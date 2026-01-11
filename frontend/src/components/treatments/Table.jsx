import { MdDeleteForever, MdAttachMoney, MdInfo } from "react-icons/md"
import storeTreatments from "../../context/storeTreatments"
import storeAuth from "../../context/storeAuth"
import ModalPayment from "./ModalPayment"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useState } from "react"
const stripePromise = loadStripe(import.meta.env.VITE_STRAPI_KEY)

import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useFetch from "../../hooks/useFetch";


import EditModal from "./EditModal"; // <-- 




const TableTreatments = ({ treatments = [], listPatient, showEditButton = false, showStatusButtons = false }) => {
    const { deleteTreatments } = storeTreatments()
    const { rol } = storeAuth()
    const { modal, toggleModal } = storeTreatments()
    const [selectedTreatment, setSelectedTreatment] = useState(null)

    const [showEditModal, setShowEditModal] = useState(false);

    const [horarios, setHorarios] = useState([]); // <-- Estado para los horarios



    const handleDelete = async (id) => {
        deleteTreatments(id);
        listPatient();
    }



    const formatFecha = (fechaISO) => {
  if (!fechaISO) return "";

  return new Date(fechaISO).toLocaleDateString("es-ES", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};




    const { fetchDataBackend } = useFetch();

    
      



    // Estado para manejar el modal
  const [showModal, setShowModal] = useState(false);
  


            // Función para obtener los detalles completos de una atención
  const fetchTreatmentDetails = async (id) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/atencion/${id}`;
      const storedUser = JSON.parse(localStorage.getItem("auth-token"));
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedUser.state.token}`,
      };
      const response = await fetchDataBackend(url, null, "GET", headers);
      return response;
    } catch (error) {
      console.error("Error al obtener detalles de la atención:", error);
      toast.error("No se pudieron cargar los detalles.");
      return null;
    }
  };

  // Función para abrir el modal con los detalles
  const handleViewDetails = async (treatmentId) => {
    const details = await fetchTreatmentDetails(treatmentId);
    if (details) {
      setSelectedTreatment(details);
      setShowModal(true);
    }
  };


  



  // Función para abrir el modal de edición
const handleEditDetails = (treatmentData) => {
setSelectedTreatment(treatmentData);
setShowEditModal(true); // Nuevo estado para el modal de edición
};

// Función para cerrar el modal de edición
const closeEditModal = () => {
setShowEditModal(false);
setSelectedTreatment(null);
};









  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedTreatment(null);
  };



  

  



    return (
        <>
            <table className="w-full mt-5 table-auto shadow-lg bg-white">
                <thead className="bg-gray-800 text-slate-400">
                    <tr>
                        <th className="p-2">N°</th>


                        {rol === 'estilista' &&(
                                    <th className="p-2">Cliente</th>
                        )} 

                        


                        {rol === 'estilista' &&(
                        <th className="p-2">Servicio</th>
                        )} 

                        {/* <th className="p-2">Descripción</th> */}

                        {rol === 'estilista' &&(
                        <th className="p-2">Precio</th>
                        )} 

                        {rol === 'estilista' &&(
                        <th className="p-2">Prioridad</th>
                        )}


                        {(rol === 'estilista' ) &&(
                        <th className="p-2">Estado</th>
                        )} 

                        {(rol === 'estilista'  ) &&(
                        <th className="p-2">Acciones</th>
                        )} 



                        {(rol === 'cliente' || rol === 'administrador' )  &&(
                                    <th className="p-2">Nombre</th>
                        )} 


                        {(rol === 'cliente' || rol === 'administrador' )  &&(
                                    <th className="p-2">Descripción</th>
                        )} 



                        {(rol === 'cliente' || rol === 'administrador' ) &&(
                        <th className="p-2">Precio</th>
                        )} 

                        {(rol === 'cliente' || rol === 'administrador' ) &&(
                        <th className="p-2">Prioridad</th>
                        )}

                        {(rol === 'cliente' || rol === 'administrador' ) &&(
                        <th className="p-2">Estado</th>
                        )}


                        


                        {(rol === 'cliente'  ) &&(
                        <th className="p-2">Acciones</th>
                        )} 


                        


                        

                        {/* <th className="p-2">Estado pago</th> */}

                        {/* <th className="p-2">Acciones</th> */}



                    </tr>
                </thead>
                <tbody>
                    {treatments.map((treatment, index) => (
                        <tr className="hover:bg-gray-300 text-center" key={treatment._id || index}>
                            <td>{index + 1}</td>

                            {rol === 'estilista' &&(
                                <td>{treatment.cliente?.nombrePropietario || '—'}</td>
                            )}


                            <td>
                                {treatment.nombre}
                                {/* Mostrar datos del cliente solo si el rol es 'estilista' */}

                                {/* {rol === 'estilista' && treatment.cliente && (
                                    <div className="text-xs text-gray-500 mt-1">
                                        Cliente: {treatment.cliente.nombrePropietario} • Mascota: {treatment.cliente.nombreMascota}
                                    </div>
                                )} */}

                                
                            </td>

                            {(rol === 'cliente' || rol === 'administrador') &&(
                            <td>{treatment.descripcion}</td>
                            )} 
                            

                            <td>$ {treatment.precio}</td>
                            <td>{treatment.prioridad}</td>
                            

                            {/* <td className={treatment.estadoPago === "Pagado" ? "text-green-500 text-sm" : "text-red-500 text-sm"}>
                                {treatment.estadoPago}
                            </td> */}


                            {/* NUEVA CELDA: Estado de la Atención */}
                            <td>
                            <span className={`px-2 py-1 rounded text-xs ${
                            treatment.estadoAtencion === 'Atendido'
                            ? ' text-green-800'
                            : ' text-yellow-800'
                            }`}>
                            {treatment.estadoAtencion}
                            </span>
                            </td>


                            <td className="py-2 text-center">



                                {/* Botón de Información */}

                                {(rol === "estilista" || rol === "cliente")&& (

                                <span
                                title="Ver detalles"
                                className="text-xl cursor-pointer inline-block mr-2 hover:scale-110"
                                onClick={() => handleViewDetails(treatment._id)}
                                >
                                👁️
                                </span>


                                )}

                                
                                {/* {(rol === "cliente") && (
                                <span
                                title="Editar"
                                className="text-xl cursor-pointer inline-block mr-2 hover:scale-110 text-blue-600"
                                onClick={() => handleEditDetails(treatment)}
                                >
                                ✏️
                                </span>
                                )} */}




                                {/* Botón de Editar - Solo si showEditButton es true */}
                                {showEditButton && (
                                  <span
                                    title="Editar"
                                    className="text-xl cursor-pointer inline-block mr-2 hover:scale-110 text-blue-600"
                                    onClick={() => {
                                      handleEditDetails(treatment);
                                      setEditMode(true); // <-- Opcional: si tienes un estado para modo edición
                                    }}
                                  >
                                    ✏️
                                  </span>
                                )}




                                {/* Botón de Cancelar para cliente */}
                                
                                {showEditButton &&  (
                                <span
                                title="Cancelar Reserva"
                                className="text-xl cursor-pointer inline-block mr-2 hover:scale-110 text-red-600"
                                onClick={async () => {
                                    const confirmCancel = window.confirm(
                                        "¿Estás seguro de que deseas cancelar esta reserva?"
                                    );
                                    if (confirmCancel) {
                                        try {
                                            const url = `${import.meta.env.VITE_BACKEND_URL}/atencion/${treatment._id}`;
                                            const storedUser = JSON.parse(localStorage.getItem("auth-token"));
                                            const headers = {
                                                "Content-Type": "application/json",
                                                Authorization: `Bearer ${storedUser.state.token}`,
                                            };
                                            const response = await fetch(url, {
                                                method: "DELETE",
                                                headers: headers,
                                            });

                                            if (response.ok) {
                                                toast.success("Reserva cancelada correctamente.");
                                                // Refrescar la lista
                                                listPatient();
                                            } else {
                                                const errorData = await response.json();
                                                toast.error(errorData.msg || "Error al cancelar la reserva.");
                                            }
                                        } catch (error) {
                                            console.error("Error al cancelar la reserva:", error);
                                            toast.error("Error al cancelar la reserva.");
                                        }
                                    }
                                }}
                                >
                                ❌
                                </span>
                                )}





                                {/* Botón de Marcar como Atendido */}
                                {showStatusButtons && (
                                    <span
                                        title="Marcar como Atendido"
                                        className="text-xl cursor-pointer inline-block mr-2 hover:scale-110 text-green-600"
                                        onClick={async () => {
                                            const confirmMark = window.confirm(
                                                "¿Estás seguro de que deseas marcar esta cita como atendida?"
                                            );
                                            if (confirmMark) {
                                                try {
                                                    const url = `${import.meta.env.VITE_BACKEND_URL}/atencion/estado/${treatment._id}`;
                                                    const storedUser = JSON.parse(localStorage.getItem("auth-token"));
                                                    const headers = {
                                                        "Content-Type": "application/json",
                                                        Authorization: `Bearer ${storedUser.state.token}`,
                                                    };
                                                    const response = await fetch(url, {
                                                        method: "PUT",
                                                        headers: headers,
                                                        body: JSON.stringify({ estadoAtencion: "Atendido" }),
                                                    });
                                                    if (response.ok) {
                                                        // toast.success("Cita marcada como atendida.");
                                                        listPatient(); // Refrescar la lista
                                                    } else {
                                                        const errorData = await response.json();
                                                        toast.error(errorData.msg || "Error al marcar la cita como atendida.");
                                                    }
                                                } catch (error) {
                                                    console.error("Error al marcar la cita como atendida:", error);
                                                    toast.error("Error al marcar la cita como atendida.");
                                                }
                                            }
                                        }}
                                    >
                                        ✅
                                    </span>
                                )}
                                {/* Botón de Marcar como No Asistió (esto podría cambiar el estado a Pendiente o tener otro estado) */}
                                {showStatusButtons && (
                                    <span
                                        title="Marcar como No Asistió"
                                        className="text-xl cursor-pointer inline-block mr-2 hover:scale-110 text-red-600"
                                        onClick={async () => {
                                            const confirmMark = window.confirm(
                                                "¿Estás seguro de que deseas marcar esta cita como 'Pendiente'?"
                                            );
                                            if (confirmMark) {
                                                try {
                                                    const url = `${import.meta.env.VITE_BACKEND_URL}/atencion/estado/${treatment._id}`;
                                                    const storedUser = JSON.parse(localStorage.getItem("auth-token"));
                                                    const headers = {
                                                        "Content-Type": "application/json",
                                                        Authorization: `Bearer ${storedUser.state.token}`,
                                                    };
                                                    const response = await fetch(url, {
                                                        method: "PUT",
                                                        headers: headers,
                                                        body: JSON.stringify({ estadoAtencion: "Pendiente" }), // O podrías tener un estado 'NoAsistio'
                                                    });
                                                    if (response.ok) {
                                                        // toast.success("Cita marcada como 'No Asistió'.");
                                                        listPatient(); // Refrescar la lista
                                                    } else {
                                                        const errorData = await response.json();
                                                        toast.error(errorData.msg || "Error al marcar la cita como 'No Asistió'.");
                                                    }
                                                } catch (error) {
                                                    console.error("Error al marcar la cita como 'No Asistió':", error);
                                                    toast.error("Error al marcar la cita como 'No Asistió'.");
                                                }
                                            }
                                        }}
                                    >
                                        ❌
                                    </span>
                                )}




                            

                                {/* Botón de Pagar para cliente */}

                                {/* {rol === "cliente" && (
                                    <MdAttachMoney
                                        className={
                                            treatment.estadoPago === "Pagado"
                                            ? "h-7 w-7 text-gray-500 pointer-events-none inline-block mr-2"
                                            : "h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 hover:text-green-600"
                                        }
                                        
                                        title="Pagar"
                                        onClick={() => {
                                            setSelectedTreatment(treatment)
                                            toggleModal("payment")
                                        }}
                                    />
                                )} */}

                              
                                
                                {/* Botón de Eliminar para estilista o administrador */}

                                {/* {(rol === "estilista" || rol === "administrador") && (
                                    <span
                                        className={
                                            treatment.estadoPago === "Pagado"
                                                ? "h-8 w-8 text-gray-500 pointer-events-none inline-block select-none"
                                                : "h-8 w-8 text-red-900 cursor-pointer inline-block hover:text-red-600"
                                        }
                                        title="Eliminar"
                                        onClick={() =>
                                            treatment.estadoPago !== "Pagado" &&
                                            handleDelete(treatment._id)
                                        }
                                    >
                                        🗑️
                                    </span>
                                )} */}
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


                
            {/* Modal de Detalles */}
      {showModal && selectedTreatment && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">

          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Detalles</h2>
            <div className="mb-4 p-4 bg-gray-100 rounded">
              <strong className="block mb-1">{selectedTreatment.nombre}</strong>
              <p className="text-sm text-gray-600 mb-2">{selectedTreatment.descripcion}</p>
              <p className="text-green-600 font-semibold">Precio: $ {selectedTreatment.precio}</p>

              {/* <p className="text-blue-600">Prioridad: {selectedTreatment.prioridad}</p> */}

            </div>
            {/* Mostrar datos del cliente */}
            {selectedTreatment.cliente && (
              <div className="mb-4">
                <strong>Cliente:</strong><br />
                {selectedTreatment.cliente.nombrePropietario} 
              </div>
            )}
            {/* Mostrar Fecha y Hora de la Cita */}
            
            <div className="mb-4">
            <strong>Fecha de la cita:</strong><br />
            {formatFecha(selectedTreatment.fechaCita)}
 {/* Muestra el valor exacto que llega */}
            </div>
            <div className="mb-4">
            <strong>Hora de la cita:</strong><br />
            {selectedTreatment.horaCita} {/* Muestra el valor exacto que llega */}
            </div>
            
            {/* Estado de Pago */}
            {/* <div className="mb-4">
              <strong>Estado de pago:</strong><br />
              <span className={`px-2 py-1 rounded text-xs ${
                selectedTreatment.estadoPago === 'Pagado'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {selectedTreatment.estadoPago}
              </span>
            </div> */}


            {/* Botón de Cerrar */}
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}




      {/* Modal de Edición */}
      {showEditModal && selectedTreatment && (
      <EditModal
      treatment={selectedTreatment}
      onClose={closeEditModal}
      onRefresh={listPatient} // Llama a listPatient para refrescar la lista

      // horariosActivos={horarios} // <-- 

      />
      )}





            {modal === "payment" && selectedTreatment && (
                <Elements stripe={stripePromise}>
                    <ModalPayment treatment={selectedTreatment} />
                </Elements>
            )}
        </>
    );
};


export default TableTreatments
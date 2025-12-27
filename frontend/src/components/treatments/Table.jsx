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




const TableTreatments = ({ treatments, listPatient }) => {
    const { deleteTreatments } = storeTreatments()
    const { rol } = storeAuth()
    const { modal, toggleModal } = storeTreatments()
    const [selectedTreatment, setSelectedTreatment] = useState(null)

    const handleDelete = async (id) => {
        deleteTreatments(id);
        listPatient();
    }


    const { fetchDataBackend } = useFetch();

    
      const formatFecha = (fecha) => {
        if (!fecha) return '';
        const [year, month, day] = fecha.split('-');
        return `${day}-${month}-${year}`;
        };



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


                        {(rol === 'estilista'  ) &&(
                        <th className="p-2">Acciones</th>
                        )} 



                        {(rol === 'cliente' || rol === 'administrador' )  &&(
                                    <th className="p-2">Nombre</th>
                        )} 



                        {(rol === 'cliente' || rol === 'administrador' ) &&(
                        <th className="p-2">Precio</th>
                        )} 

                        {(rol === 'cliente' || rol === 'administrador' ) &&(
                        <th className="p-2">Prioridad</th>
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
                            <td>{treatment.cliente.nombrePropietario}</td>
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

                                    
                            {/* <td>{treatment.descripcion}</td> */}

                            

                            <td>$ {treatment.precio}</td>
                            <td>{treatment.prioridad}</td>
                            

                            {/* <td className={treatment.estadoPago === "Pagado" ? "text-green-500 text-sm" : "text-red-500 text-sm"}>
                                {treatment.estadoPago}
                            </td> */}


                            <td className="py-2 text-center">



                                {/* Botón de Información */}

                                {rol === "estilista" && (
                                <MdInfo
                                title="Ver detalles"
                                className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 hover:text-green-600"
                                onClick={() => handleViewDetails(treatment._id)}
                                />
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
            <h2 className="text-xl font-bold mb-4">Detalles de la Atención</h2>
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
              {new Date(selectedTreatment.fechaCita).toLocaleDateString('es-ES')}
            </div>
            <div className="mb-4">
              <strong>Hora de la cita:</strong><br />
              {selectedTreatment.horaCita}
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





            {modal === "payment" && selectedTreatment && (
                <Elements stripe={stripePromise}>
                    <ModalPayment treatment={selectedTreatment} />
                </Elements>
            )}
        </>
    );
};


export default TableTreatments
// frontend/src/components/ConfirmModal.jsx

import { useEffect, useState } from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, service, additionalDetails, fechaCita, horaCita }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(); // Llama a la función para enviar la reserva
    onClose();  // Cierra el modal
  };

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Confirmar Reserva</h2>
        <p className="mb-4">Estás a punto de reservar el siguiente servicio:</p>
        <div className="mb-4 p-3 bg-gray-100 rounded">
          <strong>{service?.nombre || "Servicio"}</strong>
          <br />
          <span className="text-sm text-gray-600">{service?.descripcion || "Descripción no disponible."}</span>
          <br />
          <span className="text-green-600 font-semibold">Precio: $ {service?.precio || "0"}</span>
          <br />
          <span className="text-blue-600">Duración: {service?.duracionEstimada || "0"} min</span>

          {/* Mostrar Fecha y Hora EXACTAMENTE como fueron ingresadas */}
          {fechaCita && horaCita && (
            <>
              <br />
              <span className="text-purple-600 font-medium">Fecha: {fechaCita}</span>
              <br />
              <span className="text-purple-600 font-medium">Hora: {horaCita}</span>
            </>
          )}
        </div>

        {additionalDetails && (
          <div className="mb-4">
            <strong>Detalles adicionales:</strong>
            <p className="mt-1 text-sm text-gray-700">{additionalDetails}</p>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Confirmar Reserva
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
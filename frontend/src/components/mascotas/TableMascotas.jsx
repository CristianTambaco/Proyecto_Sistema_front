// frontend/src/components/mascotas/TableMascotas.jsx
import { MdDeleteForever, MdInfo, MdPublishedWithChanges } from "react-icons/md";
import storeAuth from "../../context/storeAuth";
import { Link } from "react-router-dom";

const TableMascotas = ({ mascotas, onDelete, onEdit }) => {
    const { rol } = storeAuth();

    if (!mascotas || mascotas.length === 0) {
        return (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                No hay mascotas registradas.
            </div>
        );
    }

    return (
        <table className="w-full mt-5 table-auto shadow-lg bg-white">
            <thead className="bg-gray-800 text-slate-400">
                <tr>
                    <th className="p-2">N°</th>
                    <th className="p-2">Nombre</th>
                    <th className="p-2">Sociable</th>
                    <th className="p-2">Estado</th>
                    <th className="p-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {mascotas.map((mascota, index) => (
                    <tr key={mascota._id} className="hover:bg-gray-300 text-center">
                        <td>{index + 1}</td>
                        <td>{mascota.nombre}</td>
                        <td>{mascota.tipoPelaje === 'si' ? 'Sí' : 'No'}</td>
                        <td>
                            <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                                mascota.estado ? " text-green-600" : " text-red-600"
                            }`}>
                                {mascota.estado ? "Activo" : "Inactivo"}
                            </span>
                        </td>
                        <td className='py-2 text-center'>
                            <MdInfo
                                title="Más información"
                                className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 hover:text-green-600"
                                onClick={() => onEdit(mascota)}
                            />
                            {(rol === "cliente") && (
                                <>
                                    <span
                                        title="Actualizar"
                                        onClick={() => onEdit(mascota)}
                                        className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 hover:text-blue-600"
                                    >
                                        ✏️
                                    </span>
                                    <MdDeleteForever
                                        title="Eliminar"
                                        className="h-7 w-7 text-red-900 cursor-pointer inline-block hover:text-red-600"
                                        onClick={() => onDelete(mascota._id)}
                                    />
                                </>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableMascotas;
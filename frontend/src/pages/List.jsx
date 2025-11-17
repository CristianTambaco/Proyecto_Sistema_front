// frontend/src/pages/List.jsx
import Table from "../components/list/Table"
import storeAuth from "../context/storeAuth"
import { Link } from 'react-router'

const List = () => {
    const { rol } = storeAuth()

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Clientes</h1>
            <hr className='my-4 border-t-2 border-gray-300' />
             {/* Condicional para el mensaje dependiendo del rol */}
            <p className='mb-8'>
                {(() => {
                    if (rol === "administrador") {
                        return "Este módulo te permite gestionar clientes.";
                    } else if (rol === "estilista") {
                        return "Este módulo te permite visualizar clientes.";
                    } else if (rol === "cliente") {
                        return "Este módulo te permite visualizar registros existentes.";
                    } else {
                        return "Este módulo te permite gestionar .";
                    }
                })()}
            </p>

            {/* Botón para registrar cliente - Solo para administrador */}
            {rol === 'administrador' && (
                <Link to="/dashboard/crear-cliente" className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 mb-4">
                    Registrar cliente
                </Link>
            )}

            <Table/>
        </div>
    )
}

export default List
import Table from "../components/list/Table"

import storeAuth from "../context/storeAuth"



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
                        return "Este módulo te permite gestionar usuarios.";
                    } else if (rol === "estilista") {
                        return "Este módulo te permite visualizar clientes.";
                    } else if (rol === "cliente") {
                        return "Este módulo te permite gestionar registros existentes.";
                    } else {
                        return "Este módulo te permite gestionar .";
                    }
                })()}
            </p>





            <Table/>
        </div>
    )
}

export default List
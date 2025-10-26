import storeAuth from '../context/storeAuth';
import { Forbidden } from '../pages/Forbidden';
import { Navigate } from 'react-router';


export default function PrivateRouteWithRole({ children }) {

    const {rol} = storeAuth()

    if (rol === 'estilista' || rol === 'administrador' || rol === 'cliente'  ) {
        return children;
    }
    
    return ("clienteper" === rol) ? <Forbidden/> : children
    
}
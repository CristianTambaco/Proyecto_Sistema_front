
import { BrowserRouter, Route, Routes } from 'react-router'
import { Home } from './pages/Home'
import Login from './pages/Login'
import { Register } from './pages/Register'
import { Forgot } from './pages/Forgot'
import { Confirm } from './pages/Confirm'
import { NotFound } from './pages/NotFound'
import Dashboard from './layout/Dashboard'


import Perfil from './pages/Perfil';
import EditarPerfil from './pages/EditarPerfil';
import CambiarContraseña from './pages/CambiarContraseña';



import List from './pages/List'
import Details from './pages/Details'
import Create from './pages/Create'
import Update from './pages/Update'
import Chat from './pages/Chat'
import Reset from './pages/Reset'

import PublicRoute from './routes/PublicRoute'
import ProtectedRoute from './routes/ProtectedRoute'

import { useEffect } from 'react'
import storeProfile from './context/storeProfile'
import storeAuth from './context/storeAuth'

import PrivateRouteWithRole from './routes/PrivateRouteWithRole'


import RegisterClient from './pages/RegisterClient'; // <-- 


import ListHorarios from './pages/ListHorarios'; // <-- 
import CreateHorario from './pages/CreateHorario'; // <-- 
import UpdateHorario from './pages/UpdateHorario'; // <-- 


import ListServicios from './pages/ListServicios'; // <-- 
import CreateServicio from './pages/CreateServicio'; // <-- 
import UpdateServicio from './pages/UpdateServicio'; // <-- 


import ListUsuarios from './pages/ListUsuarios'; // <-- 
import CreateUsuario from './pages/CreateUsuario'; // <-- 
import UpdateUsuario from './pages/UpdateUsuario'; // <-- 

import ListServiciosCliente from './pages/ListServiciosCliente'; // import

import ReservarServicio from './pages/ReservarServicio'; // import

import HistorialAtenciones from './pages/HistorialAtenciones'; //

import CreateCliente from './pages/CreateCliente'; // 

import HorariosCliente from './pages/HorariosCliente'; // <-

import ListClientesEstilista from './pages/ListClientesEstilista'; // <-- Importar

import RegistrarTrabajo from './pages/RegistrarTrabajo'; // 


import HistorialGeneral from './pages/HistorialGeneral';

import AgendaCitas from './pages/AgendaCitas';


import HistorialTrabajos from './pages/HistorialTrabajos'; // <-- 


import DashboardHome from './pages/DashboardHome'




function App() {

  const { profile} = storeProfile()
  const { token } = storeAuth()

  useEffect(() => {
    if(token){
      profile()
    }
  }, [token])


  return (
    <>
    <BrowserRouter>
      <Routes>
        
        <Route element={<PublicRoute />}>
          <Route index element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='forgot/:id' element={<Forgot/>}/>
          <Route path='confirm/:token' element={<Confirm/>}/>
          <Route path='reset/:token' element={<Reset/>}/>
          <Route path='*' element={<NotFound />} />

          <Route path='registerclient' element={<RegisterClient />} />



        </Route>


          <Route path='dashboard/*' element={
            <ProtectedRoute>
              <Routes>
                <Route element={<Dashboard />}>

                  <Route index element={<DashboardHome />} /> {/* <-- Cambiado a DashboardHome */}
                  {/* <Route path='perfil' element={<Profile />} /> <-- Opcional: mantener Profile accesible por URL */}

                  <Route path='perfil' element={<Perfil />} />
                  <Route path='editar-perfil' element={<EditarPerfil />} />
                  <Route path='cambiar-contraseña' element={<CambiarContraseña />} />




                  <Route path='listar' element={<List />} />
                  <Route path='visualizar/:id' element={<Details />} />
                  <Route path='crear' element={
                    <PrivateRouteWithRole>
                      <Create />
                    </PrivateRouteWithRole>
                  } />
                  <Route path='actualizar/:id' element={
                    <PrivateRouteWithRole allowedRoles={['cliente', 'administrador', 'estilista']}>
                      <Update />
                    </PrivateRouteWithRole>
                  } />




                  {/* Nuevas rutas para horarios */}
                  <Route path='horarios' element={
                    <PrivateRouteWithRole allowedRoles={['administrador']}>
                      <ListHorarios />
                    </PrivateRouteWithRole>
                  } />
                  <Route path='horarios/crear' element={
                    <PrivateRouteWithRole allowedRoles={['administrador']}>
                      <CreateHorario />
                    </PrivateRouteWithRole>
                  } />
                  <Route path='horarios/actualizar/:id' element={
                    <PrivateRouteWithRole allowedRoles={['administrador']}>
                      <UpdateHorario />
                    </PrivateRouteWithRole>
                  } />



                   {/* Nuevas rutas para servicios */}
                  <Route path='servicios' element={
                    <PrivateRouteWithRole allowedRoles={['administrador']}>
                      <ListServicios />
                    </PrivateRouteWithRole>
                  } />
                  <Route path='servicios/crear' element={
                    <PrivateRouteWithRole allowedRoles={['administrador']}>
                      <CreateServicio />
                    </PrivateRouteWithRole>
                  } />
                  <Route path='servicios/actualizar/:id' element={
                    <PrivateRouteWithRole allowedRoles={['administrador']}>
                      <UpdateServicio />
                    </PrivateRouteWithRole>
                  } />
                  {/* Nueva ruta para cliente y administrador */}
                  <Route path='servicios-cliente' element={
                    <PrivateRouteWithRole allowedRoles={['cliente', 'administrador']}>
                      <ListServiciosCliente />
                    </PrivateRouteWithRole>
                  } />

                  {/* Ruta para reservar servicios - Accesible por cliente */}
                  <Route path='reservar-servicio' element={
                    <PrivateRouteWithRole allowedRoles={['cliente', 'administrador', 'estilista']}> {/* Ajustar roles según necesite */}
                      <ReservarServicio />
                    </PrivateRouteWithRole>
                  } />


                  {/* Nuevas rutas para usuarios */}
                  <Route path='usuarios' element={
                    <PrivateRouteWithRole allowedRoles={['administrador']}>
                      <ListUsuarios />
                    </PrivateRouteWithRole>
                  } />
                  <Route path='crear-usuario/:tipoUsuario' element={
                    <PrivateRouteWithRole allowedRoles={['administrador']}>
                      <CreateUsuario />
                    </PrivateRouteWithRole>
                  } />
                  <Route path='actualizar-usuario/:tipoUsuario/:id' element={
                    <PrivateRouteWithRole allowedRoles={['administrador']}>
                      <UpdateUsuario />
                    </PrivateRouteWithRole>
                  } />



                  <Route path='historial' element={
                    <PrivateRouteWithRole allowedRoles={['cliente', 'estilista', 'administrador']}>
                      <HistorialAtenciones />
                    </PrivateRouteWithRole>
                  } />



                  {/* Nueva ruta para crear cliente por administrador */}
                  <Route path='crear-cliente' element={
                    <PrivateRouteWithRole allowedRoles={['administrador']}>
                      <CreateCliente />
                    </PrivateRouteWithRole>
                  } />



                   {/* Nueva ruta para horarios del cliente */}
                  <Route path='horarios-cliente' element={
                    <PrivateRouteWithRole allowedRoles={['cliente', 'administrador']}> 
                      <HorariosCliente />
                    </PrivateRouteWithRole>
                  } />



                  {/* Nueva ruta para estilistas */}
                  <Route path='mis-clientes' element={
                    <PrivateRouteWithRole allowedRoles={['estilista']}>
                      <ListClientesEstilista />
                    </PrivateRouteWithRole>
                  } />


                  {/* Nueva ruta para estilistas */}
                  <Route path='registrar-trabajo' element={
                    <PrivateRouteWithRole allowedRoles={['estilista']}>
                      <RegistrarTrabajo />
                    </PrivateRouteWithRole>
                  } />


                  <Route path='historial-general' element={
                      <PrivateRouteWithRole allowedRoles={['estilista', 'administrador']}>
                          <HistorialGeneral />
                      </PrivateRouteWithRole>
                  } />


                  <Route path='agenda-citas' element={
                      <PrivateRouteWithRole allowedRoles={['estilista', 'administrador']}>
                          <AgendaCitas />
                      </PrivateRouteWithRole>
                  } />



                  <Route path='historial-trabajos' element={
                    <PrivateRouteWithRole allowedRoles={['estilista', 'administrador']}>
                      <HistorialTrabajos />
                    </PrivateRouteWithRole>
                  } />






                  <Route path='dashboard/perfil' element={<Perfil />} />
                  <Route path='dashboard/editar-perfil' element={<EditarPerfil />} />
                  <Route path='dashboard/cambiar-contraseña' element={<CambiarContraseña />} />

                  
                



                  <Route path='chat' element={<Chat />} />
                </Route>
              </Routes>
            </ProtectedRoute>
          } />


      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
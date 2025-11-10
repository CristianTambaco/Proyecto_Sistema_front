
import { BrowserRouter, Route, Routes } from 'react-router'
import { Home } from './pages/Home'
import Login from './pages/Login'
import { Register } from './pages/Register'
import { Forgot } from './pages/Forgot'
import { Confirm } from './pages/Confirm'
import { NotFound } from './pages/NotFound'
import Dashboard from './layout/Dashboard'
import Profile from './pages/Profile'
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


import RegisterClient from './pages/RegisterClient'; // <-- Añade esta línea


import ListHorarios from './pages/ListHorarios'; // <-- Crea esta página
import CreateHorario from './pages/CreateHorario'; // <-- Crea esta página
import UpdateHorario from './pages/UpdateHorario'; // <-- Crea esta página


import ListServicios from './pages/ListServicios'; // <-- Crea esta página
import CreateServicio from './pages/CreateServicio'; // <-- Crea esta página
import UpdateServicio from './pages/UpdateServicio'; // <-- Crea esta página


import ListUsuarios from './pages/ListUsuarios'; // <-- Crea esta página
import CreateUsuario from './pages/CreateUsuario'; // <-- Crea esta página
import UpdateUsuario from './pages/UpdateUsuario'; // <-- Crea esta página




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
                  <Route index element={<Profile />} />
                  <Route path='listar' element={<List />} />
                  <Route path='visualizar/:id' element={<Details />} />
                  <Route path='crear' element={
                    <PrivateRouteWithRole>
                      <Create />
                    </PrivateRouteWithRole>
                  } />
                  <Route path='actualizar/:id' element={
                    <PrivateRouteWithRole>
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
import { Route, Routes } from 'react-router-dom'
import { Login } from './pages/login'
import { DefaultLayout } from './layout'
import { UsersList } from './pages/user/list'
import { UserForm } from './pages/user/form'
import { VehiclesList } from './pages/vehicles/list'
import { VehicleForm } from './pages/vehicles/form'
import Register from './pages/register'

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/users" element={<UsersList />}></Route>
        <Route path="/users/form" element={<UserForm />}></Route>

        <Route path="/vehicles" element={<VehiclesList />}></Route>
        <Route path="/vehicles/form" element={<VehicleForm />}></Route>
      </Route>
    </Routes>
  )
}

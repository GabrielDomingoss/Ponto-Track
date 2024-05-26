import { Route, Routes } from 'react-router-dom'
import { Login } from './pages/login'
import { DefaultLayout } from './layout'
import { UsersList } from './pages/user/list'
import { UserForm } from './pages/user/form'

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<DefaultLayout />}>
        <Route path='/users/list' element={<UsersList />}></Route>
        <Route path='/users/form' element={<UserForm />}></Route>
      </Route>
    </Routes>
  )
}

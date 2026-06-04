import {Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'


function App() {

  return (
    <Routes>
      <Route index element={<HomePage />}></Route>
      <Route path="login" element={<LoginPage />}></Route>
      <Route path="register" element={<RegisterPage />}></Route>

      <Route path="*" element={<div>Halaman Tidak Ditemukan / Salah Alamat</div>} />
    </Routes>

  )
}

export default App

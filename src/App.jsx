import { useState } from 'react'
import './App.css'
import { LoginPage } from './pages/loginPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/homePage'
import RegisterPage from './pages/registerPage'
import AdminHomePage from './pages/Admin/adminHomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes path="/*">
          <Route path="/" element={<Homepage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/admin/*" element={<AdminHomePage/>}/>
          <Route path="/*" element={<Homepage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

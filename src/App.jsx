import { useState } from 'react'
import './App.css'
import { LoginPage } from './pages/loginPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Homepage } from './pages/homePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes path="/*">
          <Route path="/" element={<Homepage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/*" element={<h1>404 ERROR!!!</h1>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

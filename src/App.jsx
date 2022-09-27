import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Capture from './pages/Capture'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

const App = () => {  
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/capture" element={<Capture />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
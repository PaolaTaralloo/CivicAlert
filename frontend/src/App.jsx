import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/register/RegisterPage';
import Login from './pages/login/LoginPage';
import Navbar from './components/navbar/NavbarComp';
import './App.css'
import NavbarComp from './components/navbar/NavbarComp';

function App() {
  const [count, setCount] = useState(0)

  return (
   
      <Router>
      <NavbarComp />
      <Routes>
        {/* Aggiungi questa route per l'homepage */}
        <Route path="/" element={<div>Homepage</div>} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<div>DashboardUser</div>} /> 
      </Routes>
    </Router>
    
  )
}

export default App

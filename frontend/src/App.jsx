import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/register/RegisterPage';
import Login from './pages/login/LoginPage';
import GoogleSuccess from './pages/googleAcces/GoogleAcces';
import NuovaSegnalazione from './pages/nuovaSegnalazione/NuovaSegnalazionePage.jsx';
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
        <Route path="/google-success" element={<GoogleSuccess />} />
        <Route path="/dashboard" element={<div>DashboardUser</div>} /> 
        <Route path="/nuova-segnalazione" element={<NuovaSegnalazione />} />
      </Routes>
    </Router>
    
  )
}

export default App

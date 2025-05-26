import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComp from './components/navbar/NavbarComp';
import Register from './pages/register/RegisterPage';
import Login from './pages/login/LoginPage';
import GoogleSuccess from './pages/googleAcces/GoogleAcces';
import Home from './pages/home/HomePage.jsx';
import NuovaSegnalazione from './pages/nuovaSegnalazione/NuovaSegnalazionePage.jsx';
import DashboardUser from './pages/dashboardUser/DashboardUserPage.jsx'
import Error from './pages/error/ErrorPage.jsx';
import './App.css'



function App() {
  const [count, setCount] = useState(0)

  return (
   
      <Router>
      <NavbarComp />
      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
        <Route path="/nuova-segnalazione" element={<NuovaSegnalazione />} />
        <Route path="/dashboard" element={<DashboardUser />} />
        <Route path="/*" element={<Error />} /> 
      </Routes>
    </Router>
    
  )
}

export default App

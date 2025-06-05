import { useState, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.jsx';
import NavbarComp from './components/navbar/NavbarComp';
import Register from './pages/register/RegisterPage';
import Login from './pages/login/LoginPage';
import GoogleSuccess from './pages/googleAcces/GoogleAcces';
import Home from './pages/home/HomePage.jsx';
import NuovaSegnalazione from './pages/nuovaSegnalazione/NuovaSegnalazionePage.jsx';
import DashboardUser from './pages/dashboardUser/DashboardUserPage.jsx'
import Error from './pages/error/ErrorPage.jsx';
import AdminDashboard from './pages/dashboardAdmin/DashboardAdminPage.jsx';
import './App.css'



function App() {
  const { user } = useContext(AuthContext);
  const [count, setCount] = useState(0)

  return (

    <Router>
      <NavbarComp />
      <Routes>
        {/* Rotte Pubbliche */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/google-success" element={<GoogleSuccess />} />

        {/* Rotte Cittadino */}
        {user && user.role==="cittadino" && <>
          <Route path="/nuova-segnalazione" element={<NuovaSegnalazione />} />
          <Route path="/dashboard" element={<DashboardUser />} />
        </>
        }
        {/* Rotte Admin */}
        {user && user.role==="admin" && 
        <Route path="/dashboard-admin" element={<AdminDashboard />} />
        }
       
        <Route path="/*" element={<Error />} />
      </Routes>
    </Router>

  )
}

export default App

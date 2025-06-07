import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
// Importa il CSS di Leaflet
import 'leaflet/dist/leaflet.css';
import { AuthProvider } from './context/AuthContext';
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </AuthProvider>,
)

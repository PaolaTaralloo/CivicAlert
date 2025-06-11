import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const GoogleSuccess = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const name = params.get('name');
    const role = params.get('role');

    if (token) {
      const userData = {
        token,
        name: name || 'Google User',
        role: role || 'cittadino',
      };
      
      login(userData);
      
      // Reindirizza immediatamente in base al ruolo
      if (role === 'admin') {
        navigate('/dashboard-admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      console.error('Token non ricevuto');
      navigate('/dashboard');
    }
  }, [login, navigate]);

  return <p>Reindirizzamento in corso...</p>;
};

export default GoogleSuccess;

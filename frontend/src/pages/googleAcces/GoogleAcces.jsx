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
      console.log('Token ricevuto:', token);
      const userData = {
        token,
        name: name || 'Google User',
        role: role || 'cittadino' // Imposta un ruolo di default
      };
      login(userData);
      
      // Reindirizza in base al ruolo
      if (role === 'admin') {
        navigate('/dashboard-admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      console.error('Token non ricevuto');
      navigate('/login');
    }
  }, [login, navigate]);

  return <p>Login in corso...</p>;
};

export default GoogleSuccess;

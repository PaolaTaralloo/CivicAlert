import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const GoogleSuccess = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      // Decodifica token opzionalmente con jwt-decode
      login({ token, name: 'Google User' });
      navigate('/dashboard');
    }
  }, []);

  return <p>Login in corso...</p>;
};

export default GoogleSuccess;

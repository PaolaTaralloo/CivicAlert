import { useState, useContext } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      console.log('Risposta login:', res.data);
      login(res.data);
      // Reindirizza in base al ruolo
      if (res.data.role === 'admin') {
        navigate('/dashboard-admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Errore login:', err);
      setError('Email o password non validi');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_APP_API_URL}/auth/google`;;
  };

  return (
    <div className="auth-page">
      <div className="auth-content">
        <Container className="py-5" style={{ maxWidth: '400px' }}>
          <h2 className="mb-4 text-center">Accedi</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Inserisci password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100" 
            style={{
                backgroundColor: '#413CB8',
                borderColor: '#413CB8',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#2F2E40';
                e.target.style.borderColor = '#2F2E40';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#413CB8';
                e.target.style.borderColor = '#413CB8';
              }}>
              Accedi
            </Button>

            <Button
              variant="danger"
              className="w-100 mt-3"
              onClick={handleGoogleLogin}
            >
              Accedi con Google
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default Login;

import { useState, useContext } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); 
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(''); 
    try {
      const res = await api.post('/auth/register', form);
      setSuccess('Registrazione effettuata con successo! Verrai reindirizzato al login'); // Aggiungi il messaggio di successo
      login(res.data);
      setTimeout(() => {
        navigate('/login');
      }, 3000); 
    } catch (err) {
      setError('Registrazione non riuscita. Email o password non validi');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-content">
        <Container className="py-5" style={{ maxWidth: '400px' }}>
          <h2 className="mb-4 text-center">Registrati</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>} 
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci nome"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Inserisci password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
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
              Crea Account
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default Register;

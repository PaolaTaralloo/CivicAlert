import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../../assets/notfound.json';

const Error = () => {
  return (
    <div className="auth-page">
      <div className="auth-content">
        <Container className="text-center mt-5">
          <div style={{ maxWidth: 400, margin: '0 auto' }}>
            <Lottie animationData={animationData} loop={true} />
          </div>

          <h1 className="display-4">404</h1>
          <p className="lead">Oops! Pagina non trovata.</p>
          <p>La strada che stai cercando è bloccata... oppure non esiste!</p>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <Button as={Link} to="/"
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
              Torna alla Home
            </Button>
            <Button as={Link} to="/dashboard" variant="secondary">
              Vai alla Dashboard
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Error;

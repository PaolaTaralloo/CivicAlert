import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../../assets/notfound.json';

const Error = () => {
  return (
    <Container className="text-center mt-5">
      <div style={{ maxWidth: 400, margin: '0 auto' }}>
        <Lottie animationData={animationData} loop={true} />
      </div>

      <h1 className="display-4">404</h1>
      <p className="lead">Oops! Pagina non trovata.</p>
      <p>La strada che stai cercando è bloccata... oppure non esiste!</p>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <Button as={Link} to="/" variant="primary">
          Torna alla Home
        </Button>
        <Button as={Link} to="/dashboard" variant="secondary">
          Vai alla Dashboard
        </Button>
      </div>
    </Container>
  );
};

export default Error;

import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <Container className="text-center mt-5">
      <h1 className="display-4">404</h1>
      <p className="lead">Oops! Pagina non trovata.</p>
      <p>La pagina che stai cercando non esiste o è stata rimossa.</p>

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

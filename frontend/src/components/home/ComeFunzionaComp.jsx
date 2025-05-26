import { Container, Row, Col } from 'react-bootstrap';

const ComeFunziona = () => {
  return (
    <Container className="py-5 text-center">
      <h2 className="mb-4">Come funziona?</h2>
      <Row>
        <Col md={4}>
          <h5>1. Registrati</h5>
          <p>Crea un account in pochi secondi.</p>
        </Col>
        <Col md={4}>
          <h5>2. Invia la segnalazione</h5>
          <p>Compila il modulo con descrizione, posizione e foto.</p>
        </Col>
        <Col md={4}>
          <h5>3. Segui lo stato</h5>
          <p>Controlla l'avanzamento nella tua dashboard.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ComeFunziona;
import { Container, Row, Col } from 'react-bootstrap';

const PercheUsare = () => {
  return (
    <Container className="flex py-5 text-center bg-light">
      <h2 className="mb-4">Perché usare CivicAlert?</h2>
      <Row>
        <Col md={6}>
          <p>✅ Aiuta la tua comunità a migliorare la città</p>
          <p>✅ Tutto è tracciato e trasparente</p>
        </Col>
        <Col md={6}>
          <p>✅ Rende più semplice il lavoro degli enti comunali</p>
          <p>✅ Gratuita, veloce, sempre accessibile</p>
        </Col>
      </Row>
    </Container>
  );
};

export default PercheUsare;

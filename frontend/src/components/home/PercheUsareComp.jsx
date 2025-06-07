import { Container, Row, Col } from 'react-bootstrap';

const PercheUsare = () => {
  return (
    <Container className="text-center py-5" style={{ backgroundColor: '#e7e6fc' }}>
      <h3 className="fw-semibold mb-4 text-dark"> Perchè usare Civic Alert?</h3>
      <Row className="g-3 justify-content-center">
        {[
          'Aiuta la comunità a migliorare la città',
          'Rende più semplice il lavoro degli enti comunali',
          'Tutto è tracciato e trasparente',
          'Gratuita, veloce e sempre accessibile'
        ].map((item, i) => (
          <Col xs={10} md={10} lg={5} key={i}>
            <div className="bg-white rounded-pill py-2 px-3 shadow-sm"
              style={{
                backgroundColor: '#413CB8'
              }}>
              {item}</div>
          </Col>
        ))}
      </Row>
    </Container>

  );
};

export default PercheUsare;

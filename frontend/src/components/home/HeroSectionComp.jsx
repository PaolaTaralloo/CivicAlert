import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/hero-urban.svg';

const HeroSection = () => {
  return (
    <Container className="py-5">
      <Row className="align-items-center">
        <Col md={6} className="text-center text-md-start">
          <h1 className="display-5 fw-bold">CivicAlert</h1>
          <p className="lead">
            La voce dei cittadini per una città più vivibile.<br />
            Segnala problemi urbani direttamente dal tuo quartiere.
          </p>
          <div className="d-flex gap-3 mt-4 justify-content-center justify-content-md-start">
            <Button 
              as={Link} 
              to="/register"
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
              }}
            >
              Inizia ora
            </Button>
            <Button as={Link} to="/login" variant="outline-secondary">Accedi</Button>
          </div>
        </Col>
        <Col md={6} className="mt-4 mt-md-0">
          <img src={heroImg} alt="CivicAlert hero" className="img-fluid" />
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSection;

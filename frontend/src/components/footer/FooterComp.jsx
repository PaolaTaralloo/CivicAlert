import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row className="align-items-center">
        
          <Col md={12} className="text-center text-center">
            <p className="mb-0 small">
              &copy; {year} CivicAlert. Tutti i diritti riservati.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
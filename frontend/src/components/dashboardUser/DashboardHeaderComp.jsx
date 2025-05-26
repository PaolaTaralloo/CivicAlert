import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DashboardHeader = ({ query, setQuery }) => {
  return (
    <Row className="mb-4 align-items-center">
      <Col md={8}>
        <Form.Control
          type="text"
          placeholder="Cerca per titolo, categoria o stato..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Col>
      <Col md={4} className="text-md-end mt-3 mt-md-0">
        <Button as={Link} to="/nuova-segnalazione" variant="success">
          + Nuova Segnalazione
        </Button>
      </Col>
    </Row>
  );
};

export default DashboardHeader;

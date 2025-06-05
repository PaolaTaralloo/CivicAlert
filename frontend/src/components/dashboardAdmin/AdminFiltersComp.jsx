import { Row, Col, Form } from 'react-bootstrap';

const AdminFilters = ({ filtro, setFiltro }) => {
  return (
    <Row className="mb-4">
      <Col md={4}>
        <Form.Select
          value={filtro.stato}
          onChange={(e) => setFiltro({ ...filtro, stato: e.target.value })}
        >
          <option value="">Tutti gli stati</option>
          <option value="in attesa">In attesa</option>
          <option value="in lavorazione">In lavorazione</option>
          <option value="risolto">Risolto</option>
        </Form.Select>
      </Col>
      <Col md={4}>
        <Form.Select
          value={filtro.categoria}
          onChange={(e) => setFiltro({ ...filtro, categoria: e.target.value })}
        >
          <option value="">Tutte le categorie</option>
          <option value="buca">Buca</option>
          <option value="rifiuti">Rifiuti</option>
          <option value="lampione">Lampione</option>
          <option value="semaforo">Semaforo</option>
          <option value="altro">Altro</option>
        </Form.Select>
      </Col>
      <Col md={4}>
        <Form.Control
          type="date"
          value={filtro.data}
          onChange={(e) => setFiltro({ ...filtro, data: e.target.value })}
        />
      </Col>
    </Row>
  );
};

export default AdminFilters;

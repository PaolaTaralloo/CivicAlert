import { useState, useEffect, useContext } from 'react';
import { Container, Form, Button, Table, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import { Link } from 'react-router-dom';

const DashboardUser = () => {
  const { user } = useContext(AuthContext);
  const [segnalazioni, setSegnalazioni] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchSegnalazioni = async () => {
      try {
        const res = await api.get('/segnalazioni/mie', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setSegnalazioni(res.data);
      } catch (err) {
        console.error('Errore nel recupero delle segnalazioni:', err);
      }
    };
    fetchSegnalazioni();
  }, [user]);

  const filtered = segnalazioni.filter((s) =>
    s.titolo.toLowerCase().includes(query.toLowerCase()) ||
    s.categoria.toLowerCase().includes(query.toLowerCase()) ||
    s.stato.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Container className="mt-4">
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

      <h4 className="mb-3">Le mie segnalazioni</h4>

      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Titolo</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>Stato</th>
            <th>Posizione</th>
            <th>Immagine</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((s) => (
              <tr key={s._id}>
                <td>{s.titolo}</td>
                <td>{s.categoria}</td>
                <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                <td>
                  <span className={`badge bg-${
                    s.stato === 'risolto' ? 'success' :
                    s.stato === 'in lavorazione' ? 'warning' : 'secondary'
                  }`}>
                    {s.stato}
                  </span>
                </td>
                <td>
                  {s.posizione.lat.toFixed(4)}, {s.posizione.lng.toFixed(4)}
                </td>
                <td>
                  <a href={s.immagine} target="_blank" rel="noopener noreferrer">
                    Visualizza
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">Nessuna segnalazione trovata</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default DashboardUser;

import { useState, useContext } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const NuovaSegnalazione = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titolo: '',
    descrizione: '',
    categoria: 'altro',
    lat: '',
    lng: '',
    image: null,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const data = new FormData();
    data.append('titolo', formData.titolo);
    data.append('descrizione', formData.descrizione);
    data.append('categoria', formData.categoria);
    data.append('lat', formData.lat);
    data.append('lng', formData.lng);
    data.append('image', formData.image);

    try {
      await api.post('/segnalazioni', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      });

      setSuccess('Segnalazione inviata con successo!');
      setFormData({
        titolo: '',
        descrizione: '',
        categoria: 'altro',
        lat: '',
        lng: '',
        image: null,
      });

      // Redirect dopo successo
      setTimeout(() => navigate('/dashboard'), 1500);

    } catch (err) {
      setError('Errore durante l’invio. Ricontrolla i dati.');
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '600px' }}>
      <h3 className="mb-4 text-center">Nuova Segnalazione</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control
            type="text"
            name="titolo"
            value={formData.titolo}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="descrizione"
            value={formData.descrizione}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Select name="categoria" value={formData.categoria} onChange={handleChange}>
            <option value="buca">Buca</option>
            <option value="rifiuti">Rifiuti</option>
            <option value="lampione">Lampione guasto</option>
            <option value="semaforo">Semaforo rotto</option>
            <option value="altro">Altro</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Latitudine</Form.Label>
          <Form.Control
            type="number"
            name="lat"
            value={formData.lat}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Longitudine</Form.Label>
          <Form.Control
            type="number"
            name="lng"
            value={formData.lng}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Immagine</Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Invia segnalazione
        </Button>
      </Form>
    </Container>
  );
};

export default NuovaSegnalazione;

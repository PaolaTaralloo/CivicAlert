import { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import DashboardHeader from '../../components/dashboardUser/DashboardHeaderComp.jsx';
import SegnalazioniTable from '../../components/dashboardUser/SegnalazioneTableComp.jsx';

const Dashboard = () => {
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
    <div className="auth-page">
      <div className="auth-content">
    <Container className="mt-4">
      <DashboardHeader query={query} setQuery={setQuery} />
      <h4 className="mb-3">Le mie segnalazioni</h4>
      <SegnalazioniTable segnalazioni={filtered} />
    </Container>
    </div>
    </div>

  );
};

export default Dashboard;

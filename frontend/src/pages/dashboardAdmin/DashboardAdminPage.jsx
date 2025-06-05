import { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import AdminFilters from '../../components/dashboardAdmin/AdminFiltersComp';
import AdminSegnalazioniTable from '../../components/dashboardAdmin/AdminSegnalazioneComp';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [segnalazioni, setSegnalazioni] = useState([]);
  const [filtro, setFiltro] = useState({ stato: '', categoria: '', data: '' });

  const fetchAll = async () => {
    try {
      const res = await api.get('/segnalazioni', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSegnalazioni(res.data);
    } catch (err) {
      console.error('Errore nel recupero delle segnalazioni:', err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [user]);

  const handleUpdateStato = async (id, nuovoStato) => {
    try {
      await api.patch(`/segnalazioni/${id}/stato`, 
        { stato: nuovoStato },
        { headers: { Authorization: `Bearer ${user.token}` }}
      );
      // Aggiorna la lista dopo la modifica
      fetchAll();
    } catch (err) {
      console.error('Errore aggiornamento stato:', err);
    }
  };

  const filtrate = segnalazioni.filter((s) => {
    return (
      (filtro.stato === '' || s.stato === filtro.stato) &&
      (filtro.categoria === '' || s.categoria === filtro.categoria) &&
      (filtro.data === '' || new Date(s.createdAt).toISOString().slice(0, 10) === filtro.data)
    );
  });

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Gestione Segnalazioni</h2>
      <AdminFilters filtro={filtro} setFiltro={setFiltro} />
      <AdminSegnalazioniTable 
        segnalazioni={filtrate} 
        onUpdateStato={handleUpdateStato}
      />
    </Container>
  );
};

export default AdminDashboard;

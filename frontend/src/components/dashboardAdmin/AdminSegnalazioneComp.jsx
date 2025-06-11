import { Table, Form } from 'react-bootstrap';

const AdminSegnalazioniTable = ({ segnalazioni, onUpdateStato }) => {
  if (segnalazioni.length === 0) {
    return <p className="text-center">Nessuna segnalazione trovata.</p>;
  }

  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>Utente</th>
          <th>Titolo</th>
          <th>Categoria</th>
          <th>Posizione</th>
          <th>Immagine</th>
          <th>Data</th>
          <th>Stato</th>
        </tr>
      </thead>
      <tbody>
        {segnalazioni.map((s) => (
          <tr key={s._id}>
            <td>{s.utente?.name || 'Utente non disponibile'}</td>
            <td>{s.titolo}</td>
            <td>{s.categoria}</td>
            <td>{s.posizione.lat.toFixed(4)}, {s.posizione.lng.toFixed(4)}</td>
            <td>
              <a href={s.immagine} target="_blank" rel="noopener noreferrer">
                Visualizza
              </a>
            </td>
            <td>{new Date(s.createdAt).toLocaleDateString()}</td>
            <td>
              <Form.Select
                value={s.stato}
                onChange={(e) => onUpdateStato(s._id, e.target.value)}
              >
                <option value="in attesa">In attesa</option>
                <option value="in lavorazione">In lavorazione</option>
                <option value="risolto">Risolto</option>
              </Form.Select>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AdminSegnalazioniTable;

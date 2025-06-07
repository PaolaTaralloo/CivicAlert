import { Table } from 'react-bootstrap';
import StatoBadge from './StatoBadge';

const SegnalazioniTable = ({ segnalazioni }) => {
  if (segnalazioni.length === 0) {
    return <p className="text-center">Nessuna segnalazione trovata.</p>;
  }

  return (
   
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
        {segnalazioni.map((s) => (
          <tr key={s._id}>
            <td>{s.titolo}</td>
            <td>{s.categoria}</td>
            <td>{new Date(s.createdAt).toLocaleDateString()}</td>
            <td><StatoBadge stato={s.stato} /></td>
            <td>{s.posizione.lat.toFixed(4)}, {s.posizione.lng.toFixed(4)}</td>
            <td>
              <a href={s.immagine} target="_blank" rel="noopener noreferrer">
                Visualizza
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  
  );
};

export default SegnalazioniTable;

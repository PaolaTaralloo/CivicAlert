import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { Container } from 'react-bootstrap';

// Fix per i marker che altrimenti non si caricano
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});


// Icone personalizzate per i marker in base allo stato della segnalazione
const markerIcons = {
    'in attesa': new L.Icon({
        iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    }),
    'in lavorazione': new L.Icon({
        iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/orange-dot.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    }),
    'risolto': new L.Icon({
        iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    }),
};


// Componente per visualizzare le segnalazioni su una mappa
const SegnalazioniMap = () => {
    const [segnalazioni, setSegnalazioni] = useState([]);
    
    useEffect(() => {
        const fetchSegnalazioni = async () => {
            try {
                const res = await api.get('/segnalazioni/pubbliche');
                // Verifica nel client che stiamo ricevendo solo le segnalazioni desiderate
                console.log('Segnalazioni ricevute:', res.data);
                const segnalazioniFiltrate = res.data.filter(s => 
                    ['in attesa', 'in lavorazione'].includes(s.stato)
                );
                setSegnalazioni(segnalazioniFiltrate);
            } catch (err) {
                console.error('Errore nel recupero delle segnalazioni', err);
            }
        };
        fetchSegnalazioni();
    }, []);

    return (
        <Container className="p-0 text-center">
            <h3 className="fw-semibold mb-4 text-dark my-5">Segnalazioni in corso</h3>
            <div style={{ height: '500px', width: '100%', marginTop: '2rem' }}>
                <MapContainer center={[40.8522, 14.2681]} zoom={13} scrollWheelZoom={true} style={{ height: '100%' }}>
                    <TileLayer
                        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
                    />


                    {segnalazioni.map((s) => (
                        <Marker key={s._id}
                            position={[s.posizione.lat, s.posizione.lng]}
                            icon={markerIcons[s.stato] || markerIcons['in attesa']}>
                            <Popup>
                                <strong>{s.titolo}</strong><br />
                                {s.categoria}<br />
                                Stato: {s.stato}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </Container>
    );
};

export default SegnalazioniMap;

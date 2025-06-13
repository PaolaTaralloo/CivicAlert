import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Container } from 'react-bootstrap';

// Fix per i marker che altrimenti non si caricano
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const createPinIcon = (color) => {
    const pinSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="${color}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        </svg>
    `;

    return new L.Icon({
        iconUrl: 'data:image/svg+xml;base64,' + btoa(pinSvg),
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
};

// Icone personalizzate per i marker in base allo stato della segnalazione
const markerIcons = {
    'in attesa': createPinIcon('#413CB8'),      // viola
    'in lavorazione': createPinIcon(' #16B889'),  // verde
    'risolto': createPinIcon('#e7e6fc')         // Grigio chiaro
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
                        url={`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${process.env.VITE_APP_PUBLIC_STADIA_API_KEY}`}
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

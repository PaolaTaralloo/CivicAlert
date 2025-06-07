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

const SegnalazioniMap = () => {
    const [segnalazioni, setSegnalazioni] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchSegnalazioni = async () => {
            try {
                const res = await api.get('/segnalazioni/pubbliche');
                setSegnalazioni(res.data);
            } catch (err) {
                console.error('Errore nel recupero delle segnalazioni', err);
            }
        };
        fetchSegnalazioni();
    }, [user]);

    return (
        <Container className="p-0">
            <div style={{ height: '500px', width: '100%', marginTop: '2rem' }}>
                <MapContainer center={[40.8522, 14.2681]} zoom={13} scrollWheelZoom={true} style={{ height: '100%' }}>
                    <TileLayer
                        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
                    />


                    {segnalazioni.map((s) => (
                        <Marker key={s._id} position={[s.posizione.lat, s.posizione.lng]}>
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

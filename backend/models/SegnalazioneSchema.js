import mongoose from 'mongoose';

const segnalazioneSchema = new mongoose.Schema({
  titolo: {
    type: String,
    required: true,
  },
  descrizione: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    enum: ['buca', 'rifiuti', 'lampione', 'semaforo', 'altro'],
    default: 'altro',
  },
  posizione: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  immagine: {
    type: String,
    required: true, // URL Cloudinary
  },
  stato: {
    type: String,
    enum: ['in attesa', 'in lavorazione', 'risolto'],
    default: 'in attesa',
  },
  utente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Segnalazione = mongoose.model('Segnalazione', segnalazioneSchema);
export default Segnalazione;

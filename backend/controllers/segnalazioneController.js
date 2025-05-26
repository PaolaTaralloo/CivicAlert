import Segnalazione from '../models/SegnalazioneSchema.js';

const creaSegnalazione = async (req, res) => {
  const { titolo, descrizione, categoria, lat, lng } = req.body;

  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: 'Immagine mancante o non valida' });
  }

  try {
    const segnalazione = await Segnalazione.create({
      titolo,
      descrizione,
      categoria,
      posizione: { lat, lng },
      immagine: req.file.path,
      utente: req.user._id,
    });

    res.status(201).json(segnalazione);
  } catch (err) {
    res.status(500).json({ message: 'Errore creazione segnalazione', error: err.message });
  }
};

const getSegnalazioniUtente = async (req, res) => {
  const segnalazioni = await Segnalazione.find({ utente: req.user._id }).sort({ createdAt: -1 });
  res.json(segnalazioni);
};

const getTutteSegnalazioni = async (req, res) => {
  const segnalazioni = await Segnalazione.find()
    .populate('utente', 'name email')
    .sort({ createdAt: -1 });
  res.json(segnalazioni);
};

const aggiornaStatoSegnalazione = async (req, res) => {
  const { id } = req.params;
  const { stato } = req.body;

  try {
    const segnalazione = await Segnalazione.findById(id);
    if (!segnalazione) return res.status(404).json({ message: 'Segnalazione non trovata' });

    segnalazione.stato = stato;
    await segnalazione.save();
    res.json({ message: 'Stato aggiornato', segnalazione });
  } catch (err) {
    res.status(500).json({ message: 'Errore aggiornamento', error: err.message });
  }
};

const eliminaSegnalazione = async (req, res) => {
  try {
    const { id } = req.params;
    await Segnalazione.findByIdAndDelete(id);
    res.json({ message: 'Segnalazione eliminata' });
  } catch (err) {
    res.status(500).json({ message: 'Errore eliminazione', error: err.message });
  }
};


export { creaSegnalazione, getSegnalazioniUtente, getTutteSegnalazioni, aggiornaStatoSegnalazione, eliminaSegnalazione};
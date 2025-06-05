import User from '../models/UserSchema.js';

export const aggiornaRuoloUtente = async (req, res) => {
  try {
    const { role } = req.body;

    if (!['admin', 'cittadino'].includes(role)) {
      return res.status(400).json({ message: 'Ruolo non valido' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Errore interno', error });
  }
};

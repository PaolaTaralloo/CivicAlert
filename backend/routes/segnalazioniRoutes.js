import express from 'express';
import { creaSegnalazione, getSegnalazioniUtente, getTutteSegnalazioni, aggiornaStatoSegnalazione, eliminaSegnalazione } from '../controllers/segnalazioneController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../utils/cloudinary.js';

const router = express.Router();

// POST segnalazione (utente)
router.post('/', protect, upload.single('image'), creaSegnalazione);

// GET delle segnalazioni by Id (utente loggato)
router.get('/mie', protect, getSegnalazioniUtente);

// GET di tutte le segnalazioni (admin)
router.get('/', protect, getTutteSegnalazioni);

// PATCH per cambiare lo stato della segnalazione (admin)
router.patch('/:id/stato', protect, aggiornaStatoSegnalazione);

// DELETE segnalazione (admin)
router.delete('/:id', protect, eliminaSegnalazione);

export default router;

import express from 'express';
import { creaSegnalazione,getTutteSegnalazioniPubbliche, getSegnalazioniUtente, getTutteSegnalazioni, aggiornaStatoSegnalazione, eliminaSegnalazione } from '../controllers/segnalazioneController.js';
import { protect, verifyAdmin } from '../middlewares/authMiddleware.js';
import { upload } from '../utils/cloudinary.js';

const router = express.Router();

// POST segnalazione (utente)
router.post('/', protect, upload.single('image'), creaSegnalazione);

// GET delle segnalazioni by Id (utente loggato)
router.get('/mie', protect, getSegnalazioniUtente);

// GET di tutte le segnalazioni (admin)
router.get('/', [protect,verifyAdmin], getTutteSegnalazioni);

// GET delle segnalazioni pubbliche (tutti gli utenti e non loggati)
router.get('/pubbliche', getTutteSegnalazioniPubbliche)

// PATCH per cambiare lo stato della segnalazione (admin)
router.patch('/:id/stato', [protect,verifyAdmin], aggiornaStatoSegnalazione);

// DELETE segnalazione (admin)
router.delete('/:id', [protect,verifyAdmin], eliminaSegnalazione);

export default router;

import express from 'express';
import { upload } from '../utils/cloudinary.js';

const router = express.Router();

router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nessun file caricato' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Immagine caricata con successo',
      imageUrl: req.file.path,
    });
  } catch (error) {
    console.error('Errore upload:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Errore durante il caricamento' 
    });
  }
});

export default router;

// src/routes/userRoutes.js
import express from 'express';
import { aggiornaRuoloUtente } from '../controllers/userController.js';
import { protect, verifyAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.patch('/:id/role', protect, verifyAdmin, aggiornaRuoloUtente);

export default router;

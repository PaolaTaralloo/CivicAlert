import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account'
    })
);

router.get('/google/callback',
    passport.authenticate('google', { 
        failureRedirect: `${process.env.FRONTEND_URL}/login`,
        session: false 
    }),
    (req, res) => {
        const token = jwt.sign(
            { id: req.user._id, email: req.user.email, role: req.user.role }, 
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.redirect(`${process.env.FRONTEND_URL}/google-success?token=${token}&name=${req.user.name}&role=${req.user.role}`);
    }
);

export default router;
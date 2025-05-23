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
        failureRedirect: 'http://localhost:5173/login',
        session: false 
    }),
    (req, res) => {
        const token = jwt.sign(
            { id: req.user._id, email: req.user.email }, 
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.redirect(`http://localhost:5173/google-success?token=${token}`);
    }
);

export default router;
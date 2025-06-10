import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import session from 'express-session';
import passport from 'passport';
import './config/passport.mjs';
import { sendEmail, sendWelcomeEmail } from './utils/sendEmailSendgrid.js';
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import segnalazioniRoutes from './routes/segnalazioniRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use(session({
  secret: 'google-secret-session',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


// Registra le route
app.use("/auth", authRoutes);
app.use('/upload', uploadRoutes);
app.use('/segnalazioni', segnalazioniRoutes);
app.use('/users', userRoutes); // Aggiungi questa linea

// Add the test email route
app.post('/api/test-email', async(req, res) => {
    try {
        await sendEmail({
            to: process.env.EMAIL_SENDER, // Use your verified email
            from: process.env.EMAIL_SENDER, // Must use verified sender
            subject: 'Test Email from CivicAlert',
            text: 'This is a test email from CivicAlert',
            html: '<strong>Your CivicAlert email service is working!</strong>'
        });
        res.sendStatus(200);
    } catch (e) {
        console.error('Email test error:', e);
        res.sendStatus(500);
    }
});

//Connessione al database
connectDB()

//Inizializza il server
app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
})
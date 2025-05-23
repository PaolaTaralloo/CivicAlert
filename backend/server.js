import express from 'express';
import dotenv from "dotenv/config";
import cors from 'cors';
import connectDB from './db.js';
import session from 'express-session';
import passport from 'passport';
import './config/passport.mjs';
import authRoutes from './routes/authRoutes.js';

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
app.get("/", (req, res) => {
    res.status(200).json({ message: "CivicAlert API is running" });
});

app.use("/auth", authRoutes);


//Connessione al database
connectDB()

//Inizializza il server
app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
}) 
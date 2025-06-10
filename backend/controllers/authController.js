import User from '../models/UserSchema.js';
import jwt from 'jsonwebtoken';
import { sendWelcomeEmail } from '../utils/sendEmailSendgrid.js';


// Funzione per generare un token JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1y',
  });
};

// Funzione per registrare un nuovo utente
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Utente già registrato' });
    }

    const user = await User.create({ name, email, password });

    try {
      await sendWelcomeEmail(user.email, user.name);
    } catch (emailError) {
      console.error('Errore invio email di benvenuto:', emailError);
      // Continua la registrazione anche se l'invio email fallisce
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  } catch (error) {
    console.error('Errore registrazione:', error);
    res.status(500).json({ message: 'Errore nella registrazione', error: error.message });
  }
};

// Funzione di login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      console.log('Login fallito per:', email);
      return res.status(401).json({ message: 'Credenziali non valide' });
    }

    const token = generateToken(user);
    console.log('Token generato:', token);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });


  } catch (error) {
    console.error('Errore login:', error);
    res.status(500).json({ message: 'Errore del server' });
  }
};


export { registerUser, loginUser };
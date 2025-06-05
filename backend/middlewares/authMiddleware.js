import jwt from 'jsonwebtoken';
import User from '../models/UserSchema.js';

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Accesso non autorizzato' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Utente non trovato' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token non valido' });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Accesso negato: richiesti privilegi admin' });
  }
};

// Esporta una sola volta
export { protect, verifyAdmin };

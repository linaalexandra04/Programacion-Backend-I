import jwt from 'jsonwebtoken';
import config from '../config.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).send('No autenticado');
    }

    jwt.verify(token, config.SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Token no válido');
        }

        req.user = user; 
        next();
    });
};

export const checkAdminRole = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).send('Acceso denegado');
    }
};


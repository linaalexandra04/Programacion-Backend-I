import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import UserManager from '../dao/services/user.service.js';
import config from '../config.js';
import bcrypt from 'bcrypt';
import { verifyToken} from '../auth/auth.milddleware.js';

const router = express.Router();
const userManager = new UserManager();

// Ruta protegida para obtener el perfil del usuario
router.get('/profile', verifyToken, (req, res) => {
    res.send({
        id: req.user.id,
        role: req.user.role
    });
});

// Register Route
router.post('/register', async (req, res) => {
    try {
        const user = await userManager.add(req.body);
        if (user) {
            res.status(201).json({ message: 'User registered successfully', user });
        } else {
            res.status(400).json({ message: 'User registration failed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userManager.getOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('jwt', token, { httpOnly: true });
            res.status(200).json({ message: 'Login successful', token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Current User Route
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user);
});

export default router;

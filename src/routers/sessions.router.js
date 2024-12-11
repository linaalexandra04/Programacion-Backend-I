import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../dao/models/user.model.js';
import config from '../config.js';
import { verifyToken } from '../auth/auth.milddleware.js';

const router = Router();

router.get('/current', verifyToken, (req, res) => {
    res.status(200).send({
        message: 'Usuario autenticado',
        user: req.user, 
    });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Se requieren email y contraseña' });
        }


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            config.SECRET, 
            { expiresIn: '1h' }
        );

        res.cookie('jwt', token, { httpOnly: true, secure: false }).status(200).send({
            message: 'Login exitoso',
            token,
        });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).send({ error: 'Error interno del servidor', details: error.message });
    }
});

export default router;
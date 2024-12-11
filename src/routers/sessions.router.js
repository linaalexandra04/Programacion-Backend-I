import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../dao/models/user.model.js';
import config from '../config.js';
import { verifyToken } from '../auth/auth.milddleware.js';

const router = Router();

router.get('/current', verifyToken, (req, res) => {
    res.send({
        message: 'Usuario autenticado',
        user: req.user
    });
});

// Ruta de Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Usuario no encontrado');
        }

        // Comparar la contraseña ingresada con la almacenada
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Contraseña incorrecta');
        }

        // Generar token JWT
        const token = jwt.sign({ id: user._id, role: user.role }, config.SECRET, { expiresIn: '1h' });

        // Guardar el token en una cookie
        res.cookie('token', token, { httpOnly: true }).send({ message: 'Login exitoso', token });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).send('Error interno del servidor');
    }
});

export default router;

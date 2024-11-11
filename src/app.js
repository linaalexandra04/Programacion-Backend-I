import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server as SocketIO } from 'socket.io';
import initAuthStrategies from './auth/passport.config.js';
import usersRouter from '../src/routers/users.router.js';
import viewsRouter from '../src/routers/views.router.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Path configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new SocketIO(httpServer);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'secretCoffeStore',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
initAuthStrategies();

// Set up Handlebars 
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
import { engine } from 'express-handlebars';
app.engine('handlebars', engine());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/users', usersRouter);
app.use('/views', viewsRouter);

// Socket.io chat setup
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('chatMessage', (msg) => {
        io.emit('message', { user: 'User', text: msg });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// MongoDB 
const mongoUri = 'mongodb+srv://alexa999:29oO4cbPUrXPIdUg@cluster1.mh8bk.mongodb.net/tiendaCafe?retryWrites=true&w=majority&appName=Cluster1';
mongoose.connect(mongoUri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// Ruta para la página principal
app.get('/', (req, res) => {
    res.render('home');
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
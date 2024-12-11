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
import sessionsRouter from './routers/sessions.router.js';
import cartsRouter from './routers/carts.router.js';
import productsRouter from './routers/product.router.js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';


const envFile = process.env.NODE_ENV === 'production' ? '.env_prod' : '.env_dev';
dotenv.config({ path: envFile });

console.log(`Entorno actual: ${process.env.NODE_ENV}`);
console.log(`Puerto: ${process.env.PORT}`);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new SocketIO(httpServer);

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

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
import { engine } from 'express-handlebars';
app.engine('handlebars', engine());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/views', viewsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('chatMessage', (msg) => {
        io.emit('message', { user: 'User', text: msg });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const mongoUri = 'mongodb+srv://alexa999:29oO4cbPUrXPIdUg@cluster1.mh8bk.mongodb.net/tiendaCafe?retryWrites=true&w=majority&appName=Cluster1';
mongoose.connect(mongoUri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

app.get('/', (req, res) => {
    res.render('home');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

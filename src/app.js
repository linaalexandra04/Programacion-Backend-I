import express from 'express';
import { create } from 'express-handlebars';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import multer from 'multer';
import productsRouter from './routers/Product.js';

const app = express();
const PORT = process.env.PORT || 8080;


const hbs = create({
    extname: '.handlebars',
});

app.engine('.handlebars', hbs.engine);
app.set('view engine', '.handlebars');
app.set('views', './src/views/');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/2.png');  
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);  
    }
});
const upload = multer({ storage });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));  

// Rutas
app.use('/api/products', productsRouter);


app.post('/upload', upload.single('thumbnail'), (req, res) => {
    res.status(200).json({ message: 'Imagen subida correctamente', file: req.file });
});


const server = http.createServer(app);
export const io = new SocketIOServer(server);

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});


app.get('/', (req, res) => {
    res.render('home', { title: 'Lista de Productos' });
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { title: 'Productos en Tiempo Real' });
});


server.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
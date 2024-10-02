import express from 'express';
import { create } from 'express-handlebars';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import multer from 'multer';
import mongoose from 'mongoose';
import productsRouter from './routers/Product.js';
import cartsRouter from './routers/Carts.js';
import Product from './models/Products.js';

const app = express();
const PORT = process.env.PORT || 8080;

// MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://alexa999:29oO4cbPUrXPIdUg@cluster1.mh8bk.mongodb.net/tiendaCafe?retryWrites=true&w=majority&appName=Cluster1');
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};


//Handlebars
const hbs = create({
    extname: '.handlebars',
    defaultLayout: 'main',
});

app.engine('.handlebars', hbs.engine);
app.set('view engine', '.handlebars');
app.set('views', './src/views/');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));  

// Rutas de Productos y Carritos
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Rutas de Vistas
app.get('/products', (req, res) => {
    res.render('index', { title: 'Productos con paginación' });
});

app.get('/carts/:cid', (req, res) => {
    res.render('cart', { title: 'Carrito específico' });
});

// Ruta para la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de la tienda de café. Usa /api/products para ver los productos.');
});

// Ruta para mostrar los detalles del producto
app.get('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id; 
        const product = await Product.findById(productId); 
        const cartId = req.session.cartId || 'defaultCartId'; 
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }
        res.render('details', { product, cartId }); 
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).send('Error al obtener el producto');
    }
});

//servidor HTTP
const server = http.createServer(app);

// Socket.io 
export const io = new SocketIOServer(server);

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Iniciar el servidor
server.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
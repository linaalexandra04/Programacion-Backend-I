import express from 'express';
import productsRouter from './routers/Product.js';
import cartsRouter from './routers/Carts.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});


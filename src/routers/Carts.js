import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
        return res.status(400).json({ error: 'La cantidad debe ser un número positivo' });
    }

    const cartsFilePath = path.resolve('src/data/Carrito.json');
    const productsFilePath = path.resolve('src/data/Productos.json');

    fs.readFile(cartsFilePath, 'utf8', (err, cartsData) => {
        if (err) return res.status(500).json({ error: 'Error al leer el archivo de carritos' });

        const carts = JSON.parse(cartsData);
        const cart = carts.find(c => c.id === parseInt(cid));

        if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

        fs.readFile(productsFilePath, 'utf8', (err, productsData) => {
            if (err) return res.status(500).json({ error: 'Error al leer el archivo de productos' });

            const products = JSON.parse(productsData);
            const product = products.find(p => p.id === parseInt(pid));

            if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

            const existingProduct = cart.products.find(p => p.product === pid);

            if (existingProduct) {

                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ product: pid, quantity });
            }

            fs.writeFile(cartsFilePath, JSON.stringify(carts, null, 2), 'utf8', (err) => {
                if (err) return res.status(500).json({ error: 'Error al guardar el carrito' });
                res.status(200).json({ message: 'Producto agregado al carrito' });
            });
        });
    });
});

export default router;


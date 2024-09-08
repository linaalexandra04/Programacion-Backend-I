import fs from 'fs';
import path from 'path';
import { io } from '../app.js';  

const productosFilePath = './src/data/Productos.json';

export const getAllProducts = (req, res) => {
    fs.readFile(productosFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo de productos' });
        }
        let productos = JSON.parse(data);
        const limit = req.query.limit;
        if (limit) {
            productos = productos.slice(0, parseInt(limit));
        }
        res.json(productos);
    });
};

export const getProductById = (req, res) => {
    const { pid } = req.params;
    fs.readFile(productosFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo de productos' });
        }
        const productos = JSON.parse(data);
        const producto = productos.find(p => p.id === parseInt(pid));
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(producto);
    });
};

export const createProduct = (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios excepto thumbnails' });
    }

    fs.readFile(productosFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo de productos' });
        }

        let productos = JSON.parse(data);
        const newProduct = {
            id: productos.length + 1,  
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category,
            thumbnails: thumbnails || []
        };

        productos.push(newProduct);

        fs.writeFile(productosFilePath, JSON.stringify(productos, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al guardar el nuevo producto' });
            }
            res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
            io.emit('updateProducts', productos);
        });
    });
};

export const updateProductById = (req, res) => {
    const { pid } = req.params;
    const updates = req.body;

    fs.readFile(productosFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo de productos' });
        }

        let productos = JSON.parse(data);
        const productIndex = productos.findIndex(p => p.id === parseInt(pid));

        if (productIndex === -1) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        if (updates.id) {
            delete updates.id;
        }

        productos[productIndex] = { ...productos[productIndex], ...updates };

        fs.writeFile(productosFilePath, JSON.stringify(productos, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al guardar el producto' });
            }

            res.json({ message: 'Producto actualizado exitosamente', product: productos[productIndex] });
            io.emit('updateProducts', productos);
        });
    });
};

export const deleteProductById = (req, res) => {
    const { pid } = req.params;

    fs.readFile(productosFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo de productos' });
        }

        let productos = JSON.parse(data);
        const productIndex = productos.findIndex(p => p.id === parseInt(pid));

        if (productIndex === -1) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        productos.splice(productIndex, 1);

        fs.writeFile(productosFilePath, JSON.stringify(productos, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al eliminar el producto' });
            }

            res.json({ message: 'Producto eliminado exitosamente' });
            io.emit('updateProducts', productos);
        });
    });
};
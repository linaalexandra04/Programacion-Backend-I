import ProductService from '../dao/services/product.service.mongo.js';
import ProductDTO from '../dao/dto/product.dto.js';

const productService = new ProductService();
export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        const formattedProducts = products.map(product => new ProductDTO(product).toResponse());
        res.status(200).json({ products: formattedProducts });
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener los productos', details: error.message });
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productService.getProductById(id);
        if (!product) {
            return res.status(404).send({ error: 'Producto no encontrado' });
        }
        const formattedProduct = new ProductDTO(product).toResponse();
        res.status(200).json(formattedProduct);
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener el producto', details: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        const formattedProduct = new ProductDTO(newProduct).toResponse();
        res.status(201).json(formattedProduct);
    } catch (error) {
        res.status(500).send({ error: 'Error al crear el producto', details: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await productService.updateProduct(id, req.body);
        if (!updatedProduct) {
            return res.status(404).send({ error: 'Producto no encontrado para actualizar' });
        }
        const formattedProduct = new ProductDTO(updatedProduct).toResponse();
        res.status(200).json(formattedProduct);
    } catch (error) {
        res.status(500).send({ error: 'Error al actualizar el producto', details: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await productService.deleteProduct(id);
        if (!deletedProduct) {
            return res.status(404).send({ error: 'Producto no encontrado para eliminar' });
        }
        res.status(200).send({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).send({ error: 'Error al eliminar el producto', details: error.message });
    }
};
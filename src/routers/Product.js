import { Router } from 'express';
import Product from '../models/Products.js';

const router = Router();

// GET /api/products 
router.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        // Filtros de búsqueda
        let filter = {};
        if (query) {
            filter = {
                $or: [
                    { category: query },
                    { availability: query }
                ]
            };
        }

        // Ordenamiento 
        let sortOption = {};
        if (sort) {
            sortOption = { price: sort === 'asc' ? 1 : -1 };
        }

        // Paginación
        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sortOption
        };

        const products = await Product.paginate(filter, options);

        const response = {
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/api/products?page=${products.prevPage}` : null,
            nextLink: products.hasNextPage ? `/api/products?page=${products.nextPage}` : null
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// GET /api/products/:pid. detalles de un producto específico
router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await Product.findById(pid);
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }
        res.json({ status: 'success', product });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

export default router;



import Product from '../models/Products.js';

// Obtener productos con filtros, paginación y ordenamiento
export const getProducts = async (req, res) => {
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

        // Ordenamiento (ascendente o descendente por precio)
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
};

// Obtener un producto específico por su ID
export const getProductById = async (req, res) => {
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
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
    const { title, description, price, category, availability } = req.body;

    // Validar campos requeridos
    if (!title || !price || !category) {
        return res.status(400).json({ status: 'error', message: 'Faltan campos requeridos' });
    }

    try {
        const newProduct = new Product({ title, description, price, category, availability });
        await newProduct.save();
        res.json({ status: 'success', product: newProduct });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
    const { pid } = req.params;
    const updates = req.body;

    try {
        const product = await Product.findByIdAndUpdate(pid, updates, { new: true });
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }
        res.json({ status: 'success', product });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await Product.findByIdAndDelete(pid);
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }
        res.json({ status: 'success', message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
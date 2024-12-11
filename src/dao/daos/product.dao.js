import Product from '../models/product.model.js';

class ProductDAO {
    async createProduct(productData) {
        try {
            return await Product.create(productData);
        } catch (err) {
            throw new Error(`Error creando producto: ${err.message}`);
        }
    }

    async getProductById(productId) {
        try {
            return await Product.findById(productId).lean();
        } catch (err) {
            throw new Error(`Error obteniendo producto por ID: ${err.message}`);
        }
    }

    async getAllProducts(filter = {}) {
        try {
            return await Product.find(filter).lean();
        } catch (err) {
            throw new Error(`Error obteniendo productos: ${err.message}`);
        }
    }

    async updateProduct(productId, updateData) {
        try {
            return await Product.findByIdAndUpdate(productId, updateData, { new: true });
        } catch (err) {
            throw new Error(`Error actualizando producto: ${err.message}`);
        }
    }

    async deleteProduct(productId) {
        try {
            return await Product.findByIdAndDelete(productId);
        } catch (err) {
            throw new Error(`Error eliminando producto: ${err.message}`);
        }
    }
}

export default ProductDAO;

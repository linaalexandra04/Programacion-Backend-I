import Product from '../models/product.model.js';

class ProductServiceMongo {
    async create(productData) {
        try {
            return await Product.create(productData);
        } catch (err) {
            throw new Error(`Error creando producto: ${err.message}`);
        }
    }

    async getById(productId) {
        try {
            return await Product.findById(productId).lean();
        } catch (err) {
            throw new Error(`Error obteniendo producto por ID: ${err.message}`);
        }
    }

    async getAll() {
        try {
            return await Product.find().lean();
        } catch (err) {
            throw new Error(`Error obteniendo productos: ${err.message}`);
        }
    }

    async update(productId, updateData) {
        try {
            return await Product.findByIdAndUpdate(productId, updateData, { new: true });
        } catch (err) {
            throw new Error(`Error actualizando producto: ${err.message}`);
        }
    }

    async delete(productId) {
        try {
            return await Product.findByIdAndDelete(productId);
        } catch (err) {
            throw new Error(`Error eliminando producto: ${err.message}`);
        }
    }
}

export default ProductServiceMongo;

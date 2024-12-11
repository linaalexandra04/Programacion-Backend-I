import Product from '../models/product.model.js';

class ProductService {
    async getAll() {
        return await Product.find().lean();
    }

    async getById(id) {
        return await Product.findById(id).lean();
    }

    async create(data) {
        const newProduct = new Product(data);
        return await newProduct.save();
    }

    async update(id, data) {
        return await Product.findByIdAndUpdate(id, data, { new: true }).lean();
    }

    async delete(id) {
        return await Product.findByIdAndDelete(id).lean();
    }
}

export default new ProductService();

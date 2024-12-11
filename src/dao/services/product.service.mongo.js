import ProductModel from '../models/product.model.js';

class ProductService {
    async createProduct(data) {
        try {
            const newProduct = await ProductModel.create(data);
            return newProduct;
        } catch (error) {
            throw new Error('Error al crear el producto: ' + error.message);
        }
    }

    async getAllProducts() {
        try {
            return await ProductModel.find();
        } catch (error) {
            throw new Error('Error al obtener los productos: ' + error.message);
        }
    }
    async getProductById(id) {
        try {
            return await ProductModel.findById(id);
        } catch (error) {
            throw new Error('Error al obtener el producto: ' + error.message);
        }
    }

    async updateProduct(id, data) {
        try {
            return await ProductModel.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            throw new Error('Error al actualizar el producto: ' + error.message);
        }
    }

    async deleteProduct(id) {
        try {
            return await ProductModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error al eliminar el producto: ' + error.message);
        }
    }
}

export default ProductService;
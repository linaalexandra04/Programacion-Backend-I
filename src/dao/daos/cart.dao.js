import Cart from '../models/cart.model.js';

class CartDAO {
    async createCart(cartData) {
        try {
            return await Cart.create(cartData);
        } catch (err) {
            throw new Error(`Error creando carrito: ${err.message}`);
        }
    }

    async getCartById(cartId) {
        try {
            return await Cart.findById(cartId).populate('products.product').lean();
        } catch (err) {
            throw new Error(`Error obteniendo carrito por ID: ${err.message}`);
        }
    }

    async addProductToCart(cartId, productData) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) throw new Error('Carrito no encontrado');
            
            const productIndex = cart.products.findIndex(p => p.product.toString() === productData.product);
            if (productIndex >= 0) {
                cart.products[productIndex].quantity += productData.quantity;
            } else {
                cart.products.push(productData);
            }
            return await cart.save();
        } catch (err) {
            throw new Error(`Error agregando producto al carrito: ${err.message}`);
        }
    }

    async deleteCart(cartId) {
        try {
            return await Cart.findByIdAndDelete(cartId);
        } catch (err) {
            throw new Error(`Error eliminando carrito: ${err.message}`);
        }
    }
}

export default CartDAO;

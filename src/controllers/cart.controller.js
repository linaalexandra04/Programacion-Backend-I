import CartService from '../dao/daos/cart.dao.js'; 
import CartDTO from '../dao/dto/cart.dto.js'; 

const cartService = new CartService();

class CartController {
    async getAllCarts(req, res) {
        try {
            const carts = await cartService.getAllCarts();
            const formattedCarts = carts.map(cart => new CartDTO(cart).toResponse());
            res.status(200).json({ carts: formattedCarts });
        } catch (error) {
            res.status(500).send({ error: 'Error al obtener los carritos', details: error.message });
        }
    }

    async getCartById(req, res) {
        const { cid } = req.params;
        try {
            const cart = await cartService.getCartById(cid);
            if (!cart) {
                return res.status(404).send({ error: 'Carrito no encontrado' });
            }
            const formattedCart = new CartDTO(cart).toResponse();
            res.status(200).json(formattedCart);
        } catch (error) {
            res.status(500).send({ error: 'Error al obtener el carrito', details: error.message });
        }
    }

    async createCart(req, res) {
        try {
            const newCart = await cartService.createCart(req.body);
            const formattedCart = new CartDTO(newCart).toResponse();
            res.status(201).json(formattedCart);
        } catch (error) {
            res.status(500).send({ error: 'Error al crear el carrito', details: error.message });
        }
    }

    async updateCart(req, res) {
        const { cid } = req.params;
        try {
            const updatedCart = await cartService.updateCart(cid, req.body);
            if (!updatedCart) {
                return res.status(404).send({ error: 'Carrito no encontrado para actualizar' });
            }
            const formattedCart = new CartDTO(updatedCart).toResponse();
            res.status(200).json(formattedCart);
        } catch (error) {
            res.status(500).send({ error: 'Error al actualizar el carrito', details: error.message });
        }
    }

    async deleteCart(req, res) {
        const { cid } = req.params;
        try {
            const deletedCart = await cartService.deleteCart(cid);
            if (!deletedCart) {
                return res.status(404).send({ error: 'Carrito no encontrado para eliminar' });
            }
            res.status(200).send({ message: 'Carrito eliminado correctamente' });
        } catch (error) {
            res.status(500).send({ error: 'Error al eliminar el carrito', details: error.message });
        }
    }

    async purchaseCart(req, res) {
        const { cid } = req.params;
        try {
            const result = await cartService.purchaseCart(cid);
            res.status(200).json({ message: 'Compra realizada exitosamente', result });
        } catch (error) {
            res.status(500).send({ error: 'Error al realizar la compra', details: error.message });
        }
    }
}

export default new CartController();
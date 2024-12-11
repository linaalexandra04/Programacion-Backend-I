import OrderModel from '../models/order.model.js';

class OrderDAO {
    async getAllOrders() {
        try {
            return await OrderModel.find();
        } catch (error) {
            throw new Error('Error al obtener los pedidos: ' + error.message);
        }
    }

    async getOrderById(orderId) {
        try {
            return await OrderModel.findById(orderId);
        } catch (error) {
            throw new Error('Error al obtener el pedido por ID: ' + error.message);
        }
    }

    async createOrder(orderData) {
        try {
            const order = new OrderModel(orderData);
            await order.save();
            return order;
        } catch (error) {
            throw new Error('Error al crear el pedido: ' + error.message);
        }
    }

    async updateOrder(orderId, updateData) {
        try {
            return await OrderModel.findByIdAndUpdate(orderId, updateData, { new: true });
        } catch (error) {
            throw new Error('Error al actualizar el pedido: ' + error.message);
        }
    }

    async deleteOrder(orderId) {
        try {
            return await OrderModel.findByIdAndDelete(orderId);
        } catch (error) {
            throw new Error('Error al eliminar el pedido: ' + error.message);
        }
    }
}

export default OrderDAO;
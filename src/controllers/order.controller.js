import OrderService from '../dao/daos/order.dao.js';
import OrderDTO from '../dao/dto/order.dto.js'; 

const orderService = new OrderService();

export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        const formattedOrders = orders.map(order => new OrderDTO(order).toResponse());
        res.status(200).json({ orders: formattedOrders });
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener los pedidos', details: error.message });
    }
};

export const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await orderService.getOrderById(id);
        if (!order) {
            return res.status(404).send({ error: 'Pedido no encontrado' });
        }
        const formattedOrder = new OrderDTO(order).toResponse();
        res.status(200).json(formattedOrder);
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener el pedido', details: error.message });
    }
};

export const createOrder = async (req, res) => {
    try {
        const newOrder = await orderService.createOrder(req.body);
        const formattedOrder = new OrderDTO(newOrder).toResponse();
        res.status(201).json(formattedOrder);
    } catch (error) {
        res.status(500).send({ error: 'Error al crear el pedido', details: error.message });
    }
};

export const updateOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedOrder = await orderService.updateOrder(id, req.body);
        if (!updatedOrder) {
            return res.status(404).send({ error: 'Pedido no encontrado para actualizar' });
        }
        const formattedOrder = new OrderDTO(updatedOrder).toResponse();
        res.status(200).json(formattedOrder);
    } catch (error) {
        res.status(500).send({ error: 'Error al actualizar el pedido', details: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedOrder = await orderService.deleteOrder(id);
        if (!deletedOrder) {
            return res.status(404).send({ error: 'Pedido no encontrado para eliminar' });
        }
        res.status(200).send({ message: 'Pedido eliminado correctamente' });
    } catch (error) {
        res.status(500).send({ error: 'Error al eliminar el pedido', details: error.message });
    }
};
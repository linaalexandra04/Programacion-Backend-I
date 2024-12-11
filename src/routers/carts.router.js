import { Router } from 'express';
import cartController from '../controllers/cart.controller.js';

const router = Router();

// Rutas de carritos
router.get('/', cartController.getAllCarts);
router.get('/:cid', cartController.getCartById);
router.post('/', cartController.createCart);
router.post('/:cid/purchase', cartController.purchaseCart);
router.put('/:cid', cartController.updateCart);
router.delete('/:cid', cartController.deleteCart);

export default router;

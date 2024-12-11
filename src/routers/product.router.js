// src/routes/products.router.js

import { Router } from 'express';
import * as productController from '../controllers/product.controller.js';
import { checkAdminRole, verifyToken } from '../auth/auth.middleware.js';

const router = Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', verifyToken, checkAdminRole, productController.createProduct); 
router.put('/:id', verifyToken, checkAdminRole, productController.updateProduct); 
router.delete('/:id', verifyToken, checkAdminRole, productController.deleteProduct); 

export default router;

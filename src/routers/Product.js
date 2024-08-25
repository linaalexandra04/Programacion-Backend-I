import express from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById
} from '../controllers/ProductsController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:pid', getProductById);
router.post('/', createProduct);
router.put('/:pid', updateProductById);  
router.delete('/:pid', deleteProductById);  

export default router;



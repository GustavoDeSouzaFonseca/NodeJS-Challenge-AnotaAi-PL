import express from 'express';
import ProductController from '../controllers/productController.js';

const router = express.Router();

router
  .get('/products', ProductController.listAllProducts)
  .post('/products', ProductController.createProduct)
  .put('/products/:id', ProductController.updateProduct)
  .delete('/products/:id', ProductController.deleteProduct);

export default router;

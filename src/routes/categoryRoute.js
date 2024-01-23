import express from 'express';
import CategoryController from '../controllers/categoryController.js';

const router = express.Router();

router
  .get('/categories', CategoryController.listAllCategories)
  .post('/categories', CategoryController.createCategory)
  .put('/categories/:id', CategoryController.updateCategory)
  .delete('/categories/:id', CategoryController.deleteCategory);

export default router;

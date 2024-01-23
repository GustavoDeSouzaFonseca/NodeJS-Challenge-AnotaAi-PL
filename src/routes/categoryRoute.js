import express from 'express';
import CategoryController from '../controllers/categoryController.js';

const router = express.Router();

router
  .get('/categories', CategoryController.listAllCategories)
  .post('/categories', CategoryController.createCategory);

export default router;

import express from 'express';
import AwsSnsController from '../controllers/awsSnsController.js';

const router = express.Router();

router
  .get('/check-sns', AwsSnsController.testingConnectionAwsSns);

export default router;

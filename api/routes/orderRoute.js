import express from 'express';
import { verifyToken } from '../middleware/jwt.js';
import {
  createOrder,
  getOrders,
} from '../controllers/orderController.js';
const router = express.Router();

router.post('/', verifyToken, createOrder);
router.get('/', verifyToken, getOrders);

export default router;

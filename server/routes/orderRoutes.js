import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  getOrderStats,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';
import { orderValidation, validate } from '../middleware/validation.js';

const router = express.Router();

// Specific routes first (to avoid conflicts with /:id)
router.post('/', protect, orderValidation, validate, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/stats/dashboard', protect, admin, getOrderStats);
router.get('/', protect, admin, getAllOrders);

// Parameterized routes last
router.put('/:id/cancel', protect, cancelOrder);
router.put('/:id/status', protect, admin, updateOrderStatus);
router.get('/:id', protect, getOrderById);

export default router;


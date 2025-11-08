import express from 'express';
import {
  getProducts,
  getProductById,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  deleteProductImage,
  createProductReview,
  deleteProductReview,
  getCategories,
  getBrands,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import {
  productValidation,
  reviewValidation,
  validate,
} from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/categories/all', getCategories);
router.get('/brands/all', getBrands);
router.get('/:id', getProductById);

// Protected routes
router.post('/:id/reviews', protect, reviewValidation, validate, createProductReview);
router.delete('/:id/reviews/:reviewId', protect, deleteProductReview);

// Admin routes
router.post('/', protect, admin, productValidation, validate, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);
router.post(
  '/:id/images',
  protect,
  admin,
  upload.array('images', 5),
  uploadProductImages
);
router.delete('/:id/images/:imageId', protect, admin, deleteProductImage);

export default router;
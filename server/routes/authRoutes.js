import express from 'express';
import {
  signup,
  login,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  addAddress,
  updateAddress,
  deleteAddress,
} from '../controllers/authControllers.js';
import { protect } from '../middleware/auth.js';
import {
  signupValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  changePasswordValidation,
  addressValidation,
  validate,
} from '../middleware/validation.js';

const router = express.Router();

router.post('/signup', signupValidation, validate, signup);
router.post('/login', loginValidation, validate, login);
router.post('/forgot-password', forgotPasswordValidation, validate, forgotPassword);
router.put('/reset-password/:token', resetPasswordValidation, validate, resetPassword);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePasswordValidation, validate, changePassword);
router.post('/address', protect, addressValidation, validate, addAddress);
router.put('/address/:id', protect, addressValidation, validate, updateAddress);
router.delete('/address/:id', protect, deleteAddress);

export default router;
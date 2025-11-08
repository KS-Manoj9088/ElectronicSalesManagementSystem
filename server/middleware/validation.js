import { body, validationResult } from 'express-validator';

// Validation error handler
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// Auth validations
export const signupValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2-50 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/\d/).withMessage('Password must contain at least one number'),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[0-9]{10}$/).withMessage('Phone number must be 10 digits'),
];

export const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required'),
];

export const forgotPasswordValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
];

export const resetPasswordValidation = [
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/\d/).withMessage('Password must contain at least one number'),
];

export const changePasswordValidation = [
  body('currentPassword')
    .notEmpty().withMessage('Current password is required'),
  
  body('newPassword')
    .notEmpty().withMessage('New password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/\d/).withMessage('Password must contain at least one number'),
];

// Product validations
export const productValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Product name is required')
    .isLength({ min: 3, max: 200 }).withMessage('Name must be between 3-200 characters'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  
  body('discount')
    .optional()
    .isFloat({ min: 0, max: 100 }).withMessage('Discount must be between 0-100'),
  
  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(['Mobiles', 'Laptops', 'Tablets', 'Headphones', 'Speakers', 'Smartwatches', 'Cameras', 'Gaming', 'Accessories', 'Other'])
    .withMessage('Invalid category'),
  
  body('brand')
    .trim()
    .notEmpty().withMessage('Brand is required'),
  
  body('stock')
    .notEmpty().withMessage('Stock is required')
    .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
];

// Review validation
export const reviewValidation = [
  body('rating')
    .notEmpty().withMessage('Rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1-5'),
  
  body('comment')
    .trim()
    .notEmpty().withMessage('Comment is required')
    .isLength({ min: 10, max: 500 }).withMessage('Comment must be between 10-500 characters'),
];

// Cart validation
export const addToCartValidation = [
  body('productId')
    .notEmpty().withMessage('Product ID is required')
    .isMongoId().withMessage('Invalid product ID'),
  
  body('quantity')
    .optional()
    .isInt({ min: 1, max: 10 }).withMessage('Quantity must be between 1-10'),
];

// Order validation
export const orderValidation = [
  body('shippingAddress.fullName')
    .trim()
    .notEmpty().withMessage('Full name is required'),
  
  body('shippingAddress.phone')
    .trim()
    .notEmpty().withMessage('Phone is required')
    .matches(/^[0-9]{10}$/).withMessage('Phone must be 10 digits'),
  
  body('shippingAddress.addressLine1')
    .trim()
    .notEmpty().withMessage('Address is required'),
  
  body('shippingAddress.city')
    .trim()
    .notEmpty().withMessage('City is required'),
  
  body('shippingAddress.state')
    .trim()
    .notEmpty().withMessage('State is required'),
  
  body('shippingAddress.pincode')
    .trim()
    .notEmpty().withMessage('Pincode is required')
    .matches(/^[0-9]{6}$/).withMessage('Pincode must be 6 digits'),
  
  body('taxPrice')
    .optional()
    .isFloat({ min: 0 }).withMessage('Tax price must be positive'),
  
  body('shippingPrice')
    .optional()
    .isFloat({ min: 0 }).withMessage('Shipping price must be positive'),
];

// Address validation
export const addressValidation = [
  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required'),
  
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone is required')
    .matches(/^[0-9]{10}$/).withMessage('Phone must be 10 digits'),
  
  body('addressLine1')
    .trim()
    .notEmpty().withMessage('Address line 1 is required'),
  
  body('city')
    .trim()
    .notEmpty().withMessage('City is required'),
  
  body('state')
    .trim()
    .notEmpty().withMessage('State is required'),
  
  body('pincode')
    .trim()
    .notEmpty().withMessage('Pincode is required')
    .matches(/^[0-9]{6}$/).withMessage('Pincode must be 6 digits'),
];
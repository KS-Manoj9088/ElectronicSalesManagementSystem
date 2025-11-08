# 🧪 Complete Backend Testing Guide

## Table of Contents
1. [Setup & Prerequisites](#setup--prerequisites)
2. [Authentication Tests](#authentication-tests)
3. [Product Tests](#product-tests)
4. [Cart Tests](#cart-tests)
5. [Order Tests](#order-tests)
6. [Wishlist Tests](#wishlist-tests)
7. [Admin Tests](#admin-tests)
8. [Common Issues](#common-issues)

---

## Setup & Prerequisites

### 1. Start Backend Server
```bash
cd server
npm run dev
```

Server should be running at: `http://localhost:5000`

### 2. Seed Sample Data
```bash
npm run seed
```

This creates:
- ✅ Admin: `admin@example.com` / `admin123`
- ✅ User 1: `john@example.com` / `password123`
- ✅ User 2: `jane@example.com` / `password123`
- ✅ 10 Sample Products

### 3. Tools for Testing
- **Postman** (Recommended) - Download from [postman.com](https://www.postman.com/)
- **Thunder Client** (VS Code Extension)
- **cURL** (Command line)
- **REST Client** (VS Code Extension)

---

## Authentication Tests

### ✅ Test 1: User Signup

**Request:**
```http
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "password123",
  "phone": "9876543210"
}
```

**Expected Response (201):**
```json
{
  "_id": "...",
  "name": "Test User",
  "email": "testuser@example.com",
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**✅ Success Criteria:**
- Status code is 201
- Returns user object
- Returns JWT token
- Password is NOT in response

**❌ Test Validation:**
```json
// Invalid email
{
  "name": "Test",
  "email": "invalid-email",
  "password": "pass123"
}
// Should return 400 with validation error

// Short password
{
  "name": "Test",
  "email": "test@test.com",
  "password": "123"
}
// Should return 400 - password too short
```

---

### ✅ Test 2: User Login

**Request:**
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response (200):**
```json
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**✅ Save this token!** You'll need it for protected routes.

**❌ Test Invalid Login:**
```json
{
  "email": "john@example.com",
  "password": "wrongpassword"
}
// Should return 401 - Invalid credentials
```

---

### ✅ Test 3: Get Profile (Protected)

**Request:**
```http
GET http://localhost:5000/api/auth/profile
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response (200):**
```json
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "phone": "9876543211",
  "addresses": [],
  "isActive": true,
  "createdAt": "...",
  "updatedAt": "..."
}
```

**❌ Test Without Token:**
```http
GET http://localhost:5000/api/auth/profile
// Should return 401 - No token provided
```

---

### ✅ Test 4: Forgot Password

**Request:**
```http
POST http://localhost:5000/api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Password reset email sent successfully. Please check your inbox."
}
```

**✅ Check your email for reset link!**

**Reset Link Format:**
```
http://localhost:5173/reset-password/a3f2c1b8e9d4f5a6b7c8d9e0f1a2b3c4d5e6f7a8
```

---

### ✅ Test 5: Reset Password

**Request:**
```http
PUT http://localhost:5000/api/auth/reset-password/TOKEN_FROM_EMAIL
Content-Type: application/json

{
  "password": "newpassword123"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Password reset successful! You can now login with your new password."
}
```

**✅ Now try logging in with new password!**

---

### ✅ Test 6: Add Address

**Request:**
```http
POST http://localhost:5000/api/auth/address
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "fullName": "John Doe",
  "phone": "9876543210",
  "addressLine1": "123 Main Street",
  "addressLine2": "Apt 4B",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "isDefault": true
}
```

**Expected Response (201):**
```json
[
  {
    "_id": "...",
    "fullName": "John Doe",
    "phone": "9876543210",
    "addressLine1": "123 Main Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "isDefault": true
  }
]
```

---

## Product Tests

### ✅ Test 7: Get All Products

**Request:**
```http
GET http://localhost:5000/api/products
```

**Expected Response (200):**
```json
{
  "products": [...],
  "page": 1,
  "pages": 1,
  "total": 10
}
```

---

### ✅ Test 8: Search & Filter Products

**Request:**
```http
GET http://localhost:5000/api/products?keyword=iphone&category=Mobiles&minPrice=500&maxPrice=2000&sort=price_asc
```

**Query Parameters:**
- `keyword` - Search term
- `category` - Filter by category
- `brand` - Filter by brand
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `rating` - Minimum rating
- `sort` - price_asc, price_desc, rating, newest
- `page` - Page number
- `limit` - Items per page

---

### ✅ Test 9: Get Product by ID

**Request:**
```http
GET http://localhost:5000/api/products/PRODUCT_ID
```

---

### ✅ Test 10: Create Product (Admin Only)

**Login as Admin First:**
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Then Create Product:**
```http
POST http://localhost:5000/api/products
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "name": "Test Product",
  "description": "This is a test product with detailed description",
  "price": 999,
  "discount": 10,
  "category": "Mobiles",
  "brand": "Test Brand",
  "stock": 50,
  "featured": true,
  "specifications": {
    "Display": "6.1 inch",
    "Processor": "Test Processor",
    "RAM": "8GB"
  }
}
```

---

### ✅ Test 11: Add Product Review

**Request:**
```http
POST http://localhost:5000/api/products/PRODUCT_ID/reviews
Authorization: Bearer USER_TOKEN
Content-Type: application/json

{
  "rating": 5,
  "comment": "Excellent product! Highly recommended for everyone."
}
```

---

## Cart Tests

### ✅ Test 12: Add to Cart

**Request:**
```http
POST http://localhost:5000/api/cart
Authorization: Bearer USER_TOKEN
Content-Type: application/json

{
  "productId": "PRODUCT_ID_HERE",
  "quantity": 2
}
```

---

### ✅ Test 13: Get Cart

**Request:**
```http
GET http://localhost:5000/api/cart
Authorization: Bearer USER_TOKEN
```

**Expected Response:**
```json
{
  "_id": "...",
  "user": "...",
  "items": [
    {
      "product": {
        "_id": "...",
        "name": "iPhone 15 Pro Max",
        "price": 1199,
        "finalPrice": 1079.1,
        "images": [...],
        "stock": 50
      },
      "quantity": 2,
      "price": 1079.1
    }
  ],
  "totalItems": 2,
  "totalPrice": 2158.2
}
```

---

### ✅ Test 14: Update Cart Item

**Request:**
```http
PUT http://localhost:5000/api/cart/CART_ITEM_ID
Authorization: Bearer USER_TOKEN
Content-Type: application/json

{
  "quantity": 3
}
```

---

## Order Tests

### ✅ Test 15: Create Order

**Request:**
```http
POST http://localhost:5000/api/orders
Authorization: Bearer USER_TOKEN
Content-Type: application/json

{
  "shippingAddress": {
    "fullName": "John Doe",
    "phone": "9876543210",
    "addressLine1": "123 Main Street",
    "addressLine2": "Apt 4B",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  },
  "taxPrice": 100,
  "shippingPrice": 50
}
```

**✅ Check:**
- Order created
- Cart cleared
- Product stock decreased

---

### ✅ Test 16: Get My Orders

**Request:**
```http
GET http://localhost:5000/api/orders/myorders
Authorization: Bearer USER_TOKEN
```

---

### ✅ Test 17: Cancel Order

**Request:**
```http
PUT http://localhost:5000/api/orders/ORDER_ID/cancel
Authorization: Bearer USER_TOKEN
```

**✅ Check:**
- Order status changed to "Cancelled"
- Product stock restored

---

## Wishlist Tests

### ✅ Test 18: Add to Wishlist

**Request:**
```http
POST http://localhost:5000/api/wishlist/PRODUCT_ID
Authorization: Bearer USER_TOKEN
```

---

### ✅ Test 19: Get Wishlist

**Request:**
```http
GET http://localhost:5000/api/wishlist
Authorization: Bearer USER_TOKEN
```

---

## Admin Tests

### ✅ Test 20: Get Dashboard Stats

**Request:**
```http
GET http://localhost:5000/api/admin/stats
Authorization: Bearer ADMIN_TOKEN
```

**Expected Response:**
```json
{
  "totalUsers": 2,
  "totalProducts": 10,
  "totalOrders": 5,
  "processingOrders": 2,
  "totalRevenue": 15000,
  "monthlyRevenue": [...],
  "topProducts": [...],
  "recentOrders": [...],
  "lowStockProducts": [...]
}
```

---

### ✅ Test 21: Get All Users

**Request:**
```http
GET http://localhost:5000/api/admin/users
Authorization: Bearer ADMIN_TOKEN
```

---

### ✅ Test 22: Block/Unblock User

**Request:**
```http
PUT http://localhost:5000/api/admin/users/USER_ID/toggle-status
Authorization: Bearer ADMIN_TOKEN
```

---

## Common Issues

### ❌ Issue 1: "No token provided"
**Solution:** Add Authorization header:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

### ❌ Issue 2: "Invalid credentials"
**Solution:** Check email and password. Use seed data credentials.

### ❌ Issue 3: "Email service error"
**Solution:** Check email configuration in `.env`:
- Use Gmail App Password, not regular password
- Enable 2FA on Gmail account

### ❌ Issue 4: "Product not found"
**Solution:** Run `npm run seed` to create sample products.

### ❌ Issue 5: "Insufficient stock"
**Solution:** Check product stock in database. Update if needed.

---

## ✅ Testing Checklist

- [ ] User signup works
- [ ] User login returns token
- [ ] Protected routes require token
- [ ] Forgot password sends email
- [ ] Reset password works
- [ ] Can add/update/delete addresses
- [ ] Can view all products
- [ ] Search and filters work
- [ ] Admin can create products
- [ ] Users can add reviews
- [ ] Cart operations work
- [ ] Order creation works
- [ ] Order cancellation works
- [ ] Wishlist operations work
- [ ] Admin dashboard shows stats
- [ ] Admin can manage users
- [ ] Input validation works
- [ ] Error messages are clear

---

## 🎯 Next Steps

Once all tests pass:
1. ✅ Backend fully tested
2. 🎨 Start building frontend
3. 🔗 Connect frontend to backend
4. 🚀 Deploy to production

---

**Happy Testing! 🚀**
# 📡 API Endpoints Reference

Base URL: `http://localhost:5000/api`

## 🔐 Authentication

### Register User
```http
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Profile
```http
GET /auth/profile
Authorization: Bearer <token>
```

### Update Profile
```http
PUT /auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "phone": "9876543211"
}
```

### Change Password
```http
PUT /auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "password123",
  "newPassword": "newpassword123"
}
```

### Forgot Password
```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

### Reset Password
```http
PUT /auth/reset-password/:token
Content-Type: application/json

{
  "password": "newpassword123"
}
```

### Add Address
```http
POST /auth/address
Authorization: Bearer <token>
Content-Type: application/json

{
  "fullName": "John Doe",
  "phone": "9876543210",
  "addressLine1": "123 Main St",
  "addressLine2": "Apt 4B",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "isDefault": true
}
```

## 📦 Products

### Get All Products
```http
GET /products?keyword=iphone&category=Mobiles&minPrice=500&maxPrice=2000&sort=price_asc&page=1&limit=12
```

### Get Featured Products
```http
GET /products/featured
```

### Get Product by ID
```http
GET /products/:id
```

### Get Categories
```http
GET /products/categories/all
```

### Get Brands
```http
GET /products/brands/all
```

### Create Product (Admin)
```http
POST /products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "iPhone 15 Pro",
  "description": "Latest iPhone model",
  "price": 999,
  "discount": 10,
  "category": "Mobiles",
  "brand": "Apple",
  "stock": 50,
  "featured": true,
  "specifications": {
    "Display": "6.1 inch",
    "Processor": "A17 Pro",
    "RAM": "8GB"
  }
}
```

### Update Product (Admin)
```http
PUT /products/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "iPhone 15 Pro Updated",
  "price": 949,
  "stock": 45
}
```

### Delete Product (Admin)
```http
DELETE /products/:id
Authorization: Bearer <admin_token>
```

### Upload Product Images (Admin)
```http
POST /products/:id/images
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

images: [file1.jpg, file2.jpg]
```

### Add Product Review
```http
POST /products/:id/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "comment": "Excellent product!"
}
```

## 🛒 Cart

### Get Cart
```http
GET /cart
Authorization: Bearer <token>
```

### Add to Cart
```http
POST /cart
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "product_id_here",
  "quantity": 2
}
```

### Update Cart Item
```http
PUT /cart/:itemId
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 3
}
```

### Remove from Cart
```http
DELETE /cart/:itemId
Authorization: Bearer <token>
```

### Clear Cart
```http
DELETE /cart
Authorization: Bearer <token>
```

## 📋 Orders

### Create Order
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "shippingAddress": {
    "fullName": "John Doe",
    "phone": "9876543210",
    "addressLine1": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  },
  "taxPrice": 100,
  "shippingPrice": 50
}
```

### Get My Orders
```http
GET /orders/myorders
Authorization: Bearer <token>
```

### Get Order by ID
```http
GET /orders/:id
Authorization: Bearer <token>
```

### Cancel Order
```http
PUT /orders/:id/cancel
Authorization: Bearer <token>
```

### Get All Orders (Admin)
```http
GET /orders?status=Processing&page=1&limit=20
Authorization: Bearer <admin_token>
```

### Update Order Status (Admin)
```http
PUT /orders/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "Shipped",
  "trackingNumber": "TRACK123456"
}
```

### Get Order Stats (Admin)
```http
GET /orders/stats/dashboard
Authorization: Bearer <admin_token>
```

## ❤️ Wishlist

### Get Wishlist
```http
GET /wishlist
Authorization: Bearer <token>
```

### Add to Wishlist
```http
POST /wishlist/:productId
Authorization: Bearer <token>
```

### Remove from Wishlist
```http
DELETE /wishlist/:productId
Authorization: Bearer <token>
```

### Clear Wishlist
```http
DELETE /wishlist
Authorization: Bearer <token>
```

## 👤 Admin - User Management

### Get All Users
```http
GET /admin/users?search=john&role=user&status=active&page=1
Authorization: Bearer <admin_token>
```

### Get User by ID
```http
GET /admin/users/:id
Authorization: Bearer <admin_token>
```

### Update User
```http
PUT /admin/users/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Updated Name",
  "role": "admin",
  "isActive": false
}
```

### Delete User
```http
DELETE /admin/users/:id
Authorization: Bearer <admin_token>
```

### Block/Unblock User
```http
PUT /admin/users/:id/toggle-status
Authorization: Bearer <admin_token>
```

### Get Dashboard Stats
```http
GET /admin/stats
Authorization: Bearer <admin_token>
```

## 📊 Response Format

### Success Response
```json
{
  "_id": "...",
  "name": "Product Name",
  "price": 999,
  ...
}
```

### Error Response
```json
{
  "message": "Error message here"
}
```

### Paginated Response
```json
{
  "products": [...],
  "page": 1,
  "pages": 5,
  "total": 50
}
```

## 🔒 Authorization Header

For protected routes, include:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📝 Query Parameters

### Products
- `keyword` - Search term
- `category` - Filter by category
- `brand` - Filter by brand
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `rating` - Minimum rating
- `sort` - Sort by (price_asc, price_desc, rating, newest)
- `page` - Page number
- `limit` - Items per page

### Orders (Admin)
- `status` - Filter by status
- `page` - Page number
- `limit` - Items per page
- `startDate` - Filter from date
- `endDate` - Filter to date

### Users (Admin)
- `search` - Search by name/email
- `role` - Filter by role
- `status` - Filter by status (active/inactive)
- `page` - Page number
- `limit` - Items per page

---

💡 **Tip**: Save these in Postman for easy testing!
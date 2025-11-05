# Electronics Store - Backend API

Complete backend API for the Electronics E-commerce Store built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (User/Admin)
  - Password hashing with bcrypt
  - Forgot/Reset password functionality

- **Product Management**
  - CRUD operations for products
  - Image upload to Cloudinary
  - Product reviews and ratings
  - Category and brand management
  - Advanced filtering and search

- **Shopping Cart**
  - Add/Update/Remove items
  - Real-time stock validation
  - Automatic price calculation

- **Order Management**
  - Create and track orders
  - Order status updates
  - Order history
  - Cancel orders

- **Wishlist**
  - Save favorite products
  - Quick access to saved items

- **Admin Dashboard**
  - User management
  - Product management
  - Order management
  - Analytics and statistics

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (Local or Atlas)
- Cloudinary Account (for image uploads)
- Email Service (Gmail/SMTP for password reset)

## 🔧 Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:5173
```

5. Start the development server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## 📚 API Documentation

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register new user | No |
| POST | `/login` | Login user | No |
| GET | `/profile` | Get user profile | Yes |
| PUT | `/profile` | Update profile | Yes |
| PUT | `/change-password` | Change password | Yes |
| POST | `/forgot-password` | Request password reset | No |
| PUT | `/reset-password/:token` | Reset password | No |
| POST | `/address` | Add address | Yes |
| PUT | `/address/:id` | Update address | Yes |
| DELETE | `/address/:id` | Delete address | Yes |

### Product Routes (`/api/products`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all products (with filters) | No |
| GET | `/featured` | Get featured products | No |
| GET | `/categories/all` | Get all categories | No |
| GET | `/brands/all` | Get all brands | No |
| GET | `/:id` | Get product by ID | No |
| POST | `/` | Create product | Admin |
| PUT | `/:id` | Update product | Admin |
| DELETE | `/:id` | Delete product | Admin |
| POST | `/:id/images` | Upload product images | Admin |
| DELETE | `/:id/images/:imageId` | Delete product image | Admin |
| POST | `/:id/reviews` | Add product review | Yes |
| DELETE | `/:id/reviews/:reviewId` | Delete review | Yes |

### Cart Routes (`/api/cart`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get user cart | Yes |
| POST | `/` | Add item to cart | Yes |
| PUT | `/:itemId` | Update cart item | Yes |
| DELETE | `/:itemId` | Remove from cart | Yes |
| DELETE | `/` | Clear cart | Yes |

### Order Routes (`/api/orders`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Create order | Yes |
| GET | `/myorders` | Get user orders | Yes |
| GET | `/:id` | Get order by ID | Yes |
| PUT | `/:id/cancel` | Cancel order | Yes |
| GET | `/` | Get all orders | Admin |
| PUT | `/:id/status` | Update order status | Admin |
| GET | `/stats/dashboard` | Get order statistics | Admin |

### Wishlist Routes (`/api/wishlist`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get user wishlist | Yes |
| POST | `/:productId` | Add to wishlist | Yes |
| DELETE | `/:productId` | Remove from wishlist | Yes |
| DELETE | `/` | Clear wishlist | Yes |

### Admin Routes (`/api/admin`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/stats` | Get dashboard stats | Admin |
| GET | `/users` | Get all users | Admin |
| GET | `/users/:id` | Get user by ID | Admin |
| PUT | `/users/:id` | Update user | Admin |
| DELETE | `/users/:id` | Delete user | Admin |
| PUT | `/users/:id/toggle-status` | Block/Unblock user | Admin |

## 🗄️ Database Models

### User
- name, email, password
- role (user/admin)
- addresses array
- phone, isActive
- resetPasswordToken

### Product
- name, description, price, discount
- category, brand, stock
- images array (Cloudinary URLs)
- specifications (Map)
- reviews array
- rating, numReviews
- featured, isActive

### Cart
- user reference
- items array (product, quantity, price)
- totalItems, totalPrice

### Order
- user reference
- orderItems array
- shippingAddress
- itemsPrice, taxPrice, shippingPrice, totalPrice
- orderStatus (Processing/Shipped/Delivered/Cancelled)
- deliveredAt, trackingNumber

### Wishlist
- user reference
- products array

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 🌐 CORS Configuration

CORS is configured to accept requests from the frontend URL specified in the `.env` file.

## 📝 Product Query Parameters

When fetching products (`GET /api/products`), you can use these query parameters:

- `keyword` - Search in name, description, brand
- `category` - Filter by category
- `brand` - Filter by brand
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `rating` - Minimum rating filter
- `sort` - Sort options: `price_asc`, `price_desc`, `rating`, `newest`
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)

Example:
```
GET /api/products?category=Laptops&minPrice=500&maxPrice=2000&sort=price_asc&page=1
```

## 🛡️ Error Handling

The API uses centralized error handling with appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## 📧 Email Configuration

For Gmail, you need to:
1. Enable 2-Factor Authentication
2. Generate an App Password
3. Use the App Password in `EMAIL_PASS`

## ☁️ Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get your Cloud Name, API Key, and API Secret
3. Add them to your `.env` file

## 🚀 Deployment

### MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string and add to `.env`

### Deployment Platforms
- **Render** (Recommended)
- **Railway**
- **Heroku**
- **AWS EC2**

## 📦 Project Structure

```
server/
├── config/
│   ├── db.js              # Database connection
│   └── cloudinary.js      # Cloudinary configuration
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── cartController.js
│   ├── orderController.js
│   ├── wishlistController.js
│   └── adminController.js
├── middleware/
│   ├── auth.js            # Authentication & authorization
│   ├── error.js           # Error handling
│   └── upload.js          # File upload configuration
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   ├── Order.js
│   └── Wishlist.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   ├── wishlistRoutes.js
│   └── adminRoutes.js
├── .env.example
├── .gitignore
├── package.json
└── server.js              # Main entry point
```

## 🧪 Testing

You can test the API using:
- **Postman** - Import the endpoints and test
- **Thunder Client** (VS Code extension)
- **cURL** commands

## 📄 License

MIT

## 👨‍💻 Author

Your Name

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
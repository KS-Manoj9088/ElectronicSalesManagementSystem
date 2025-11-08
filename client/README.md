# ESM Electronics Store - Frontend

A modern, responsive React frontend for the ESM Electronics Store e-commerce platform.

## Features

- 🛍️ **Product Browsing**: Browse products with advanced filters and search
- 🛒 **Shopping Cart**: Add products to cart and manage quantities
- 💳 **Checkout**: Secure checkout process with address management
- 📦 **Order Management**: View and track orders
- ❤️ **Wishlist**: Save products for later
- 👤 **User Profile**: Manage profile, addresses, and password
- 🔐 **Authentication**: Login, signup, password reset
- 👨‍💼 **Admin Panel**: Complete admin dashboard for managing products, orders, and users

## Tech Stack

- **React 19** - UI library
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Context API** - State management

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend server running on `http://localhost:5000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (or copy from `.env.example`):
```env
VITE_API_URL=http://localhost:5000/api
```

3. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
client/
├── src/
│   ├── components/     # Reusable components
│   │   ├── Alert.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Loading.jsx
│   │   ├── ProductCard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/        # Context providers
│   │   ├── AlertContext.jsx
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── pages/          # Page components
│   │   ├── admin/      # Admin pages
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Orders.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Products.jsx
│   │   ├── Profile.jsx
│   │   └── Wishlist.jsx
│   ├── utils/          # Utilities
│   │   └── api.js      # API service layer
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── .env                # Environment variables
├── package.json
└── vite.config.js
```

## Features Overview

### User Features

- **Home Page**: Featured products and hero section
- **Products Page**: Browse with filters (category, brand, price, rating)
- **Product Detail**: View details, reviews, add to cart/wishlist
- **Shopping Cart**: Manage cart items and quantities
- **Checkout**: Place orders with address selection
- **Orders**: View order history and track orders
- **Wishlist**: Save favorite products
- **Profile**: Update profile, manage addresses, change password

### Admin Features

- **Dashboard**: Statistics and analytics
- **Products Management**: Create, update, delete products
- **Orders Management**: View and update order status
- **Users Management**: View, block/unblock, delete users

## API Integration

All API calls are handled through the `api.js` service layer. The base URL is configured via the `VITE_API_URL` environment variable.

## Authentication

- JWT tokens are stored in localStorage
- Protected routes require authentication
- Admin routes require admin role
- Automatic token refresh and logout on 401 errors

## Styling

- Tailwind CSS for utility-first styling
- Responsive design for mobile, tablet, and desktop
- Accessible components with proper ARIA labels
- Smooth transitions and hover effects

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

- `VITE_API_URL` - Backend API URL (default: http://localhost:5000/api)

## Notes

- Make sure the backend server is running before starting the frontend
- Default admin credentials: `admin@example.com` / `admin123`
- Default user credentials: `john@example.com` / `password123`

## License

ISC

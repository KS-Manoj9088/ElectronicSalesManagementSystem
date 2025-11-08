# 👨‍💼 Admin Dashboard Guide

## 🚀 Quick Start - Accessing Admin Dashboard

### Step 1: Create Admin Account

You have **3 options** to create an admin account:

#### Option 1: Use Seed Script (Recommended for First Time)
```bash
cd server
npm run seed
```

This creates:
- ✅ Admin: `admin@example.com` / `admin123`
- ✅ 2 regular users
- ✅ 10 sample products

#### Option 2: Create Admin Manually
```bash
cd server
npm run create-admin "Admin Name" admin@example.com admin123
```

#### Option 3: Use Existing Admin
If you already ran the seed script, use:
- **Email:** `admin@example.com`
- **Password:** `admin123`

### Step 2: Login as Admin

1. Go to: `http://localhost:5173/login`
2. Enter admin credentials:
   - Email: `admin@example.com`
   - Password: `admin123`
3. Click "Sign in"

### Step 3: Access Admin Dashboard

After login, you'll see an **"Admin"** link in the header. Click it to access:
- `http://localhost:5173/admin/dashboard`

---

## 📋 Admin Features

### 1. Dashboard (`/admin/dashboard`)
- View statistics (users, products, orders, revenue)
- Top selling products
- Recent orders
- Low stock alerts
- Monthly revenue charts

### 2. Products Management (`/admin/products`)
- ✅ **Add Products**: Click "+ Add Product" button
- ✅ **Edit Products**: Click "Edit" on any product
- ✅ **Delete Products**: Click "Delete" on any product
- ✅ **Upload Images**: (Coming soon - use product edit form)

**To Add a Product:**
1. Go to `/admin/products`
2. Click "+ Add Product"
3. Fill in the form:
   - Name, Description
   - Price, Discount (%)
   - Category, Brand
   - Stock quantity
   - Mark as Featured (optional)
4. Click "Create Product"

### 3. Orders Management (`/admin/orders`)
- View all orders
- Filter by status (Processing, Shipped, Delivered, Cancelled)
- Update order status
- Add tracking numbers
- View order details

**To Update Order Status:**
1. Go to `/admin/orders`
2. Find the order
3. Click "Mark as Shipped" or "Mark as Delivered"
4. Add tracking number if needed

### 4. Users Management (`/admin/users`)
- View all users
- Search users by name/email
- Filter by role (user/admin) or status (active/inactive)
- Block/Unblock users
- Delete users
- View user details and orders

**To Block a User:**
1. Go to `/admin/users`
2. Find the user
3. Click "Block" button
4. User will not be able to login

---

## 🔐 Creating Additional Admin Accounts

### Method 1: Using Create Admin Script
```bash
cd server
npm run create-admin "Your Name" your-email@example.com your-password
```

### Method 2: Using MongoDB Directly
```javascript
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "admin" } }
)
```

### Method 3: Through Admin Panel (Future Feature)
- Currently, admin accounts must be created via script or database
- Regular signup always creates "user" role accounts

---

## 🛠️ Admin Routes

All admin routes are protected and require:
1. ✅ User must be logged in
2. ✅ User must have `role: "admin"`

**Admin Routes:**
- `/admin/dashboard` - Dashboard with stats
- `/admin/products` - Product management
- `/admin/orders` - Order management
- `/admin/users` - User management

---

## 📝 Default Admin Credentials

After running `npm run seed`:

```
Email: admin@example.com
Password: admin123
```

**⚠️ Important:** Change the password in production!

---

## 🎯 Quick Checklist

- [ ] Backend server running (`npm run dev` in server folder)
- [ ] Database connected (check server logs)
- [ ] Seed script run (`npm run seed`)
- [ ] Frontend running (`npm run dev` in client folder)
- [ ] Login with admin credentials
- [ ] Click "Admin" link in header
- [ ] Access admin dashboard

---

## 🐛 Troubleshooting

### "Admin" link not showing?
- ✅ Make sure you're logged in
- ✅ Check your user role is "admin" (check database)
- ✅ Refresh the page after login

### Can't access admin routes?
- ✅ Verify you're logged in as admin
- ✅ Check browser console for errors
- ✅ Verify JWT token includes admin role

### Can't create products?
- ✅ Make sure you're logged in as admin
- ✅ Check backend server is running
- ✅ Verify API connection (check network tab)

---

## 💡 Tips

1. **First Time Setup:**
   - Run `npm run seed` to create admin + sample data
   - Login with admin credentials
   - Access dashboard via header link

2. **Adding Products:**
   - Use the admin products page
   - Fill all required fields
   - Images can be added later via edit

3. **Managing Orders:**
   - Update status as orders progress
   - Add tracking numbers for shipped orders
   - Monitor low stock alerts on dashboard

4. **User Management:**
   - Block users who violate terms
   - Search for specific users
   - View user order history

---

**Need Help?** Check the server logs and browser console for detailed error messages.


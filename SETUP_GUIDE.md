# 🚀 Complete Setup Guide - Electronics Store

## Prerequisites Installation

### 1. Install Node.js
- Download from [nodejs.org](https://nodejs.org/)
- Version 18 or higher recommended
- Verify installation:
```bash
node --version
npm --version
```

### 2. Install MongoDB

**Option A: Local Installation**
- Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- Follow installation guide for your OS
- Start MongoDB service

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a new cluster (Free tier available)
4. Create database user
5. Whitelist IP (0.0.0.0/0 for development)
6. Get connection string

### 3. Create Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com/)
2. Sign up for free account
3. Dashboard → Account Details
4. Copy: Cloud Name, API Key, API Secret

### 4. Setup Email (Gmail)
1. Enable 2-Factor Authentication on Gmail
2. Generate App Password:
   - Google Account → Security
   - 2-Step Verification → App Passwords
   - Select "Mail" and your device
   - Copy the 16-character password

## 📦 Backend Setup

### Step 1: Navigate to Server Directory
```bash
cd server
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create Environment File
Create `.env` file in the `server` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database (Choose one)
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/electronics_store

# OR MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/electronics_store

# JWT
JWT_SECRET=your_random_secret_key_min_32_characters_long
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_char_app_password
EMAIL_FROM=Electronics Store <noreply@electronicsstore.com>

# Frontend
FRONTEND_URL=http://localhost:5173
```

### Step 4: Seed Sample Data
```bash
npm run seed
```

This creates:
- Admin account: `admin@example.com` / `admin123`
- 2 user accounts
- 10 sample products

### Step 5: Start Development Server
```bash
npm run dev
```

Server runs at: `http://localhost:5000`

## 🎨 Frontend Setup

### Step 1: Navigate to Client Directory
```bash
cd client
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

## 🧪 Testing the API

### Using Browser
Visit: `http://localhost:5000`

You should see: `{ "message": "Electronics Store API is running!" }`

### Using Postman

#### 1. Login as Admin
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```

Copy the `token` from response.

#### 2. Get All Products
```http
GET http://localhost:5000/api/products
```

#### 3. Create Product (Admin Only)
```http
POST http://localhost:5000/api/products
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "name": "Test Product",
  "description": "Test Description",
  "price": 999,
  "category": "Mobiles",
  "brand": "Test Brand",
  "stock": 10
}
```

## 📝 Common Issues & Solutions

### Issue: MongoDB Connection Failed
**Solution:**
- Check if MongoDB service is running
- Verify connection string in `.env`
- For Atlas: Check IP whitelist and credentials

### Issue: Port Already in Use
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Issue: Module Not Found
**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Cloudinary Upload Failed
**Solution:**
- Verify credentials in `.env`
- Check image file size (max 5MB)
- Ensure proper file format (jpg, png, webp)

### Issue: Email Not Sending
**Solution:**
- Verify Gmail App Password (not regular password)
- Check "Less secure app access" is OFF
- 2FA must be enabled for App Passwords

## 🔑 Important Notes

1. **JWT_SECRET**: Use a strong random string (min 32 characters)
   ```bash
   # Generate random secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Never commit `.env`**: Already in `.gitignore`

3. **Change default passwords** in production

4. **Rate limiting**: Consider adding for production

5. **CORS**: Update `FRONTEND_URL` for production

## 📚 Next Steps

1. ✅ Backend running → Test API endpoints
2. ✅ Frontend running → Test UI
3. 📱 Start building frontend components
4. 🎨 Customize design and features
5. 🚀 Deploy to production

## 🆘 Need Help?

Check:
- Server logs for errors
- Browser console for frontend issues
- Network tab for API calls
- MongoDB logs for database issues

## 🎯 Production Deployment

### Backend
- Use MongoDB Atlas (not local)
- Add proper error logging (Winston, Sentry)
- Enable rate limiting
- Use HTTPS
- Set proper CORS origin
- Use environment-specific configs

### Frontend
- Build for production: `npm run build`
- Deploy to Vercel/Netlify
- Update API URL to production backend

---

Happy Coding! 🚀
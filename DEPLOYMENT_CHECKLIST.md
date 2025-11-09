# Deployment Checklist

Use this checklist to ensure everything is ready for deployment.

## ✅ Pre-Deployment

### Frontend (Vercel)
- [ ] Code pushed to Git repository
- [ ] All dependencies in `package.json`
- [ ] Build command works locally: `cd client && npm run build`
- [ ] No console errors in production build
- [ ] Environment variables documented

### Backend (Render/Railway/Heroku)
- [ ] All dependencies in `package.json`
- [ ] Server starts successfully: `npm start`
- [ ] Database connection works
- [ ] Environment variables documented
- [ ] CORS configured for production frontend URL

## 🔧 Configuration

### Frontend Environment Variables (Vercel)
- [ ] `VITE_API_URL` - Backend API URL

### Backend Environment Variables
- [ ] `MONGODB_URI` - MongoDB connection string
- [ ] `JWT_SECRET` - Strong secret key
- [ ] `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- [ ] `CLOUDINARY_API_KEY` - Cloudinary API key
- [ ] `CLOUDINARY_API_SECRET` - Cloudinary API secret
- [ ] `EMAIL_HOST` - SMTP host
- [ ] `EMAIL_PORT` - SMTP port
- [ ] `EMAIL_USER` - Email username
- [ ] `EMAIL_PASS` - Email app password
- [ ] `EMAIL_FROM` - From email address
- [ ] `FRONTEND_URL` - Vercel frontend URL
- [ ] `NODE_ENV` - Set to `production`

## 🚀 Deployment Steps

### Step 1: Deploy Backend
- [ ] Create account on Render/Railway/Heroku
- [ ] Connect GitHub repository
- [ ] Set root directory to `server`
- [ ] Add all environment variables
- [ ] Deploy and get backend URL
- [ ] Test backend API endpoints

### Step 2: Deploy Frontend
- [ ] Create Vercel account
- [ ] Import GitHub repository
- [ ] Configure build settings:
  - [ ] Root Directory: (leave empty or set to `client`)
  - [ ] Build Command: `cd client && npm run build`
  - [ ] Output Directory: `client/dist`
- [ ] Add `VITE_API_URL` environment variable
- [ ] Deploy

### Step 3: Connect Frontend to Backend
- [ ] Update `VITE_API_URL` in Vercel with backend URL
- [ ] Update `FRONTEND_URL` in backend with Vercel URL
- [ ] Redeploy both services

## 🧪 Post-Deployment Testing

### Frontend Tests
- [ ] Home page loads
- [ ] Navigation works
- [ ] Products page displays
- [ ] Product detail page works
- [ ] Images load correctly
- [ ] Responsive design works on mobile

### Authentication Tests
- [ ] User can sign up
- [ ] User can log in
- [ ] User can log out
- [ ] Protected routes work
- [ ] Admin routes protected

### Feature Tests
- [ ] Add product to cart
- [ ] Update cart items
- [ ] Remove from cart
- [ ] Checkout process
- [ ] Order creation
- [ ] Order history
- [ ] Wishlist functionality
- [ ] Product search/filter

### Admin Tests
- [ ] Admin can log in
- [ ] Admin dashboard loads
- [ ] Can create products
- [ ] Can upload product images
- [ ] Can edit products
- [ ] Can delete products
- [ ] Can view orders
- [ ] Can update order status
- [ ] Can manage users

### Email Tests
- [ ] Password reset email sends
- [ ] Order confirmation email sends
- [ ] Shipping notification email sends
- [ ] Delivery confirmation email sends

## 🔍 Performance Checks
- [ ] Page load times acceptable
- [ ] Images optimized
- [ ] No console errors
- [ ] No network errors
- [ ] Mobile performance good

## 🔒 Security Checks
- [ ] Environment variables not exposed
- [ ] API keys secure
- [ ] CORS properly configured
- [ ] Authentication working
- [ ] Admin routes protected
- [ ] HTTPS enabled (automatic on Vercel)

## 📱 Cross-Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

## 📝 Documentation
- [ ] README updated with deployment info
- [ ] Environment variables documented
- [ ] API endpoints documented
- [ ] Deployment guide created

## 🎉 Final Steps
- [ ] Share deployed URLs
- [ ] Test with real users
- [ ] Monitor error logs
- [ ] Set up monitoring/alerts (optional)

---

**Deployment Complete!** 🚀

If everything is checked, your application is ready for production!


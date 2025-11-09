# Vercel Deployment Guide

This guide will help you deploy your Electronics Store application to Vercel.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub/GitLab/Bitbucket Account**: Your code should be in a Git repository
3. **Backend Deployment**: Your backend needs to be deployed separately (see Backend Deployment section)

## 🚀 Frontend Deployment (Vercel)

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import Project to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repository
   - Vercel will auto-detect it's a Vite project

3. **Configure Project Settings**
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `client` ⚠️ **IMPORTANT**: Set this to `client`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Environment Variables**
   Add these in Vercel Dashboard → Settings → Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```
   Replace `your-backend-url.com` with your actual backend URL.

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd client
   vercel
   ```

4. **Follow the prompts**
   - Link to existing project or create new
   - Set environment variables when prompted

5. **Production Deployment**
   ```bash
   vercel --prod
   ```

## 🔧 Configuration Files

The project includes:
- `vercel.json` - Vercel configuration
- `.vercelignore` - Files to ignore during deployment

## 🌐 Backend Deployment

**Important**: Vercel is primarily for frontend/serverless. For your Express.js backend, deploy to:

### Recommended: Render.com (Free Tier Available)

1. **Create Account**: [render.com](https://render.com)
2. **New Web Service**
   - Connect your GitHub repository
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node

3. **Environment Variables** (in Render Dashboard):
   ```
   PORT=10000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   EMAIL_FROM=your_email@gmail.com
   FRONTEND_URL=https://your-frontend.vercel.app
   NODE_ENV=production
   ```

4. **Get Backend URL**: After deployment, you'll get a URL like `https://your-app.onrender.com`

### Alternative: Railway.app

1. **Create Account**: [railway.app](https://railway.app)
2. **New Project** → Deploy from GitHub
3. **Select Repository** → Set Root Directory to `server`
4. **Add Environment Variables** (same as Render)
5. **Deploy**

### Alternative: Heroku

1. **Create Account**: [heroku.com](https://heroku.com)
2. **Install Heroku CLI**
3. **Deploy**:
   ```bash
   cd server
   heroku create your-app-name
   heroku config:set MONGODB_URI=...
   # Add all other environment variables
   git push heroku main
   ```

## 🔗 Connect Frontend to Backend

1. **Update Frontend Environment Variable**
   - In Vercel Dashboard → Settings → Environment Variables
   - Set `VITE_API_URL` to your backend URL:
     ```
     VITE_API_URL=https://your-backend.onrender.com/api
     ```

2. **Update Backend CORS**
   - In your backend `.env` or environment variables:
     ```
     FRONTEND_URL=https://your-frontend.vercel.app
     ```

3. **Redeploy Both**
   - Frontend: Vercel will auto-deploy on push, or trigger manually
   - Backend: Redeploy on Render/Railway/Heroku

## 📝 Environment Variables Checklist

### Frontend (Vercel)
- [ ] `VITE_API_URL` - Your backend API URL

### Backend (Render/Railway/Heroku)
- [ ] `PORT` - Server port (usually auto-set)
- [ ] `MONGODB_URI` - MongoDB connection string
- [ ] `JWT_SECRET` - Secret for JWT tokens
- [ ] `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- [ ] `CLOUDINARY_API_KEY` - Cloudinary API key
- [ ] `CLOUDINARY_API_SECRET` - Cloudinary API secret
- [ ] `EMAIL_HOST` - SMTP host
- [ ] `EMAIL_PORT` - SMTP port
- [ ] `EMAIL_USER` - Email username
- [ ] `EMAIL_PASS` - Email password/app password
- [ ] `EMAIL_FROM` - From email address
- [ ] `FRONTEND_URL` - Your Vercel frontend URL
- [ ] `NODE_ENV` - Set to `production`

## 🧪 Testing Deployment

1. **Test Frontend**
   - Visit your Vercel URL
   - Check if the app loads
   - Test navigation

2. **Test API Connection**
   - Open browser console
   - Check for API errors
   - Test login/signup

3. **Test Image Upload**
   - Login as admin
   - Upload a product image
   - Verify it appears

4. **Test Email**
   - Request password reset
   - Check if email is received

## 🔄 Continuous Deployment

Vercel automatically deploys on every push to your main branch:
- Push to `main` → Auto-deploy to production
- Push to other branches → Preview deployment

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Vercel Dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### API Connection Issues
- Verify `VITE_API_URL` is set correctly
- Check backend CORS settings
- Ensure backend is running and accessible

### Images Not Loading
- Check Cloudinary configuration
- Verify image URLs in browser console
- Check CORS settings for Cloudinary

### Environment Variables Not Working
- Redeploy after adding variables
- Check variable names (case-sensitive)
- Verify variables are set for correct environment (Production/Preview)

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app)

## 🎉 Success!

Once deployed, your app will be live at:
- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-backend.onrender.com`

Share your deployed app with the world! 🚀


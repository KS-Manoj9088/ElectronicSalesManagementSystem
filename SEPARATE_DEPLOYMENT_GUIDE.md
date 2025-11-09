# Separate Deployment Guide - Frontend & Backend

This guide will help you deploy the frontend and backend separately.

## 📋 Overview

- **Frontend**: Deploy to Vercel
- **Backend**: Deploy to Render/Railway/Heroku (separate service)

## 🎨 Phase 1: Deploy Frontend on Vercel

### Step 1: Prepare Frontend

The frontend is already configured. Just make sure:
- ✅ `vercel.json` is in root (configured for frontend only)
- ✅ `client/` folder exists with all frontend files
- ✅ No `api/` folder needed (we deleted it)

### Step 2: Deploy to Vercel

1. **Go to [vercel.com/new](https://vercel.com/new)**
2. **Import your Git repository**
3. **Configure Project:**
   - **Project Name**: `electro-bazaar` (or any name)
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `client` ⚠️ **IMPORTANT**
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Add Environment Variable:**
   - **Key**: `VITE_API_URL`
   - **Value**: `http://localhost:5000/api` (temporary - we'll update after backend deployment)
   - **Environments**: Production, Preview, Development

5. **Click "Deploy"**

6. **Wait for deployment** (1-2 minutes)

7. **Get your frontend URL**: `https://your-project.vercel.app`

### Step 3: Test Frontend

- Visit your Vercel URL
- Frontend should load (API calls will fail until backend is deployed - that's normal)

---

## ⚙️ Phase 2: Deploy Backend on Render (Recommended - Free Tier)

### Step 1: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up/Login (use GitHub for easy connection)

### Step 2: Create Web Service

1. **Click "New +"** → **"Web Service"**
2. **Connect your GitHub repository**
3. **Select your repository**

### Step 3: Configure Backend Service

Fill in these settings:

- **Name**: `esm-backend` (or any name)
- **Region**: Choose closest to you
- **Branch**: `main` (or your main branch)
- **Root Directory**: `server` ⚠️ **IMPORTANT**
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: Free (or paid for better performance)

### Step 4: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add ALL of these:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM=your_email@gmail.com
FRONTEND_URL=https://your-project.vercel.app
NODE_ENV=production
PORT=10000
```

**Important Notes:**
- Replace all placeholder values with your actual credentials
- `FRONTEND_URL` should be your Vercel frontend URL
- `PORT` is usually auto-set by Render, but you can specify it

### Step 5: Deploy Backend

1. **Click "Create Web Service"**
2. **Wait for deployment** (3-5 minutes for first deployment)
3. **Get your backend URL**: `https://esm-backend.onrender.com` (or similar)

### Step 6: Test Backend

1. Visit: `https://your-backend.onrender.com/api`
   - Should show: `{"message":"Electronics Store API is running!"}`

2. Test products endpoint:
   - Visit: `https://your-backend.onrender.com/api/products`
   - Should return products JSON

---

## 🔗 Phase 3: Connect Frontend to Backend

### Step 1: Update Frontend Environment Variable

1. **Go to Vercel Dashboard** → Your project
2. **Settings** → **Environment Variables**
3. **Edit `VITE_API_URL`**:
   - **New Value**: `https://your-backend.onrender.com/api`
   - Replace `your-backend.onrender.com` with your actual Render backend URL

### Step 2: Redeploy Frontend

1. **Go to Deployments tab**
2. **Click three dots (⋯)** on latest deployment
3. **Click "Redeploy"**
4. **Wait for deployment**

### Step 3: Update Backend CORS

1. **Go to Render Dashboard** → Your backend service
2. **Environment** tab
3. **Update `FRONTEND_URL`** to your Vercel URL:
   - `https://your-project.vercel.app`
4. **Save Changes** (will auto-redeploy)

### Step 4: Test Everything

1. **Visit frontend**: `https://your-project.vercel.app`
2. **Test login/signup**
3. **Test viewing products**
4. **Test adding to cart**
5. **Check browser console** for any errors

---

## 🎯 Quick Summary

### Frontend (Vercel)
- ✅ Root Directory: `client`
- ✅ Environment Variable: `VITE_API_URL = https://your-backend-url.com/api`
- ✅ Deploy and get URL

### Backend (Render)
- ✅ Root Directory: `server`
- ✅ Start Command: `npm start`
- ✅ Add all 12 environment variables
- ✅ Deploy and get URL

### Connect
- ✅ Update `VITE_API_URL` in Vercel with backend URL
- ✅ Update `FRONTEND_URL` in Render with frontend URL
- ✅ Redeploy both

---

## 🔧 Alternative: Deploy Backend on Railway

If you prefer Railway instead of Render:

1. **Go to [railway.app](https://railway.app)**
2. **New Project** → **Deploy from GitHub**
3. **Select repository**
4. **Add Service** → **GitHub Repo**
5. **Set Root Directory**: `server`
6. **Add environment variables** (same as Render)
7. **Deploy**

---

## 🐛 Troubleshooting

### Frontend can't connect to backend
- ✅ Verify `VITE_API_URL` is correct in Vercel
- ✅ Check backend is running on Render
- ✅ Check CORS settings in backend
- ✅ Check browser console for errors

### Backend not starting
- ✅ Check Render logs for errors
- ✅ Verify all environment variables are set
- ✅ Check MongoDB connection string
- ✅ Verify `PORT` environment variable

### CORS errors
- ✅ Update `FRONTEND_URL` in backend to match Vercel URL exactly
- ✅ Check backend logs for CORS errors
- ✅ Redeploy backend after updating `FRONTEND_URL`

---

## ✅ Success Checklist

- [ ] Frontend deployed on Vercel
- [ ] Frontend URL obtained
- [ ] Backend deployed on Render/Railway
- [ ] Backend URL obtained
- [ ] `VITE_API_URL` updated in Vercel
- [ ] `FRONTEND_URL` updated in backend
- [ ] Both services redeployed
- [ ] Frontend connects to backend
- [ ] Login/signup works
- [ ] Products display correctly

---

## 🎉 You're Done!

Your application is now live:
- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-backend.onrender.com`

Everything should be working! 🚀


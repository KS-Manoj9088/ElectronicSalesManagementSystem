# Quick Deployment Guide

## 🚀 Deploy to Vercel in 5 Minutes

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy Frontend (Vercel)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. **IMPORTANT**: Set **Root Directory** to `client`
4. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-url.com/api` (you'll update this after backend deployment)
5. Click **Deploy**

### Step 3: Deploy Backend (Render - Free)

1. Go to [render.com](https://render.com)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `esm-backend` (or any name)
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables (click **Advanced**):
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key_here
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   EMAIL_FROM=your_email@gmail.com
   FRONTEND_URL=https://your-project.vercel.app
   NODE_ENV=production
   ```
6. Click **Create Web Service**
7. Wait for deployment (2-3 minutes)
8. Copy your backend URL (e.g., `https://esm-backend.onrender.com`)

### Step 4: Connect Frontend to Backend

1. Go back to Vercel Dashboard
2. Go to **Settings** → **Environment Variables**
3. Update `VITE_API_URL` to: `https://your-backend-url.onrender.com/api`
4. Go to **Deployments** → Click **Redeploy** (three dots menu)

### Step 5: Update Backend CORS

1. Go to Render Dashboard
2. Go to **Environment** tab
3. Update `FRONTEND_URL` to your Vercel URL
4. Click **Save Changes** (will auto-redeploy)

### ✅ Done!

Your app is now live:
- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-backend.onrender.com`

## 🔧 Quick Troubleshooting

**Build fails?**
- Check Root Directory is set to `client` in Vercel
- Check build logs for errors

**API not working?**
- Verify `VITE_API_URL` is set correctly
- Check backend is running on Render
- Verify CORS settings in backend

**Need help?**
- See `VERCEL_DEPLOYMENT.md` for detailed guide
- Check `DEPLOYMENT_CHECKLIST.md` for complete checklist


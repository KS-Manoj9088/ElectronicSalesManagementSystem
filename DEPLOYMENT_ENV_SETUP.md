# 🚀 Deployment Environment Variables Setup Guide

This guide will help you configure the environment variables needed for your deployed frontend (Vercel) and backend (Render) to work together.

## ⚠️ Critical: These Steps Must Be Completed

Without these environment variables, your frontend won't be able to connect to your backend, and you'll see "signin failed" errors.

---

## 🎨 Frontend (Vercel) Environment Variables

### Step 1: Go to Vercel Dashboard
1. Visit [vercel.com](https://vercel.com)
2. Select your project
3. Go to **Settings** → **Environment Variables**

### Step 2: Add Environment Variable

**Variable Name:** `VITE_API_URL`  
**Value:** `https://electro-bazaar-backend.onrender.com/api`  
**Environments:** ✅ Production, ✅ Preview, ✅ Development

**Important Notes:**
- Make sure to include `/api` at the end
- Use `https://` (not `http://`)
- After adding, you **MUST redeploy** for changes to take effect

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click the **three dots (⋯)** on your latest deployment
3. Click **Redeploy**

---

## ⚙️ Backend (Render) Environment Variables

### Step 1: Go to Render Dashboard
1. Visit [render.com](https://render.com)
2. Select your backend service (`electro-bazaar-backend`)
3. Go to **Environment** tab

### Step 2: Add/Update Environment Variables

Add or verify these environment variables:

#### Required Variables:

1. **FRONTEND_URL**
   - **Value:** Your Vercel frontend URL (e.g., `https://your-project.vercel.app`)
   - **Important:** This allows CORS from your frontend
   - **Note:** If you have preview deployments, you can add multiple URLs separated by commas:
     ```
     https://your-project.vercel.app,https://your-project-git-main.vercel.app
     ```

2. **MONGODB_URI**
   - **Value:** Your MongoDB connection string
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

3. **JWT_SECRET**
   - **Value:** A random secret string for JWT tokens
   - Example: Generate one: `openssl rand -base64 32`

4. **NODE_ENV**
   - **Value:** `production`

5. **PORT**
   - **Value:** `10000` (or leave empty - Render sets this automatically)

#### Optional but Recommended:

6. **CLOUDINARY_CLOUD_NAME**
   - Your Cloudinary cloud name

7. **CLOUDINARY_API_KEY**
   - Your Cloudinary API key

8. **CLOUDINARY_API_SECRET**
   - Your Cloudinary API secret

9. **EMAIL_HOST**
   - **Value:** `smtp.gmail.com`

10. **EMAIL_PORT**
    - **Value:** `587`

11. **EMAIL_USER**
    - Your Gmail address

12. **EMAIL_PASS**
    - Your Gmail app password (not regular password)

13. **EMAIL_FROM**
    - Your Gmail address (same as EMAIL_USER)

### Step 3: Restart Service
After adding/updating environment variables:
1. Go to **Manual Deploy** or wait for auto-deploy
2. Click **Deploy latest commit** or **Restart**

---

## ✅ Verification Checklist

### Frontend (Vercel)
- [ ] `VITE_API_URL` is set to `https://electro-bazaar-backend.onrender.com/api`
- [ ] Variable is enabled for Production, Preview, and Development
- [ ] Frontend has been redeployed after adding the variable
- [ ] Check browser console - should see API calls going to Render backend

### Backend (Render)
- [ ] `FRONTEND_URL` is set to your Vercel frontend URL
- [ ] `MONGODB_URI` is set and valid
- [ ] `JWT_SECRET` is set
- [ ] `NODE_ENV` is set to `production`
- [ ] Backend service is running (check status in Render dashboard)
- [ ] Backend logs show "Server running in production mode"

---

## 🧪 Testing the Connection

### Test 1: Check Backend is Running
Visit: `https://electro-bazaar-backend.onrender.com`

You should see:
```json
{
  "message": "Electronics Store API is running!"
}
```

### Test 2: Check API Endpoint
Visit: `https://electro-bazaar-backend.onrender.com/api/products`

You should see a JSON response (even if empty array).

### Test 3: Test Login from Frontend
1. Open your Vercel frontend URL
2. Open browser DevTools (F12) → **Network** tab
3. Try to login
4. Check the network request:
   - **URL:** Should be `https://electro-bazaar-backend.onrender.com/api/auth/login`
   - **Status:** Should be `200` (success) or `401` (wrong credentials), NOT `CORS error` or `Network error`

---

## 🐛 Troubleshooting

### Error: "signin failed" or "Login failed"

**Possible Causes:**

1. **CORS Error (in browser console)**
   - **Fix:** Make sure `FRONTEND_URL` in Render matches your Vercel URL exactly
   - Check: Browser console for CORS error messages

2. **Network Error / Backend not reachable**
   - **Fix:** Verify backend is running in Render dashboard
   - Check: Visit `https://electro-bazaar-backend.onrender.com` directly
   - Note: Render free tier services spin down after 15 minutes of inactivity

3. **Wrong API URL**
   - **Fix:** Verify `VITE_API_URL` in Vercel is exactly: `https://electro-bazaar-backend.onrender.com/api`
   - Check: Browser console should log the API URL in development mode

4. **Backend not responding**
   - **Fix:** Check Render logs for errors
   - Common issues: Missing environment variables, database connection issues

### Error: "Invalid credentials"

This is actually a **good sign** - it means the connection is working! The error is just because:
- Wrong email/password, OR
- User doesn't exist in database

**Solution:** Create a new account or use existing credentials.

### Backend Spinning Down (Render Free Tier)

Render free tier services spin down after 15 minutes of inactivity. First request after spin-down takes ~30 seconds.

**Solutions:**
- Wait ~30 seconds for first request
- Upgrade to paid plan for always-on service
- Use a service like Railway.app or Fly.io that has better free tier

---

## 📝 Quick Reference

### Frontend (Vercel)
```
VITE_API_URL = https://electro-bazaar-backend.onrender.com/api
```

### Backend (Render)
```
FRONTEND_URL = https://your-project.vercel.app
MONGODB_URI = your_mongodb_connection_string
JWT_SECRET = your_random_secret_string
NODE_ENV = production
```

---

## 🎉 Success Indicators

You'll know everything is working when:
- ✅ Frontend loads without errors
- ✅ Login page shows up
- ✅ Login request goes to `https://electro-bazaar-backend.onrender.com/api/auth/login`
- ✅ You get a proper response (success or "Invalid credentials", not CORS/network errors)
- ✅ After successful login, you're redirected to home page

---

## 📞 Need Help?

If you're still having issues:
1. Check browser console for specific error messages
2. Check Render logs for backend errors
3. Verify all environment variables are set correctly
4. Make sure both services are deployed and running


# Cloudinary Setup Guide

## Issues Fixed

The following issues have been fixed in the Cloudinary image upload functionality:

1. **Cloudinary Initialization**: Cloudinary is now properly initialized in `server.js` before routes are loaded
2. **Environment Variable Validation**: Added validation to check if Cloudinary credentials are configured
3. **Error Handling**: Improved error messages and logging for better debugging
4. **FormData Handling**: Fixed axios interceptor to properly handle FormData uploads
5. **Stream Error Handling**: Added proper error handling for upload streams

## Setup Instructions

### 1. Get Cloudinary Credentials

1. Sign up for a free account at [Cloudinary](https://cloudinary.com/)
2. Go to your Dashboard
3. Copy the following values:
   - **Cloud Name** (e.g., `dxyz123abc`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz123456`)

### 2. Configure Environment Variables

Add these to your `server/.env` file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Important**: 
- Replace the placeholder values with your actual Cloudinary credentials
- Never commit your `.env` file to version control
- Make sure there are no spaces around the `=` sign

### 3. Verify Configuration

When you start your server, you should see one of these messages:

**✅ Success:**
```
✅ Cloudinary configured successfully
```

**⚠️ Warning (if credentials are missing):**
```
⚠️  Cloudinary configuration is incomplete. Image uploads will not work.
Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env file
```

### 4. Test Image Upload

1. Start your server: `npm run dev` (in the `server` directory)
2. Start your client: `npm run dev` (in the `client` directory)
3. Log in as admin
4. Go to Admin → Products
5. Click "Add Product" or edit an existing product
6. Fill in product details
7. Upload images using the image upload section
8. Check the browser console and server logs for any errors

## Troubleshooting

### Error: "Cloudinary configuration is missing"

**Solution**: 
- Check that all three environment variables are set in `server/.env`
- Make sure the variable names are exactly: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- Restart your server after adding/updating environment variables

### Error: "Failed to upload image"

**Possible causes:**
1. **Invalid credentials**: Double-check your Cloudinary credentials
2. **Network issues**: Check your internet connection
3. **File size**: Images must be under 5MB
4. **File format**: Only image files (PNG, JPG, GIF) are allowed

**Solution**:
- Check server console logs for detailed error messages
- Verify your Cloudinary account is active
- Try uploading a smaller image file
- Check that the file is a valid image format

### Error: "No images provided"

**Solution**:
- Make sure you've selected at least one image file
- Check that the file input is working (try clicking the upload area)
- Clear your browser cache and try again

### Images not displaying after upload

**Solution**:
- Check that the upload was successful (check server logs)
- Refresh the page
- Check browser console for any errors
- Verify the product was saved correctly

## Testing Your Setup

You can test your Cloudinary setup by:

1. **Check server startup**: Look for the Cloudinary configuration message
2. **Upload a test image**: Try uploading a small image (under 1MB)
3. **Check Cloudinary Dashboard**: Go to your Cloudinary Media Library and verify the image was uploaded to the `electronics-store/products` folder

## Additional Notes

- Images are automatically optimized (max 800x800px)
- Up to 5 images can be uploaded per product
- Images are stored in the `electronics-store/products` folder in Cloudinary
- The free Cloudinary plan includes 25GB storage and 25GB monthly bandwidth

## Support

If you continue to experience issues:

1. Check the server console for detailed error messages
2. Verify your Cloudinary account status
3. Check that your `.env` file is in the `server` directory
4. Ensure you've restarted the server after updating environment variables


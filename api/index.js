// Vercel Serverless Function entry point
import dotenv from 'dotenv';

// Load env variables
dotenv.config();

// Initialize services
let dbConnected = false;
let app = null;

const initializeServices = async () => {
  if (!dbConnected) {
    try {
      const { default: connectDB } = await import('../server/config/db.js');
      await connectDB();
      await import('../server/config/cloudinary.js');
      await import('../server/utils/emailService.js');
      dbConnected = true;
      console.log('Services initialized successfully');
    } catch (error) {
      console.error('Service initialization error:', error);
      throw error;
    }
  }
  
  // Import Express app
  if (!app) {
    const { default: setupApp } = await import('../server/server.js');
    app = setupApp;
  }
};

// Create handler function
export default async function handler(req, res) {
  try {
    // Initialize services on first request
    await initializeServices();
    
    // Handle request with Express app
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message 
    });
  }
}

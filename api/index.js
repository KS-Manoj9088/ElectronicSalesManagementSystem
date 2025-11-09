// Vercel Serverless Function entry point
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Load env variables
dotenv.config();

// Initialize services
let dbConnected = false;
const initializeServices = async () => {
  if (!dbConnected) {
    try {
      const { default: connectDB } = await import('../server/config/db.js');
      await connectDB();
      await import('../server/config/cloudinary.js');
      await import('../server/utils/emailService.js');
      dbConnected = true;
    } catch (error) {
      console.error('Service initialization error:', error);
    }
  }
};

// Import Express app setup
import { default as setupApp } from '../server/server.js';

// Create handler function
export default async function handler(req, res) {
  // Initialize services on first request
  await initializeServices();
  
  // Handle request with Express app
  return setupApp(req, res);
}

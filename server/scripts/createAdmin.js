import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const { name, email, password } = process.argv.slice(2);

    if (!name || !email || !password) {
      console.log('Usage: node scripts/createAdmin.js <name> <email> <password>');
      console.log('Example: node scripts/createAdmin.js "Admin User" admin@example.com admin123');
      process.exit(1);
    }

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      if (existingAdmin.role === 'admin') {
        console.log('❌ Admin with this email already exists!');
        process.exit(1);
      } else {
        // Update existing user to admin
        existingAdmin.role = 'admin';
        existingAdmin.password = password; // Will be hashed by pre-save hook
        await existingAdmin.save();
        console.log('✅ Existing user updated to admin!');
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        process.exit(0);
      }
    }

    // Create new admin
    const admin = await User.create({
      name,
      email,
      password,
      role: 'admin',
    });

    console.log('✅ Admin created successfully!');
    console.log(`Name: ${admin.name}`);
    console.log(`Email: ${admin.email}`);
    console.log(`Password: ${password}`);
    console.log('\nYou can now login with these credentials.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();


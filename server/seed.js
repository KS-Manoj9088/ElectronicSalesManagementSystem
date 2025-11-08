import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import Cart from './models/Cart.js';
import Wishlist from './models/Wishlist.js';

dotenv.config();

const sampleProducts = [
  {
    name: 'iPhone 15 Pro Max',
    description:
      'The latest iPhone with A17 Pro chip, titanium design, and advanced camera system. Features USB-C, Action button, and Pro camera system.',
    price: 1199,
    discount: 10,
    category: 'Mobiles',
    brand: 'Apple',
    stock: 50,
    featured: true,
    specifications: {
      'Display': '6.7-inch Super Retina XDR',
      'Processor': 'A17 Pro chip',
      'RAM': '8GB',
      'Storage': '256GB',
      'Camera': '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
      'Battery': '4422mAh',
    },
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description:
      'Premium Android flagship with S Pen, powerful Snapdragon 8 Gen 3, and incredible camera capabilities.',
    price: 1299,
    discount: 15,
    category: 'Mobiles',
    brand: 'Samsung',
    stock: 45,
    featured: true,
    specifications: {
      'Display': '6.8-inch Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 3',
      'RAM': '12GB',
      'Storage': '512GB',
      'Camera': '200MP Main + 50MP Telephoto + 12MP Ultra Wide',
      'Battery': '5000mAh',
    },
  },
  {
    name: 'MacBook Pro 16" M3 Max',
    description:
      'Ultimate performance laptop with M3 Max chip, stunning Liquid Retina XDR display, and up to 22 hours battery life.',
    price: 3499,
    discount: 5,
    category: 'Laptops',
    brand: 'Apple',
    stock: 20,
    featured: true,
    specifications: {
      'Display': '16.2-inch Liquid Retina XDR',
      'Processor': 'Apple M3 Max',
      'RAM': '36GB Unified Memory',
      'Storage': '1TB SSD',
      'GPU': '40-core GPU',
      'Battery': 'Up to 22 hours',
    },
  },
  {
    name: 'Dell XPS 15',
    description:
      'Premium Windows laptop with InfinityEdge display, powerful performance, and stunning design.',
    price: 1899,
    discount: 10,
    category: 'Laptops',
    brand: 'Dell',
    stock: 30,
    featured: false,
    specifications: {
      'Display': '15.6-inch FHD+',
      'Processor': 'Intel Core i7-13700H',
      'RAM': '16GB DDR5',
      'Storage': '512GB SSD',
      'GPU': 'NVIDIA GeForce RTX 4060',
      'Battery': 'Up to 10 hours',
    },
  },
  {
    name: 'iPad Pro 12.9" M2',
    description:
      'The ultimate iPad experience with M2 chip, stunning Liquid Retina XDR display, and Apple Pencil support.',
    price: 1099,
    discount: 8,
    category: 'Tablets',
    brand: 'Apple',
    stock: 40,
    featured: true,
    specifications: {
      'Display': '12.9-inch Liquid Retina XDR',
      'Processor': 'Apple M2',
      'RAM': '8GB',
      'Storage': '256GB',
      'Camera': '12MP Wide + 10MP Ultra Wide',
      'Battery': 'Up to 10 hours',
    },
  },
  {
    name: 'Sony WH-1000XM5',
    description:
      'Industry-leading noise canceling headphones with exceptional sound quality and 30-hour battery life.',
    price: 399,
    discount: 20,
    category: 'Headphones',
    brand: 'Sony',
    stock: 100,
    featured: true,
    specifications: {
      'Type': 'Over-ear wireless',
      'Noise Cancellation': 'Industry-leading ANC',
      'Battery': '30 hours',
      'Connectivity': 'Bluetooth 5.2',
      'Audio': 'LDAC, Hi-Res Audio',
      'Weight': '250g',
    },
  },
  {
    name: 'AirPods Pro (2nd Gen)',
    description:
      'Active Noise Cancellation, Adaptive Audio, and Personalized Spatial Audio in a compact design.',
    price: 249,
    discount: 10,
    category: 'Headphones',
    brand: 'Apple',
    stock: 150,
    featured: false,
    specifications: {
      'Type': 'In-ear wireless',
      'Noise Cancellation': 'Active ANC',
      'Battery': '6 hours (30 with case)',
      'Connectivity': 'Bluetooth 5.3',
      'Features': 'Spatial Audio, Adaptive Audio',
      'Water Resistance': 'IPX4',
    },
  },
  {
    name: 'Apple Watch Series 9',
    description:
      'Advanced health and fitness features, bright always-on display, and powerful S9 chip.',
    price: 429,
    discount: 5,
    category: 'Smartwatches',
    brand: 'Apple',
    stock: 80,
    featured: true,
    specifications: {
      'Display': '1.9-inch LTPO OLED',
      'Processor': 'S9 SiP',
      'Battery': 'Up to 18 hours',
      'Health': 'ECG, Blood Oxygen, Heart Rate',
      'Connectivity': 'GPS, Cellular, Wi-Fi',
      'Water Resistance': '50m',
    },
  },
  {
    name: 'Samsung Galaxy Watch 6',
    description:
      'Premium smartwatch with comprehensive health tracking, long battery life, and beautiful AMOLED display.',
    price: 349,
    discount: 15,
    category: 'Smartwatches',
    brand: 'Samsung',
    stock: 60,
    featured: false,
    specifications: {
      'Display': '1.5-inch Super AMOLED',
      'Processor': 'Exynos W930',
      'Battery': 'Up to 40 hours',
      'Health': 'Body Composition, Sleep Tracking',
      'Connectivity': 'GPS, LTE, Wi-Fi',
      'Water Resistance': '5ATM + IP68',
    },
  },
  {
    name: 'Sony PlayStation 5',
    description:
      'Next-gen gaming console with stunning graphics, ultra-fast SSD, and immersive haptic feedback.',
    price: 499,
    discount: 0,
    category: 'Gaming',
    brand: 'Sony',
    stock: 25,
    featured: true,
    specifications: {
      'Processor': 'AMD Zen 2',
      'GPU': 'AMD RDNA 2',
      'RAM': '16GB GDDR6',
      'Storage': '825GB SSD',
      'Resolution': 'Up to 8K',
      'Features': 'Ray Tracing, 3D Audio',
    },
  },
];

const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Cart.deleteMany();
    await Wishlist.deleteMany();

    console.log('Data cleared!');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      phone: '9876543210',
    });

    // Create sample users
    const users = await User.create([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '9876543211',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        phone: '9876543212',
      },
    ]);

    console.log('Users created!');

    // Create products
    await Product.insertMany(sampleProducts);

    console.log('Products created!');
    console.log('\n✅ Sample data imported successfully!');
    console.log('\n📝 Login credentials:');
    console.log('Admin: admin@example.com / admin123');
    console.log('User 1: john@example.com / password123');
    console.log('User 2: jane@example.com / password123');

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Cart.deleteMany();
    await Wishlist.deleteMany();

    console.log('Data destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
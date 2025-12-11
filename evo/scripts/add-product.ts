// Script to add a new product to the database
import mongoose from 'mongoose';
import Product from '../src/models/Product';
import Category from '../src/models/Category';

const MONGODB_URI = process.env.MONGODB_URI!;

async function addProduct() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Example: Add a new product
    const newProduct = await Product.create({
      name: 'Classic White T-Shirt',
      slug: 'classic-white-t-shirt',
      description: 'A timeless white t-shirt made from premium cotton. Perfect for any occasion.',
      price: 45,
      category: 'Tops',
      gender: 'unisex',
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['White', 'Black', 'Navy'],
      inStock: true,
      featured: false,
      newArrival: true,
      bestSeller: false
    });

    console.log('✅ Product added successfully:');
    console.log(JSON.stringify(newProduct, null, 2));

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error adding product:', error);
    process.exit(1);
  }
}

addProduct();

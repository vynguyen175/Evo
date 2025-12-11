// Check products by gender in database
import mongoose from 'mongoose';
import Product from '../src/models/Product';

const MONGODB_URI = process.env.MONGODB_URI!;

async function checkProducts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const menProducts = await Product.find({ gender: 'Men' });
    const womenProducts = await Product.find({ gender: 'Women' });
    const unisexProducts = await Product.find({ gender: 'unisex' });

    console.log(`👔 Men's Products (${menProducts.length}):`);
    menProducts.forEach(p => console.log(`  - ${p.name} (${p.gender})`));

    console.log(`\n👗 Women's Products (${womenProducts.length}):`);
    womenProducts.forEach(p => console.log(`  - ${p.name} (${p.gender})`));

    console.log(`\n👕 Unisex Products (${unisexProducts.length}):`);
    unisexProducts.forEach(p => console.log(`  - ${p.name} (${p.gender})`));

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkProducts();

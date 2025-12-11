// Add missing categories
import mongoose from 'mongoose';
import Category from '../src/models/Category';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://vyn13217:Thaovy1511%26@brainrotcluster.eqmfpgx.mongodb.net/evo?retryWrites=true&w=majority';

const newCategories = [
  {
    name: "Accessories",
    slug: "accessories",
    description: "Complete your look with our curated accessories"
  },
  {
    name: "Shoes",
    slug: "shoes",
    description: "Quality footwear for every occasion"
  }
];

async function addCategories() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    for (const cat of newCategories) {
      const exists = await Category.findOne({ name: cat.name });
      if (!exists) {
        await Category.create(cat);
        console.log(`✅ Added category: ${cat.name}`);
      } else {
        console.log(`ℹ️  Category already exists: ${cat.name}`);
      }
    }

    await mongoose.disconnect();
    console.log('\n✅ Done!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addCategories();

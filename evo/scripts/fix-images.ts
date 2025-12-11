// Fix specific product images
import mongoose from 'mongoose';
import Product from '../src/models/Product';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://vyn13217:Thaovy1511%26@brainrotcluster.eqmfpgx.mongodb.net/evo?retryWrites=true&w=majority';

async function fixProductImages() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Update The Perfect Midi Skirt with a better image
    const result = await Product.updateOne(
      { name: 'The Perfect Midi Skirt' },
      { 
        $set: { 
          images: ['https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80'],
          thumbnail: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80'
        } 
      }
    );

    if (result.modifiedCount > 0) {
      console.log('✅ Updated The Perfect Midi Skirt image');
    }

    await mongoose.disconnect();
    console.log('\n✅ Done!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixProductImages();

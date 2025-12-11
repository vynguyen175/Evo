// Fix Tailored Vest gender in database
import mongoose from 'mongoose';
import Product from '../src/models/Product';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://vyn13217:Thaovy1511%26@brainrotcluster.eqmfpgx.mongodb.net/evo?retryWrites=true&w=majority';

async function fixTailoredVest() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const result = await Product.updateOne(
      { name: 'Tailored Vest' },
      { $set: { gender: 'Men' } }
    );

    if (result.modifiedCount > 0) {
      console.log('✅ Updated Tailored Vest gender to Men');
    } else {
      console.log('ℹ️ Tailored Vest not found or already set to Men');
    }

    await mongoose.disconnect();
    console.log('✅ Done');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixTailoredVest();

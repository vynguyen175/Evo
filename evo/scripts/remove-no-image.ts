// Find and remove products without images
import mongoose from 'mongoose';
import Product from '../src/models/Product';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://vyn13217:Thaovy1511%26@brainrotcluster.eqmfpgx.mongodb.net/evo?retryWrites=true&w=majority';

async function removeProductsWithoutImages() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const allProducts = await Product.find({});
    console.log(`📦 Total products: ${allProducts.length}\n`);

    const productsWithoutImages = allProducts.filter(p => 
      !p.images || p.images.length === 0 || !p.images[0]
    );

    if (productsWithoutImages.length === 0) {
      console.log('✅ All products have images!');
    } else {
      console.log(`🗑️  Found ${productsWithoutImages.length} products without images:\n`);
      
      for (const product of productsWithoutImages) {
        console.log(`  - ${product.name} (${product.gender})`);
        await Product.deleteOne({ _id: product._id });
      }
      
      console.log(`\n✅ Removed ${productsWithoutImages.length} products`);
    }

    await mongoose.disconnect();
    console.log('\n✅ Done!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

removeProductsWithoutImages();

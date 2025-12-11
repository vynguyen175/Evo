// Database Seeding Script
// Run this script to populate MongoDB with initial product and category data
// Usage: npm run seed (add "seed": "tsx scripts/seed.ts" to package.json scripts)

import mongoose from 'mongoose';
import connectDB from '../src/lib/db';
import Product from '../src/models/Product';
import Category from '../src/models/Category';

// Static data from the original products.ts file
const categories = [
  {
    name: 'Tops',
    slug: 'tops',
    description: 'Elegant blouses, shirts, and sweaters',
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80'
  },
  {
    name: 'Dresses',
    slug: 'dresses',
    description: 'Timeless dresses for every occasion',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80'
  },
  {
    name: 'Bottoms',
    slug: 'bottoms',
    description: 'Refined trousers, skirts, and pants',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80'
  },
  {
    name: 'Jackets & Coats',
    slug: 'jackets-coats',
    description: 'Luxurious outerwear for all seasons',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80'
  },
  {
    name: 'Knitwear',
    slug: 'knitwear',
    description: 'Cozy and elegant knit pieces',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80'
  }
];

const products = [
  {
    name: "The Effortless Blazer",
    slug: "effortless-blazer",
    price: 248,
    description: "A timeless single-breasted blazer crafted from premium wool blend. Features a relaxed fit with padded shoulders and a single button closure. Perfect for elevating any outfit from day to night.",
    category: "Jackets & Coats",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Navy", hex: "#1e3a8a" },
      { name: "Camel", hex: "#c19a6b" }
    ],
    sizes: [
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: false }
    ],
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80"
    ],
    thumbnail: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    inStock: true,
    quantity: 50,
    featured: true,
    newArrival: false,
    bestSeller: true,
    gender: "Women"
  },
  {
    name: "Silk Camisole",
    slug: "silk-camisole",
    price: 128,
    description: "Luxurious 100% mulberry silk camisole with delicate lace trim. Features adjustable straps and a relaxed silhouette that drapes beautifully. Layer under blazers or wear alone.",
    category: "Tops",
    colors: [
      { name: "Ivory", hex: "#fffff0" },
      { name: "Black", hex: "#000000" },
      { name: "Blush", hex: "#ffc0cb" }
    ],
    sizes: [
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true }
    ],
    images: ["https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80"],
    thumbnail: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80",
    inStock: true,
    quantity: 75,
    featured: false,
    newArrival: true,
    bestSeller: false,
    gender: "Women"
  },
  {
    name: "Wide Leg Trousers",
    slug: "wide-leg-trousers",
    price: 168,
    description: "Elegant high-waisted trousers in flowing crepe fabric. Features a flattering wide leg silhouette with pressed front pleats. Invisible side zip closure.",
    category: "Bottoms",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Navy", hex: "#1e3a8a" },
      { name: "Grey", hex: "#6b7280" }
    ],
    sizes: [
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: false }
    ],
    images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80"],
    thumbnail: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
    inStock: true,
    quantity: 40,
    featured: true,
    newArrival: false,
    bestSeller: true,
    gender: "Women"
  },
  {
    name: "Cashmere Crewneck",
    slug: "cashmere-crewneck",
    price: 298,
    description: "Sumptuous 100% cashmere sweater in a relaxed crewneck style. Lightweight yet warm, with ribbed cuffs and hem. An essential piece for effortless luxury.",
    category: "Knitwear",
    colors: [
      { name: "Camel", hex: "#c19a6b" },
      { name: "Charcoal", hex: "#36454f" },
      { name: "Cream", hex: "#fffdd0" }
    ],
    sizes: [
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true }
    ],
    images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80"],
    thumbnail: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    inStock: true,
    quantity: 30,
    featured: true,
    newArrival: false,
    bestSeller: true,
    gender: "Unisex"
  },
  {
    name: "The Perfect Midi Skirt",
    slug: "perfect-midi-skirt",
    price: 148,
    description: "A sophisticated midi skirt in premium satin fabric. Features an elastic waistband for comfort and a bias cut for elegant draping. Versatile for any occasion.",
    category: "Bottoms",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Emerald", hex: "#50c878" }
    ],
    sizes: [
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true }
    ],
    images: ["https://images.unsplash.com/photo-1583496661160-fb5886a0uj3?w=800&q=80"],
    thumbnail: "https://images.unsplash.com/photo-1583496661160-fb5886a0uj3?w=800&q=80",
    inStock: true,
    quantity: 45,
    featured: false,
    newArrival: true,
    bestSeller: false,
    gender: "Women"
  },
  {
    name: "Linen Blend Shirt",
    slug: "linen-blend-shirt",
    price: 118,
    description: "Relaxed oversized shirt in breathable linen-cotton blend. Features mother-of-pearl buttons and a classic collar. Perfect for effortless warm-weather styling.",
    category: "Tops",
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Blue", hex: "#87ceeb" },
      { name: "Beige", hex: "#f5f5dc" }
    ],
    sizes: [
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: false }
    ],
    images: ["https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80"],
    thumbnail: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80",
    inStock: true,
    quantity: 60,
    featured: false,
    newArrival: false,
    bestSeller: true,
    gender: "Unisex"
  },
  {
    name: "Wool Coat",
    slug: "wool-coat",
    price: 398,
    description: "Timeless double-breasted wool coat with a refined silhouette. Features notched lapels, front pockets, and a belted waist. Fully lined for comfort.",
    category: "Jackets & Coats",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Camel", hex: "#c19a6b" }
    ],
    sizes: [
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: false },
      { name: "L", inStock: true }
    ],
    images: ["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80"],
    thumbnail: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
    inStock: true,
    quantity: 25,
    featured: true,
    newArrival: false,
    bestSeller: false,
    gender: "Women"
  },
  {
    name: "Ribbed Knit Dress",
    slug: "ribbed-knit-dress",
    price: 188,
    description: "Figure-flattering midi dress in soft ribbed knit. Features a high neckline and long sleeves. The perfect foundation piece that transitions seamlessly from day to evening.",
    category: "Dresses",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Burgundy", hex: "#800020" },
      { name: "Navy", hex: "#1e3a8a" }
    ],
    sizes: [
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true }
    ],
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80"],
    thumbnail: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    inStock: true,
    quantity: 55,
    featured: false,
    newArrival: true,
    bestSeller: false,
    gender: "Women"
  },
  {
    name: "Tailored Vest",
    slug: "tailored-vest",
    price: 178,
    description: "Modern tailored vest in structured suiting fabric. Features a V-neckline with button closure and adjustable back strap. Layer over shirts or wear alone.",
    category: "Jackets & Coats",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Grey", hex: "#6b7280" }
    ],
    sizes: [
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: false }
    ],
    images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80"],
    thumbnail: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    inStock: true,
    quantity: 35,
    featured: false,
    newArrival: false,
    bestSeller: true,
    gender: "Men"
  },
  {
    name: "Satin Slip Dress",
    slug: "satin-slip-dress",
    price: 198,
    description: "Elegant slip dress in lustrous satin with a cowl neckline. Features delicate spaghetti straps and a midi length. Perfect for evening occasions or dressed down with a blazer.",
    category: "Dresses",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Champagne", hex: "#f7e7ce" },
      { name: "Emerald", hex: "#50c878" }
    ],
    sizes: [
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true }
    ],
    images: ["https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80"],
    thumbnail: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
    inStock: true,
    quantity: 40,
    featured: true,
    newArrival: true,
    bestSeller: false,
    gender: "Women"
  },
  {
    name: "Cotton Poplin Blouse",
    slug: "cotton-poplin-blouse",
    price: 138,
    description: "Crisp cotton poplin blouse with romantic balloon sleeves. Features a subtle pleated front and mother-of-pearl buttons. Tuck into trousers or wear loose.",
    category: "Tops",
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#000000" }
    ],
    sizes: [
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true }
    ],
    images: ["https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=800&q=80"],
    thumbnail: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=800&q=80",
    inStock: true,
    quantity: 50,
    featured: false,
    newArrival: false,
    bestSeller: true,
    gender: "Women"
  },
  {
    name: "High-Rise Jeans",
    slug: "high-rise-jeans",
    price: 158,
    description: "Premium denim jeans with a flattering high-rise fit. Features a straight leg silhouette and vintage-inspired wash. Crafted from Japanese selvedge denim.",
    category: "Bottoms",
    colors: [
      { name: "Dark Indigo", hex: "#1e3a5f" },
      { name: "Light Blue", hex: "#add8e6" }
    ],
    sizes: [
      { name: "24", inStock: true },
      { name: "25", inStock: true },
      { name: "26", inStock: true },
      { name: "27", inStock: true },
      { name: "28", inStock: true },
      { name: "29", inStock: false },
      { name: "30", inStock: true }
    ],
    images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80"],
    thumbnail: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
    inStock: true,
    quantity: 70,
    featured: false,
    newArrival: false,
    bestSeller: true,
    gender: "Unisex"
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...\n');
    
    // Connect to database
    await connectDB();
    console.log('✅ Connected to MongoDB\n');
    
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log('✅ Existing data cleared\n');
    
    // Seed categories
    console.log('📁 Seeding categories...');
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ Created ${createdCategories.length} categories\n`);
    
    // Seed products
    console.log('📦 Seeding products...');
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Created ${createdProducts.length} products\n`);
    
    console.log('🎉 Database seeding completed successfully!\n');
    console.log('Summary:');
    console.log(`  - Categories: ${createdCategories.length}`);
    console.log(`  - Products: ${createdProducts.length}`);
    console.log('\n✨ Your database is now ready to use!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase();

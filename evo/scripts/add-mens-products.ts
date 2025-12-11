// Add men's products to database
import mongoose from 'mongoose';
import Product from '../src/models/Product';

const MONGODB_URI = process.env.MONGODB_URI!;

const mensProducts = [
  {
    name: "Classic Oxford Shirt",
    slug: "classic-oxford-shirt",
    price: 128,
    description: "Timeless oxford shirt in premium cotton. Features a button-down collar and chest pocket. Perfect for both casual and formal occasions.",
    category: "Tops",
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Light Blue", hex: "#add8e6" },
      { name: "Navy", hex: "#001f3f" }
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true }
    ],
    images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80"],
    thumbnail: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
    inStock: true,
    quantity: 60,
    featured: true,
    newArrival: false,
    bestSeller: true,
    gender: "Men"
  },
  {
    name: "Slim Fit Chinos",
    slug: "slim-fit-chinos",
    price: 148,
    description: "Modern slim-fit chinos in stretch cotton twill. Features a mid-rise waist and tapered leg. Versatile enough for work or weekend.",
    category: "Bottoms",
    colors: [
      { name: "Khaki", hex: "#c3b091" },
      { name: "Navy", hex: "#001f3f" },
      { name: "Olive", hex: "#556b2f" }
    ],
    sizes: [
      { name: "30", inStock: true },
      { name: "32", inStock: true },
      { name: "34", inStock: true },
      { name: "36", inStock: true }
    ],
    images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80"],
    thumbnail: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
    inStock: true,
    quantity: 55,
    featured: false,
    newArrival: true,
    bestSeller: false,
    gender: "Men"
  },
  {
    name: "Merino Wool Sweater",
    slug: "merino-wool-sweater",
    price: 188,
    description: "Luxurious merino wool crewneck sweater. Lightweight yet warm, with a refined finish. Essential layering piece for cooler months.",
    category: "Tops",
    colors: [
      { name: "Charcoal", hex: "#36454f" },
      { name: "Navy", hex: "#001f3f" },
      { name: "Camel", hex: "#c19a6b" }
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: false }
    ],
    images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80"],
    thumbnail: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    inStock: true,
    quantity: 40,
    featured: true,
    newArrival: true,
    bestSeller: false,
    gender: "Men"
  },
  {
    name: "Leather Chelsea Boots",
    slug: "leather-chelsea-boots",
    price: 298,
    description: "Premium leather Chelsea boots with elastic side panels. Features a Goodyear welt construction and cushioned insole. Timeless footwear staple.",
    category: "Shoes",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Brown", hex: "#654321" }
    ],
    sizes: [
      { name: "8", inStock: true },
      { name: "9", inStock: true },
      { name: "10", inStock: true },
      { name: "11", inStock: true },
      { name: "12", inStock: false }
    ],
    images: ["https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80"],
    thumbnail: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80",
    inStock: true,
    quantity: 30,
    featured: false,
    newArrival: false,
    bestSeller: true,
    gender: "Men"
  }
];

async function addMensProducts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    console.log('➕ Adding men\'s products...');
    const created = await Product.insertMany(mensProducts);
    console.log(`✅ Added ${created.length} men's products:\n`);
    created.forEach(p => console.log(`  - ${p.name}`));

    await mongoose.disconnect();
    console.log('\n✅ Done!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addMensProducts();

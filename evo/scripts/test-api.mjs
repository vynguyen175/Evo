// Test API endpoints - Run this to insert products via API
// Usage: node scripts/test-api.mjs

const API_BASE = 'http://localhost:3000/api';

async function addProduct() {
  const newProduct = {
    name: 'Elegant Silk Blouse',
    slug: 'elegant-silk-blouse',
    description: 'Luxurious silk blouse with a relaxed fit. Perfect for both office and evening wear.',
    price: 149,
    category: 'Tops',
    gender: 'women',
    images: [
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Ivory', 'Black', 'Blush'],
    inStock: true,
    featured: true,
    newArrival: true,
    bestSeller: false
  };

  try {
    const response = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct)
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Product added successfully:');
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.error('❌ Error:', data);
    }
  } catch (error) {
    console.error('❌ Failed to add product:', error);
  }
}

async function getAllProducts() {
  try {
    const response = await fetch(`${API_BASE}/products`);
    const data = await response.json();
    
    console.log(`\n📦 Total products: ${data.pagination.total}`);
    console.log('Products:', data.data.map(p => `- ${p.name} ($${p.price})`).join('\n'));
  } catch (error) {
    console.error('❌ Failed to fetch products:', error);
  }
}

async function searchProducts(query) {
  try {
    const response = await fetch(`${API_BASE}/products?search=${encodeURIComponent(query)}`);
    const data = await response.json();
    
    console.log(`\n🔍 Search results for "${query}": ${data.pagination.total} items`);
    console.log('Products:', data.data.map(p => `- ${p.name}`).join('\n'));
  } catch (error) {
    console.error('❌ Failed to search:', error);
  }
}

// Run the functions
console.log('🚀 Testing API endpoints...\n');

// Uncomment the function you want to test:
// await addProduct();
await getAllProducts();
// await searchProducts('dress');

console.log('\n✅ Done!');

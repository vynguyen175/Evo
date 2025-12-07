// Products API - GET all products with filtering, sorting, and pagination
// Uses external DummyJSON API for real product data
import { NextRequest, NextResponse } from 'next/server';
import { 
  fetchExternalProducts,
  fetchExternalProductsByCategory,
  searchExternalProducts,
  convertToInternalProduct,
  FASHION_CATEGORIES
} from '@/lib/external-api';
import { PaginatedResponse, Product } from '@/types/product';

// Cache products in memory for better performance
let cachedProducts: Product[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function getProducts(): Promise<Product[]> {
  const now = Date.now();
  
  // Return cached products if still valid
  if (cachedProducts && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedProducts;
  }
  
  // Fetch fresh products from external API
  const allProducts: Product[] = [];
  
  for (const category of FASHION_CATEGORIES) {
    try {
      const data = await fetchExternalProductsByCategory(category, 10);
      const converted = data.products.map(convertToInternalProduct);
      allProducts.push(...converted);
    } catch (error) {
      console.error(`Failed to fetch category ${category}:`, error);
    }
  }
  
  // Also fetch some general products
  try {
    const generalData = await fetchExternalProducts(20, 0);
    const converted = generalData.products
      .filter(p => !allProducts.find(ap => ap.id === `ext-${p.id}`))
      .map(convertToInternalProduct);
    allProducts.push(...converted);
  } catch (error) {
    console.error('Failed to fetch general products:', error);
  }
  
  // Cache the results
  cachedProducts = allProducts;
  cacheTimestamp = now;
  
  return allProducts;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Query parameters
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'featured';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const gender = searchParams.get('gender');
    const featured = searchParams.get('featured');
    const newArrivals = searchParams.get('newArrivals');
    const bestSellers = searchParams.get('bestSellers');
    
    let products: Product[] = [];
    
    // If searching, use external search API directly
    if (search) {
      try {
        const searchData = await searchExternalProducts(search, 30);
        products = searchData.products.map(convertToInternalProduct);
      } catch {
        products = [];
      }
    } else {
      // Get cached/fetched products
      products = await getProducts();
      
      // Filter by specific collection
      if (featured === 'true') {
        products = products.filter(p => p.featured);
      } else if (newArrivals === 'true') {
        products = products.filter(p => p.newArrival);
      } else if (bestSellers === 'true') {
        products = products.filter(p => p.bestSeller);
      } else if (category && category !== 'All') {
        products = products.filter(p => 
          p.category.toLowerCase() === category.toLowerCase() ||
          p.subcategory?.toLowerCase() === category.toLowerCase()
        );
      }
    }

    // Filter by gender when requested
    if (gender && gender !== 'All') {
      products = products.filter(p => p.gender?.toLowerCase() === gender.toLowerCase());
    }
    
    // Sort products
    switch (sort) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        // Keep featured order (by rating)
        products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    // Pagination
    const total = products.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = products.slice(startIndex, endIndex);
    
    const response: PaginatedResponse<Product> = {
      success: true,
      data: paginatedProducts,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    };
    
    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

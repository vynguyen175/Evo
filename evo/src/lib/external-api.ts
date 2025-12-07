// External API integration for real product data
// Using DummyJSON API - https://dummyjson.com/docs/products

export interface ExternalProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

export interface ExternalApiResponse {
  products: ExternalProduct[];
  total: number;
  skip: number;
  limit: number;
}

const API_BASE = 'https://dummyjson.com';

// Fetch all products from external API
export async function fetchExternalProducts(limit: number = 30, skip: number = 0): Promise<ExternalApiResponse> {
  const res = await fetch(`${API_BASE}/products?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

// Fetch products by category
export async function fetchExternalProductsByCategory(category: string, limit: number = 30): Promise<ExternalApiResponse> {
  const res = await fetch(`${API_BASE}/products/category/${encodeURIComponent(category)}?limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch products by category');
  return res.json();
}

// Fetch single product
export async function fetchExternalProductById(id: number): Promise<ExternalProduct> {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

// Search products
export async function searchExternalProducts(query: string, limit: number = 30): Promise<ExternalApiResponse> {
  const res = await fetch(`${API_BASE}/products/search?q=${encodeURIComponent(query)}&limit=${limit}`);
  if (!res.ok) throw new Error('Failed to search products');
  return res.json();
}

// Get all categories
export async function fetchExternalCategories(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/products/category-list`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

// Fashion-related categories we want to display
export const FASHION_CATEGORIES = [
  'mens-shirts',
  'mens-shoes', 
  'mens-watches',
  'womens-bags',
  'womens-dresses',
  'womens-jewellery',
  'womens-shoes',
  'womens-watches',
  'sunglasses',
  'tops'
];

// Fetch fashion products only
export async function fetchFashionProducts(): Promise<ExternalProduct[]> {
  const allProducts: ExternalProduct[] = [];
  
  for (const category of FASHION_CATEGORIES) {
    try {
      const data = await fetchExternalProductsByCategory(category, 10);
      allProducts.push(...data.products);
    } catch (error) {
      console.error(`Failed to fetch category ${category}:`, error);
    }
  }
  
  return allProducts;
}

// Convert external product to our internal format
import { Product, ProductColor, ProductSize } from '@/types/product';

// Generate colors based on product category/type
function generateColors(product: ExternalProduct): ProductColor[] {
  // Use the actual product images as color variants
  const colors: ProductColor[] = [];
  const colorNames = ['Default', 'Alternate', 'Variant'];
  
  product.images.slice(0, 3).forEach((image, index) => {
    colors.push({
      name: colorNames[index] || `Style ${index + 1}`,
      hex: index === 0 ? '#1a1a1a' : index === 1 ? '#8B4513' : '#4A5568',
      image: image
    });
  });
  
  if (colors.length === 0) {
    colors.push({
      name: 'Default',
      hex: '#1a1a1a',
      image: product.thumbnail
    });
  }
  
  return colors;
}

// Generate sizes based on category
function generateSizes(category: string): ProductSize[] {
  const clothingSizes = ['XS', 'S', 'M', 'L', 'XL'];
  const shoeSizes = ['6', '7', '8', '9', '10', '11', '12'];
  const accessorySizes = ['One Size'];
  
  let sizes: string[];
  
  if (category.includes('shoes')) {
    sizes = shoeSizes;
  } else if (category.includes('watches') || category.includes('jewellery') || category.includes('bags') || category.includes('sunglasses')) {
    sizes = accessorySizes;
  } else {
    sizes = clothingSizes;
  }
  
  return sizes.map((size, index) => ({
    name: size,
    inStock: index < sizes.length - 1 || Math.random() > 0.3 // Random stock for variety
  }));
}

// Map external category to our display category
function mapCategory(externalCategory: string): string {
  const categoryMap: Record<string, string> = {
    'mens-shirts': 'Tops',
    'mens-shoes': 'Shoes',
    'mens-watches': 'Accessories',
    'womens-bags': 'Bags',
    'womens-dresses': 'Dresses',
    'womens-jewellery': 'Accessories',
    'womens-shoes': 'Shoes',
    'womens-watches': 'Accessories',
    'sunglasses': 'Accessories',
    'tops': 'Tops'
  };
  
  return categoryMap[externalCategory] || 'Other';
}

// Create slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Convert external product to internal Product type
export function convertToInternalProduct(external: ExternalProduct): Product {
  const originalPrice = Math.round(external.price * (100 / (100 - external.discountPercentage)));
  
  return {
    id: `ext-${external.id}`,
    name: external.title,
    slug: createSlug(external.title),
    price: Math.round(external.price),
    compareAtPrice: external.discountPercentage > 0 ? originalPrice : undefined,
    description: external.description,
    details: [
      `Brand: ${external.brand}`,
      external.warrantyInformation,
      external.shippingInformation,
      external.returnPolicy,
      `Rating: ${external.rating}/5`
    ].filter(Boolean),
    category: mapCategory(external.category),
    subcategory: external.category,
    colors: generateColors(external),
    sizes: generateSizes(external.category),
    images: external.images,
    thumbnail: external.thumbnail,
    inStock: external.stock > 0,
    quantity: external.stock,
    tags: external.tags,
    featured: external.rating >= 4.5,
    newArrival: new Date(external.meta.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    bestSeller: external.rating >= 4.0 && external.stock < 50,
    createdAt: external.meta.createdAt,
    updatedAt: external.meta.updatedAt
  };
}

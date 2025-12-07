// Categories API - GET all categories
import { NextResponse } from 'next/server';
import { ApiResponse, Category } from '@/types/product';

// Fashion-focused categories for our store
const STORE_CATEGORIES: Category[] = [
  { id: 'all', name: 'All', slug: 'all', description: 'Browse all products' },
  { id: 'tops', name: 'Tops', slug: 'tops', description: 'Shirts, blouses, and more' },
  { id: 'dresses', name: 'Dresses', slug: 'dresses', description: 'Beautiful dresses for any occasion' },
  { id: 'shoes', name: 'Shoes', slug: 'shoes', description: 'Footwear collection' },
  { id: 'bags', name: 'Bags', slug: 'bags', description: 'Handbags and accessories' },
  { id: 'accessories', name: 'Accessories', slug: 'accessories', description: 'Watches, jewelry, and sunglasses' },
];

export async function GET() {
  try {
    const response: ApiResponse<Category[]> = {
      success: true,
      data: STORE_CATEGORIES
    };
    
    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

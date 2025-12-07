// API Service - Frontend utilities for fetching data from the API

import { Product, Category, PaginatedResponse, ApiResponse } from '@/types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Product API calls
export async function fetchProducts(params?: {
  category?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
  featured?: boolean;
  newArrivals?: boolean;
  bestSellers?: boolean;
}): Promise<PaginatedResponse<Product>> {
  const searchParams = new URLSearchParams();
  
  if (params?.category) searchParams.set('category', params.category);
  if (params?.search) searchParams.set('search', params.search);
  if (params?.sort) searchParams.set('sort', params.sort);
  if (params?.page) searchParams.set('page', params.page.toString());
  if (params?.limit) searchParams.set('limit', params.limit.toString());
  if (params?.featured) searchParams.set('featured', 'true');
  if (params?.newArrivals) searchParams.set('newArrivals', 'true');
  if (params?.bestSellers) searchParams.set('bestSellers', 'true');
  
  const response = await fetch(`${API_BASE_URL}/api/products?${searchParams.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
}

export async function fetchProductById(id: string): Promise<ApiResponse<Product>> {
  const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
  
  // Return the JSON response even for non-ok status (it contains error info)
  const data = await response.json();
  return data;
}

export async function fetchProductBySlug(slug: string): Promise<ApiResponse<Product>> {
  return fetchProductById(slug); // The API handles both ID and slug
}

// Category API calls
export async function fetchCategories(): Promise<ApiResponse<Category[]>> {
  const response = await fetch(`${API_BASE_URL}/api/categories`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return response.json();
}

// Helper to get product image by color
export function getProductImageByColor(product: Product, colorName: string): string {
  const color = product.colors.find(c => c.name === colorName);
  return color?.image || product.thumbnail;
}

// Format price helper
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
}

// Calculate discount percentage
export function getDiscountPercentage(price: number, compareAtPrice?: number): number | null {
  if (!compareAtPrice || compareAtPrice <= price) return null;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

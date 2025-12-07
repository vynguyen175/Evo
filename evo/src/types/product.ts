// Product Types - Centralized type definitions

export interface ProductColor {
  name: string;
  hex: string;
  image?: string; // Optional different image for each color
}

export interface ProductSize {
  name: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number; // Original price for sales
  description: string;
  details?: string[];
  category: string;
  subcategory?: string;
  gender?: 'Men' | 'Women' | 'Unisex';
  colors: ProductColor[];
  sizes: ProductSize[];
  images: string[];
  thumbnail: string;
  inStock: boolean;
  quantity: number;
  tags?: string[];
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
  selectedSize: ProductSize;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

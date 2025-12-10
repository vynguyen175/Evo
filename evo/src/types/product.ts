// Product Types - Centralized type definitions
// Compatible with MongoDB documents

export interface ProductColor {
  name: string;
  hex: string;
  image?: string; // Optional different image for each color
}

export interface ProductSize {
  name: string;
  inStock: boolean;
}

// Main Product interface - matches MongoDB schema
export interface Product {
  _id?: string; // MongoDB ID
  id?: string; // Alias for _id (for backward compatibility)
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
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
  selectedSize: ProductSize;
}

export interface Category {
  _id?: string; // MongoDB ID
  id?: string; // Alias for _id
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentCategory?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

// Order Types
export interface OrderItem {
  product: string; // Product ID
  name: string;
  price: number;
  quantity: number;
  selectedColor?: {
    name: string;
    hex: string;
  };
  selectedSize?: {
    name: string;
  };
  thumbnail: string;
}

export interface Order {
  _id?: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod?: string;
  notes?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
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

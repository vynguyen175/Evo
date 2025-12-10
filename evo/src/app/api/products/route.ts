// Products API - GET all products with filtering, sorting, and pagination
// MongoDB-backed full-stack API
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { PaginatedResponse, Product as ProductType } from '@/types/product';
import { transformProduct } from '@/lib/transform';

// GET - Fetch all products with filtering, sorting, and pagination
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
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
    const inStock = searchParams.get('inStock');
    
    // Build query filter
    const filter: Record<string, unknown> = {};
    
    // Category filter
    if (category && category !== 'All') {
      filter.category = { $regex: new RegExp(category, 'i') };
    }
    
    // Gender filter
    if (gender && gender !== 'All') {
      filter.gender = gender;
    }
    
    // Featured/New/Bestseller filters
    if (featured === 'true') filter.featured = true;
    if (newArrivals === 'true') filter.newArrival = true;
    if (bestSellers === 'true') filter.bestSeller = true;
    if (inStock === 'true') filter.inStock = true;
    
    // Search filter (text search on name and description)
    if (search) {
      filter.$text = { $search: search };
    }
    
    // Build sort object
    let sortObj: Record<string, 1 | -1> = {};
    switch (sort) {
      case 'price-low':
        sortObj = { price: 1 };
        break;
      case 'price-high':
        sortObj = { price: -1 };
        break;
      case 'name':
        sortObj = { name: 1 };
        break;
      case 'newest':
        sortObj = { createdAt: -1 };
        break;
      default:
        // Featured first, then by date
        sortObj = { featured: -1, createdAt: -1 };
        break;
    }
    
    // Count total documents matching filter
    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;
    
    // Fetch products
    const products = await Product.find(filter)
      .sort(sortObj)
      .limit(limit)
      .skip(skip)
      .lean()
      .exec();
    
    // Transform MongoDB documents to match frontend Product type
    const transformedProducts = products.map(transformProduct);
    
    const response: PaginatedResponse<ProductType> = {
      success: true,
      data: transformedProducts,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('GET /api/products error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST - Create a new product (Admin)
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    const { name, price, description, category, images, thumbnail } = body;
    
    if (!name || !price || !description || !category || !images || !thumbnail) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Generate slug from name if not provided
    if (!body.slug) {
      body.slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    // Create product
    const product = await Product.create(body);
    
    // Transform response
    const transformedProduct = transformProduct(product);
    
    return NextResponse.json(
      { success: true, data: transformedProduct, message: 'Product created successfully' },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('POST /api/products error:', error);
    
    // Handle duplicate slug error
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Product with this slug already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

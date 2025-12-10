// Categories API - GET all categories from MongoDB
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Category from '@/models/Category';
import { ApiResponse, Category as CategoryType } from '@/types/product';
import { transformCategory } from '@/lib/transform';

// GET - Fetch all categories
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Fetch all categories from MongoDB
    const categories = await Category.find({})
      .sort({ name: 1 })
      .lean()
      .exec();
    
    // Transform MongoDB documents
    const transformedCategories = categories.map(transformCategory);
    
    const response: ApiResponse<CategoryType[]> = {
      success: true,
      data: transformedCategories
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('GET /api/categories error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST - Create a new category (Admin)
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    const { name } = body;
    
    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Category name is required' },
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
    
    // Create category
    const category = await Category.create(body);
    
    // Transform response
    const transformedCategory = transformCategory(category);
    
    return NextResponse.json(
      { success: true, data: transformedCategory, message: 'Category created successfully' },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('POST /api/categories error:', error);
    
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Category with this name or slug already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

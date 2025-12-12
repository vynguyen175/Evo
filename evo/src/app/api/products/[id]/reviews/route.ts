// Review API - POST /api/products/[id]/reviews
// Add a review to a product
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// POST - Add a review to a product
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    await connectDB();

    const { id } = await context.params;
    const body = await request.json();

    // Validate required fields
    if (!body.user || !body.rating || !body.text) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: user, rating, text' },
        { status: 400 }
      );
    }

    // Validate rating range
    if (body.rating < 1 || body.rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Find product
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Create review object
    const newReview = {
      user: body.user,
      rating: body.rating,
      text: body.text,
      images: body.images || [],
      createdAt: new Date(),
    };

    // Add review to product
    product.reviews = product.reviews || [];
    product.reviews.push(newReview);

    // Recalculate average rating and review count
    product.reviewCount = product.reviews.length;
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    product.averageRating = Math.round((totalRating / product.reviewCount) * 10) / 10;

    // Save product
    await product.save();

    return NextResponse.json({
      success: true,
      data: {
        review: newReview,
        averageRating: product.averageRating,
        reviewCount: product.reviewCount,
      },
    });
  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add review' },
      { status: 500 }
    );
  }
}

// GET - Get all reviews for a product
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    await connectDB();

    const { id } = await context.params;

    const product = await Product.findById(id).select('reviews averageRating reviewCount');
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        reviews: product.reviews || [],
        averageRating: product.averageRating || 0,
        reviewCount: product.reviewCount || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

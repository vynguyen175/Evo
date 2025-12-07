// Single Product API - GET product by ID or slug
import { NextRequest, NextResponse } from 'next/server';
import { 
  fetchExternalProductById, 
  fetchExternalProducts,
  convertToInternalProduct,
  searchExternalProducts 
} from '@/lib/external-api';
import { ApiResponse, Product } from '@/types/product';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    let product: Product | null = null;
    
    // Check if it's an external product ID (format: ext-123)
    if (id.startsWith('ext-')) {
      const externalId = parseInt(id.replace('ext-', ''));
      if (!isNaN(externalId)) {
        try {
          const externalProduct = await fetchExternalProductById(externalId);
          product = convertToInternalProduct(externalProduct);
        } catch {
          product = null;
        }
      }
    } else {
      // Try to parse as numeric ID for external API
      const numericId = parseInt(id);
      if (!isNaN(numericId)) {
        try {
          const externalProduct = await fetchExternalProductById(numericId);
          product = convertToInternalProduct(externalProduct);
        } catch {
          product = null;
        }
      } else {
        // It's a slug - search for the product by name
        try {
          // Extract words from slug for search
          const searchTerms = id.split('-').slice(0, 3).join(' ');
          const searchResults = await searchExternalProducts(searchTerms, 10);
          
          // Find exact slug match
          const matchingProduct = searchResults.products.find(p => {
            const converted = convertToInternalProduct(p);
            return converted.slug === id;
          });
          
          if (matchingProduct) {
            product = convertToInternalProduct(matchingProduct);
          } else if (searchResults.products.length > 0) {
            // Fallback to first result if no exact match
            product = convertToInternalProduct(searchResults.products[0]);
          }
        } catch {
          product = null;
        }
      }
    }
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    const response: ApiResponse<Product> = {
      success: true,
      data: product
    };
    
    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

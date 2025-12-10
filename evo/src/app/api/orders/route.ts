// Orders API - Create and retrieve orders
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { ApiResponse, Order as OrderType } from '@/types/product';
import { transformOrder } from '@/lib/transform';

// POST - Create a new order
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    const { customer, shippingAddress, items } = body;
    
    if (!customer?.name || !customer?.email || !shippingAddress || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Missing required order information' },
        { status: 400 }
      );
    }
    
    // Calculate totals
    let subtotal = 0;
    const orderItems = [];
    
    for (const item of items) {
      // Verify product exists and get current price
      const product = await Product.findById(item.product);
      
      if (!product) {
        return NextResponse.json(
          { success: false, error: `Product ${item.product} not found` },
          { status: 404 }
        );
      }
      
      if (!product.inStock || product.quantity < item.quantity) {
        return NextResponse.json(
          { success: false, error: `Product ${product.name} is out of stock` },
          { status: 400 }
        );
      }
      
      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;
      
      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        thumbnail: product.thumbnail,
      });
      
      // Update product quantity
      await Product.findByIdAndUpdate(product._id, {
        $inc: { quantity: -item.quantity },
        $set: { inStock: product.quantity - item.quantity > 0 }
      });
    }
    
    // Calculate tax and shipping (customize as needed)
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 100 ? 0 : 15; // Free shipping over $100
    const total = subtotal + tax + shipping;
    
    // Create order
    const order = await Order.create({
      customer,
      shippingAddress,
      items: orderItems,
      subtotal,
      tax,
      shipping,
      total,
      status: 'pending',
      paymentStatus: body.paymentStatus || 'pending',
      paymentMethod: body.paymentMethod,
      notes: body.notes,
    });
    
    // Transform response
    const transformedOrder = transformOrder(order);
    
    return NextResponse.json(
      { 
        success: true, 
        data: transformedOrder, 
        message: 'Order created successfully' 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/orders error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

// GET - Retrieve all orders (Admin) or query by email
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const orderNumber = searchParams.get('orderNumber');
    
    const query: Record<string, unknown> = {};
    
    if (email) {
      query['customer.email'] = email;
    }
    
    if (orderNumber) {
      query.orderNumber = orderNumber;
    }
    
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    
    // Transform MongoDB documents
    const transformedOrders = orders.map(transformOrder);
    
    const response: ApiResponse<OrderType[]> = {
      success: true,
      data: transformedOrders
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('GET /api/orders error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

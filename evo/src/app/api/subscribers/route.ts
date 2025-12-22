import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Subscriber from '@/models/Subscriber';

// POST - Subscribe a new user
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { email, name, googleId, provider = 'email' } = body;

    // Validate email
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if subscriber already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    
    if (existingSubscriber) {
      if (existingSubscriber.active) {
        return NextResponse.json(
          { success: false, error: 'Email already subscribed' },
          { status: 400 }
        );
      } else {
        // Reactivate subscription
        existingSubscriber.active = true;
        existingSubscriber.subscribedAt = new Date();
        await existingSubscriber.save();
        
        return NextResponse.json({
          success: true,
          message: 'Subscription reactivated',
          data: existingSubscriber,
        });
      }
    }

    // Create new subscriber
    const subscriber = await Subscriber.create({
      email,
      name,
      googleId,
      provider,
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed',
      data: subscriber,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Subscriber creation error:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Email already subscribed' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

// GET - Get all subscribers (admin only - add auth later)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const active = searchParams.get('active');
    
    const query = active !== null ? { active: active === 'true' } : {};
    
    const subscribers = await Subscriber.find(query)
      .sort({ subscribedAt: -1 })
      .select('-__v');

    return NextResponse.json({
      success: true,
      data: subscribers,
      count: subscribers.length,
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

// DELETE - Unsubscribe
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    const subscriber = await Subscriber.findOne({ email });
    
    if (!subscriber) {
      return NextResponse.json(
        { success: false, error: 'Subscriber not found' },
        { status: 404 }
      );
    }

    subscriber.active = false;
    await subscriber.save();

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed',
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to unsubscribe' },
      { status: 500 }
    );
  }
}

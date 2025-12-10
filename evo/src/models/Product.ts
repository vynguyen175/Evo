import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  details?: string[];
  category: string;
  subcategory?: string;
  gender?: 'Men' | 'Women' | 'Unisex';
  colors: {
    name: string;
    hex: string;
    image?: string;
  }[];
  sizes: {
    name: string;
    inStock: boolean;
  }[];
  images: string[];
  thumbnail: string;
  inStock: boolean;
  quantity: number;
  tags?: string[];
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    compareAtPrice: {
      type: Number,
      min: [0, 'Compare at price cannot be negative'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    details: [String],
    category: {
      type: String,
      required: [true, 'Product category is required'],
      index: true,
    },
    subcategory: String,
    gender: {
      type: String,
      enum: ['Men', 'Women', 'Unisex'],
    },
    colors: [
      {
        name: { type: String, required: true },
        hex: { type: String, required: true },
        image: String,
      },
    ],
    sizes: [
      {
        name: { type: String, required: true },
        inStock: { type: Boolean, default: true },
      },
    ],
    images: {
      type: [String],
      required: [true, 'At least one product image is required'],
    },
    thumbnail: {
      type: String,
      required: [true, 'Product thumbnail is required'],
    },
    inStock: {
      type: Boolean,
      default: true,
      index: true,
    },
    quantity: {
      type: Number,
      default: 0,
      min: [0, 'Quantity cannot be negative'],
    },
    tags: [String],
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    newArrival: {
      type: Boolean,
      default: false,
      index: true,
    },
    bestSeller: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search and filtering
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ category: 1, inStock: 1 });

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;

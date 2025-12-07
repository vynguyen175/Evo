"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, ProductColor, ProductSize, CartItem } from '@/types/product';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, color?: ProductColor, size?: ProductSize, quantity?: number) => void;
  removeFromCart: (productId: string, colorName?: string, sizeName?: string) => void;
  updateQuantity: (productId: string, colorName: string, sizeName: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isInCart: (productId: string, colorName?: string, sizeName?: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper to get cart from localStorage
const getInitialCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const savedCart = localStorage.getItem('evo-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate cart from localStorage after mount
  useEffect(() => {
    const storedItems = getInitialCart();
    if (storedItems.length > 0) {
      setItems(storedItems);
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever it changes (after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('evo-cart', JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const addToCart = (product: Product, color?: ProductColor, size?: ProductSize, quantity: number = 1) => {
    // Default to first color and size if not provided
    const selectedColor = color || product.colors[0];
    const selectedSize = size || product.sizes.find(s => s.inStock) || product.sizes[0];

    setItems(currentItems => {
      const existingIndex = currentItems.findIndex(
        item => 
          item.product.id === product.id && 
          item.selectedColor.name === selectedColor.name && 
          item.selectedSize.name === selectedSize.name
      );

      if (existingIndex > -1) {
        // Update quantity if item exists
        const newItems = [...currentItems];
        newItems[existingIndex].quantity += quantity;
        return newItems;
      }

      // Add new item
      return [...currentItems, { product, quantity, selectedColor, selectedSize }];
    });
  };

  const removeFromCart = (productId: string, colorName?: string, sizeName?: string) => {
    setItems(currentItems =>
      currentItems.filter(item => {
        if (colorName && sizeName) {
          return !(item.product.id === productId && 
            item.selectedColor.name === colorName && 
            item.selectedSize.name === sizeName);
        }
        return item.product.id !== productId;
      })
    );
  };

  const updateQuantity = (productId: string, colorName: string, sizeName: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId, colorName, sizeName);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.product.id === productId && 
        item.selectedColor.name === colorName && 
        item.selectedSize.name === sizeName
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (productId: string, colorName?: string, sizeName?: string) => {
    return items.some(item => {
      if (colorName && sizeName) {
        return item.product.id === productId && 
          item.selectedColor.name === colorName && 
          item.selectedSize.name === sizeName;
      }
      return item.product.id === productId;
    });
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isInCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

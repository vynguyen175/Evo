"use client";

import { useState } from 'react';

export default function AdminPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Tops',
    gender: 'unisex',
    images: '',
    sizes: 'XS,S,M,L,XL',
    colors: '',
    inStock: true,
    featured: false,
    newArrival: false,
    bestSeller: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Create slug from name
      const slug = formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      // Parse arrays
      const images = formData.images.split(',').map(img => img.trim()).filter(Boolean);
      const sizes = formData.sizes.split(',').map(s => s.trim()).filter(Boolean);
      const colors = formData.colors.split(',').map(c => c.trim()).filter(Boolean);

      const productData = {
        ...formData,
        slug,
        price: parseFloat(formData.price),
        images,
        sizes,
        colors
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Product added successfully!');
        // Reset form
        setFormData({
          name: '',
          description: '',
          price: '',
          category: 'Tops',
          gender: 'unisex',
          images: '',
          sizes: 'XS,S,M,L,XL',
          colors: '',
          inStock: true,
          featured: false,
          newArrival: false,
          bestSeller: false
        });
      } else {
        setMessage(`❌ Error: ${data.error || 'Failed to add product'}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-neutral-900 mb-3">Add New Product</h1>
          <p className="text-neutral-600 text-lg">Create a new product listing for your store</p>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div className={`mb-8 p-5 rounded-sm border ${
            message.includes('✅') 
              ? 'bg-green-50 text-green-900 border-green-200' 
              : 'bg-red-50 text-red-900 border-red-200'
          }`}>
            <p className="text-sm font-medium">{message}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-sm border border-neutral-200">
          <div className="p-8 md:p-12 space-y-10">
            
            {/* Basic Information Section */}
            <div className="space-y-6">
              <h2 className="text-xs tracking-[0.2em] uppercase text-neutral-500 font-semibold pb-4 border-b border-neutral-200">
                Basic Information
              </h2>
              
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-3">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Classic Cotton T-Shirt"
                  className="w-full px-5 py-3.5 text-base border border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors bg-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-3">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Describe the product features, materials, and fit..."
                  className="w-full px-5 py-3.5 text-base border border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors resize-none bg-white"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-3">
                  Price (USD) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500 text-base pointer-events-none z-10">$</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full pl-12 pr-5 py-3.5 text-base border border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Classification Section */}
            <div className="space-y-6">
              <h2 className="text-xs tracking-[0.2em] uppercase text-neutral-500 font-semibold pb-4 border-b border-neutral-200">
                Classification
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-3">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 text-base border border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors bg-white appearance-none cursor-pointer"
                  >
                    <option value="Tops">Tops</option>
                    <option value="Bottoms">Bottoms</option>
                    <option value="Dresses">Dresses</option>
                    <option value="Outerwear">Outerwear</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-3">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 text-base border border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors bg-white appearance-none cursor-pointer"
                  >
                    <option value="unisex">Unisex</option>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              <h2 className="text-xs tracking-[0.2em] uppercase text-neutral-500 font-semibold pb-4 border-b border-neutral-200">
                Product Details
              </h2>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-3">
                  Image URLs <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="images"
                  value={formData.images}
                  onChange={handleChange}
                  required
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  className="w-full px-5 py-3.5 text-base border border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors bg-white"
                />
                <p className="mt-2 text-xs text-neutral-500">Separate multiple URLs with commas</p>
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-3">
                  Available Sizes <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="sizes"
                  value={formData.sizes}
                  onChange={handleChange}
                  required
                  placeholder="XS, S, M, L, XL"
                  className="w-full px-5 py-3.5 text-base border border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors bg-white"
                />
                <p className="mt-2 text-xs text-neutral-500">Separate sizes with commas</p>
              </div>

              {/* Colors */}
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-3">
                  Available Colors <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="colors"
                  value={formData.colors}
                  onChange={handleChange}
                  required
                  placeholder="Black, White, Navy"
                  className="w-full px-5 py-3.5 text-base border border-neutral-300 focus:border-neutral-900 focus:outline-none transition-colors bg-white"
                />
                <p className="mt-2 text-xs text-neutral-500">Separate colors with commas</p>
              </div>
            </div>

            {/* Product Status Section */}
            <div className="space-y-6">
              <h2 className="text-xs tracking-[0.2em] uppercase text-neutral-500 font-semibold pb-4 border-b border-neutral-200">
                Product Status
              </h2>
              
              <div className="grid md:grid-cols-2 gap-5">
                <label className="flex items-start gap-3 p-4 border border-neutral-200 hover:border-neutral-400 transition-colors cursor-pointer bg-neutral-50">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleChange}
                    className="w-5 h-5 mt-0.5 accent-neutral-900 cursor-pointer"
                  />
                  <div>
                    <span className="block text-sm font-medium text-neutral-900">In Stock</span>
                    <span className="text-xs text-neutral-600">Product is available for purchase</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border border-neutral-200 hover:border-neutral-400 transition-colors cursor-pointer bg-neutral-50">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-5 h-5 mt-0.5 accent-neutral-900 cursor-pointer"
                  />
                  <div>
                    <span className="block text-sm font-medium text-neutral-900">Featured</span>
                    <span className="text-xs text-neutral-600">Show on homepage</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border border-neutral-200 hover:border-neutral-400 transition-colors cursor-pointer bg-neutral-50">
                  <input
                    type="checkbox"
                    name="newArrival"
                    checked={formData.newArrival}
                    onChange={handleChange}
                    className="w-5 h-5 mt-0.5 accent-neutral-900 cursor-pointer"
                  />
                  <div>
                    <span className="block text-sm font-medium text-neutral-900">New Arrival</span>
                    <span className="text-xs text-neutral-600">Mark as newly added</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border border-neutral-200 hover:border-neutral-400 transition-colors cursor-pointer bg-neutral-50">
                  <input
                    type="checkbox"
                    name="bestSeller"
                    checked={formData.bestSeller}
                    onChange={handleChange}
                    className="w-5 h-5 mt-0.5 accent-neutral-900 cursor-pointer"
                  />
                  <div>
                    <span className="block text-sm font-medium text-neutral-900">Best Seller</span>
                    <span className="text-xs text-neutral-600">Popular product badge</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="px-8 md:px-12 py-8 bg-neutral-50 border-t border-neutral-200">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Adding Product...
                </span>
              ) : (
                'Add Product to Store'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

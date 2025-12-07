// Database simulation - Replace with real database (MongoDB, PostgreSQL, etc.)
// This file acts as a JSON database that can be easily swapped out

import { Product, Category } from '@/types/product';

export const categoriesDb: Category[] = [
  {
    id: 'cat-1',
    name: 'Tops',
    slug: 'tops',
    description: 'Elegant blouses, shirts, and sweaters',
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80'
  },
  {
    id: 'cat-2',
    name: 'Dresses',
    slug: 'dresses',
    description: 'Timeless dresses for every occasion',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80'
  },
  {
    id: 'cat-3',
    name: 'Bottoms',
    slug: 'bottoms',
    description: 'Refined trousers, skirts, and pants',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80'
  },
  {
    id: 'cat-4',
    name: 'Jackets & Coats',
    slug: 'jackets-coats',
    description: 'Luxurious outerwear for all seasons',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80'
  },
  {
    id: 'cat-5',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Finishing touches to complete your look',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80'
  }
];

export const productsDb: Product[] = [
  {
    id: 'prod-001',
    name: 'Silk Blend Blouse',
    slug: 'silk-blend-blouse',
    price: 185,
    compareAtPrice: 220,
    description: 'A luxurious silk-blend blouse featuring a relaxed fit and refined details. Perfect for both professional settings and elegant evenings.',
    details: [
      '70% Silk, 30% Cotton',
      'Relaxed fit',
      'Mother of pearl buttons',
      'Dry clean only',
      'Made in Italy'
    ],
    category: 'Tops',
    subcategory: 'Blouses',
    colors: [
      { name: 'Ivory', hex: '#FFFFF0', image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80' },
      { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80' },
      { name: 'Dusty Rose', hex: '#DCAE96', image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=800&q=80' }
    ],
    sizes: [
      { name: 'XS', inStock: true },
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: false }
    ],
    images: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80',
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80',
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80',
    inStock: true,
    quantity: 45,
    tags: ['silk', 'blouse', 'elegant', 'office'],
    featured: true,
    newArrival: true,
    bestSeller: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-11-20T14:30:00Z'
  },
  {
    id: 'prod-002',
    name: 'Cashmere Sweater',
    slug: 'cashmere-sweater',
    price: 295,
    description: 'Pure cashmere sweater with a classic crew neck. Incredibly soft and warm, this timeless piece is a wardrobe essential.',
    details: [
      '100% Cashmere',
      'Regular fit',
      'Ribbed cuffs and hem',
      'Hand wash cold',
      'Made in Scotland'
    ],
    category: 'Tops',
    subcategory: 'Sweaters',
    colors: [
      { name: 'Camel', hex: '#C19A6B', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80' },
      { name: 'Heather Grey', hex: '#9AA297', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80' },
      { name: 'Navy', hex: '#000080', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80' },
      { name: 'Cream', hex: '#FFFDD0', image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?w=800&q=80' }
    ],
    sizes: [
      { name: 'XS', inStock: true },
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: true }
    ],
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
    inStock: true,
    quantity: 32,
    tags: ['cashmere', 'sweater', 'luxury', 'winter'],
    featured: true,
    newArrival: false,
    bestSeller: true,
    createdAt: '2024-02-10T09:00:00Z',
    updatedAt: '2024-11-18T11:20:00Z'
  },
  {
    id: 'prod-003',
    name: 'Tailored Wool Blazer',
    slug: 'tailored-wool-blazer',
    price: 425,
    compareAtPrice: 495,
    description: 'Impeccably tailored blazer in premium Italian wool. Features a single-breasted design with horn buttons and a feminine silhouette.',
    details: [
      '100% Italian Wool',
      'Tailored fit',
      'Fully lined',
      'Horn buttons',
      'Dry clean only',
      'Made in Italy'
    ],
    category: 'Jackets & Coats',
    subcategory: 'Blazers',
    colors: [
      { name: 'Charcoal', hex: '#36454F', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80' },
      { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80' },
      { name: 'Camel', hex: '#C19A6B', image: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&q=80' }
    ],
    sizes: [
      { name: 'XS', inStock: false },
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: true }
    ],
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
      'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    inStock: true,
    quantity: 18,
    tags: ['blazer', 'wool', 'professional', 'tailored'],
    featured: true,
    newArrival: false,
    bestSeller: true,
    createdAt: '2024-01-20T08:00:00Z',
    updatedAt: '2024-11-15T16:45:00Z'
  },
  {
    id: 'prod-004',
    name: 'Midi Wrap Dress',
    slug: 'midi-wrap-dress',
    price: 245,
    description: 'Elegant midi wrap dress in flowing crepe fabric. The flattering wrap silhouette and midi length make this perfect for any occasion.',
    details: [
      '100% Polyester Crepe',
      'Wrap style with tie closure',
      'Midi length',
      'Machine washable',
      'Made in Portugal'
    ],
    category: 'Dresses',
    subcategory: 'Midi Dresses',
    colors: [
      { name: 'Burgundy', hex: '#800020', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80' },
      { name: 'Forest Green', hex: '#228B22', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80' },
      { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80' }
    ],
    sizes: [
      { name: 'XS', inStock: true },
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: false },
      { name: 'XL', inStock: true }
    ],
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    inStock: true,
    quantity: 28,
    tags: ['dress', 'midi', 'wrap', 'elegant'],
    featured: false,
    newArrival: true,
    bestSeller: false,
    createdAt: '2024-03-05T12:00:00Z',
    updatedAt: '2024-11-22T09:15:00Z'
  },
  {
    id: 'prod-005',
    name: 'High-Waisted Trousers',
    slug: 'high-waisted-trousers',
    price: 195,
    description: 'Classic high-waisted trousers with a wide leg silhouette. Crafted from premium wool blend for a refined drape.',
    details: [
      '65% Wool, 35% Polyester',
      'High waist',
      'Wide leg',
      'Side zip closure',
      'Dry clean recommended',
      'Made in Romania'
    ],
    category: 'Bottoms',
    subcategory: 'Trousers',
    colors: [
      { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80' },
      { name: 'Navy', hex: '#000080', image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80' },
      { name: 'Tan', hex: '#D2B48C', image: 'https://images.unsplash.com/photo-1551854838-212c50b4c184?w=800&q=80' }
    ],
    sizes: [
      { name: '24', inStock: true },
      { name: '26', inStock: true },
      { name: '28', inStock: true },
      { name: '30', inStock: true },
      { name: '32', inStock: false }
    ],
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
      'https://images.unsplash.com/photo-1551854838-212c50b4c184?w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80',
    inStock: true,
    quantity: 40,
    tags: ['trousers', 'high-waisted', 'wide-leg', 'office'],
    featured: false,
    newArrival: false,
    bestSeller: true,
    createdAt: '2024-02-28T14:00:00Z',
    updatedAt: '2024-11-19T10:30:00Z'
  },
  {
    id: 'prod-006',
    name: 'Oversized Wool Coat',
    slug: 'oversized-wool-coat',
    price: 595,
    description: 'Luxurious oversized coat in double-faced wool. Features a minimalist design with clean lines and a cozy silhouette.',
    details: [
      '90% Wool, 10% Cashmere',
      'Oversized fit',
      'Double-faced construction',
      'Two front pockets',
      'Professional dry clean only',
      'Made in Italy'
    ],
    category: 'Jackets & Coats',
    subcategory: 'Coats',
    colors: [
      { name: 'Oatmeal', hex: '#F5DEB3', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80' },
      { name: 'Charcoal', hex: '#36454F', image: 'https://images.unsplash.com/photo-1548624149-f9b58f64e498?w=800&q=80' },
      { name: 'Camel', hex: '#C19A6B', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80' }
    ],
    sizes: [
      { name: 'XS', inStock: true },
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: false },
      { name: 'XL', inStock: false }
    ],
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80',
      'https://images.unsplash.com/photo-1548624149-f9b58f64e498?w=800&q=80',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80',
    inStock: true,
    quantity: 12,
    tags: ['coat', 'wool', 'oversized', 'winter', 'luxury'],
    featured: true,
    newArrival: true,
    bestSeller: false,
    createdAt: '2024-10-01T08:00:00Z',
    updatedAt: '2024-11-21T13:00:00Z'
  },
  {
    id: 'prod-007',
    name: 'Satin Midi Skirt',
    slug: 'satin-midi-skirt',
    price: 165,
    description: 'Flowing satin midi skirt with an elegant bias cut. The lustrous fabric creates beautiful movement and drape.',
    details: [
      '100% Silk Satin',
      'Bias cut',
      'Elasticated waist',
      'Midi length',
      'Dry clean only',
      'Made in France'
    ],
    category: 'Bottoms',
    subcategory: 'Skirts',
    colors: [
      { name: 'Champagne', hex: '#F7E7CE', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80' },
      { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=800&q=80' },
      { name: 'Emerald', hex: '#50C878', image: 'https://images.unsplash.com/photo-1592301933927-35b597393c0a?w=800&q=80' }
    ],
    sizes: [
      { name: 'XS', inStock: true },
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: true }
    ],
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80',
      'https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=800&q=80',
      'https://images.unsplash.com/photo-1592301933927-35b597393c0a?w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80',
    inStock: true,
    quantity: 35,
    tags: ['skirt', 'satin', 'midi', 'elegant'],
    featured: false,
    newArrival: true,
    bestSeller: false,
    createdAt: '2024-09-15T11:00:00Z',
    updatedAt: '2024-11-20T15:45:00Z'
  },
  {
    id: 'prod-008',
    name: 'Leather Belt',
    slug: 'leather-belt',
    price: 125,
    description: 'Premium Italian leather belt with a minimalist gold-tone buckle. A timeless accessory that elevates any outfit.',
    details: [
      '100% Italian Leather',
      'Gold-tone brass buckle',
      'Width: 2.5cm',
      'Made in Italy'
    ],
    category: 'Accessories',
    subcategory: 'Belts',
    colors: [
      { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80' },
      { name: 'Cognac', hex: '#834A1C', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80' },
      { name: 'Tan', hex: '#D2B48C', image: 'https://images.unsplash.com/photo-1585856331426-d7a22eacd079?w=800&q=80' }
    ],
    sizes: [
      { name: 'S (70-80cm)', inStock: true },
      { name: 'M (80-90cm)', inStock: true },
      { name: 'L (90-100cm)', inStock: true }
    ],
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
      'https://images.unsplash.com/photo-1585856331426-d7a22eacd079?w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80',
    inStock: true,
    quantity: 50,
    tags: ['belt', 'leather', 'accessory', 'italian'],
    featured: false,
    newArrival: false,
    bestSeller: true,
    createdAt: '2024-04-10T10:00:00Z',
    updatedAt: '2024-11-18T08:30:00Z'
  },
  {
    id: 'prod-009',
    name: 'Silk Scarf',
    slug: 'silk-scarf',
    price: 145,
    description: 'Luxurious silk scarf featuring an exclusive abstract print. Versatile styling options from neck accessory to bag accent.',
    details: [
      '100% Mulberry Silk',
      'Hand-rolled edges',
      '90cm x 90cm',
      'Dry clean only',
      'Made in Italy'
    ],
    category: 'Accessories',
    subcategory: 'Scarves',
    colors: [
      { name: 'Abstract Blue', hex: '#4169E1', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80' },
      { name: 'Botanical', hex: '#228B22', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80' },
      { name: 'Neutral', hex: '#C4A77D', image: 'https://images.unsplash.com/photo-1601924921557-45e6ddf20017?w=800&q=80' }
    ],
    sizes: [
      { name: 'One Size', inStock: true }
    ],
    images: [
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
      'https://images.unsplash.com/photo-1601924921557-45e6ddf20017?w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80',
    inStock: true,
    quantity: 25,
    tags: ['scarf', 'silk', 'accessory', 'luxury'],
    featured: true,
    newArrival: false,
    bestSeller: false,
    createdAt: '2024-05-20T09:00:00Z',
    updatedAt: '2024-11-17T14:20:00Z'
  },
  {
    id: 'prod-010',
    name: 'Linen Button-Up Shirt',
    slug: 'linen-button-up-shirt',
    price: 155,
    description: 'Relaxed linen shirt perfect for warm weather. Features a classic collar and a slightly oversized fit for effortless style.',
    details: [
      '100% European Linen',
      'Relaxed fit',
      'Shell buttons',
      'Machine washable',
      'Made in Portugal'
    ],
    category: 'Tops',
    subcategory: 'Shirts',
    colors: [
      { name: 'White', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80' },
      { name: 'Sky Blue', hex: '#87CEEB', image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80' },
      { name: 'Sand', hex: '#C2B280', image: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=800&q=80' }
    ],
    sizes: [
      { name: 'XS', inStock: true },
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: true }
    ],
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80',
      'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    inStock: true,
    quantity: 60,
    tags: ['shirt', 'linen', 'summer', 'casual'],
    featured: false,
    newArrival: false,
    bestSeller: true,
    createdAt: '2024-06-01T10:00:00Z',
    updatedAt: '2024-11-16T11:00:00Z'
  },
  {
    id: 'prod-011',
    name: 'Pleated Maxi Dress',
    slug: 'pleated-maxi-dress',
    price: 325,
    description: 'Stunning pleated maxi dress in lightweight fabric. The accordion pleats create elegant movement and visual interest.',
    details: [
      '100% Polyester',
      'Pleated construction',
      'Lined bodice',
      'Back zip closure',
      'Machine washable',
      'Made in Spain'
    ],
    category: 'Dresses',
    subcategory: 'Maxi Dresses',
    colors: [
      { name: 'Blush', hex: '#DE5D83', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80' },
      { name: 'Sage', hex: '#BCB88A', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80' },
      { name: 'Navy', hex: '#000080', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80' }
    ],
    sizes: [
      { name: 'XS', inStock: true },
      { name: 'S', inStock: true },
      { name: 'M', inStock: false },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: true }
    ],
    images: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
    inStock: true,
    quantity: 22,
    tags: ['dress', 'maxi', 'pleated', 'elegant'],
    featured: true,
    newArrival: true,
    bestSeller: false,
    createdAt: '2024-08-15T08:00:00Z',
    updatedAt: '2024-11-23T09:00:00Z'
  },
  {
    id: 'prod-012',
    name: 'Structured Tote Bag',
    slug: 'structured-tote-bag',
    price: 395,
    description: 'Sophisticated structured tote in premium pebbled leather. Perfect for work or weekend with multiple interior compartments.',
    details: [
      'Pebbled Italian Leather',
      'Gold-tone hardware',
      'Interior zip pocket',
      'Two slip pockets',
      'Magnetic snap closure',
      'Made in Italy'
    ],
    category: 'Accessories',
    subcategory: 'Bags',
    colors: [
      { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80' },
      { name: 'Taupe', hex: '#483C32', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80' },
      { name: 'Burgundy', hex: '#800020', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80' }
    ],
    sizes: [
      { name: 'One Size', inStock: true }
    ],
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
    inStock: true,
    quantity: 15,
    tags: ['bag', 'tote', 'leather', 'work'],
    featured: true,
    newArrival: false,
    bestSeller: true,
    createdAt: '2024-03-20T11:00:00Z',
    updatedAt: '2024-11-22T16:30:00Z'
  }
];

// Helper functions to query the database
export function getAllProducts(): Product[] {
  return productsDb;
}

export function getProductById(id: string): Product | undefined {
  return productsDb.find(p => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return productsDb.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return productsDb.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

export function getFeaturedProducts(): Product[] {
  return productsDb.filter(p => p.featured);
}

export function getNewArrivals(): Product[] {
  return productsDb.filter(p => p.newArrival);
}

export function getBestSellers(): Product[] {
  return productsDb.filter(p => p.bestSeller);
}

export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase();
  return productsDb.filter(p => 
    p.name.toLowerCase().includes(searchTerm) ||
    p.description.toLowerCase().includes(searchTerm) ||
    p.category.toLowerCase().includes(searchTerm) ||
    p.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

export function getAllCategories(): Category[] {
  return categoriesDb;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categoriesDb.find(c => c.slug === slug);
}

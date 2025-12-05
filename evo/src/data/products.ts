export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  images?: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "The Effortless Blazer",
    price: 248,
    description: "A timeless single-breasted blazer crafted from premium wool blend. Features a relaxed fit with padded shoulders and a single button closure. Perfect for elevating any outfit from day to night.",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    category: "Jackets & Coats",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80"
    ]
  },
  {
    id: "2",
    name: "Silk Camisole",
    price: 128,
    description: "Luxurious 100% mulberry silk camisole with delicate lace trim. Features adjustable straps and a relaxed silhouette that drapes beautifully. Layer under blazers or wear alone.",
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80",
    category: "Tops",
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80"
    ]
  },
  {
    id: "3",
    name: "Wide Leg Trousers",
    price: 168,
    description: "Elegant high-waisted trousers in flowing crepe fabric. Features a flattering wide leg silhouette with pressed front pleats. Invisible side zip closure.",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
    category: "Bottoms",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80"
    ]
  },
  {
    id: "4",
    name: "Cashmere Crewneck",
    price: 298,
    description: "Sumptuous 100% cashmere sweater in a relaxed crewneck style. Lightweight yet warm, with ribbed cuffs and hem. An essential piece for effortless luxury.",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    category: "Knitwear",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80"
    ]
  },
  {
    id: "5",
    name: "The Perfect Midi Skirt",
    price: 148,
    description: "A sophisticated midi skirt in premium satin fabric. Features an elastic waistband for comfort and a bias cut for elegant draping. Versatile for any occasion.",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0uj3?w=800&q=80",
    category: "Bottoms",
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0uj3?w=800&q=80"
    ]
  },
  {
    id: "6",
    name: "Linen Blend Shirt",
    price: 118,
    description: "Relaxed oversized shirt in breathable linen-cotton blend. Features mother-of-pearl buttons and a classic collar. Perfect for effortless warm-weather styling.",
    image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80",
    category: "Tops",
    images: [
      "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80"
    ]
  },
  {
    id: "7",
    name: "Wool Coat",
    price: 398,
    description: "Timeless double-breasted wool coat with a refined silhouette. Features notched lapels, front pockets, and a belted waist. Fully lined for comfort.",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
    category: "Jackets & Coats",
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80"
    ]
  },
  {
    id: "8",
    name: "Ribbed Knit Dress",
    price: 188,
    description: "Figure-flattering midi dress in soft ribbed knit. Features a high neckline and long sleeves. The perfect foundation piece that transitions seamlessly from day to evening.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    category: "Dresses",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80"
    ]
  },
  {
    id: "9",
    name: "Tailored Vest",
    price: 178,
    description: "Modern tailored vest in structured suiting fabric. Features a V-neckline with button closure and adjustable back strap. Layer over shirts or wear alone.",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    category: "Jackets & Coats",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80"
    ]
  },
  {
    id: "10",
    name: "Satin Slip Dress",
    price: 198,
    description: "Elegant slip dress in lustrous satin with a cowl neckline. Features delicate spaghetti straps and a midi length. Perfect for evening occasions or dressed down with a blazer.",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
    category: "Dresses",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80"
    ]
  },
  {
    id: "11",
    name: "Cotton Poplin Blouse",
    price: 138,
    description: "Crisp cotton poplin blouse with romantic balloon sleeves. Features a subtle pleated front and mother-of-pearl buttons. Tuck into trousers or wear loose.",
    image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=800&q=80",
    category: "Tops",
    images: [
      "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=800&q=80"
    ]
  },
  {
    id: "12",
    name: "High-Rise Jeans",
    price: 158,
    description: "Premium denim jeans with a flattering high-rise fit. Features a straight leg silhouette and vintage-inspired wash. Crafted from Japanese selvedge denim.",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
    category: "Bottoms",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80"
    ]
  }
];

export const categories = [
  "All",
  "Tops",
  "Bottoms",
  "Dresses",
  "Jackets & Coats",
  "Knitwear"
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return products;
  return products.filter(product => product.category === category);
}

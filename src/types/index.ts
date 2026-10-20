export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isDeal?: boolean;
  isRefurbished?: boolean;
  refurbishedGrade?: string;
  warranty: string;
  description: string;
  keyFeatures: string[];
  specs: Record<string, string>;
  colors: { name: string; hex: string }[];
  storageVariants?: { capacity: string; priceDiff: number }[];
  tags: string[];
  dealEndTime?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  image: string;
  itemCount: number;
  featuredBrands: string[];
}

export interface CartItem {
  product: Product;
  selectedColor?: string;
  selectedStorage?: string;
  quantity: number;
  price: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
  storage?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'In Transit' | 'Out for Delivery' | 'Delivered';
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  shippingAddress: {
    fullName: string;
    phone: string;
    pincode: string;
    addressLine: string;
    city: string;
    state: string;
  };
  paymentMethod: string;
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface FilterState {
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
  inStockOnly: boolean;
  refurbishedOnly: boolean;
  searchQuery: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'discount' | 'newest';
}

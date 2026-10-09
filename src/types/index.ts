export type ProductCategory = 
  | 'Home Appliances'
  | 'Clothing'
  | 'Electronics'
  | 'Kitchen & Dining'
  | 'Home & Living'
  | 'Beauty & Personal Care';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  soldCount: number;
  stock: number;
  imageUrl: string;
  isPopular?: boolean;
  isTopSelling?: boolean;
  description: string;
  features: string[];
  brand: string;
  badge?: string;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export type PaymentMethod = 'Cash on Delivery' | 'bKash' | 'Online Payment';

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Order {
  id: string; // e.g. #1001
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  productsSummary: string;
  items: OrderItem[];
  amount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Paid' | 'Unpaid';
  status: OrderStatus;
  date: string;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderTime: string;
  avatar?: string;
  location: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  productName: string;
  date: string;
  avatar?: string;
  verified: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend: number;
  expiryDate: string;
  usageCount: number;
  isActive: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type AdminTab = 
  | 'dashboard'
  | 'products'
  | 'categories'
  | 'orders'
  | 'customers'
  | 'coupons'
  | 'reviews'
  | 'marketing'
  | 'analytics'
  | 'delivery'
  | 'payment'
  | 'settings';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Order,
  Customer,
  Review,
  Coupon,
  CartItem,
  AdminTab,
  OrderStatus,
  ProductCategory
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_REVIEWS,
  INITIAL_COUPONS
} from '../data/mockData';

interface StoreContextType {
  // Navigation / View
  view: 'store' | 'admin';
  setView: (view: 'store' | 'admin') => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;

  // Catalog & Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  selectedCategory: ProductCategory | 'All';
  setSelectedCategory: (cat: ProductCategory | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Selected Product for PDP modal
  activeProductModal: Product | null;
  setActiveProductModal: (prod: Product | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQty: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartTotal: number;
  cartItemsCount: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  // Checkout & Orders
  orders: Order[];
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  placeOrder: (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: string;
    city: string;
    paymentMethod: Order['paymentMethod'];
    appliedCoupon?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Customers
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id'>) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;

  // Coupons
  coupons: Coupon[];
  applyCoupon: (code: string) => { valid: boolean; discount: number; message: string };
  appliedCoupon: Coupon | null;
  setAppliedCoupon: (coupon: Coupon | null) => void;
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;

  // Auth modal mock
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Toast / Feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Admin stats
  adminStats: {
    totalOrders: number;
    totalCustomers: number;
    totalRevenue: number;
    totalProducts: number;
    ordersGrowth: string;
    customersGrowth: string;
    revenueGrowth: string;
    productsGrowth: string;
    statusCounts: {
      Pending: number;
      Processing: number;
      Shipped: number;
      Delivered: number;
    };
  };
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // View states
  const [view, setView] = useState<'store' | 'admin'>('store');
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('fm_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('fm_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Customers
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('fm_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('fm_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('fm_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('fm_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('fm_wishlist');
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-3'];
  });

  // Store UI state
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('fm_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('fm_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('fm_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('fm_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('fm_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('fm_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('fm_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Show Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  };

  // Cart actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to cart!`);
  };

  const updateCartQty = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to wishlist');
        return [...prev, productId];
      }
    });
  };

  // Products CRUD
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Product "${productData.name}" added successfully!`);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
    showToast('Product updated successfully!');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product deleted from inventory');
  };

  // Customers CRUD
  const addCustomer = (customerData: Omit<Customer, 'id'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: `cust-${Date.now()}`
    };
    setCustomers((prev) => [newCustomer, ...prev]);
    showToast(`Customer "${customerData.name}" registered`);
  };

  // Reviews CRUD
  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now'
    };
    setReviews((prev) => [newReview, ...prev]);
    showToast('Thank you! Review submitted.');
  };

  // Coupons CRUD
  const addCoupon = (couponData: Omit<Coupon, 'id'>) => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `coup-${Date.now()}`
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    showToast(`Coupon "${couponData.code}" created!`);
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find(
      (c) => c.code === cleanCode && c.isActive
    );
    if (!found) {
      return { valid: false, discount: 0, message: 'Invalid or inactive coupon code.' };
    }
    const currentSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    if (currentSubtotal < found.minSpend) {
      return {
        valid: false,
        discount: 0,
        message: `Minimum order amount for this coupon is ৳${found.minSpend.toLocaleString()}`
      };
    }
    setAppliedCoupon(found);
    const discount =
      found.discountType === 'percentage'
        ? Math.round((currentSubtotal * found.discountValue) / 100)
        : found.discountValue;
    return { valid: true, discount, message: `Coupon ${found.code} applied successfully!` };
  };

  // Order placement & Status
  const placeOrder = (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: string;
    city: string;
    paymentMethod: Order['paymentMethod'];
    appliedCoupon?: string;
  }) => {
    const rawTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    let discount = 0;
    if (appliedCoupon && rawTotal >= appliedCoupon.minSpend) {
      discount =
        appliedCoupon.discountType === 'percentage'
          ? Math.round((rawTotal * appliedCoupon.discountValue) / 100)
          : appliedCoupon.discountValue;
    }
    const finalAmount = Math.max(0, rawTotal - discount);

    const itemsSummary = cart.map((i) => `${i.product.name} (x${i.quantity})`).join(', ');
    const orderItems = cart.map((i) => ({
      productId: i.product.id,
      productName: i.product.name,
      price: i.product.price,
      quantity: i.quantity,
      imageUrl: i.product.imageUrl
    }));

    const nextId = `#${1002 + orders.length}`;
    const newOrder: Order = {
      id: nextId,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      shippingAddress: orderData.shippingAddress,
      city: orderData.city,
      productsSummary: itemsSummary,
      items: orderItems,
      amount: finalAmount,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'Cash on Delivery' ? 'Unpaid' : 'Paid',
      status: 'Pending',
      date: 'Just now',
      notes: 'Customer placed order via website.'
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update customer or create new
    setCustomers((prev) => {
      const existing = prev.find((c) => c.email.toLowerCase() === orderData.customerEmail.toLowerCase());
      if (existing) {
        return prev.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                ordersCount: c.ordersCount + 1,
                totalSpent: c.totalSpent + finalAmount,
                lastOrderTime: 'Just now'
              }
            : c
        );
      }
      return [
        {
          id: `cust-${Date.now()}`,
          name: orderData.customerName,
          email: orderData.customerEmail,
          phone: orderData.customerPhone,
          ordersCount: 1,
          totalSpent: finalAmount,
          lastOrderTime: 'Just now',
          location: `${orderData.shippingAddress}, ${orderData.city}`
        },
        ...prev
      ];
    });

    // Clear cart & coupon
    setCart([]);
    setAppliedCoupon(null);
    showToast(`Order ${nextId} placed successfully!`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    showToast(`Order ${orderId} status updated to ${status}`);
  };

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartDiscount = appliedCoupon
    ? appliedCoupon.discountType === 'percentage'
      ? Math.round((cartSubtotal * appliedCoupon.discountValue) / 100)
      : appliedCoupon.discountValue
    : 0;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Admin dynamic calculations to reflect dashboard stats
  const baseOrders = 1243;
  const dynamicTotalOrders = baseOrders + orders.length;

  const baseCustomers = 3557;
  const dynamicTotalCustomers = baseCustomers + customers.length;

  const baseRevenue = 749000;
  const ordersSum = orders.reduce((acc, o) => acc + o.amount, 0);
  const dynamicTotalRevenue = baseRevenue + ordersSum;

  const statusCounts = orders.reduce<Record<string, number>>(
    (acc, o) => {
      if (acc[o.status] !== undefined) {
        acc[o.status] += 1;
      }
      return acc;
    },
    { Pending: 137, Processing: 266, Shipped: 652, Delivered: 183, Cancelled: 10 }
  ) as { Pending: number; Processing: number; Shipped: number; Delivered: number };


  const adminStats = {
    totalOrders: dynamicTotalOrders,
    totalCustomers: dynamicTotalCustomers,
    totalRevenue: dynamicTotalRevenue,
    totalProducts: 248 + (products.length - INITIAL_PRODUCTS.length),
    ordersGrowth: '12%',
    customersGrowth: '18%',
    revenueGrowth: '24%',
    productsGrowth: '6%',
    statusCounts
  };

  return (
    <StoreContext.Provider
      value={{
        view,
        setView,
        adminTab,
        setAdminTab,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        activeProductModal,
        setActiveProductModal,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        cartItemsCount,
        wishlist,
        toggleWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        orders,
        isCheckoutOpen,
        setIsCheckoutOpen,
        placeOrder,
        updateOrderStatus,
        customers,
        addCustomer,
        reviews,
        addReview,
        coupons,
        applyCoupon,
        appliedCoupon,
        setAppliedCoupon,
        addCoupon,
        isAuthModalOpen,
        setIsAuthModalOpen,
        toastMessage,
        showToast,
        adminStats
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

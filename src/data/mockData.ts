import { Product, Order, Customer, Review, Coupon } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Samsung Washing Machine (7kg)',
    category: 'Home Appliances',
    price: 32500,
    originalPrice: 35000,
    rating: 4.5,
    reviewsCount: 124,
    soldCount: 76,
    stock: 28,
    brand: 'Samsung',
    imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80',
    isPopular: true,
    isTopSelling: true,
    description: 'Advanced Samsung Front Load Washing Machine with EcoBubble technology, AI Control, and diamond drum protection for delicate fabrics.',
    features: ['7kg Capacity', 'Digital Inverter Motor (10 Yr Warranty)', '1200 RPM Spin Speed', 'Hygiene Steam Wash', 'Quick 15 Min Wash']
  },
  {
    id: 'prod-2',
    name: 'Walton Refrigerator (270L)',
    category: 'Home Appliances',
    price: 48000,
    originalPrice: 52000,
    rating: 4.7,
    reviewsCount: 189,
    soldCount: 124,
    stock: 15,
    brand: 'Walton',
    imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80',
    isPopular: true,
    isTopSelling: true,
    description: 'Energy-saving double-door refrigerator with Direct Cool technology, DEO fresh deodorizer, and rapid freeze compartment.',
    features: ['270 Liters Gross Volume', 'Inverter Technology saves up to 50% power', 'Tempered Glass Shelves', 'Copper Condenser', '10 Years Compressor Warranty']
  },
  {
    id: 'prod-3',
    name: 'Xiaomi 43" Smart TV',
    category: 'Electronics',
    price: 29999,
    originalPrice: 33500,
    rating: 4.6,
    reviewsCount: 156,
    soldCount: 87,
    stock: 32,
    brand: 'Xiaomi',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80',
    isPopular: true,
    isTopSelling: true,
    description: 'Xiaomi 4K Ultra HD Android Smart LED TV with bezel-less display, Dolby Audio + DTS-HD, Google Voice Assistant, and built-in Chromecast.',
    features: ['43-inch 4K UHD 60Hz', 'Dolby Vision & HDR10+', 'Android TV 11 / Google TV', '2GB RAM + 16GB Storage', 'PatchWall with Bengali content']
  },
  {
    id: 'prod-4',
    name: 'Miyako Blender',
    category: 'Kitchen & Dining',
    price: 4200,
    originalPrice: 4800,
    rating: 4.5,
    reviewsCount: 98,
    soldCount: 54,
    stock: 45,
    brand: 'Miyako',
    imageUrl: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=600&q=80',
    isPopular: true,
    description: 'Heavy duty 3-in-1 blender, grinder, and mincer with stainless steel blades and overload protection circuit breaker.',
    features: ['750W Pure Copper Motor', '3 Stainless Steel Jars', 'Pulse & 3-Speed Control', 'Anti-Slip Rubber Feet', '2 Years Warranty']
  },
  {
    id: 'prod-5',
    name: "Men's Cotton T-Shirt",
    category: 'Clothing',
    price: 550,
    originalPrice: 750,
    rating: 4.3,
    reviewsCount: 312,
    soldCount: 98,
    stock: 120,
    brand: 'Familly Mart Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    isPopular: true,
    isTopSelling: true,
    description: '100% combed organic cotton classic crewneck t-shirt. Breathable, pre-shrunk fabric perfect for daily comfort.',
    features: ['180 GSM Ring-Spun Cotton', 'Bio-Washed for Silky Soft Feel', 'Color Fastness Guaranteed', 'Regular Unisex Fit', 'Machine Washable']
  },
  {
    id: 'prod-6',
    name: "Women's Maxi Dress",
    category: 'Clothing',
    price: 1250,
    originalPrice: 1650,
    rating: 4.4,
    reviewsCount: 88,
    soldCount: 62,
    stock: 40,
    brand: 'Familly Mart Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80',
    isPopular: true,
    isTopSelling: true,
    description: 'Floral print lightweight chiffon maxi dress with ruffled hemline, elastic waist band, and breathable summer lining.',
    features: ['Premium Breathable Georgette', 'Elegant Floral Print Pattern', 'Full Length Comfort Fit', 'Includes Fabric Belt', 'Gentle Wash']
  },
  {
    id: 'prod-7',
    name: 'Samsung Refrigerator (236L)',
    category: 'Home Appliances',
    price: 32500,
    originalPrice: 36000,
    rating: 4.8,
    reviewsCount: 142,
    soldCount: 124,
    stock: 22,
    brand: 'Samsung',
    imageUrl: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=80',
    isPopular: false,
    isTopSelling: true,
    description: 'Samsung Frost Free Double Door Refrigerator with Digital Inverter Compressor and All-Around Cooling technology.',
    features: ['236 Liters Capacity', 'Smart Connect Inverter', 'Toughened Glass Shelves', 'MoistFresh Zone', 'Stabilizer Free Operation']
  },
  {
    id: 'prod-8',
    name: 'Walton Washing Machine (7kg)',
    category: 'Home Appliances',
    price: 28990,
    originalPrice: 31500,
    rating: 4.6,
    reviewsCount: 92,
    soldCount: 76,
    stock: 19,
    brand: 'Walton',
    imageUrl: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=600&q=80',
    isPopular: false,
    isTopSelling: true,
    description: 'Walton Fully Automatic Front Loading Washing Machine with BLDC motor and high temperature sterilization cycle.',
    features: ['7.0 kg Wash Capacity', 'BLDC Inverter Silent Motor', '90°C Anti-Bacterial Wash', 'Child Lock Protection', 'LED Display Control']
  },
  {
    id: 'prod-9',
    name: 'Panasonic Solo Microwave (20L)',
    category: 'Home Appliances',
    price: 11500,
    originalPrice: 13000,
    rating: 4.6,
    reviewsCount: 64,
    soldCount: 42,
    stock: 25,
    brand: 'Panasonic',
    imageUrl: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=600&q=80',
    isPopular: false,
    description: 'Compact 20L microwave oven with 800W high power output and 5 variable power levels for swift reheating and cooking.',
    features: ['20 Litre Capacity', '800W Cooking Power', 'Glass Turntable 255mm', 'Auto Defrost by Weight', 'Timer & Child Lock']
  },
  {
    id: 'prod-10',
    name: 'Nordic Accent Armchair',
    category: 'Home & Living',
    price: 16500,
    originalPrice: 19000,
    rating: 4.9,
    reviewsCount: 48,
    soldCount: 38,
    stock: 12,
    brand: 'Familly Living',
    imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80',
    isPopular: false,
    description: 'Ergonomic Scandinavian accent single sofa chair in high density cushion fabric and treated solid teak wood frame.',
    features: ['Solid Oak Wooden Legs', 'High Resilience Foam Cushion', 'Water Repellent Linen Fabric', '300kg Weight Capacity', 'Modern Minimalist Style']
  },
  {
    id: 'prod-11',
    name: 'Glow Radiance Skincare Kit',
    category: 'Beauty & Personal Care',
    price: 2650,
    originalPrice: 3200,
    rating: 4.7,
    reviewsCount: 115,
    soldCount: 84,
    stock: 60,
    brand: 'Aura Care',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    isPopular: false,
    description: 'Complete 3-step skincare regimen: Gentle Cleanser, Hydrating Niacinamide Serum, and Peptide Barrier Moisturizer.',
    features: ['100% Cruelty Free & Vegan', 'Dermatologist Tested', 'Non-comedogenic', 'Suitable for all skin types', 'Free from Parabens & Sulfates']
  },
  {
    id: 'prod-12',
    name: 'Non-Stick Die-Cast Cookware Set',
    category: 'Kitchen & Dining',
    price: 7800,
    originalPrice: 9200,
    rating: 4.7,
    reviewsCount: 73,
    soldCount: 51,
    stock: 30,
    brand: 'Prestige Cook',
    imageUrl: 'https://images.unsplash.com/photo-1584990347449-39b02a24fa60?auto=format&fit=crop&w=600&q=80',
    isPopular: false,
    description: '7-piece granite coating non-stick cookware set with tempered glass lids and stay-cool soft touch bakelite handles.',
    features: ['PFOA-Free Multi-Layer Granite', 'Induction & Gas Compatible', 'Scratch Resistant Surface', 'Even Heat Distribution', 'Dishwasher Safe']
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: '#1001',
    customerName: 'Rahim Ahmed',
    customerEmail: 'rahim@gmail.com',
    customerPhone: '+880 1711-234567',
    shippingAddress: 'House 42, Road 11, Banani',
    city: 'Dhaka',
    productsSummary: 'Samsung Refrigerator',
    items: [
      {
        productId: 'prod-7',
        productName: 'Samsung Refrigerator (236L)',
        price: 32500,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=80'
      }
    ],
    amount: 32500,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Unpaid',
    status: 'Pending',
    date: '29 Jul 10:12 AM',
    notes: 'Please call before delivery. Ring bell at 2nd floor.'
  },
  {
    id: '#1000',
    customerName: 'Ayesha Akter',
    customerEmail: 'ayesha@gmail.com',
    customerPhone: '+880 1822-987654',
    shippingAddress: 'Flat B3, Green Villa, Dhanmondi 27',
    city: 'Dhaka',
    productsSummary: "Men's T-Shirt (2 pcs)",
    items: [
      {
        productId: 'prod-5',
        productName: "Men's Cotton T-Shirt",
        price: 550,
        quantity: 2,
        imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80'
      }
    ],
    amount: 1250,
    paymentMethod: 'bKash',
    paymentStatus: 'Paid',
    status: 'Processing',
    date: '29 Jul 09:48 AM',
    notes: 'Gift wrap if possible.'
  },
  {
    id: '#0999',
    customerName: 'Tanvir Hasan',
    customerEmail: 'tanvir@gmail.com',
    customerPhone: '+880 1912-334455',
    shippingAddress: 'Block D, Road 4, Mirpur DOHS',
    city: 'Dhaka',
    productsSummary: 'Xiaomi Smart TV',
    items: [
      {
        productId: 'prod-3',
        productName: 'Xiaomi 43" Smart TV',
        price: 29999,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80'
      }
    ],
    amount: 29999,
    paymentMethod: 'Online Payment',
    paymentStatus: 'Paid',
    status: 'Shipped',
    date: '28 Jul 08:32 PM',
    notes: 'Courier tracking #TRK-882379.'
  },
  {
    id: '#0998',
    customerName: 'Shanta Begum',
    customerEmail: 'shanta@gmail.com',
    customerPhone: '+880 1633-445566',
    shippingAddress: 'Sector 7, Road 14, Uttara',
    city: 'Dhaka',
    productsSummary: "Women's Dress",
    items: [
      {
        productId: 'prod-6',
        productName: "Women's Maxi Dress",
        price: 1250,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80'
      }
    ],
    amount: 1450,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Paid',
    status: 'Delivered',
    date: '28 Jul 06:17 PM',
    notes: 'Delivered successfully and signature captured.'
  },
  {
    id: '#0997',
    customerName: 'Rifat Islam',
    customerEmail: 'rifat@gmail.com',
    customerPhone: '+880 1755-667788',
    shippingAddress: 'East Nasirabad, GEC Circle',
    city: 'Chattogram',
    productsSummary: 'Washing Machine',
    items: [
      {
        productId: 'prod-8',
        productName: 'Walton Washing Machine (7kg)',
        price: 28990,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=600&q=80'
      }
    ],
    amount: 28990,
    paymentMethod: 'Online Payment',
    paymentStatus: 'Paid',
    status: 'Shipped',
    date: '28 Jul 05:03 PM',
    notes: 'Heavy vehicle delivery dispatch.'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Rahim Ahmed',
    email: 'rahim@gmail.com',
    phone: '+880 1711-234567',
    ordersCount: 2,
    totalSpent: 42000,
    lastOrderTime: '1 hour ago',
    location: 'Banani, Dhaka'
  },
  {
    id: 'cust-2',
    name: 'Ayesha Akter',
    email: 'ayesha@gmail.com',
    phone: '+880 1822-987654',
    ordersCount: 1,
    totalSpent: 1250,
    lastOrderTime: '3 hours ago',
    location: 'Dhanmondi, Dhaka'
  },
  {
    id: 'cust-3',
    name: 'Tanvir Hasan',
    email: 'tanvir@gmail.com',
    phone: '+880 1912-334455',
    ordersCount: 4,
    totalSpent: 68500,
    lastOrderTime: '5 hours ago',
    location: 'Mirpur DOHS, Dhaka'
  },
  {
    id: 'cust-4',
    name: 'Shanta Begum',
    email: 'shanta@gmail.com',
    phone: '+880 1633-445566',
    ordersCount: 1,
    totalSpent: 1450,
    lastOrderTime: '6 hours ago',
    location: 'Uttara, Dhaka'
  },
  {
    id: 'cust-5',
    name: 'Rifat Islam',
    email: 'rifat@gmail.com',
    phone: '+880 1755-667788',
    ordersCount: 3,
    totalSpent: 49500,
    lastOrderTime: '1 day ago',
    location: 'GEC Circle, Chattogram'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    customerName: 'Rafiqul Islam',
    rating: 5,
    comment: 'Excellent product and fast delivery! Very pleased with the build quality.',
    productName: 'Samsung Refrigerator (236L)',
    date: '2 days ago',
    verified: true
  },
  {
    id: 'rev-2',
    customerName: 'Nusrat Jahan',
    rating: 5,
    comment: 'Very good quality. Highly recommended! The cotton fabric is so comfortable.',
    productName: "Men's Cotton T-Shirt",
    date: '3 days ago',
    verified: true
  },
  {
    id: 'rev-3',
    customerName: 'Md. Al Amin',
    rating: 5,
    comment: 'Best shopping experience. Will buy again! Screen colors are vivid and crisp.',
    productName: 'Xiaomi 43" Smart TV',
    date: '4 days ago',
    verified: true
  },
  {
    id: 'rev-4',
    customerName: 'Farhana Akter',
    rating: 5,
    comment: 'Product is original and service is great! Came safely in pristine packaging.',
    productName: 'Miyako Blender',
    date: '5 days ago',
    verified: true
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup-1',
    code: 'SMART10',
    discountType: 'percentage',
    discountValue: 10,
    minSpend: 2000,
    expiryDate: '2025-12-31',
    usageCount: 142,
    isActive: true
  },
  {
    id: 'coup-2',
    code: 'FAMILLY500',
    discountType: 'fixed',
    discountValue: 500,
    minSpend: 5000,
    expiryDate: '2025-10-31',
    usageCount: 89,
    isActive: true
  },
  {
    id: 'coup-3',
    code: 'EID20',
    discountType: 'percentage',
    discountValue: 20,
    minSpend: 8000,
    expiryDate: '2025-11-15',
    usageCount: 310,
    isActive: true
  }
];

export const CATEGORIES_DATA = [
  {
    name: 'Home Appliances' as const,
    slug: 'home-appliances',
    itemCount: 48,
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=400&q=80',
    description: 'Refrigerators, washing machines, microwaves & more'
  },
  {
    name: 'Clothing' as const,
    slug: 'clothing',
    itemCount: 86,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
    description: 'Casual wear, traditional, shirts, hoodies & dresses'
  },
  {
    name: 'Electronics' as const,
    slug: 'electronics',
    itemCount: 34,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=80',
    description: 'Smart 4K TVs, home audio, projectors & accessories'
  },
  {
    name: 'Kitchen & Dining' as const,
    slug: 'kitchen-dining',
    itemCount: 52,
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=400&q=80',
    description: 'High-speed blenders, non-stick cookware & cookers'
  },
  {
    name: 'Home & Living' as const,
    slug: 'home-living',
    itemCount: 29,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=400&q=80',
    description: 'Accent chairs, modern lamps, decor & storage'
  },
  {
    name: 'Beauty & Personal Care' as const,
    slug: 'beauty-personal-care',
    itemCount: 42,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
    description: 'Hydrating serums, natural skincare & grooming'
  }
];

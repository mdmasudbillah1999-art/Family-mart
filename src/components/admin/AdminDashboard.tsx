import React, { useState } from 'react';
import { 
  Home, 
  ShoppingCart, 
  Users, 
  Package, 
  ArrowUpRight, 
  ArrowRight, 
  Plus, 
  FolderPlus, 
  UserPlus, 
  Tag, 
  Settings, 
  Eye, 
  Star, 
  TrendingUp, 
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus } from '../../types';

interface AdminDashboardProps {
  onOpenAddProduct: () => void;
  onOpenAddCustomer: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  onOpenAddProduct, 
  onOpenAddCustomer 
}) => {
  const { 
    orders, 
    products, 
    customers, 
    reviews, 
    setAdminTab, 
    setView, 
    updateOrderStatus,
    adminStats 
  } = useStore();

  const [salesTimeframe, setSalesTimeframe] = useState<'7days' | '30days' | 'year'>('7days');
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<Order | null>(null);

  // Sales data points for chart
  const salesData7Days = [
    { label: 'Jul 23', value: 75, taka: '৳ 75,000' },
    { label: 'Jul 24', value: 85, taka: '৳ 85,000' },
    { label: 'Jul 25', value: 92, taka: '৳ 92,000' },
    { label: 'Jul 26', value: 88, taka: '৳ 88,000' },
    { label: 'Jul 27', value: 125, taka: '৳ 125,000' },
    { label: 'Jul 28', value: 145, taka: '৳ 145,000' },
    { label: 'Jul 29', value: 168, taka: '৳ 168,000' },
  ];

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Shipped':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Delivered':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  // Top selling products (top 5 matching screenshot)
  const topSellingProducts = [
    {
      id: 'prod-7',
      name: 'Samsung Refrigerator (236L)',
      price: 32500,
      soldCount: 124,
      image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'prod-5',
      name: "Men's Cotton T-Shirt",
      price: 550,
      soldCount: 98,
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'prod-3',
      name: 'Xiaomi 43" Smart TV',
      price: 29999,
      soldCount: 87,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'prod-8',
      name: 'Walton Washing Machine (7kg)',
      price: 28990,
      soldCount: 76,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'prod-6',
      name: "Women's Maxi Dress",
      price: 1250,
      soldCount: 62,
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=300&q=80'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Header Greeting & Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Left: Greeting */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-slate-800">
            <Home className="w-5 h-5 text-emerald-700" />
            <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight">
              Dashboard
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Welcome back, Admin! Here's what's happening with your store today.
          </p>
        </div>

        {/* Right: Quick Store Launch Banner matching screenshot */}
        <div className="bg-gradient-to-r from-[#064e3b] to-[#043324] text-white p-4 sm:p-5 rounded-2xl flex items-center justify-between gap-4 shadow-md border border-emerald-800/40 min-w-[320px]">
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold font-heading text-emerald-100">
              Familly Mart Admin Panel
            </h4>
            <p className="text-xs text-emerald-200/80 max-w-[200px]">
              Manage your store easily and grow your business!
            </p>
            <div className="pt-1.5">
              <button
                onClick={() => setView('store')}
                className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <span>Go to Store</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="w-20 h-20 rounded-xl overflow-hidden bg-emerald-950/40 p-1 shrink-0 border border-emerald-500/20">
            <img
              src="/src/assets/images/admin_promo_bag_1791539790623.jpg"
              alt="Familly Mart Store Bags"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

      </div>

      {/* 2. 4 Stat KPI Cards (Total Orders, Total Customers, Total Revenue, Total Products) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
            <ShoppingCart className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500">Total Orders</span>
            <div className="text-2xl font-black text-slate-900 font-heading tabular-nums mt-0.5">
              {adminStats.totalOrders.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>{adminStats.ordersGrowth} vs. last week</span>
            </div>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500">Total Customers</span>
            <div className="text-2xl font-black text-slate-900 font-heading tabular-nums mt-0.5">
              {adminStats.totalCustomers.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-blue-600 font-bold mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>{adminStats.customersGrowth} vs. last week</span>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
            <span className="text-2xl font-black font-heading">৳</span>
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500">Total Revenue</span>
            <div className="text-2xl font-black text-slate-900 font-heading tabular-nums mt-0.5">
              ৳ {adminStats.totalRevenue.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-rose-600 font-bold mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>{adminStats.revenueGrowth} vs. last week</span>
            </div>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
            <Package className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500">Total Products</span>
            <div className="text-2xl font-black text-slate-900 font-heading tabular-nums mt-0.5">
              {adminStats.totalProducts.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-purple-600 font-bold mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>{adminStats.productsGrowth} vs. last week</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Middle Section: Sales Overview Chart, Order Status Donut, Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sales Overview Chart (6 cols) */}
        <div className="lg:col-span-6 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-700" />
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 font-heading">
                Sales Overview
              </h3>
            </div>
            <select
              value={salesTimeframe}
              onChange={(e) => setSalesTimeframe(e.target.value as any)}
              className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="year">This Year</option>
            </select>
          </div>

          {/* SVG Sales Line Chart */}
          <div className="pt-2">
            <div className="relative h-56 w-full">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-slate-400 font-mono">
                <span>200K</span>
                <span>150K</span>
                <span>100K</span>
                <span>50K</span>
                <span>0</span>
              </div>

              {/* Grid Lines & Chart Area */}
              <div className="ml-10 h-48 relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0F766E" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#0F766E" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal gridlines */}
                  <line x1="0" y1="0" x2="500" y2="0" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="50" x2="500" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="150" x2="500" y2="150" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="200" x2="500" y2="200" stroke="#e2e8f0" strokeWidth="1" />

                  {/* Area fill */}
                  <polygon
                    points="0,125 83,115 166,108 250,112 333,75 416,55 500,32 500,200 0,200"
                    fill="url(#salesGrad)"
                  />

                  {/* Smooth curve line */}
                  <polyline
                    fill="none"
                    stroke="#0F766E"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="0,125 83,115 166,108 250,112 333,75 416,55 500,32"
                  />

                  {/* Data Points */}
                  {[
                    { x: 0, y: 125, val: '৳ 75K' },
                    { x: 83, y: 115, val: '৳ 85K' },
                    { x: 166, y: 108, val: '৳ 92K' },
                    { x: 250, y: 112, val: '৳ 88K' },
                    { x: 333, y: 75, val: '৳ 125K' },
                    { x: 416, y: 55, val: '৳ 145K' },
                    { x: 500, y: 32, val: '৳ 168K' },
                  ].map((pt, idx) => (
                    <g key={idx} className="group cursor-pointer">
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="5"
                        fill="#0F766E"
                        stroke="#ffffff"
                        strokeWidth="2.5"
                        className="transition-transform group-hover:scale-150"
                      />
                    </g>
                  ))}
                </svg>

                {/* X-axis labels */}
                <div className="flex justify-between text-[11px] text-slate-500 font-medium pt-2">
                  {salesData7Days.map((d) => (
                    <span key={d.label}>{d.label}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Status Donut Chart (3 cols) */}
        <div className="lg:col-span-3 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 font-heading">
              Order Status
            </h3>
          </div>

          {/* Donut Graphic */}
          <div className="relative flex items-center justify-center my-3">
            <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle cx="50" cy="50" r="38" stroke="#f1f5f9" strokeWidth="12" fill="none" />
              {/* Shipped (52%) - Green */}
              <circle 
                cx="50" cy="50" r="38" 
                stroke="#10B981" strokeWidth="12" fill="none"
                strokeDasharray="124 238" strokeDashoffset="0"
              />
              {/* Processing (21%) - Blue */}
              <circle 
                cx="50" cy="50" r="38" 
                stroke="#3B82F6" strokeWidth="12" fill="none"
                strokeDasharray="50 238" strokeDashoffset="-124"
              />
              {/* Delivered (15%) - Purple */}
              <circle 
                cx="50" cy="50" r="38" 
                stroke="#8B5CF6" strokeWidth="12" fill="none"
                strokeDasharray="36 238" strokeDashoffset="-174"
              />
              {/* Pending (11%) - Yellow */}
              <circle 
                cx="50" cy="50" r="38" 
                stroke="#F59E0B" strokeWidth="12" fill="none"
                strokeDasharray="28 238" strokeDashoffset="-210"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-lg font-black text-slate-900 font-heading tabular-nums">
                {adminStats.totalOrders.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Total Orders</span>
            </div>
          </div>

          {/* Legend matching screenshot */}
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span> Pending
              </span>
              <span className="font-semibold text-slate-800 tabular-nums">142 (11%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]"></span> Processing
              </span>
              <span className="font-semibold text-slate-800 tabular-nums">268 (21%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span> Shipped
              </span>
              <span className="font-semibold text-slate-800 tabular-nums">654 (52%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></span> Delivered
              </span>
              <span className="font-semibold text-slate-800 tabular-nums">184 (15%)</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel (3 cols) */}
        <div className="lg:col-span-3 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 font-heading">
              Quick Actions
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={onOpenAddProduct}
              className="p-3 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200/70 hover:border-emerald-300 flex flex-col items-center justify-center text-center transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <Plus className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-900">Add Product</span>
            </button>

            <button
              onClick={() => setAdminTab('categories')}
              className="p-3 bg-slate-50 hover:bg-teal-50 rounded-xl border border-slate-200/70 hover:border-teal-300 flex flex-col items-center justify-center text-center transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <FolderPlus className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-teal-900">Add Category</span>
            </button>

            <button
              onClick={() => setAdminTab('orders')}
              className="p-3 bg-slate-50 hover:bg-blue-50 rounded-xl border border-slate-200/70 hover:border-blue-300 flex flex-col items-center justify-center text-center transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-blue-900">View Orders</span>
            </button>

            <button
              onClick={onOpenAddCustomer}
              className="p-3 bg-slate-50 hover:bg-indigo-50 rounded-xl border border-slate-200/70 hover:border-indigo-300 flex flex-col items-center justify-center text-center transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <UserPlus className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-900">Add Customer</span>
            </button>

            <button
              onClick={() => setAdminTab('coupons')}
              className="p-3 bg-slate-50 hover:bg-amber-50 rounded-xl border border-slate-200/70 hover:border-amber-300 flex flex-col items-center justify-center text-center transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <Tag className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-amber-900">Manage Coupons</span>
            </button>

            <button
              onClick={() => setAdminTab('settings')}
              className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200/70 hover:border-slate-400 flex flex-col items-center justify-center text-center transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-800 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <Settings className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-slate-900">Site Settings</span>
            </button>
          </div>
        </div>

      </div>

      {/* 4. Lower Row: Recent Orders Table & Top Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Orders Table (8 cols) */}
        <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-emerald-700" />
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 font-heading">
                Recent Orders
              </h3>
            </div>
            <button
              onClick={() => setAdminTab('orders')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Orders Table matching screenshot */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Product(s)</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Payment</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-900">{order.id}</td>
                    <td className="py-3 px-3 font-semibold text-slate-800">{order.customerName}</td>
                    <td className="py-3 px-3 text-slate-600 max-w-[150px] truncate">{order.productsSummary}</td>
                    <td className="py-3 px-3 font-extrabold text-slate-900 tabular-nums">
                      ৳ {order.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-3">
                      <span className={order.paymentMethod === 'bKash' ? 'text-pink-600 font-semibold' : 'text-slate-600'}>
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500 whitespace-nowrap">{order.date}</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setSelectedOrderForModal(order)}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products List (4 cols) */}
        <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 font-heading flex items-center gap-2">
              <span className="text-amber-500">🔥</span>
              <span>Top Selling Products</span>
            </h3>
            <button
              onClick={() => setAdminTab('products')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {topSellingProducts.map((prod, idx) => (
              <div key={prod.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 object-contain rounded-lg bg-slate-100 p-1 border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-slate-800 truncate">{prod.name}</h5>
                    <p className="text-[11px] font-bold text-emerald-800 tabular-nums">
                      ৳ {prod.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 shrink-0 tabular-nums">
                  {prod.soldCount} sold
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 5. Bottom Row: 4 Metric Cards (Recent Customers, Sales Report, Recent Reviews, Website Visitors) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* Card 1: Recent Customers */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 font-heading flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-700" />
              <span>Recent Customers</span>
            </h4>
            <button onClick={() => setAdminTab('customers')} className="text-[11px] font-bold text-emerald-700 hover:underline">
              View All →
            </button>
          </div>
          <div className="space-y-2.5">
            {customers.slice(0, 4).map((c) => (
              <div key={c.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[11px] shrink-0">
                    {c.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 truncate">{c.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{c.email}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-semibold text-slate-600 block">{c.ordersCount} orders</span>
                  <span className="text-[9px] text-slate-400">{c.lastOrderTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Sales Report */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 font-heading flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-700" />
              <span>Sales Report</span>
            </h4>
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">This Month</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center py-1 border-y border-slate-100">
            <div>
              <span className="text-[10px] text-slate-400">Total Sales</span>
              <p className="text-xs font-extrabold text-slate-900 tabular-nums">৳ 856K</p>
              <span className="text-[9px] text-emerald-600 font-bold">↑ 24%</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400">Total Orders</span>
              <p className="text-xs font-extrabold text-slate-900 tabular-nums">1,248</p>
              <span className="text-[9px] text-emerald-600 font-bold">↑ 12%</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400">Avg. Value</span>
              <p className="text-xs font-extrabold text-slate-900 tabular-nums">৳ 686</p>
              <span className="text-[9px] text-emerald-600 font-bold">↑ 15%</span>
            </div>
          </div>
          {/* Mini spark bar chart */}
          <div className="flex items-end justify-between h-12 pt-2 gap-1 px-1">
            {[40, 55, 35, 70, 85, 60, 95, 80, 50, 75, 90, 100].map((h, i) => (
              <div 
                key={i} 
                className="w-full bg-emerald-600 hover:bg-emerald-500 rounded-t-xs transition-colors cursor-pointer"
                style={{ height: `${h}%` }}
                title={`Period ${i+1}: ${h}% volume`}
              />
            ))}
          </div>
        </div>

        {/* Card 3: Recent Reviews */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 font-heading flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Recent Reviews</span>
            </h4>
            <button onClick={() => setAdminTab('reviews')} className="text-[11px] font-bold text-emerald-700 hover:underline">
              View All →
            </button>
          </div>
          <div className="space-y-2">
            {reviews.slice(0, 4).map((r) => (
              <div key={r.id} className="text-xs border-b border-slate-50 pb-1.5 last:border-b-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">{r.customerName}</span>
                  <div className="flex text-amber-400 text-[10px]">
                    {'★'.repeat(r.rating)}
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 italic truncate mt-0.5">"{r.comment}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Card 4: Website Visitors */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 font-heading flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-emerald-700" />
              <span>Website Visitors</span>
            </h4>
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Today</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 font-heading tabular-nums">2,846</span>
            <span className="text-xs font-bold text-emerald-600">↑ 32% vs. yesterday</span>
          </div>
          {/* Top Pages List */}
          <div className="space-y-1.5 text-[11px] pt-1 border-t border-slate-100">
            <div className="flex justify-between text-slate-600">
              <span className="truncate max-w-[140px]">/</span>
              <span className="font-semibold tabular-nums">1,245 (44%)</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span className="truncate max-w-[140px]">/category/home-appliances</span>
              <span className="font-semibold tabular-nums">642 (23%)</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span className="truncate max-w-[140px]">/category/clothing</span>
              <span className="font-semibold tabular-nums">521 (18%)</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span className="truncate max-w-[140px]">/product/samsung-refrigerator</span>
              <span className="font-semibold tabular-nums">438 (15%)</span>
            </div>
          </div>
        </div>

      </div>

      {/* Order Status & Detail Modal for Admin */}
      {selectedOrderForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 font-heading">
                  Order Details: {selectedOrderForModal.id}
                </h3>
                <span className="text-xs text-slate-500">Placed on {selectedOrderForModal.date}</span>
              </div>
              <button 
                onClick={() => setSelectedOrderForModal(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl">
                <div>
                  <span className="text-slate-400">Customer:</span>
                  <p className="font-bold text-slate-800">{selectedOrderForModal.customerName}</p>
                  <p className="text-slate-500">{selectedOrderForModal.customerPhone}</p>
                </div>
                <div>
                  <span className="text-slate-400">Address:</span>
                  <p className="font-semibold text-slate-800">{selectedOrderForModal.shippingAddress}, {selectedOrderForModal.city}</p>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-900">Items:</span>
                <p className="text-slate-700 mt-0.5">{selectedOrderForModal.productsSummary}</p>
              </div>

              <div className="flex justify-between py-2 border-y border-slate-100">
                <span>Total Amount:</span>
                <span className="font-black text-emerald-800 font-heading text-sm">৳ {selectedOrderForModal.amount.toLocaleString()}</span>
              </div>

              {/* Status Updater */}
              <div className="space-y-2">
                <label className="font-bold text-slate-900 block">Update Order Status:</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Pending', 'Processing', 'Shipped', 'Delivered'] as OrderStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        updateOrderStatus(selectedOrderForModal.id, st);
                        setSelectedOrderForModal({ ...selectedOrderForModal, status: st });
                      }}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        selectedOrderForModal.status === st
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedOrderForModal(null)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

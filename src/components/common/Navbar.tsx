import React, { useState } from 'react';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingCart, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones, 
  LayoutDashboard
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BrandLogo } from './BrandLogo';
import { CATEGORIES_DATA } from '../../data/mockData';
import { ProductCategory } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    setView, 
    cartItemsCount, 
    setIsCartOpen, 
    wishlist, 
    setIsWishlistOpen,
    selectedCategory, 
    setSelectedCategory,
    searchQuery, 
    setSearchQuery,
    setIsAuthModalOpen
  } = useStore();

  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const catalogElem = document.getElementById('product-catalog');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const selectCat = (category: ProductCategory | 'All') => {
    setSelectedCategory(category);
    setIsCategoryMenuOpen(false);
    setIsMobileMenuOpen(false);
    const catalogElem = document.getElementById('product-catalog');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-xs">
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#0B4832] text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Free Shipping */}
          <div className="flex items-center gap-1.5 font-medium">
            <Truck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Free Shipping on Orders Over ৳5,000</span>
          </div>

          {/* Middle: Trust Badges */}
          <div className="hidden md:flex items-center gap-6 text-[11px] text-emerald-200">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> Best Quality
            </span>
            <span className="text-emerald-500">|</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> Secure Payment
            </span>
            <span className="text-emerald-500">|</span>
            <span className="flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5 text-emerald-300" /> Easy Return
            </span>
          </div>

          {/* Right: Support & Direct Admin Switcher */}
          <div className="flex items-center gap-4 text-[11px]">
            <a 
              href="#support" 
              onClick={(e) => { e.preventDefault(); alert("Familly Mart 24/7 Helpline: 09612-FAMILLY (3264559)\nEmail: support@famillymart.com"); }}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Headphones className="w-3.5 h-3.5 text-emerald-300" />
              <span>Help & Support</span>
            </a>

            {/* Quick Switch to Admin Panel */}
            <button
              onClick={() => setView('admin')}
              className="flex items-center gap-1.5 bg-emerald-600/60 hover:bg-emerald-500 text-white px-2.5 py-0.5 rounded font-medium transition-all cursor-pointer border border-emerald-400/30"
              title="Open Merchant Admin Dashboard"
            >
              <LayoutDashboard className="w-3 h-3 text-emerald-200" />
              <span>Admin Panel</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Brand & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3.5">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          {/* Logo */}
          <BrandLogo size="md" onClick={() => selectCat('All')} />

          {/* Search Bar */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="flex-1 max-w-2xl hidden md:flex items-center relative"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, brands and more..."
              className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-800 text-sm pl-4 pr-12 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3 bg-[#0F766E] hover:bg-[#0D5C3A] text-white rounded-md flex items-center justify-center transition-colors cursor-pointer"
              title="Search products"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Login / Register */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 text-slate-700 hover:text-emerald-700 text-sm font-medium px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <User className="w-5 h-5 text-slate-600" />
              <span className="hidden sm:inline">Login / Register</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative flex items-center gap-1.5 text-slate-700 hover:text-emerald-700 text-sm font-medium px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5 text-slate-600" />
              <span className="hidden sm:inline">Wishlist</span>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 right-0 sm:top-0 sm:right-auto sm:-left-1.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 text-sm font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer border border-emerald-200"
              title="View Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-emerald-700" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#0F766E] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span className="font-heading tracking-tight font-bold">Cart</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <form onSubmit={handleSearchSubmit} className="mt-3 md:hidden flex items-center relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products, brands and more..."
            className="w-full bg-slate-50 text-slate-800 text-sm pl-4 pr-12 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
          />
          <button
            type="submit"
            className="absolute right-1 top-1 bottom-1 px-3 bg-[#0F766E] text-white rounded-md flex items-center justify-center"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* 3. Navigation Bar (All Categories + Category Links) */}
      <nav className="border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-6">
            {/* "All Categories" Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-2 bg-[#0B4832] hover:bg-[#083625] text-white text-sm font-semibold px-4 py-2.5 rounded-t-lg transition-colors cursor-pointer"
              >
                <Menu className="w-4 h-4" />
                <span>All Categories</span>
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Categories Dropdown Menu */}
              {isCategoryMenuOpen && (
                <div 
                  className="absolute left-0 top-full w-64 bg-white border border-slate-200 shadow-xl rounded-b-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setIsCategoryMenuOpen(false)}
                >
                  <button
                    onClick={() => selectCat('All')}
                    className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-emerald-50 hover:text-emerald-700 transition-colors flex items-center justify-between ${
                      selectedCategory === 'All' ? 'text-emerald-700 bg-emerald-50/70 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <span>All Products</span>
                    <span className="text-[10px] text-slate-400">View All</span>
                  </button>
                  <div className="h-px bg-slate-100 my-1" />
                  {CATEGORIES_DATA.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => selectCat(cat.name)}
                      className={`w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-emerald-50 hover:text-emerald-700 transition-colors flex items-center justify-between ${
                        selectedCategory === cat.name ? 'text-emerald-700 bg-emerald-50/70 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-slate-400">({cat.itemCount})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Horizontal Nav Links */}
            <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
              <button
                onClick={() => selectCat('All')}
                className={`py-2.5 transition-colors cursor-pointer relative ${
                  selectedCategory === 'All'
                    ? 'text-[#0F766E] font-semibold border-b-2 border-[#0F766E]'
                    : 'hover:text-[#0F766E]'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => selectCat('Home Appliances')}
                className={`py-2.5 transition-colors cursor-pointer relative ${
                  selectedCategory === 'Home Appliances'
                    ? 'text-[#0F766E] font-semibold border-b-2 border-[#0F766E]'
                    : 'hover:text-[#0F766E]'
                }`}
              >
                Home Appliances
              </button>
              <button
                onClick={() => selectCat('Clothing')}
                className={`py-2.5 transition-colors cursor-pointer relative ${
                  selectedCategory === 'Clothing'
                    ? 'text-[#0F766E] font-semibold border-b-2 border-[#0F766E]'
                    : 'hover:text-[#0F766E]'
                }`}
              >
                Clothing
              </button>
              <button
                onClick={() => selectCat('Electronics')}
                className={`py-2.5 transition-colors cursor-pointer relative ${
                  selectedCategory === 'Electronics'
                    ? 'text-[#0F766E] font-semibold border-b-2 border-[#0F766E]'
                    : 'hover:text-[#0F766E]'
                }`}
              >
                Electronics
              </button>
              <a
                href="#deals"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory('All');
                  const elem = document.getElementById('promo-banners');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-2.5 hover:text-[#0F766E] transition-colors cursor-pointer"
              >
                Deals
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  const elem = document.getElementById('about-story');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-2.5 hover:text-[#0F766E] transition-colors cursor-pointer"
              >
                About Us
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const elem = document.getElementById('footer-contact');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-2.5 hover:text-[#0F766E] transition-colors cursor-pointer"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Quick link to Admin Panel */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setView('admin')}
              className="text-xs font-semibold text-slate-600 hover:text-emerald-700 flex items-center gap-1.5 py-1 px-2.5 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <span>Merchant Admin</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded font-bold">
                Dashboard
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-3 animate-in fade-in duration-150">
          <div className="font-semibold text-xs text-slate-400 uppercase tracking-wider">
            Categories
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => selectCat('All')}
              className="text-left text-xs p-2 rounded bg-slate-50 hover:bg-emerald-50 text-slate-800 font-medium"
            >
              All Products
            </button>
            {CATEGORIES_DATA.map((cat) => (
              <button
                key={cat.name}
                onClick={() => selectCat(cat.name)}
                className="text-left text-xs p-2 rounded bg-slate-50 hover:bg-emerald-50 text-slate-800 font-medium truncate"
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                setView('admin');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-center bg-emerald-700 text-white py-2 text-xs font-semibold rounded-lg"
            >
              Open Admin Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

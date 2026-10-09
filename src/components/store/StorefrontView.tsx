import React from 'react';
import { Navbar } from '../common/Navbar';
import { HeroBanner } from './HeroBanner';
import { CategoryGrid } from './CategoryGrid';
import { PromoBanners } from './PromoBanners';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';
import { CartDrawer } from './CartDrawer';
import { WishlistDrawer } from './WishlistDrawer';
import { CheckoutModal } from './CheckoutModal';
import { AuthModal } from './AuthModal';
import { Footer } from '../common/Footer';
import { useStore } from '../../context/StoreContext';
import { Filter, Sparkles, X } from 'lucide-react';

export const StorefrontView: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery 
  } = useStore();

  // Filter products based on selectedCategory and searchQuery
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesQuery = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* 1. Top Navbar */}
      <Navbar />

      {/* 2. Hero Carousel & Showcase */}
      <HeroBanner />

      {/* 3. Shop by Category Grid */}
      <CategoryGrid />

      {/* 4. Dual Promo Banners (Home Appliances & Clothing) */}
      <PromoBanners />

      {/* 5. Popular Products Section */}
      <section id="product-catalog" className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-700" />
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
                  Popular Products
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Handpicked top trending appliances, apparel, and gadgets for your family
              </p>
            </div>

            {/* Category Filter Pills (Functional Buttons) */}
            <div className="flex items-center flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl">
              {(['All', 'Home Appliances', 'Clothing', 'Electronics', 'Kitchen & Dining'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-white text-emerald-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filter or Search Notice */}
          {(selectedCategory !== 'All' || searchQuery) && (
            <div className="mb-6 flex items-center justify-between bg-emerald-50 border border-emerald-200/80 rounded-xl px-4 py-2.5 text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-emerald-700" />
                <span>
                  Showing results for {selectedCategory !== 'All' ? <strong>"{selectedCategory}"</strong> : ''}
                  {searchQuery ? ` matching "${searchQuery}"` : ''} ({filteredProducts.length} items found)
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="flex items-center gap-1 font-bold text-emerald-800 hover:underline cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-base font-bold text-slate-700">No products match your criteria</p>
              <p className="text-xs text-slate-500 mt-1">Try clearing filters or search terms.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 bg-[#0B4832] text-white text-xs font-bold px-4 py-2 rounded-lg"
              >
                Show All Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 6. Footer & Trust Features */}
      <Footer />

      {/* Modals & Slide-over Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <AuthModal />
    </div>
  );
};

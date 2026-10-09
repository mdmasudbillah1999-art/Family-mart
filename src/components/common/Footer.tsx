import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useStore } from '../../context/StoreContext';
import { ProductCategory } from '../../types';

export const Footer: React.FC = () => {
  const { setView, setSelectedCategory, showToast } = useStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Subscribed to Familly Mart newsletter!');
  };

  const handleCatClick = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    const catalog = document.getElementById('product-catalog');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#FAF9F6] border-t border-slate-200">
      
      {/* 1. Value Pillars Trust Bar (Matching Homepage screenshot bottom) */}
      <div className="bg-white border-b border-slate-200 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            
            {/* Free Shipping */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0F766E] flex items-center justify-center shrink-0 border border-emerald-100">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 font-heading">Free Shipping</h4>
                <p className="text-xs text-slate-500 mt-0.5">On orders over ৳5,000</p>
              </div>
            </div>

            {/* Secure Payment */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0F766E] flex items-center justify-center shrink-0 border border-emerald-100">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 font-heading">Secure Payment</h4>
                <p className="text-xs text-slate-500 mt-0.5">100% secure and trusted</p>
              </div>
            </div>

            {/* Easy Return */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0F766E] flex items-center justify-center shrink-0 border border-emerald-100">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 font-heading">Easy Return</h4>
                <p className="text-xs text-slate-500 mt-0.5">7 days return policy</p>
              </div>
            </div>

            {/* 24/7 Support */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0F766E] flex items-center justify-center shrink-0 border border-emerald-100">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 font-heading">24/7 Support</h4>
                <p className="text-xs text-slate-500 mt-0.5">We're here to help</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Main Footer Directory */}
      <div id="footer-contact" className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand Info & Story */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" />
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm leading-relaxed">
              Familly Mart is Bangladesh's trusted e-commerce hub for genuine home appliances, quality fashion, and lifestyle gadgets with nationwide delivery and official warranty.
            </p>
            <div className="space-y-2 text-xs text-slate-600 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Level 4, Smart Tower, Gulshan-2, Dhaka-1212</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>+880 9612-FAMILLY (3264559) / 01700-112233</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>support@famillymart.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: Top Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-heading">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button 
                  onClick={() => handleCatClick('Home Appliances')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Home Appliances
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCatClick('Clothing')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Clothing & Apparel
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCatClick('Electronics')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Smart TVs & Audio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCatClick('Kitchen & Dining')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Kitchen & Dining
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCatClick('Home & Living')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Home & Living Decor
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-heading">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><a href="#help" onClick={(e) => { e.preventDefault(); alert("Help Center is available 24/7 via hotline 09612-FAMILLY"); }} className="hover:text-emerald-700 transition-colors">Help Center & FAQ</a></li>
              <li><a href="#track" onClick={(e) => { e.preventDefault(); setView('admin'); }} className="hover:text-emerald-700 transition-colors">Track Your Order</a></li>
              <li><a href="#return" onClick={(e) => { e.preventDefault(); alert("Hassle-free 7-day return policy for any damaged or mismatched products."); }} className="hover:text-emerald-700 transition-colors">Return & Refund Policy</a></li>
              <li><a href="#shipping" onClick={(e) => { e.preventDefault(); alert("Free delivery on orders over ৳5,000 inside and outside Dhaka."); }} className="hover:text-emerald-700 transition-colors">Shipping & Delivery Info</a></li>
              <li>
                <button 
                  onClick={() => setView('admin')}
                  className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Merchant Admin Portal</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-heading">
              Stay Updated
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Subscribe to get special discounts, new arrivals, and promo codes.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
              />
              <button
                type="submit"
                className="w-full bg-[#0B4832] hover:bg-[#073624] text-white text-xs font-bold py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Subscribe Now
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* 3. Bottom Legal & Payment Bar */}
      <div className="border-t border-slate-200/80 bg-[#F4F2EC] py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2025 Familly Mart. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-slate-800">Privacy Policy</a>
            <span>·</span>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-slate-800">Terms & Conditions</a>
            <span>·</span>
            <button onClick={() => setView('admin')} className="text-emerald-700 font-bold hover:underline">
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

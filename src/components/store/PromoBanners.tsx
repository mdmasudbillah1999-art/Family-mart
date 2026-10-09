import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const PromoBanners: React.FC = () => {
  const { setSelectedCategory } = useStore();

  const handleShopCategory = (cat: 'Home Appliances' | 'Clothing') => {
    setSelectedCategory(cat);
    const catalog = document.getElementById('product-catalog');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="promo-banners" className="py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Banner 1: Top Rated Home Appliances */}
          <div className="relative rounded-2xl overflow-hidden bg-[#D3E5D7] border border-emerald-900/10 p-6 sm:p-8 flex flex-col justify-between min-h-[220px] sm:min-h-[260px] shadow-sm hover:shadow-md transition-shadow">
            <div className="z-10 max-w-[55%] sm:max-w-[50%] space-y-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading leading-tight">
                Top Rated <br />Home Appliances
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                Keep your home running smoothly
              </p>
              <div className="pt-3">
                <button
                  onClick={() => handleShopCategory('Home Appliances')}
                  className="inline-flex items-center gap-2 bg-[#0B4832] hover:bg-[#073624] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Visual Photo Thumbnail */}
            <div className="absolute right-0 bottom-0 top-0 w-[50%] overflow-hidden flex items-center justify-end">
              <img
                src="/src/assets/images/appliances_promo_banner_1791539768683.jpg"
                alt="Top Rated Home Appliances"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-left mask-radial"
              />
            </div>
          </div>

          {/* Banner 2: Trendy & Comfortable Clothing */}
          <div className="relative rounded-2xl overflow-hidden bg-[#F8E2CE] border border-amber-900/10 p-6 sm:p-8 flex flex-col justify-between min-h-[220px] sm:min-h-[260px] shadow-sm hover:shadow-md transition-shadow">
            <div className="z-10 max-w-[55%] sm:max-w-[50%] space-y-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading leading-tight">
                Trendy & Comfortable <br />Clothing
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                Style for every moment
              </p>
              <div className="pt-3">
                <button
                  onClick={() => handleShopCategory('Clothing')}
                  className="inline-flex items-center gap-2 bg-[#8C3D2B] hover:bg-[#722F20] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Hand-written sticker look: Fashion for Everyone */}
            <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-xs text-amber-950 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-tight shadow-sm border border-amber-200 rotate-6">
              Fashion for Everyone ✦
            </div>

            {/* Visual Photo Thumbnail */}
            <div className="absolute right-0 bottom-0 top-0 w-[50%] overflow-hidden flex items-center justify-end">
              <img
                src="/src/assets/images/clothing_promo_banner_1791539780936.jpg"
                alt="Trendy Clothing Collection"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-left"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

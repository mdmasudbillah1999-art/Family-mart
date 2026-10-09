import React from 'react';
import { ArrowRight, ShieldCheck, Tag, Truck } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const scrollToCatalog = () => {
    const el = document.getElementById('product-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f8f6f2] via-[#faf8f5] to-[#ece8e1] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-5 space-y-6 z-10">
            <div className="space-y-2">
              <span className="text-emerald-800 text-sm md:text-base font-semibold tracking-wide block">
                Welcome to
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none font-heading">
                Familly <span className="text-[#0F766E]">Mart</span>
              </h1>
              <p className="text-base sm:text-lg font-semibold text-slate-800 tracking-tight">
                Home Appliances <span className="text-emerald-700 font-bold mx-1">|</span> Clothing <span className="text-emerald-700 font-bold mx-1">|</span> More
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 max-w-md leading-relaxed">
              Everything you need for a better lifestyle, all in one place! Guaranteed authenticity, top warranty, and nationwide delivery.
            </p>

            {/* Shop Now CTA Button */}
            <div>
              <button
                onClick={scrollToCatalog}
                className="group inline-flex items-center gap-3 bg-[#0B4832] hover:bg-[#073624] text-white text-base font-bold px-7 py-3.5 rounded-full shadow-lg shadow-emerald-950/15 hover:shadow-xl transition-all duration-200 cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
              </button>
            </div>

            {/* Value Pillars */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-700">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Best Quality</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-emerald-700" />
                <span>Great Prices</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-700" />
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-300/40 bg-white">
              <img
                src="/src/assets/images/hero_familly_mart_banner_1791539756758.jpg"
                alt="Familly Mart Home Appliances and Clothing Lifestyle"
                referrerPolicy="no-referrer"
                className="w-full h-[280px] sm:h-[380px] lg:h-[420px] object-cover object-center transform transition-transform duration-700 hover:scale-[1.02]"
              />

              {/* "Better Home Happier You" Badge */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-[#0B4832]/95 backdrop-blur-xs text-white p-3 sm:p-4 rounded-full w-20 h-20 sm:w-26 sm:h-26 flex flex-col items-center justify-center text-center shadow-lg border border-emerald-400/40 rotate-6 transform hover:rotate-0 transition-transform">
                <span className="text-[10px] sm:text-xs font-serif italic text-emerald-200 leading-tight">Better</span>
                <span className="text-[11px] sm:text-sm font-bold uppercase tracking-wider leading-tight">Home</span>
                <span className="text-[9px] sm:text-[10px] font-medium text-emerald-100 leading-tight mt-0.5">Happier You</span>
              </div>
            </div>

            {/* Carousel Dots */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="w-3 h-3 rounded-full bg-emerald-700 ring-2 ring-emerald-200"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-stone-300 hover:bg-emerald-500 cursor-pointer transition-colors"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-stone-300 hover:bg-emerald-500 cursor-pointer transition-colors"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-stone-300 hover:bg-emerald-500 cursor-pointer transition-colors"></span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

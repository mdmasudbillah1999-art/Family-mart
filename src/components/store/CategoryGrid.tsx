import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES_DATA } from '../../data/mockData';
import { ProductCategory } from '../../types';

export const CategoryGrid: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useStore();

  const handleSelect = (categoryName: ProductCategory) => {
    setSelectedCategory(categoryName);
    const catalog = document.getElementById('product-catalog');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading tracking-tight inline-block relative pb-2">
            Shop by Category
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#0F766E] rounded-full"></span>
          </h2>
        </div>

        {/* Categories Grid (6 columns on lg, 3 on md, 2 on sm) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {CATEGORIES_DATA.map((cat) => {
            const isSelected = selectedCategory === cat.name;

            return (
              <div
                key={cat.name}
                onClick={() => handleSelect(cat.name)}
                className={`group cursor-pointer rounded-2xl p-3 sm:p-4 text-center transition-all duration-300 flex flex-col items-center justify-between border ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-100 bg-[#FBFBFA] hover:bg-white hover:border-slate-200 hover:shadow-lg'
                }`}
              >
                {/* Category Thumbnail Container */}
                <div className="relative w-full aspect-square max-w-[150px] mx-auto rounded-xl overflow-hidden bg-white p-2 mb-3 flex items-center justify-center border border-slate-100/80 shadow-xs">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Name & Chevron */}
                <div className="w-full flex items-center justify-center gap-1 mt-auto">
                  <span className={`text-xs sm:text-sm font-bold tracking-tight text-center ${
                    isSelected ? 'text-emerald-800' : 'text-slate-800 group-hover:text-emerald-700'
                  }`}>
                    {cat.name}
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                    isSelected ? 'text-emerald-700 translate-x-0.5' : 'text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5'
                  }`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

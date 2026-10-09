import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setActiveProductModal, wishlist, toggleWishlist } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Top Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          isWishlisted
            ? 'bg-rose-50 text-rose-500 shadow-sm'
            : 'bg-white/80 text-slate-400 hover:text-rose-500 hover:bg-white shadow-xs'
        }`}
        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
      </button>

      {/* Product Image Area */}
      <div 
        onClick={() => setActiveProductModal(product)}
        className="w-full aspect-square max-h-[220px] bg-[#FAF9F7] p-4 flex items-center justify-center cursor-pointer overflow-hidden relative"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-300"
        />

        {/* Brand Tag if available */}
        <span className="absolute bottom-2 left-2 text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-white/70 px-1.5 py-0.5 rounded">
          {product.brand}
        </span>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div 
          onClick={() => setActiveProductModal(product)}
          className="cursor-pointer space-y-1"
        >
          {/* Title */}
          <h4 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h4>

          {/* Price */}
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-base sm:text-lg font-extrabold text-slate-900 font-heading tabular-nums">
              ৳ {product.price.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through tabular-nums">
                ৳ {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-1.5 pt-0.5">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : i < product.rating
                      ? 'fill-amber-300 text-amber-400'
                      : 'text-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-500">
              ({product.rating})
            </span>
          </div>
        </div>

        {/* Add to Cart CTA Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product, 1);
          }}
          className="w-full mt-2 bg-[#0B4832] hover:bg-[#073624] text-white text-xs sm:text-sm font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>

    </div>
  );
};

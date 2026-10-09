import React, { useState } from 'react';
import { X, Star, ShoppingCart, Heart, Shield, RotateCcw, Truck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ProductDetailModal: React.FC = () => {
  const { activeProductModal, setActiveProductModal, addToCart, wishlist, toggleWishlist } = useStore();
  const [qty, setQty] = useState(1);

  if (!activeProductModal) return null;

  const isWishlisted = wishlist.includes(activeProductModal.id);

  const handleAddToCart = () => {
    addToCart(activeProductModal, qty);
    setActiveProductModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveProductModal(null)}
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-700 bg-white/80 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Image */}
        <div className="md:w-1/2 bg-[#FAF9F7] p-8 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-slate-100">
          <img
            src={activeProductModal.imageUrl}
            alt={activeProductModal.name}
            referrerPolicy="no-referrer"
            className="max-h-[300px] w-auto object-contain mix-blend-multiply"
          />
          <button
            onClick={() => toggleWishlist(activeProductModal.id)}
            className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-sm text-slate-400 hover:text-rose-500 transition-colors"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Right Side: Details & Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                {activeProductModal.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading mt-2">
                {activeProductModal.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Brand: <span className="font-semibold text-slate-700">{activeProductModal.brand}</span></p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(activeProductModal.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-600">
                {activeProductModal.rating} ({activeProductModal.reviewsCount} customer reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 py-1">
              <span className="text-2xl font-black text-slate-900 font-heading tabular-nums">
                ৳ {activeProductModal.price.toLocaleString()}
              </span>
              {activeProductModal.originalPrice && (
                <span className="text-sm text-slate-400 line-through tabular-nums">
                  ৳ {activeProductModal.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                In Stock ({activeProductModal.stock} units)
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeProductModal.description}
            </p>

            {/* Key Features */}
            {activeProductModal.features && (
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">Key Features:</span>
                <ul className="text-xs text-slate-600 space-y-1">
                  {activeProductModal.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Guarantee badges */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-[11px] text-slate-600">
              <div className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>100% Original</span>
              </div>
              <div className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>7 Days Return</span>
              </div>
              <div className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Fast Shipping</span>
              </div>
            </div>
          </div>

          {/* Quantity and Add to Cart action */}
          <div className="pt-4 flex items-center gap-3">
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-3 py-2 text-slate-600 hover:bg-slate-200 transition-colors font-bold text-sm"
              >
                -
              </button>
              <span className="px-3 py-2 text-sm font-bold text-slate-800 min-w-[36px] text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-2 text-slate-600 hover:bg-slate-200 transition-colors font-bold text-sm"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#0B4832] hover:bg-[#073624] text-white text-sm font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart (৳ {(activeProductModal.price * qty).toLocaleString()})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

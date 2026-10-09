import React from 'react';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const WishlistDrawer: React.FC = () => {
  const { 
    isWishlistOpen, 
    setIsWishlistOpen, 
    wishlist, 
    toggleWishlist, 
    products, 
    addToCart 
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 font-heading">
                Your Saved Wishlist
              </h3>
              <span className="text-xs bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">
                {wishlistedProducts.length}
              </span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-400">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-800">Your wishlist is empty</h4>
                <p className="text-xs text-slate-500 max-w-xs">
                  Save items you love by clicking the heart icon on any product card.
                </p>
              </div>
            ) : (
              wishlistedProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-all"
                >
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-contain rounded-lg bg-white p-1 border border-slate-200/60"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 truncate">{prod.name}</h5>
                    <p className="text-xs text-emerald-800 font-black mt-0.5 tabular-nums">
                      ৳ {prod.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          addToCart(prod, 1);
                          toggleWishlist(prod.id);
                        }}
                        className="bg-[#0B4832] hover:bg-[#073624] text-white text-[11px] font-bold px-3 py-1 rounded-md flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span>Move to Cart</span>
                      </button>
                      <button
                        onClick={() => toggleWishlist(prod.id)}
                        className="p-1 text-slate-400 hover:text-rose-500 rounded"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

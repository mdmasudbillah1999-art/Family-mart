import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateCartQty, 
    removeFromCart, 
    clearCart,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    setAppliedCoupon,
    setIsCheckoutOpen
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon
    ? appliedCoupon.discountType === 'percentage'
      ? Math.round((subtotal * appliedCoupon.discountValue) / 100)
      : appliedCoupon.discountValue
    : 0;
  const isFreeDelivery = subtotal >= 5000;
  const shippingFee = subtotal === 0 ? 0 : isFreeDelivery ? 0 : 80;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res.message);
    if (res.valid) {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-800" />
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 font-heading">
                Your Shopping Cart
              </h3>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-800">Your cart is empty</h4>
                <p className="text-xs text-slate-500 max-w-xs">
                  Looks like you haven't added anything to your cart yet. Explore our top home appliances and clothing!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 bg-[#0B4832] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#073624]"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">Selected Items</span>
                  <button
                    onClick={clearCart}
                    className="text-xs text-rose-600 hover:text-rose-700 font-semibold"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-3">
                  {cart.map(({ product, quantity }) => (
                    <div 
                      key={product.id}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 transition-all hover:border-slate-200"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-contain rounded-lg bg-white p-1 border border-slate-200/60"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-slate-900 truncate">
                          {product.name}
                        </h5>
                        <p className="text-xs text-emerald-800 font-black mt-0.5 tabular-nums">
                          ৳ {product.price.toLocaleString()}
                        </p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-slate-200 rounded-md bg-white">
                            <button
                              onClick={() => updateCartQty(product.id, quantity - 1)}
                              className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100"
                            >
                              -
                            </button>
                            <span className="px-2 py-0.5 text-xs font-bold text-slate-800 min-w-[24px] text-center">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateCartQty(product.id, quantity + 1)}
                              className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="p-1 text-slate-400 hover:text-rose-500 rounded"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Free Shipping Meter */}
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-emerald-900">
                    <span>{isFreeDelivery ? '🎉 You unlocked Free Delivery!' : `Add ৳${(5000 - subtotal).toLocaleString()} more for Free Delivery`}</span>
                    <span>{isFreeDelivery ? '100%' : `${Math.min(100, Math.round((subtotal / 5000) * 100))}%`}</span>
                  </div>
                  <div className="w-full bg-emerald-200 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / 5000) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Coupon Code Section */}
                <div className="pt-2">
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Coupon (e.g. SMART10)"
                        className="w-full text-xs uppercase px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                      />
                      <Tag className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
                    </div>
                    <button
                      type="submit"
                      className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-lg cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                  {couponFeedback && (
                    <p className="text-[11px] text-emerald-700 font-medium mt-1">
                      {couponFeedback}
                    </p>
                  )}
                  {appliedCoupon && (
                    <div className="mt-1.5 flex items-center justify-between text-xs bg-emerald-100/60 text-emerald-800 px-2.5 py-1 rounded-md">
                      <span>Applied: <strong>{appliedCoupon.code}</strong> (-৳{discountAmount.toLocaleString()})</span>
                      <button 
                        onClick={() => { setAppliedCoupon(null); setCouponFeedback(null); }}
                        className="text-rose-600 text-[10px] font-bold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800 tabular-nums">৳ {subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-semibold tabular-nums">- ৳ {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-slate-800 tabular-nums">
                    {shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `৳ ${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="font-heading text-emerald-900 tabular-nums">৳ {finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-[#0B4832] hover:bg-[#073624] text-white text-sm font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/10 hover:shadow-xl transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Secure Checkout with Familly Mart Guarantee</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

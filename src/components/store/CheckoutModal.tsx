import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Banknote, Smartphone, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Order, PaymentMethod } from '../../types';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    appliedCoupon, 
    placeOrder,
    setView,
    setAdminTab
  } = useStore();

  const [customerName, setCustomerName] = useState('Tanvir Rahman');
  const [customerEmail, setCustomerEmail] = useState('tanvir.rahman@gmail.com');
  const [customerPhone, setCustomerPhone] = useState('+880 1712-889900');
  const [shippingAddress, setShippingAddress] = useState('Flat 4A, Road 27, Gulshan-1');
  const [city, setCity] = useState('Dhaka');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash on Delivery');

  // Confirmation state
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon
    ? appliedCoupon.discountType === 'percentage'
      ? Math.round((subtotal * appliedCoupon.discountValue) / 100)
      : appliedCoupon.discountValue
    : 0;
  const isFreeDelivery = subtotal >= 5000;
  const shippingFee = isFreeDelivery ? 0 : 80;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !shippingAddress) {
      alert('Please fill out all required shipping fields');
      return;
    }
    const order = placeOrder({
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      city,
      paymentMethod,
      appliedCoupon: appliedCoupon?.code
    });
    setPlacedOrder(order);
  };

  const handleClose = () => {
    setPlacedOrder(null);
    setIsCheckoutOpen(false);
  };

  const handleGoToAdminOrders = () => {
    handleClose();
    setView('admin');
    setAdminTab('orders');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0B4832] text-white p-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold font-heading">
              {placedOrder ? 'Order Confirmed!' : 'Checkout & Place Order'}
            </h3>
            <p className="text-xs text-emerald-200 mt-0.5">
              {placedOrder ? 'Thank you for shopping with Familly Mart' : 'Fast and reliable delivery all across Bangladesh'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-full hover:bg-emerald-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {placedOrder ? (
          /* Order Confirmed Screen */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Order Successful</span>
              <h4 className="text-2xl font-black text-slate-900 font-heading">
                Order {placedOrder.id} Placed!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                We've sent a confirmation email to <strong>{placedOrder.customerEmail}</strong>. Our courier team will dispatch your products promptly.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Order ID:</span>
                <span className="font-bold text-slate-900">{placedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Recipient:</span>
                <span className="font-semibold text-slate-800">{placedOrder.customerName} ({placedOrder.customerPhone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Address:</span>
                <span className="font-semibold text-slate-800 text-right">{placedOrder.shippingAddress}, {placedOrder.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment:</span>
                <span className="font-bold text-emerald-800">{placedOrder.paymentMethod} ({placedOrder.paymentStatus})</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-extrabold text-slate-900">
                <span>Total Amount:</span>
                <span className="text-emerald-900 font-heading tabular-nums">৳ {placedOrder.amount.toLocaleString()}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleClose}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold py-3 rounded-xl transition-colors cursor-pointer"
              >
                Back to Shopping
              </button>
              <button
                onClick={handleGoToAdminOrders}
                className="flex-1 bg-[#0B4832] hover:bg-[#073624] text-white text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>View in Admin Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Customer Details */}
            <div className="space-y-4">
              <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-700" />
                <span>1. Shipping Information</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rahim Ahmed"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. +880 1711-234567"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="e.g. rahim@gmail.com"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">City / Region *</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600 font-medium"
                  >
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattogram">Chattogram</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barishal">Barishal</option>
                    <option value="Rangpur">Rangpur</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-600 font-semibold mb-1">Detailed Street Address *</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="House number, Flat/Floor, Road name, Area"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>2. Payment Option</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Cash on Delivery */}
                <label 
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    paymentMethod === 'Cash on Delivery'
                      ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery"
                    checked={paymentMethod === 'Cash on Delivery'}
                    onChange={() => setPaymentMethod('Cash on Delivery')}
                    className="sr-only"
                  />
                  <Banknote className="w-5 h-5 text-emerald-700 mb-1" />
                  <span className="text-xs font-bold text-slate-900">Cash on Delivery</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">Pay upon receiving</span>
                </label>

                {/* bKash */}
                <label 
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    paymentMethod === 'bKash'
                      ? 'border-[#E2136E] bg-pink-50/60 ring-2 ring-[#E2136E]/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bKash"
                    checked={paymentMethod === 'bKash'}
                    onChange={() => setPaymentMethod('bKash')}
                    className="sr-only"
                  />
                  <Smartphone className="w-5 h-5 text-[#E2136E] mb-1" />
                  <span className="text-xs font-bold text-slate-900">bKash MFS</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">Instant mobile pay</span>
                </label>

                {/* Online Payment */}
                <label 
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    paymentMethod === 'Online Payment'
                      ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Online Payment"
                    checked={paymentMethod === 'Online Payment'}
                    onChange={() => setPaymentMethod('Online Payment')}
                    className="sr-only"
                  />
                  <CreditCard className="w-5 h-5 text-blue-600 mb-1" />
                  <span className="text-xs font-bold text-slate-900">Online Payment</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">Cards & Netbanking</span>
                </label>
              </div>
            </div>

            {/* Order Total & Submit */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500">Total payable:</span>
                <p className="text-xl font-black text-slate-900 font-heading tabular-nums">
                  ৳ {finalTotal.toLocaleString()}
                </p>
              </div>

              <button
                type="submit"
                className="bg-[#0B4832] hover:bg-[#073624] text-white text-sm font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Confirm & Place Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

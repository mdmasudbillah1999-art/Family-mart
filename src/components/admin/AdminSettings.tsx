import React, { useState } from 'react';
import { Save, Building, ShieldCheck, Truck, Phone, Mail } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminSettings: React.FC = () => {
  const { showToast } = useStore();
  const [storeName, setStoreName] = useState('Familly Mart');
  const [tagline, setTagline] = useState("Your Family's Smart Choice");
  const [supportPhone, setSupportPhone] = useState('+880 9612-FAMILLY');
  const [supportEmail, setSupportEmail] = useState('support@famillymart.com');
  const [freeShippingMin, setFreeShippingMin] = useState(5000);
  const [flatDeliveryFee, setFlatDeliveryFee] = useState(80);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Store settings updated successfully!');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-black text-slate-900 font-heading">
          Website Settings
        </h2>
        <p className="text-xs text-slate-500">
          Configure store identity, delivery rules, and customer contact information
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        
        {/* Store Identity */}
        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Building className="w-4 h-4 text-emerald-700" />
            <span>Store Brand Identity</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Store Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Store Slogan / Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Shipping & Delivery */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-700" />
            <span>Shipping & Delivery Rules</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Free Shipping Threshold (৳)</label>
              <input
                type="number"
                value={freeShippingMin}
                onChange={(e) => setFreeShippingMin(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">Orders above this qualify for free nationwide shipping</span>
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Standard Delivery Fee (৳)</label>
              <input
                type="number"
                value={flatDeliveryFee}
                onChange={(e) => setFlatDeliveryFee(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">Charged for orders below free delivery threshold</span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-700" />
            <span>Support Hotline & Contacts</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Customer Helpline</label>
              <input
                type="text"
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Support Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-[#0F766E] hover:bg-[#0D5C3A] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};

import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  FolderTree, 
  ShoppingCart, 
  Users, 
  Tag, 
  Star, 
  Megaphone, 
  BarChart3, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  Settings, 
  FileText, 
  HelpCircle, 
  LogOut,
  ChevronDown,
  Sparkles,
  Store
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { AdminTab } from '../../types';
import { BrandLogo } from '../common/BrandLogo';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const { adminTab, setAdminTab, setView, orders, products } = useStore();

  const menuItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: string | number; hasSub?: boolean }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'products', label: 'Products', icon: <Package className="w-4 h-4" />, badge: products.length, hasSub: true },
    { id: 'categories', label: 'Categories', icon: <FolderTree className="w-4 h-4" />, hasSub: true },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart className="w-4 h-4" />, badge: orders.length },
    { id: 'customers', label: 'Customers', icon: <Users className="w-4 h-4" /> },
    { id: 'coupons', label: 'Coupons', icon: <Tag className="w-4 h-4" /> },
    { id: 'reviews', label: 'Reviews', icon: <Star className="w-4 h-4" /> },
    { id: 'marketing', label: 'Marketing', icon: <Megaphone className="w-4 h-4" />, hasSub: true },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'delivery', label: 'Delivery', icon: <Truck className="w-4 h-4" /> },
    { id: 'payment', label: 'Payment', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'settings', label: 'Website Settings', icon: <Settings className="w-4 h-4" />, hasSub: true },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#053322] text-white flex flex-col justify-between border-r border-emerald-950/40 transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Top: Brand Header */}
        <div className="p-5 border-b border-emerald-900/40 flex items-center justify-between">
          <BrandLogo variant="light" size="sm" onClick={() => setView('store')} />
        </div>

        {/* Middle: Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 text-xs font-semibold">
          {menuItems.map((item) => {
            const isActive = adminTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setAdminTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0F766E] text-white shadow-sm font-bold'
                    : 'text-emerald-100/70 hover:bg-emerald-900/50 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-white' : 'text-emerald-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white text-emerald-900' : 'bg-emerald-900 text-emerald-200'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {item.hasSub && (
                    <ChevronDown className="w-3.5 h-3.5 text-emerald-400/60" />
                  )}
                </div>
              </button>
            );
          })}

          <div className="pt-2 pb-1">
            <div className="h-px bg-emerald-900/60 my-2" />
          </div>

          {/* Quick Exit to Storefront */}
          <button
            onClick={() => setView('store')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-emerald-200/80 hover:bg-emerald-900/50 hover:text-white transition-colors cursor-pointer"
          >
            <Store className="w-4 h-4 text-emerald-400" />
            <span>Switch to Storefront</span>
          </button>
        </div>

        {/* Bottom Card: "Grow Your Business with Familly Mart" */}
        <div className="p-4 border-t border-emerald-900/40">
          <div className="p-3 bg-gradient-to-br from-[#0B4832] to-[#04281B] rounded-2xl border border-emerald-500/20 text-center space-y-2 relative overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Grow Your Business</p>
              <p className="text-[10px] text-emerald-200/70">with Familly Mart</p>
            </div>
            <button
              onClick={() => setView('store')}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[11px] font-bold py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Visit Store
            </button>
          </div>
        </div>

      </aside>
    </>
  );
};

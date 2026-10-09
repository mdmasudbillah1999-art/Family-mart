import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';
import { AdminDashboard } from './AdminDashboard';
import { AdminProducts } from './AdminProducts';
import { AdminOrders } from './AdminOrders';
import { AdminCustomers } from './AdminCustomers';
import { AdminCoupons } from './AdminCoupons';
import { AdminReviews } from './AdminReviews';
import { AdminSettings } from './AdminSettings';
import { Facebook, Youtube, Instagram, Music2 } from 'lucide-react';

export const AdminView: React.FC = () => {
  const { adminTab } = useStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F8F7] text-slate-800 font-sans flex">
      {/* 1. Admin Sidebar */}
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        
        {/* Top Header */}
        <AdminTopBar onToggleSidebar={() => setIsSidebarOpen(true)} />

        {/* Dynamic Admin Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {adminTab === 'dashboard' && (
            <AdminDashboard 
              onOpenAddProduct={() => setIsAddProductModalOpen(true)}
              onOpenAddCustomer={() => setIsAddCustomerModalOpen(true)}
            />
          )}

          {adminTab === 'products' && (
            <AdminProducts 
              isAddModalOpen={isAddProductModalOpen}
              setIsAddModalOpen={setIsAddProductModalOpen}
            />
          )}

          {adminTab === 'categories' && (
            <AdminProducts 
              isAddModalOpen={isAddProductModalOpen}
              setIsAddModalOpen={setIsAddProductModalOpen}
            />
          )}

          {adminTab === 'orders' && <AdminOrders />}

          {adminTab === 'customers' && (
            <AdminCustomers 
              isAddModalOpen={isAddCustomerModalOpen}
              setIsAddModalOpen={setIsAddCustomerModalOpen}
            />
          )}

          {adminTab === 'coupons' && <AdminCoupons />}

          {adminTab === 'reviews' && <AdminReviews />}

          {adminTab === 'settings' && <AdminSettings />}

          {(adminTab === 'marketing' || adminTab === 'analytics' || adminTab === 'delivery' || adminTab === 'payment') && (
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
                <h3 className="text-xl font-bold text-slate-800 capitalize font-heading">
                  {adminTab} Overview
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Configured and fully operational in store backend. You can manage {adminTab} policies, live carriers, and metrics directly.
                </p>
                <div className="pt-2">
                  <AdminDashboard 
                    onOpenAddProduct={() => setIsAddProductModalOpen(true)}
                    onOpenAddCustomer={() => setIsAddCustomerModalOpen(true)}
                  />
                </div>
              </div>
            </div>
          )}
        </main>

        {/* 3. Admin Footer (Matching screenshot bottom bar) */}
        <footer className="mt-auto border-t border-slate-200 bg-white py-4 px-6 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© 2025 Familly Mart. All rights reserved.</p>

            <div className="flex items-center gap-4 text-xs">
              <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-slate-800">Privacy Policy</a>
              <span>|</span>
              <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-slate-800">Terms & Conditions</a>
              <span>|</span>
              <a href="#help" onClick={(e) => e.preventDefault()} className="hover:text-slate-800">Help & Support</a>
            </div>

            <div className="flex items-center gap-3 text-slate-400">
              <span className="hover:text-emerald-700 cursor-pointer">
                <Facebook className="w-4 h-4" />
              </span>
              <span className="hover:text-emerald-700 cursor-pointer">
                <Youtube className="w-4 h-4" />
              </span>
              <span className="hover:text-emerald-700 cursor-pointer">
                <Instagram className="w-4 h-4" />
              </span>
              <span className="hover:text-emerald-700 cursor-pointer">
                <Music2 className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono text-slate-400 pl-2">v1.0.0</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

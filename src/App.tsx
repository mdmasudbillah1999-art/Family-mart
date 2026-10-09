/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { StorefrontView } from './components/store/StorefrontView';
import { AdminView } from './components/admin/AdminView';
import { LayoutDashboard, Store, CheckCircle2 } from 'lucide-react';

const MainApp: React.FC = () => {
  const { view, setView, toastMessage } = useStore();

  return (
    <div className="relative min-h-screen">
      {/* Active View: Storefront or Admin Panel */}
      {view === 'store' ? <StorefrontView /> : <AdminView />}

      {/* Floating Quick Mode Switcher for Instant Navigation */}
      <aside 
        aria-label="View Switcher"
        className="fixed bottom-5 right-5 z-50 flex items-center bg-slate-900/90 backdrop-blur-md text-white p-1.5 rounded-full shadow-2xl border border-white/20 transition-all hover:scale-105"
      >
        <button
          onClick={() => setView('store')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            view === 'store'
              ? 'bg-[#0F766E] text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          title="Open Familly Mart Storefront"
        >
          <Store className="w-3.5 h-3.5" />
          <span>Storefront</span>
        </button>

        <button
          onClick={() => setView('admin')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            view === 'admin'
              ? 'bg-[#0F766E] text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          title="Open Familly Mart Admin Panel"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Admin Panel</span>
        </button>
      </aside>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0B4832] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-2xl shadow-xl border border-emerald-500/40 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}

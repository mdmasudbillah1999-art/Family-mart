import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Calendar, 
  ChevronDown, 
  Menu, 
  ExternalLink, 
  User, 
  Check, 
  Package, 
  DollarSign, 
  Truck 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface AdminTopBarProps {
  onToggleSidebar: () => void;
}

export const AdminTopBar: React.FC<AdminTopBarProps> = ({ onToggleSidebar }) => {
  const { setView, orders } = useStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState('Tue, 29 Jul 2025 10:24 AM');

  useEffect(() => {
    // Format realistic time
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      // Keep screenshot aesthetic or live clock
      setCurrentTime(now.toLocaleString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const notifications = [
    { id: 1, title: 'New order #1001 received', time: '10 min ago', icon: <Package className="w-3.5 h-3.5 text-emerald-600" /> },
    { id: 2, title: 'Payment received via bKash (৳ 1,250)', time: '35 min ago', icon: <DollarSign className="w-3.5 h-3.5 text-blue-600" /> },
    { id: 3, title: 'Delivery dispatched for #0999', time: '1 hour ago', icon: <Truck className="w-3.5 h-3.5 text-amber-600" /> },
    { id: 4, title: 'Customer Rahim Ahmed registered', time: '2 hours ago', icon: <User className="w-3.5 h-3.5 text-purple-600" /> },
    { id: 5, title: 'Low stock alert: Samsung Refrigerator (236L)', time: '4 hours ago', icon: <Package className="w-3.5 h-3.5 text-rose-600" /> },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
      
      {/* Left: Mobile hamburger & Global Search input */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search products, orders, customers..."
            className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-800 text-xs sm:text-sm pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 transition-all placeholder:text-slate-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Right: Date, Notifications, User profile */}
      <div className="flex items-center gap-3 sm:gap-5 shrink-0">
        
        {/* Date / Time matching design */}
        <div className="hidden xl:flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
          <Calendar className="w-4 h-4 text-emerald-700" />
          <span>{currentTime}</span>
        </div>

        {/* Notifications Icon with Red Badge */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center border-2 border-white">
              5
            </span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div 
              className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2"
              onMouseLeave={() => setShowNotifications(false)}
            >
              <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Notifications</span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  5 New
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-slate-50 flex items-start gap-3 transition-colors">
                    <div className="p-1.5 rounded-lg bg-slate-100 shrink-0">
                      {n.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800 leading-snug">{n.title}</p>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 pt-2 border-t border-slate-100 text-center">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-bold text-emerald-700 hover:underline"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1 sm:px-2 sm:py-1 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              A
            </div>
            <div className="hidden sm:flex flex-col text-left leading-none">
              <span className="text-xs font-bold text-slate-900">Admin</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Super Admin</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div 
              className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in"
              onMouseLeave={() => setShowProfileMenu(false)}
            >
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">Signed in as Admin</p>
                <p className="text-[10px] text-slate-500 truncate">admin@famillymart.com</p>
              </div>
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  setView('store');
                }}
                className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between"
              >
                <span>View Storefront</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          )}
        </div>

        {/* Direct "Go to Store" Button */}
        <button
          onClick={() => setView('store')}
          className="hidden md:flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
        >
          <span>Storefront</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>

      </div>
    </header>
  );
};

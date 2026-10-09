import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'dark', size = 'md', onClick }) => {
  const isLight = variant === 'light';

  return (
    <div 
      className={`flex items-center gap-2.5 cursor-pointer select-none transition-opacity hover:opacity-95`}
      onClick={onClick}
    >
      <div className={`relative flex items-center justify-center rounded-xl transition-transform hover:scale-105 ${
        isLight ? 'bg-emerald-500 text-white' : 'bg-[#0F766E] text-white'
      } ${
        size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10'
      } shadow-sm`}>
        <ShoppingCart className={size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></span>
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-extrabold tracking-tight font-heading ${
          isLight ? 'text-white' : 'text-slate-900'
        } ${
          size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'
        }`}>
          Familly <span className={isLight ? 'text-emerald-300' : 'text-[#0F766E]'}>Mart</span>
        </span>
        <span className={`text-[10px] tracking-wide font-medium mt-0.5 ${
          isLight ? 'text-emerald-100/80' : 'text-slate-500'
        }`}>
          Your Family's Smart Choice
        </span>
      </div>
    </div>
  );
};

import React from 'react';
import { CATEGORIES } from '../data/products';
import { useTheme } from '../context/ThemeContext';

export default function CategoryFilter({ activeCategory, onSelectCategory }) {
  const { isDark } = useTheme();

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2 sm:gap-3 min-w-max pb-1">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border cursor-pointer select-none ${
                isActive
                  ? isDark
                    ? 'bg-[#FACC15] text-[#18181B] border-[#FACC15] shadow-md shadow-[#FACC15]/25 scale-[1.02]'
                    : 'bg-[#00509E] text-white border-[#00509E] shadow-md shadow-[#00509E]/25 scale-[1.02]'
                  : isDark
                  ? 'bg-[#27272A] hover:bg-[#323238] text-[#A1A1AA] hover:text-[#FAFAFA] border-[#3F3F46]'
                  : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200 shadow-sm'
              }`}
            >
              <span className="text-base leading-none group-hover:scale-110 transition-transform">
                {cat.emoji || '✨'}
              </span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';
import { 
  Sparkles, 
  Beer, 
  Flame, 
  Wine, 
  CupSoda, 
  Cookie, 
  Snowflake 
} from 'lucide-react';
import { CATEGORIES } from '../data/products';

const iconMap = {
  Sparkles: Sparkles,
  Beer: Beer,
  Flame: Flame,
  Wine: Wine,
  CupSoda: CupSoda,
  Cookie: Cookie,
  Snowflake: Snowflake
};

export default function CategoryFilter({ activeCategory, onSelectCategory }) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2 sm:gap-3 min-w-max pb-1">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border cursor-pointer ${
                isActive
                  ? 'bg-[#18B66A] text-[#0B0F0E] border-[#18B66A] shadow-md shadow-[#18B66A]/25 scale-[1.02]'
                  : 'bg-[#121816]/90 hover:bg-[#18221E] text-[#A8B0AC] hover:text-[#F7F7F5] border-[#1F2925]'
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

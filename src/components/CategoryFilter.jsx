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
          const Icon = iconMap[cat.icon] || Sparkles;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 border ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 border-amber-400 shadow-md shadow-amber-500/25 scale-[1.03]'
                  : 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border-stone-800/90'
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? 'text-stone-950' : 'text-amber-400'
                }`}
              />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

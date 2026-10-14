import React, { useEffect, useRef } from 'react';
import { CATEGORIES } from '../data/products';

export default function CategoryFilter({ activeCategory, onSelectCategory }) {
  const containerRef = useRef(null);

  // Auto-scroll para manter a categoria ativa visível no chip-bar horizontal
  useEffect(() => {
    if (!containerRef.current) return;
    const activeBtn = containerRef.current.querySelector('[data-active="true"]');
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeCategory]);

  return (
    <div className="sticky top-[var(--header-h,64px)] z-30 bg-app/95 backdrop-blur-md border-b border-line py-2.5 transition-colors">
      <div
        ref={containerRef}
        className="no-scrollbar max-w-6xl mx-auto px-4 flex items-center gap-2 overflow-x-auto scroll-smooth"
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              data-active={isActive}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex-none inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all active:scale-95 border cursor-pointer select-none ${
                isActive
                  ? 'bg-brand text-on-brand border-brand shadow-sm font-extrabold scale-[1.02]'
                  : 'bg-surface text-ink/80 hover:text-ink border-line hover:border-ink/20 shadow-xs'
              }`}
            >
              <span className="text-sm leading-none">{cat.emoji || '✨'}</span>
              <span className="whitespace-nowrap">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

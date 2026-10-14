import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatBRL } from '../lib/format';

export default function FloatingCartBar() {
  const { totalItems, total, setIsCartOpen } = useCart();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] sm:bottom-6 inset-x-4 max-w-lg mx-auto z-40 animate-rise pointer-events-none">
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        className="pointer-events-auto w-full flex items-center justify-between px-5 py-3.5 rounded-full bg-brand hover:bg-brand-strong text-on-brand shadow-xl shadow-black/25 active:scale-98 transition-all cursor-pointer font-sans"
      >
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-ink text-surface font-extrabold text-xs">
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-danger text-white rounded-full text-[9px] font-black">
              {totalItems}
            </span>
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[11px] font-extrabold uppercase tracking-wider opacity-85 leading-none">
              Ver Sacola
            </span>
            <span className="text-xs font-medium opacity-90">
              {totalItems} {totalItems === 1 ? 'item' : 'itens'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-base sm:text-lg font-black font-display">
            {formatBRL(total)}
          </span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </div>
      </button>
    </div>
  );
}

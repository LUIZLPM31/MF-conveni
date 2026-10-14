import React from 'react';
import { Home, Compass, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { whatsappUrl } from '../lib/format';

export default function MobileNavBar({ onCatalogClick, activeTab = 'home' }) {
  const { totalItems, setIsCartOpen } = useCart();

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Navegação Principal do App"
      className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-line px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] flex items-center justify-around shadow-lg transition-colors"
    >
      {/* Início */}
      <button
        type="button"
        onClick={handleHomeClick}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-bold transition-colors ${
          activeTab === 'home' ? 'text-ink font-black' : 'text-muted hover:text-ink'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Início</span>
      </button>

      {/* Cardápio */}
      <button
        type="button"
        onClick={onCatalogClick}
        className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-bold text-muted hover:text-ink transition-colors"
      >
        <Compass className="w-5 h-5" />
        <span>Explorar</span>
      </button>

      {/* Sacola com badge */}
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        className="relative flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-bold text-muted hover:text-ink transition-colors"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 bg-brand text-on-brand rounded-full text-[9px] font-black shadow-xs">
              {totalItems}
            </span>
          )}
        </div>
        <span>Sacola</span>
      </button>

      {/* WhatsApp direto */}
      <a
        href={whatsappUrl('Olá! Gostaria de fazer um pedido na MF Conveniências.')}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-bold text-whatsapp hover:text-whatsapp-strong transition-colors"
      >
        <MessageCircle className="w-5 h-5" />
        <span>WhatsApp</span>
      </a>
    </nav>
  );
}

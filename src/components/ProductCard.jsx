import React from 'react';
import { Snowflake, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatBRL, discountPercent } from '../lib/format';
import QuantityStepper from './QuantityStepper';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, updateQuantity, getQuantity } = useCart();
  const quantity = getQuantity(product.id);
  const discount = discountPercent(product);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col justify-between rounded-2xl bg-surface border border-line p-3 sm:p-3.5 shadow-xs hover:shadow-md transition-all active:scale-[0.99] cursor-pointer"
    >
      {/* Imagem do Produto */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-surface-2 mb-2.5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges superiores */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
          {product.badge && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-brand text-on-brand shadow-xs">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="px-1.5 py-0.5 rounded-md text-[9px] font-extrabold bg-danger text-white shadow-xs">
              -{discount}%
            </span>
          )}
        </div>

        {product.isCold && (
          <span
            className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-surface/90 text-ink backdrop-blur-xs border border-line shadow-xs"
            title="Super Gelada"
          >
            <Snowflake className="w-3 h-3 text-brand" />
            <span className="hidden sm:inline">GELADA</span>
          </span>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col flex-1">
        <span className="text-[11px] font-medium text-muted mb-0.5 truncate">
          {product.unit}
        </span>

        <h3 className="text-xs sm:text-sm font-extrabold text-ink line-clamp-2 leading-snug mb-1 font-sans">
          {product.name}
        </h3>

        {/* Rodapé do Card: Preço e Botão Stepper estilo Zé Delivery */}
        <div className="mt-auto pt-2 flex items-end justify-between gap-1.5">
          <div className="flex flex-col">
            {product.oldPrice && Number(product.oldPrice) > Number(product.price) && (
              <span className="text-[10px] sm:text-[11px] line-through text-muted/80 leading-none">
                {formatBRL(product.oldPrice)}
              </span>
            )}
            <span className="text-sm sm:text-base font-black text-ink leading-tight font-display">
              {formatBRL(product.price)}
            </span>
          </div>

          <div className="flex-none">
            {quantity > 0 ? (
              <QuantityStepper
                quantity={quantity}
                size="sm"
                label={product.name}
                onIncrement={(e) => {
                  e?.stopPropagation();
                  updateQuantity(product.id, 1);
                }}
                onDecrement={(e) => {
                  e?.stopPropagation();
                  updateQuantity(product.id, -1);
                }}
              />
            ) : (
              <button
                type="button"
                onClick={handleAdd}
                aria-label={`Adicionar ${product.name} à sacola`}
                className="w-8 h-8 rounded-full bg-brand hover:bg-brand-strong text-on-brand flex items-center justify-center font-bold shadow-xs active:scale-90 transition-transform cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

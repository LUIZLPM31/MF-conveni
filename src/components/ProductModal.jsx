import React from 'react';
import { Snowflake, Star, ShieldCheck, ShoppingBag } from 'lucide-react';
import Sheet from './Sheet';
import QuantityStepper from './QuantityStepper';
import { useCart } from '../context/CartContext';
import { formatBRL, discountPercent } from '../lib/format';

export default function ProductModal({ product, onClose }) {
  const { addToCart, updateQuantity, getQuantity, setIsCartOpen } = useCart();

  if (!product) return null;

  const quantity = getQuantity(product.id);
  const discount = discountPercent(product);

  const handleAddFirst = () => {
    addToCart(product, 1);
  };

  return (
    <Sheet
      open={Boolean(product)}
      onClose={onClose}
      title="Detalhes do Produto"
      footer={
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-muted font-medium">Preço total</span>
            <span className="text-xl font-black text-ink font-display">
              {formatBRL(product.price * (quantity || 1))}
            </span>
          </div>

          {quantity > 0 ? (
            <div className="flex items-center gap-2">
              <QuantityStepper
                quantity={quantity}
                size="md"
                label={product.name}
                onIncrement={() => updateQuantity(product.id, 1)}
                onDecrement={() => updateQuantity(product.id, -1)}
              />
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setIsCartOpen(true);
                }}
                className="px-4 py-3 rounded-full bg-ink text-surface font-extrabold text-xs uppercase tracking-wider shadow-sm active:scale-95 transition"
              >
                Ver Sacola
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAddFirst}
              className="flex-1 py-3.5 px-6 rounded-full bg-brand hover:bg-brand-strong text-on-brand font-black text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-md shadow-brand/20 active:scale-98 transition"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              <span>Adicionar à Sacola</span>
            </button>
          )}
        </div>
      }
    >
      <div className="p-5 space-y-4">
        {/* Imagem em destaque */}
        <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-surface-2 border border-line">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            {product.badge && (
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-brand text-on-brand shadow-xs">
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-danger text-white shadow-xs">
                Economize {discount}%
              </span>
            )}
          </div>

          {product.isCold && (
            <span className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-surface/90 text-ink backdrop-blur-md border border-line shadow-xs">
              <Snowflake className="w-3.5 h-3.5 text-brand" />
              Super Gelada
            </span>
          )}
        </div>

        {/* Título e Avaliação */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-muted mb-1">
            <span>{product.unit}</span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <span>{product.rating ? Number(product.rating).toFixed(1) : '5.0'}</span>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-ink leading-tight font-display">
            {product.name}
          </h3>
        </div>

        {/* Preço Unitário */}
        <div className="flex items-baseline gap-2 pt-1 border-t border-line">
          {product.oldPrice && Number(product.oldPrice) > Number(product.price) && (
            <span className="text-sm line-through text-muted/70">
              {formatBRL(product.oldPrice)}
            </span>
          )}
          <span className="text-2xl font-black text-ink font-display">
            {formatBRL(product.price)}
          </span>
          <span className="text-xs text-muted font-medium">/ {product.unit}</span>
        </div>

        {/* Descrição */}
        {product.description && (
          <div className="bg-surface-2 p-3.5 rounded-xl border border-line">
            <h4 className="text-xs font-bold text-ink uppercase tracking-wide mb-1">
              Sobre o produto
            </h4>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              {product.description}
            </p>
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-muted pt-1">
          <ShieldCheck className="w-4 h-4 text-success flex-none" />
          <span>Garantia de produto gelado e separado direto no balcão da MF.</span>
        </div>
      </div>
    </Sheet>
  );
}

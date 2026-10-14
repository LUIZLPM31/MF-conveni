import React from 'react';
import { Flame, Sparkles, Plus } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { formatBRL, discountPercent } from '../lib/format';
import QuantityStepper from './QuantityStepper';

export default function CombosSection({ onQuickView }) {
  const { products } = useProducts();
  const { addToCart, updateQuantity, getQuantity } = useCart();
  const combos = products.filter((p) => p.category === 'combos');

  if (combos.length === 0) return null;

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-brand/20 text-ink border border-brand/40 mb-1">
            <Flame className="w-3.5 h-3.5 text-brand" />
            <span>Mais Econômico</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-ink tracking-tight font-display">
            Combos Prontos da Galera 🔥
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
        {combos.map((combo) => {
          const discount = discountPercent(combo);
          const quantity = getQuantity(combo.id);

          return (
            <div
              key={combo.id}
              className="relative rounded-2xl p-4 bg-surface border border-line shadow-xs hover:shadow-md flex flex-col justify-between transition-all cursor-pointer group"
              onClick={() => onQuickView(combo)}
            >
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wide bg-brand text-on-brand shadow-xs">
                  {combo.badge || 'PROMO'}
                </span>
                {discount > 0 && (
                  <span className="text-xs font-black text-danger flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Economize {discount}%
                  </span>
                )}
              </div>

              {/* Imagem do Combo */}
              <div className="relative aspect-16/10 rounded-xl overflow-hidden mb-3 bg-surface-2 border border-line">
                <img
                  src={combo.image}
                  alt={combo.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-md bg-surface/90 text-ink backdrop-blur-xs border border-line">
                  {combo.unit}
                </span>
              </div>

              {/* Textos */}
              <div className="space-y-1 flex-1">
                <h3 className="text-sm sm:text-base font-extrabold text-ink leading-snug font-sans group-hover:text-brand-strong transition-colors">
                  {combo.name}
                </h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">
                  {combo.description}
                </p>
              </div>

              {/* Preço e Botão */}
              <div className="mt-3.5 pt-3 border-t border-line flex items-center justify-between gap-2">
                <div>
                  {combo.oldPrice && Number(combo.oldPrice) > Number(combo.price) && (
                    <span className="text-xs line-through text-muted/70 block leading-none">
                      {formatBRL(combo.oldPrice)}
                    </span>
                  )}
                  <span className="text-lg font-black text-ink font-display">
                    {formatBRL(combo.price)}
                  </span>
                </div>

                <div className="flex-none">
                  {quantity > 0 ? (
                    <QuantityStepper
                      quantity={quantity}
                      size="sm"
                      label={combo.name}
                      onIncrement={(e) => {
                        e?.stopPropagation();
                        updateQuantity(combo.id, 1);
                      }}
                      onDecrement={(e) => {
                        e?.stopPropagation();
                        updateQuantity(combo.id, -1);
                      }}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(combo, 1);
                      }}
                      className="px-3.5 py-2 rounded-full bg-brand hover:bg-brand-strong text-on-brand font-black text-xs uppercase tracking-wide flex items-center gap-1 shadow-xs active:scale-95 transition"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Adicionar</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

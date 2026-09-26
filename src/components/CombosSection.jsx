import React from 'react';
import { Flame, Sparkles, Eye, MessageCircle } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { STORE_CONFIG } from '../data/products';

export default function CombosSection({ onQuickView }) {
  const { products } = useProducts();
  const combos = products.filter(p => p.category === 'combos');

  if (combos.length === 0) return null;

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
            <span>Mais Econômico & Completo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            Combos Prontos da Galera 🔥
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Kits completos com bebida, gelo, energético ou carvão para economizar tempo e dinheiro no balcão.
          </p>
        </div>

        <span className="text-xs text-stone-400">
          Retire no balcão ou consulte entrega via WhatsApp
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {combos.map((combo) => {
          const discount = combo.oldPrice 
            ? Math.round(((combo.oldPrice - combo.price) / combo.oldPrice) * 100)
            : null;

          return (
            <div
              key={combo.id}
              className="relative rounded-3xl bg-gradient-to-b from-stone-900/90 via-stone-900 to-stone-950 border border-amber-500/30 p-5 flex flex-col justify-between hover:border-amber-400/80 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/15 group cursor-pointer"
              onClick={() => onQuickView(combo)}
            >
              {/* Badge superior */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 shadow-md">
                  {combo.badge || 'Combo Especial'}
                </span>
                {discount && (
                  <span className="text-xs text-amber-400 font-black flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Economize {discount}%
                  </span>
                )}
              </div>

              {/* Imagem do Combo */}
              <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-stone-950">
                <img
                  src={combo.image}
                  alt={combo.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                
                <span className="absolute bottom-2.5 left-2.5 text-[11px] font-bold text-amber-300 bg-stone-950/80 px-2.5 py-1 rounded-lg border border-amber-500/20 backdrop-blur-sm">
                  {combo.unit}
                </span>
              </div>

              {/* Informações */}
              <div className="space-y-2 flex-1">
                <h3 className="text-base font-black text-stone-100 group-hover:text-amber-300 transition-colors leading-snug">
                  {combo.name}
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">
                  {combo.description}
                </p>
              </div>

              {/* Preço e Botões */}
              <div className="mt-5 pt-4 border-t border-stone-800/80 flex items-center justify-between gap-3">
                <div>
                  {combo.oldPrice && (
                    <span className="text-xs text-stone-500 line-through block leading-none">
                      R$ {Number(combo.oldPrice).toFixed(2).replace('.', ',')}
                    </span>
                  )}
                  <span className="text-xl font-black text-amber-400">
                    R$ {Number(combo.price).toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Olá! Gostaria de pedir o ${combo.name} na MF Conveniências.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white transition-colors"
                    title="Pedir no WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => onQuickView(combo)}
                    className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-stone-800 group-hover:bg-amber-500 group-hover:text-stone-950 text-stone-200 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Ver</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

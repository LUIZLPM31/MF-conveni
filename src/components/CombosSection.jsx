import React from 'react';
import { Flame, Sparkles, Eye } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export default function CombosSection({ onQuickView }) {
  const { products } = useProducts();
  const combos = products.filter(p => p.category === 'combos');

  if (combos.length === 0) return null;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>Mais Econômico</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            Combos Prontos da Galera 🔥
          </h2>
          <p className="text-sm text-stone-400 mt-1">
            Kits completos com gelo, energético e carvão para economizar tempo e dinheiro.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {combos.map((combo) => (
          <div
            key={combo.id}
            className="relative rounded-3xl bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border border-amber-500/30 p-5 flex flex-col justify-between hover:border-amber-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 group cursor-pointer"
            onClick={() => onQuickView(combo)}
          >
            {/* Badge superior */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 shadow-md">
                {combo.badge || 'Combo Especial'}
              </span>
              <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Economize até 20%
              </span>
            </div>

            {/* Imagem do Combo */}
            <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-stone-950">
              <img
                src={combo.image}
                alt={combo.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
            </div>

            {/* Informações */}
            <div className="space-y-2 flex-1">
              <h3 className="text-base font-black text-stone-100 group-hover:text-amber-300 transition-colors leading-snug">
                {combo.name}
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                {combo.description}
              </p>
            </div>

            {/* Preço e Visualização */}
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

              <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800 group-hover:bg-amber-500 group-hover:text-stone-950 text-stone-200 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md">
                <Eye className="w-4 h-4" />
                <span>Ver Combo</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

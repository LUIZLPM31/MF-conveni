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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] text-xs font-bold uppercase tracking-wider mb-2">
            <Flame className="w-4 h-4 text-[#FFB800]" />
            <span>Mais Econômico & Completo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#F7F7F5] tracking-tight">
            Combos Prontos da Galera 🔥
          </h2>
          <p className="text-xs sm:text-sm text-[#A8B0AC] mt-1">
            Kits completos com bebida, gelo, energético ou carvão para economizar tempo e dinheiro no balcão.
          </p>
        </div>

        <span className="text-xs text-[#A8B0AC]">
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
              className="relative rounded-2xl bg-[#121816] hover:bg-[#15201C] border border-[#1F2925] hover:border-[#18B66A]/40 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#18B66A]/5 group cursor-pointer"
              onClick={() => onQuickView(combo)}
            >
              {/* Badge superior */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-md text-[11px] font-black uppercase bg-[#FFB800] text-[#0B0F0E] shadow-sm">
                  {combo.badge || 'PROMO'}
                </span>
                {discount && (
                  <span className="text-xs text-[#18B66A] font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Economize {discount}%
                  </span>
                )}
              </div>

              {/* Imagem do Combo */}
              <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-[#0B0F0E]">
                <img
                  src={combo.image}
                  alt={combo.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0E] via-transparent to-transparent" />
                
                <span className="absolute bottom-2.5 left-2.5 text-[11px] font-bold text-[#F7F7F5] bg-[#0B0F0E]/85 px-2.5 py-1 rounded-md border border-[#1F2925] backdrop-blur-sm">
                  {combo.unit}
                </span>
              </div>

              {/* Informações */}
              <div className="space-y-2 flex-1">
                <h3 className="text-base font-bold text-[#F7F7F5] group-hover:text-[#18B66A] transition-colors leading-snug font-display">
                  {combo.name}
                </h3>
                <p className="text-xs text-[#A8B0AC] leading-relaxed line-clamp-2">
                  {combo.description}
                </p>
              </div>

              {/* Preço e Botões */}
              <div className="mt-5 pt-4 border-t border-[#1F2925] flex items-center justify-between gap-3">
                <div>
                  {combo.oldPrice && (
                    <span className="text-xs text-[#A8B0AC]/60 line-through block leading-none">
                      R$ {Number(combo.oldPrice).toFixed(2).replace('.', ',')}
                    </span>
                  )}
                  <span className="text-xl font-black text-[#F7F7F5]">
                    R$ {Number(combo.price).toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <a
                  href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Olá! Gostaria de pedir o ${combo.name} na MF Conveniências.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#18B66A] hover:bg-[#159e5c] text-[#0B0F0E] font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-sm"
                  title="Pedir no WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>PEDIR</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

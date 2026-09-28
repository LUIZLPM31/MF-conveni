import React from 'react';
import { Flame, Sparkles } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useTheme } from '../context/ThemeContext';
import { STORE_CONFIG } from '../data/products';

export default function CombosSection({ onQuickView }) {
  const { products } = useProducts();
  const { isDark } = useTheme();
  const combos = products.filter((p) => p.category === 'combos');

  if (combos.length === 0) return null;

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider mb-2 border ${
              isDark
                ? 'bg-[#FACC15]/10 border-[#FACC15]/30 text-[#FACC15]'
                : 'bg-orange-50 border-orange-200 text-[#FF4500]'
            }`}
          >
            <Flame className={`w-4 h-4 ${isDark ? 'text-[#FACC15]' : 'text-[#FF4500]'}`} />
            <span>Mais Econômico & Completo</span>
          </div>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight ${
              isDark ? 'text-[#FAFAFA]' : 'text-[#0F172A]'
            }`}
          >
            Combos Prontos da Galera 🔥
          </h2>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-[#A1A1AA]' : 'text-slate-500'}`}>
            Kits completos com bebida, gelo, energético ou carvão para economizar tempo e dinheiro no balcão.
          </p>
        </div>

        <span className={`text-xs ${isDark ? 'text-[#A1A1AA]' : 'text-slate-500'}`}>
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
              className={`relative rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 group cursor-pointer border ${
                isDark
                  ? 'bg-[#27272A] hover:bg-[#323238] border-[#3F3F46] hover:border-[#FACC15]/50 hover:shadow-xl hover:shadow-[#FACC15]/5'
                  : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-[#FF4500]/40 shadow-sm hover:shadow-xl hover:shadow-slate-300/40'
              }`}
              onClick={() => onQuickView(combo)}
            >
              {/* Badge superior */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`px-3 py-1 rounded-md text-[11px] font-black uppercase shadow-sm ${
                    isDark
                      ? 'bg-[#FACC15] text-[#18181B]'
                      : 'bg-[#FF4500] text-white'
                  }`}
                >
                  {combo.badge || 'PROMO'}
                </span>
                {discount && (
                  <span
                    className={`text-xs font-bold flex items-center gap-1 ${
                      isDark ? 'text-[#FACC15]' : 'text-[#FF4500]'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Economize {discount}%
                  </span>
                )}
              </div>

              {/* Imagem do Combo */}
              <div
                className={`relative h-48 rounded-xl overflow-hidden mb-4 ${
                  isDark ? 'bg-[#18181B]' : 'bg-slate-100'
                }`}
              >
                <img
                  src={combo.image}
                  alt={combo.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 pointer-events-none ${
                    isDark
                      ? 'bg-gradient-to-t from-[#18181B] via-transparent to-transparent'
                      : 'bg-gradient-to-t from-slate-900/40 via-transparent to-transparent'
                  }`}
                />

                <span
                  className={`absolute bottom-2.5 left-2.5 text-[11px] font-bold px-2.5 py-1 rounded-md border backdrop-blur-sm ${
                    isDark
                      ? 'text-[#FAFAFA] bg-[#18181B]/85 border-[#3F3F46]'
                      : 'text-slate-900 bg-white/90 border-slate-200'
                  }`}
                >
                  {combo.unit}
                </span>
              </div>

              {/* Informações */}
              <div className="space-y-2 flex-1">
                <h3
                  className={`text-base font-bold leading-snug font-display transition-colors ${
                    isDark
                      ? 'text-[#FAFAFA] group-hover:text-[#FACC15]'
                      : 'text-[#0F172A] group-hover:text-[#FF4500]'
                  }`}
                >
                  {combo.name}
                </h3>
                <p
                  className={`text-xs leading-relaxed line-clamp-2 ${
                    isDark ? 'text-[#A1A1AA]' : 'text-slate-500'
                  }`}
                >
                  {combo.description}
                </p>
              </div>

              {/* Preço e Botões */}
              <div
                className={`mt-5 pt-4 border-t flex items-center justify-between gap-3 ${
                  isDark ? 'border-[#3F3F46]' : 'border-slate-100'
                }`}
              >
                <div>
                  {combo.oldPrice && (
                    <span
                      className={`text-xs line-through block leading-none ${
                        isDark ? 'text-[#A1A1AA]/70' : 'text-slate-400'
                      }`}
                    >
                      R$ {Number(combo.oldPrice).toFixed(2).replace('.', ',')}
                    </span>
                  )}
                  <span
                    className={`text-xl font-black ${
                      isDark ? 'text-[#FACC15]' : 'text-[#FF4500]'
                    }`}
                  >
                    R$ {Number(combo.price).toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <a
                  href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    `Olá! Gostaria de pedir o ${combo.name} na MF Conveniências.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-sm shadow-[#25D366]/20 border border-white/20"
                  title="Pedir no WhatsApp"
                >
                  <img
                    src="/whatsapp-icon.png"
                    alt="WhatsApp"
                    className="w-4 h-4 rounded-sm object-contain"
                  />
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

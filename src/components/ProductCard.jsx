import React from 'react';
import { Snowflake, Star } from 'lucide-react';
import { STORE_CONFIG } from '../data/products';
import { useTheme } from '../context/ThemeContext';

export default function ProductCard({ product, onQuickView }) {
  const { isDark } = useTheme();

  const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Olá! Gostaria de pedir/consultar o item *${product.name}* (R$ ${Number(product.price).toFixed(2).replace('.', ',')}) na MF Conveniências.`
  )}`;

  return (
    <div
      onClick={() => onQuickView(product)}
      className={`group relative flex flex-col justify-between rounded-2xl p-3 sm:p-4 transition-all duration-300 cursor-pointer border ${
        isDark
          ? 'bg-[#27272A] hover:bg-[#323238] border-[#3F3F46] hover:border-[#FACC15]/60 hover:shadow-xl hover:shadow-[#FACC15]/5'
          : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-[#00509E]/50 shadow-sm hover:shadow-xl hover:shadow-slate-300/40'
      }`}
    >
      {/* Imagem Protagonista do Produto com Badges */}
      <div
        className={`relative w-full aspect-square rounded-xl overflow-hidden mb-3 ${
          isDark ? 'bg-[#18181B]' : 'bg-slate-100'
        }`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />

        <div
          className={`absolute inset-0 transition-opacity ${
            isDark
              ? 'bg-gradient-to-t from-[#18181B]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30'
              : 'bg-gradient-to-t from-slate-900/30 via-transparent to-transparent opacity-40 group-hover:opacity-20'
          }`}
        />

        {/* Badge Principal Consistente (NOVO, PROMO, MAIS VENDIDO) */}
        {product.badge && (
          <span
            className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider shadow-sm ${
              isDark
                ? 'bg-[#FACC15] text-[#18181B]'
                : 'bg-[#FF4500] text-white'
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Indicador de Super Gelada */}
        {product.isCold && (
          <span
            className={`absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold backdrop-blur-md shadow-sm border ${
              isDark
                ? 'bg-[#18181B]/85 text-[#FACC15] border-[#FACC15]/30'
                : 'bg-white/90 text-[#00509E] border-blue-200'
            }`}
            title="Trincando de gelada"
          >
            <Snowflake className={`w-3 h-3 ${isDark ? 'text-[#FACC15]' : 'text-[#00509E]'}`} />
            <span className="hidden sm:inline">GELADA</span>
          </span>
        )}
      </div>

      {/* Detalhes do Produto */}
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
          <span
            className={`font-normal truncate max-w-[120px] ${
              isDark ? 'text-[#A1A1AA]' : 'text-slate-500'
            }`}
          >
            {product.unit}
          </span>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            <span className={isDark ? 'text-[#FAFAFA]' : 'text-slate-700'}>
              {product.rating ? Number(product.rating).toFixed(1) : '5.0'}
            </span>
          </div>
        </div>

        <h3
          className={`text-sm sm:text-base font-bold line-clamp-2 leading-snug transition-colors mb-1.5 font-display ${
            isDark
              ? 'text-[#FAFAFA] group-hover:text-[#FACC15]'
              : 'text-[#0F172A] group-hover:text-[#00509E]'
          }`}
        >
          {product.name}
        </h3>

        <p
          className={`text-xs line-clamp-2 mb-3 leading-relaxed hidden sm:block ${
            isDark ? 'text-[#A1A1AA]' : 'text-slate-500'
          }`}
        >
          {product.description}
        </p>

        {/* Preço e Botão Consistente "PEDIR +" */}
        <div
          className={`mt-auto pt-3 border-t flex items-center justify-between gap-2 ${
            isDark ? 'border-[#3F3F46]' : 'border-slate-100'
          }`}
        >
          <div>
            {product.oldPrice && (
              <span
                className={`block text-[11px] line-through leading-none mb-0.5 ${
                  isDark ? 'text-[#A1A1AA]/70' : 'text-slate-400'
                }`}
              >
                R$ {Number(product.oldPrice).toFixed(2).replace('.', ',')}
              </span>
            )}
            <span
              className={`text-base sm:text-xl font-black leading-none ${
                isDark ? 'text-[#FACC15]' : 'text-[#FF4500]'
              }`}
            >
              R$ {Number(product.price).toFixed(2).replace('.', ',')}
            </span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`flex items-center gap-1 px-3 sm:px-3.5 py-2 rounded-xl font-black text-[11px] uppercase tracking-wider transition-all duration-200 shadow-sm hover:scale-[1.03] active:scale-[0.98] cursor-pointer ${
              isDark
                ? 'bg-[#FACC15] hover:bg-[#EAB308] text-[#18181B] shadow-[#FACC15]/20'
                : 'bg-[#FF4500] hover:bg-[#E03E00] text-white shadow-[#FF4500]/25'
            }`}
            title="Pedir no WhatsApp"
          >
            <span>PEDIR</span>
            <span className="text-sm leading-none font-black">+</span>
          </a>
        </div>
      </div>
    </div>
  );
}

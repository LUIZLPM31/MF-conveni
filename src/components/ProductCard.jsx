import React from 'react';
import { Snowflake, Star, Eye, MessageCircle } from 'lucide-react';
import { STORE_CONFIG } from '../data/products';

export default function ProductCard({ product, onQuickView }) {
  const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Olá! Gostaria de pedir/consultar o item *${product.name}* (R$ ${Number(product.price).toFixed(2).replace('.', ',')}) na MF Conveniências.`
  )}`;

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col justify-between rounded-2xl bg-[#121816] hover:bg-[#15201C] border border-[#1F2925] hover:border-[#18B66A]/40 p-3 sm:p-4 transition-all duration-300 hover:shadow-xl hover:shadow-[#18B66A]/5 cursor-pointer"
    >
      {/* Imagem Protagonista do Produto com Badges */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#0B0F0E] mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0E]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

        {/* Badge Principal Consistente (NOVO, PROMO, MAIS VENDIDO) */}
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#FFB800] text-[#0B0F0E] shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Indicador de Super Gelada */}
        {product.isCold && (
          <span
            className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#0B0F0E]/85 backdrop-blur-md text-[#18B66A] border border-[#18B66A]/30 shadow-sm"
            title="Trincando de gelada"
          >
            <Snowflake className="w-3 h-3 text-[#18B66A]" />
            <span className="hidden sm:inline">GELADA</span>
          </span>
        )}
      </div>

      {/* Detalhes do Produto */}
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
          <span className="text-[#A8B0AC] font-normal truncate max-w-[120px]">{product.unit}</span>
          <div className="flex items-center gap-1 text-[#FFB800]">
            <Star className="w-3 h-3 fill-[#FFB800] text-[#FFB800]" />
            <span>{product.rating ? Number(product.rating).toFixed(1) : '5.0'}</span>
          </div>
        </div>

        <h3 className="text-sm sm:text-base font-bold text-[#F7F7F5] line-clamp-2 leading-snug group-hover:text-[#18B66A] transition-colors mb-1.5 font-display">
          {product.name}
        </h3>

        <p className="text-xs text-[#A8B0AC] line-clamp-2 mb-3 leading-relaxed hidden sm:block">
          {product.description}
        </p>

        {/* Preço e Botão Consistente "ADICIONAR +" */}
        <div className="mt-auto pt-3 border-t border-[#1F2925] flex items-center justify-between gap-2">
          <div>
            {product.oldPrice && (
              <span className="block text-[11px] text-[#A8B0AC]/60 line-through leading-none mb-0.5">
                R$ {Number(product.oldPrice).toFixed(2).replace('.', ',')}
              </span>
            )}
            <span className="text-base sm:text-xl font-black text-[#F7F7F5] leading-none">
              R$ {Number(product.price).toFixed(2).replace('.', ',')}
            </span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 px-3 sm:px-3.5 py-2 rounded-xl bg-[#18B66A] hover:bg-[#159e5c] text-[#0B0F0E] font-black text-[11px] uppercase tracking-wider transition-all duration-200 shadow-sm hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
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

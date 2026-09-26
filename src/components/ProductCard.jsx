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
      className="group relative flex flex-col justify-between rounded-2xl bg-stone-900/80 hover:bg-stone-900 border border-stone-800/80 hover:border-amber-500/50 p-3 sm:p-4 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer"
    >
      {/* Imagem do Produto com Badges */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-stone-950 mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />

        {/* Badge Principal */}
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-stone-950 shadow-md">
            {product.badge}
          </span>
        )}

        {/* Indicador de Super Gelada */}
        {product.isCold && (
          <span
            className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-950/85 backdrop-blur-md text-cyan-300 border border-cyan-400/40 shadow-md"
            title="Trincando de gelada"
          >
            <Snowflake className="w-3 h-3 text-cyan-400" />
            <span className="hidden sm:inline">Gelada</span>
          </span>
        )}
      </div>

      {/* Detalhes do Produto */}
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating ? Number(product.rating).toFixed(1) : '5.0'}</span>
          </div>
          <span className="text-stone-400 font-normal truncate max-w-[120px]">{product.unit}</span>
        </div>

        <h3 className="text-sm font-black text-stone-100 line-clamp-2 leading-snug group-hover:text-amber-300 transition-colors mb-1.5">
          {product.name}
        </h3>

        <p className="text-xs text-stone-400 line-clamp-2 mb-3 leading-relaxed hidden sm:block">
          {product.description}
        </p>

        {/* Preço e Botões */}
        <div className="mt-auto pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
          <div>
            {product.oldPrice && (
              <span className="block text-[11px] text-stone-500 line-through leading-none">
                R$ {Number(product.oldPrice).toFixed(2).replace('.', ',')}
              </span>
            )}
            <span className="text-base sm:text-lg font-black text-amber-400 leading-none">
              R$ {Number(product.price).toFixed(2).replace('.', ',')}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 sm:p-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-white transition-colors"
              title="Pedir no WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => onQuickView(product)}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-stone-800 group-hover:bg-amber-500 group-hover:text-stone-950 text-stone-200 text-xs font-bold transition-all duration-200 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Ver</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

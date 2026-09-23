import React from 'react';
import { Snowflake, Star, Eye } from 'lucide-react';

export default function ProductCard({ product, onQuickView }) {
  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col justify-between rounded-2xl bg-stone-900/70 hover:bg-stone-900 border border-stone-800/80 hover:border-amber-500/40 p-3.5 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer"
    >
      {/* Imagem do Produto com Badges */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-stone-950/60 mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Badge Principal */}
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-stone-950 shadow-md">
            {product.badge}
          </span>
        )}

        {/* Indicador de Super Gelada */}
        {product.isCold && (
          <span
            className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-stone-950/80 backdrop-blur-md text-cyan-300 border border-cyan-400/30 shadow-md"
            title="Trincando de gelada"
          >
            <Snowflake className="w-3 h-3 text-cyan-400" />
            <span className="hidden sm:inline">Gelada</span>
          </span>
        )}

        {/* Efeito Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/30 backdrop-blur-[2px]">
          <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-stone-900/90 border border-stone-700 text-xs text-amber-300 font-semibold shadow-lg">
            <Eye className="w-3.5 h-3.5" />
            Ver detalhes
          </span>
        </div>
      </div>

      {/* Detalhes do Produto */}
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-1 text-amber-400 text-[11px] font-semibold mb-1">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{product.rating ? Number(product.rating).toFixed(1) : '5.0'}</span>
          <span className="text-stone-500 font-normal ml-1">• {product.unit}</span>
        </div>

        <h3 className="text-sm font-bold text-stone-100 line-clamp-2 leading-snug group-hover:text-amber-300 transition-colors mb-2">
          {product.name}
        </h3>

        <p className="text-xs text-stone-400 line-clamp-2 mb-3 leading-relaxed hidden sm:block">
          {product.description}
        </p>

        {/* Preço e Ação de Visualização */}
        <div className="mt-auto pt-3 border-t border-stone-800/60 flex items-center justify-between gap-2">
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

          <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-stone-800/80 group-hover:bg-amber-500 group-hover:text-stone-950 text-stone-300 text-xs font-bold transition-all duration-300">
            <Eye className="w-3.5 h-3.5" />
            <span>Ver</span>
          </span>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { X, Snowflake, Star, ShieldCheck, MessageCircle } from 'lucide-react';
import { STORE_CONFIG } from '../data/products';

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de consultar a disponibilidade do item *${product.name}* na MF Conveniências.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-stone-900 border border-stone-800 p-6 sm:p-7 shadow-2xl overflow-hidden">
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-stone-950/80 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Imagem do Produto */}
        <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-stone-950 mb-5">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {product.badge && (
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black uppercase bg-amber-500 text-stone-950 shadow-md">
              {product.badge}
            </span>
          )}

          {product.isCold && (
            <span className="absolute top-3 right-12 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-stone-950/80 text-cyan-300 border border-cyan-400/40">
              <Snowflake className="w-3.5 h-3.5" />
              Super Gelada
            </span>
          )}
        </div>

        {/* Informações */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-400 font-semibold tracking-wide uppercase">
              {product.unit}
            </span>
            <div className="flex items-center gap-1 text-xs text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating ? Number(product.rating).toFixed(1) : '5.0'} (Avaliação)</span>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-stone-100 leading-tight">
            {product.name}
          </h3>

          <p className="text-sm text-stone-300 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-2 text-xs text-stone-400 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Produto original, lacrado e com procedência garantida.</span>
          </div>

          {/* Preço e Ação */}
          <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              {product.oldPrice && (
                <span className="text-xs text-stone-500 line-through block">
                  De: R$ {Number(product.oldPrice).toFixed(2).replace('.', ',')}
                </span>
              )}
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-amber-400">
                  R$ {Number(product.price).toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* Ações de Consulta */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consultar no WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="px-4 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

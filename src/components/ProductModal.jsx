import React from 'react';
import { X, Snowflake, Star, ShieldCheck, MessageCircle } from 'lucide-react';
import { STORE_CONFIG } from '../data/products';

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de consultar a disponibilidade do item *${product.name}* na MF Conveniências.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F0E]/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#121816] border border-[#1F2925] p-6 sm:p-7 shadow-2xl overflow-hidden">
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-[#0B0F0E]/80 hover:bg-[#1a2320] text-[#A8B0AC] hover:text-[#F7F7F5] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Imagem do Produto */}
        <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-[#0B0F0E] mb-5">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {product.badge && (
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black uppercase bg-[#FFB800] text-[#0B0F0E] shadow-md">
              {product.badge}
            </span>
          )}

          {product.isCold && (
            <span className="absolute top-3 right-12 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#0B0F0E]/80 text-[#18B66A] border border-[#18B66A]/40">
              <Snowflake className="w-3.5 h-3.5" />
              Super Gelada
            </span>
          )}
        </div>

        {/* Informações */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#18B66A] font-semibold tracking-wide uppercase">
              {product.unit}
            </span>
            <div className="flex items-center gap-1 text-xs text-[#FFB800]">
              <Star className="w-3.5 h-3.5 fill-[#FFB800]" />
              <span>{product.rating ? Number(product.rating).toFixed(1) : '5.0'} (Avaliação)</span>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-[#F7F7F5] leading-tight">
            {product.name}
          </h3>

          <p className="text-sm text-[#A8B0AC] leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-2 text-xs text-[#A8B0AC] pt-1">
            <ShieldCheck className="w-4 h-4 text-[#18B66A]" />
            <span>Produto original, lacrado e com procedência garantida.</span>
          </div>

          {/* Preço e Ação */}
          <div className="pt-4 border-t border-[#1F2925] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              {product.oldPrice && (
                <span className="text-xs text-[#A8B0AC]/60 line-through block">
                  De: R$ {Number(product.oldPrice).toFixed(2).replace('.', ',')}
                </span>
              )}
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-[#F7F7F5]">
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
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#18B66A] hover:bg-[#087A47] text-[#0B0F0E] font-black text-xs uppercase tracking-wider shadow-lg shadow-[#18B66A]/25 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#0B0F0E]" />
                <span>Pedir no WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="px-4 py-3 rounded-xl bg-[#0B0F0E] hover:bg-[#1a2320] text-[#A8B0AC] hover:text-[#F7F7F5] font-bold text-xs uppercase tracking-wider transition-colors border border-[#1F2925]"
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

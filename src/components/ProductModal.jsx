import React from 'react';
import { X, Snowflake, Star, ShieldCheck } from 'lucide-react';
import { STORE_CONFIG } from '../data/products';
import { useTheme } from '../context/ThemeContext';

export default function ProductModal({ product, onClose }) {
  const { isDark } = useTheme();

  if (!product) return null;

  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de consultar a disponibilidade do item *${product.name}* na MF Conveniências.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className={`relative w-full max-w-lg rounded-2xl p-6 sm:p-7 shadow-2xl overflow-hidden border ${
          isDark
            ? 'bg-[#27272A] border-[#3F3F46] text-[#FAFAFA]'
            : 'bg-white border-slate-200 text-[#0F172A]'
        }`}
      >
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 p-2 rounded-xl transition-colors ${
            isDark
              ? 'bg-[#18181B]/80 hover:bg-[#323238] text-[#A1A1AA] hover:text-[#FAFAFA]'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Imagem do Produto */}
        <div
          className={`relative w-full h-56 sm:h-64 rounded-xl overflow-hidden mb-5 ${
            isDark ? 'bg-[#18181B]' : 'bg-slate-100'
          }`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {product.badge && (
            <span
              className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black uppercase shadow-md ${
                isDark ? 'bg-[#FACC15] text-[#18181B]' : 'bg-[#FF4500] text-white'
              }`}
            >
              {product.badge}
            </span>
          )}

          {product.isCold && (
            <span
              className={`absolute top-3 right-12 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${
                isDark
                  ? 'bg-[#18181B]/80 text-[#FACC15] border-[#FACC15]/40'
                  : 'bg-white/90 text-[#00509E] border-blue-200'
              }`}
            >
              <Snowflake className={`w-3.5 h-3.5 ${isDark ? 'text-[#FACC15]' : 'text-[#00509E]'}`} />
              Super Gelada
            </span>
          )}
        </div>

        {/* Informações */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-semibold tracking-wide uppercase ${
                isDark ? 'text-[#FACC15]' : 'text-[#00509E]'
              }`}
            >
              {product.unit}
            </span>
            <div className="flex items-center gap-1 text-xs text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <span>{product.rating ? Number(product.rating).toFixed(1) : '5.0'} (Avaliação)</span>
            </div>
          </div>

          <h3
            className={`text-xl sm:text-2xl font-black leading-tight ${
              isDark ? 'text-[#FAFAFA]' : 'text-[#0F172A]'
            }`}
          >
            {product.name}
          </h3>

          <p className={`text-sm leading-relaxed ${isDark ? 'text-[#A1A1AA]' : 'text-slate-600'}`}>
            {product.description}
          </p>

          <div
            className={`flex items-center gap-2 text-xs pt-1 ${
              isDark ? 'text-[#A1A1AA]' : 'text-slate-500'
            }`}
          >
            <ShieldCheck
              className={`w-4 h-4 ${isDark ? 'text-[#FACC15]' : 'text-[#00509E]'}`}
            />
            <span>Produto original, lacrado e com procedência garantida.</span>
          </div>

          {/* Preço e Ação */}
          <div
            className={`pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
              isDark ? 'border-[#3F3F46]' : 'border-slate-100'
            }`}
          >
            <div>
              {product.oldPrice && (
                <span
                  className={`text-xs line-through block ${
                    isDark ? 'text-[#A1A1AA]/60' : 'text-slate-400'
                  }`}
                >
                  De: R$ {Number(product.oldPrice).toFixed(2).replace('.', ',')}
                </span>
              )}
              <div className="flex items-baseline gap-1">
                <span
                  className={`text-2xl sm:text-3xl font-black ${
                    isDark ? 'text-[#FACC15]' : 'text-[#FF4500]'
                  }`}
                >
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
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-[#25D366]/25 transition-all"
              >
                <img
                  src="/whatsapp-icon.png"
                  alt="WhatsApp"
                  className="w-4 h-4 rounded-sm object-contain"
                />
                <span>Pedir no WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className={`px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors border ${
                  isDark
                    ? 'bg-[#18181B] hover:bg-[#323238] text-[#A1A1AA] hover:text-[#FAFAFA] border-[#3F3F46]'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-200'
                }`}
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

import React from 'react';
import { 
  Snowflake, 
  Clock, 
  ShieldCheck, 
  ArrowDown, 
  Sparkles, 
  MessageCircle,
  MapPin
} from 'lucide-react';
import { STORE_CONFIG } from '../data/products';
import { useTheme } from '../context/ThemeContext';

export default function Hero({ onExploreClick }) {
  const { isDark } = useTheme();

  return (
    <section
      className={`relative overflow-hidden transition-colors duration-300 border-b ${
        isDark
          ? 'bg-[#18181B] border-[#3F3F46]'
          : 'bg-gradient-to-b from-[#F0F7FF] to-white border-slate-200'
      }`}
    >
      {/* 
        IMAGEM DE FUNDO DO BANNER DA MARCA EM SEGUNDO PLANO
        No desktop: preenche com as garrafas e bebidas em alta definição.
        No mobile: mantido limpo e nítido com gradiente de frescor para não manchar os textos.
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/banner-mf.jpg"
          alt="Banner Oficial MF Conveniências"
          className={`w-full h-full object-cover object-[55%_center] sm:object-center transition-all duration-300 ${
            isDark
              ? 'opacity-40 sm:opacity-100 brightness-[0.70] contrast-[1.15]'
              : 'hidden sm:block brightness-[0.88] contrast-[1.18] saturate-[1.15] sm:opacity-85'
          }`}
        />
        {/* Camadas de gradientes para contraste perfeito */}
        {isDark ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-[#18181B]/85 to-[#18181B]/60 sm:from-[#18181B] sm:via-[#18181B]/80 sm:to-[#18181B]/50" />
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#18181B] via-[#18181B]/90 via-45% to-transparent" />
            <div className="absolute -top-10 left-1/3 w-[500px] h-[300px] bg-[#FACC15]/10 blur-[130px] rounded-full" />
          </>
        ) : (
          <>
            {/* Desktop: gradiente lateral refinado para preservar a leitura à esquerda e exibir as garrafas à direita */}
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-white via-white/35 to-transparent" />
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 via-40% to-transparent" />

            {/* Mobile: fundo limpo de refrescância diurna, sem borrões ou manchas atrás do texto */}
            <div className="sm:hidden absolute inset-0 bg-gradient-to-b from-[#EBF5FF] via-white to-white" />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 sm:left-1/3 w-[350px] sm:w-[500px] h-[220px] sm:h-[300px] bg-[#00509E]/10 blur-[100px] sm:blur-[130px] rounded-full pointer-events-none" />
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto relative z-10 pt-8 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Bloco Superior */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Lado Esquerdo */}
          <div className="lg:col-span-7 space-y-6 text-center sm:text-left">
            
            {/* Tag de Identificação da Marca */}
            <div className="inline-flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <span
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-sm border ${
                  isDark
                    ? 'bg-[#FACC15]/10 border-[#FACC15]/30 text-[#FACC15]'
                    : 'bg-[#00509E]/10 border-[#00509E]/25 text-[#00509E]'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    isDark ? 'bg-[#FACC15]' : 'bg-[#00509E]'
                  }`}
                />
                <span>
                  {isDark
                    ? 'DELIVERY NOTURNO • CATÁLOGO & BALCÃO'
                    : 'REFRESCÂNCIA & AGILIDADE • CONVENIÊNCIA MF'}
                </span>
              </span>

              <a
                href={STORE_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                  isDark
                    ? 'bg-[#27272A]/90 hover:bg-[#323238] border-[#3F3F46] text-[#A1A1AA] hover:text-[#FAFAFA]'
                    : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm'
                }`}
                title="Ver no Google Maps"
              >
                <MapPin className={`w-3.5 h-3.5 ${isDark ? 'text-[#FACC15]' : 'text-[#00509E]'}`} />
                <span>{STORE_CONFIG.city}</span>
              </a>
            </div>

            {/* Headline Principal */}
            <div>
              <h1
                className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] ${
                  isDark ? 'text-[#FAFAFA]' : 'text-[#0F172A]'
                }`}
              >
                Tudo o que você precisa.{' '}
                <span
                  className={`block sm:inline ${
                    isDark ? 'text-[#FACC15]' : 'text-[#00509E]'
                  }`}
                >
                  Quando você precisa.
                </span>
              </h1>
            </div>

            {/* Descrição Comercial */}
            <p
              className={`text-sm sm:text-base md:text-lg max-w-xl mx-auto sm:mx-0 leading-relaxed font-normal ${
                isDark ? 'text-[#A1A1AA]' : 'text-slate-600'
              }`}
            >
              Bebidas trincando de geladas, snacks crocantes, doces, combos prontos e gelo. Peça pelo WhatsApp ou retire direto no balcão da MF!
            </p>

            {/* Assinatura da Marca */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold border ${
                isDark
                  ? 'bg-[#FACC15]/10 border-[#FACC15]/30 text-[#FACC15]'
                  : 'bg-blue-50 border-blue-200 text-[#00509E]'
              }`}
            >
              <span>✦</span>
              <span>Abriu a vontade? A MF resolve.</span>
            </div>

            {/* CTAs de Ação */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3.5 pt-1">
              {/* CTA Primário: Botão de Compra com paleta do modo */}
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  'Olá! Gostaria de fazer um pedido na MF Conveniências.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ${
                  isDark
                    ? 'bg-[#FACC15] hover:bg-[#EAB308] text-[#18181B] shadow-[#FACC15]/25'
                    : 'bg-[#FF4500] hover:bg-[#E03E00] text-white shadow-[#FF4500]/30'
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                <span>PEDIR AGORA</span>
              </a>

              {/* CTA Secundário */}
              <button
                onClick={onExploreClick}
                className={`flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md border ${
                  isDark
                    ? 'bg-[#27272A]/80 hover:bg-[#323238] border-[#3F3F46] hover:border-[#FACC15]/60 text-[#FAFAFA]'
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-[#00509E] text-[#00509E]'
                }`}
              >
                <Snowflake className={`w-4 h-4 ${isDark ? 'text-[#FACC15]' : 'text-[#00509E]'}`} />
                <span>VER PRODUTOS</span>
                <ArrowDown className="w-4 h-4 opacity-60" />
              </button>
            </div>

            {/* Badges de Destaques Rápidos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 max-w-lg mx-auto sm:mx-0">
              <div
                className={`flex items-center gap-2.5 p-3 rounded-xl border backdrop-blur-md ${
                  isDark
                    ? 'bg-[#27272A]/85 border-[#3F3F46]'
                    : 'bg-white/90 border-slate-200 shadow-sm'
                }`}
              >
                <div
                  className={`p-2 rounded-lg flex-shrink-0 ${
                    isDark ? 'bg-[#FACC15]/10 text-[#FACC15]' : 'bg-[#00509E]/10 text-[#00509E]'
                  }`}
                >
                  <Snowflake className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <p className={`text-xs font-bold ${isDark ? 'text-[#FAFAFA]' : 'text-[#0F172A]'}`}>
                    Super Geladas
                  </p>
                  <p className={`text-[11px] truncate ${isDark ? 'text-[#A1A1AA]' : 'text-slate-500'}`}>
                    No ponto ideal
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center gap-2.5 p-3 rounded-xl border backdrop-blur-md ${
                  isDark
                    ? 'bg-[#27272A]/85 border-[#3F3F46]'
                    : 'bg-white/90 border-slate-200 shadow-sm'
                }`}
              >
                <div
                  className={`p-2 rounded-lg flex-shrink-0 ${
                    isDark ? 'bg-[#FACC15]/10 text-[#FACC15]' : 'bg-[#00509E]/10 text-[#00509E]'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <p className={`text-xs font-bold ${isDark ? 'text-[#FAFAFA]' : 'text-[#0F172A]'}`}>
                    Retirada Rápida
                  </p>
                  <p className={`text-[11px] truncate ${isDark ? 'text-[#A1A1AA]' : 'text-slate-500'}`}>
                    Direto no Balcão
                  </p>
                </div>
              </div>

              <div
                className={`col-span-2 sm:col-span-1 flex items-center gap-2.5 p-3 rounded-xl border backdrop-blur-md ${
                  isDark
                    ? 'bg-[#27272A]/85 border-[#3F3F46]'
                    : 'bg-white/90 border-slate-200 shadow-sm'
                }`}
              >
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <p className={`text-xs font-bold ${isDark ? 'text-[#FAFAFA]' : 'text-[#0F172A]'}`}>
                    4.9 ★ Avaliações
                  </p>
                  <p className={`text-[11px] truncate ${isDark ? 'text-[#A1A1AA]' : 'text-slate-500'}`}>
                    +380 clientes
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Lado Direito: Composição Visual */}
          <div className="lg:col-span-5">
            <div
              className={`relative rounded-2xl overflow-hidden p-2.5 shadow-2xl group border ${
                isDark
                  ? 'bg-[#27272A]/90 border-[#3F3F46]'
                  : 'bg-white border-slate-200 shadow-slate-300/40'
              }`}
            >
              {/* Efeito Glow */}
              <div
                className={`absolute -inset-1 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity -z-10 ${
                  isDark
                    ? 'bg-gradient-to-r from-[#FACC15]/20 via-amber-500/15 to-transparent'
                    : 'bg-gradient-to-r from-[#00509E]/20 via-[#FF4500]/15 to-transparent'
                }`}
              />

              {/* Vitrine do Produto */}
              <div
                className={`relative rounded-xl overflow-hidden aspect-[4/3] ${
                  isDark ? 'bg-[#18181B]' : 'bg-slate-100'
                }`}
              >
                <img
                  src="/cerveja-gelada.jpg"
                  alt="Bebidas e Cervejas Super Geladas com Condensação"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                <div
                  className={`absolute inset-0 pointer-events-none ${
                    isDark
                      ? 'bg-gradient-to-t from-[#18181B] via-[#18181B]/40 to-transparent'
                      : 'bg-gradient-to-t from-slate-950/70 via-transparent to-transparent'
                  }`}
                />

                {/* Badge Flutuante: MAIS PEDIDO */}
                <div
                  className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider shadow-lg ${
                    isDark
                      ? 'bg-[#FACC15] text-[#18181B]'
                      : 'bg-[#FF4500] text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>MAIS PEDIDO</span>
                </div>

                {/* Card Inferior integrado */}
                <div
                  className={`absolute bottom-3 left-3 right-3 p-3 rounded-xl backdrop-blur-md shadow-xl flex items-center justify-between gap-3 border ${
                    isDark
                      ? 'bg-[#27272A]/95 border-[#3F3F46]'
                      : 'bg-white/95 border-slate-200'
                  }`}
                >
                  <div className="min-w-0">
                    <span
                      className={`text-[10px] font-black tracking-wider uppercase block ${
                        isDark ? 'text-[#FACC15]' : 'text-[#00509E]'
                      }`}
                    >
                      TRINCANDO NO BALCÃO
                    </span>
                    <p
                      className={`text-xs sm:text-sm font-black truncate ${
                        isDark ? 'text-[#FAFAFA]' : 'text-[#0F172A]'
                      }`}
                    >
                      Cervejas & Bebidas Geladas
                    </p>
                    <p
                      className={`text-[11px] truncate ${
                        isDark ? 'text-[#A1A1AA]' : 'text-slate-500'
                      }`}
                    >
                      Consulte o cardápio e retire na hora
                    </p>
                  </div>

                  <button
                    onClick={onExploreClick}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex-shrink-0 cursor-pointer border ${
                      isDark
                        ? 'bg-[#FACC15]/15 hover:bg-[#FACC15]/25 border-[#FACC15]/40 text-[#FACC15]'
                        : 'bg-[#00509E]/10 hover:bg-[#00509E]/20 border-[#00509E]/30 text-[#00509E]'
                    }`}
                  >
                    <span>Cardápio</span>
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

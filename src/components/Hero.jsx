import React from 'react';
import { Snowflake, Clock, ShieldCheck, ArrowDown, Sparkles } from 'lucide-react';
import Logo from './Logo';
import { STORE_CONFIG } from '../data/products';

export default function Hero({ onExploreClick }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-950 via-[#13151c] to-[#0e1015] pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-stone-800/60">
      {/* Background com a imagem oficial da MF Conveniências (enquadramento afastado e opacidade suave/discreta) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none flex items-center justify-center">
        <div className="w-full h-full max-w-7xl mx-auto flex items-center justify-center relative">
          <img
            src="/banner-mf.jpg"
            alt="MF Conveniências - Banner Fundo"
            className="w-full h-full object-contain object-center opacity-15 sm:opacity-18 filter brightness-[0.75] contrast-110"
            style={{
              maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%)',
            }}
          />
        </div>
        {/* Gradientes escurecidos para fusão perfeita e legibilidade máxima */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-[#0e1015]/60 to-[#0e1015]" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-transparent to-stone-950/85" />
      </div>

      {/* Luzes de fundo atmosféricas (glow âmbar e ouro) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none z-[1]" />
      <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-yellow-600/10 blur-[100px] rounded-full pointer-events-none z-[1]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Lado Esquerdo: Mensagem e Chamada */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>A Sua Distribuidora & Adega Favorita</span>
            </div>

            <div>
              <div className="mb-3 flex justify-center lg:justify-start">
                <Logo size="large" />
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
                Bebidas <span className="gold-gradient-text">Super Geladas</span> & Variedade ao Seu Alcance!
              </h1>
            </div>

            <p className="text-stone-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Cervejas no ponto, combos de whisky e gin, refrigerantes, gelo, carvão e os melhores petiscos (Doritos, Ruffles). Consulte nosso catálogo e retire no balcão.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <Snowflake className="w-4 h-4 text-stone-950" />
                <span>Ver Bebidas Geladas</span>
                <ArrowDown className="w-4 h-4 text-stone-950 animate-bounce" />
              </button>

              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de consultar a disponibilidade de bebidas na MF Conveniências.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-stone-900/90 hover:bg-stone-800 border border-stone-700/80 text-stone-200 hover:text-emerald-400 font-bold text-sm transition-all duration-200"
              >
                <span>Falar no WhatsApp</span>
              </a>
            </div>

            {/* Selos de Confiança e Benefícios */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-900/50 border border-stone-800/80">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <Snowflake className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-stone-100">Super Gelada</p>
                  <p className="text-[11px] text-stone-400">Na temperatura ideal</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-900/50 border border-stone-800/80">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-stone-100">Pronta Retirada</p>
                  <p className="text-[11px] text-stone-400">Direto no Balcão</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-900/50 border border-stone-800/80">
                <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-stone-100">Variedade 100%</p>
                  <p className="text-[11px] text-stone-400">Bebidas e petiscos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito: Card Visual Destaque do Banner */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-br from-stone-900/90 via-stone-950 to-stone-900 p-2 shadow-2xl shadow-amber-500/10 group">
              {/* Imagem principal representativa do ambiente da loja e variedade */}
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden">
                <img
                  src="/ambiente-loja.jpg"
                  alt="MF Conveniências - Ambiente da Loja e Variedade"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

                {/* Badge Flutuante 1: Loja Completa */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/90 backdrop-blur-md border border-amber-500/40 text-xs font-bold text-amber-300 shadow-lg">
                  <Snowflake className="w-3.5 h-3.5 text-cyan-300 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>Loja Completa & Trincando</span>
                </div>

                {/* Badge Flutuante 2: Oferta do Dia */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-stone-900/90 backdrop-blur-md border border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="inline-block text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                      Oferta em Destaque
                    </span>
                    <p className="text-sm font-bold text-stone-100">
                      Combo Red Label + 4 Red Bulls + Gelo
                    </p>
                    <p className="text-xs text-stone-400">
                      Apenas <span className="text-amber-400 font-extrabold text-sm">R$ 139,90</span>
                    </p>
                  </div>
                  <button
                    onClick={onExploreClick}
                    className="px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black uppercase transition-colors"
                  >
                    Aproveitar
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

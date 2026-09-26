import React, { useState } from 'react';
import { 
  Snowflake, 
  Clock, 
  ShieldCheck, 
  ArrowDown, 
  Sparkles, 
  Beer, 
  CupSoda, 
  Cookie, 
  Flame, 
  MessageCircle,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import Logo from './Logo';
import { STORE_CONFIG, BANNER_HIGHLIGHTS } from '../data/products';

export default function Hero({ onExploreClick, onSelectCategory }) {
  const [activeHighlight, setActiveHighlight] = useState(null);

  const handleBannerTagClick = (category) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    if (onExploreClick) {
      onExploreClick();
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#0c0e13] pt-6 sm:pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-stone-800/80">
      {/* Luzes de fundo atmosféricas e gradiente premium */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-amber-500/15 via-yellow-600/5 to-transparent blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute -top-20 right-0 w-[450px] h-[450px] bg-orange-600/10 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-amber-400/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Grid de fundo sutil para profundidade visual */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #f59e0b 1px, transparent 0)',
          backgroundSize: '36px 36px'
        }} 
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        {/* Bloco Superior: Apresentação da Loja e Destaque */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Lado Esquerdo: Mensagem, Benefícios e Chamadas */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Tag de Localização e Balcão (Sem duplicar "Loja Aberta" que já está no topo) */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <a
                href={STORE_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-stone-300 hover:text-stone-100 text-xs font-medium transition-colors"
                title="Ver localização no Google Maps"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{STORE_CONFIG.address} — {STORE_CONFIG.city}</span>
              </a>
            </div>

            {/* Título Principal com destaque limpo e sem repetição de logo */}
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-100 leading-[1.12]">
                Bebidas <span className="text-amber-400">super geladas</span> e variedade ao seu alcance
              </h1>
            </div>

            {/* Descrição Comercial Clara em tons neutros harmoniosos */}
            <p className="text-stone-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Cervejas trincando de geladas, combos completos de whisky e gin, refrigerantes 2L, gelo, carvão e petiscos crocantes (Doritos, Ruffles e Trident). Consulte o catálogo e retire direto no balcão!
            </p>

            {/* Ações / Botões com Hierarquia Visual Clara (Primário = WhatsApp | Secundário = Outline) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
              {/* CTA Primário: WhatsApp (Onde a venda acontece) */}
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de consultar a disponibilidade de bebidas e fazer um pedido na MF Conveniências.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-950/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pedir no WhatsApp</span>
              </a>

              {/* CTA Secundário: Explorar Catálogo (Contorno refinado, sem competir em peso visual) */}
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-stone-900/70 hover:bg-stone-800 border border-stone-700/80 hover:border-amber-500/50 text-stone-200 hover:text-white font-semibold text-sm tracking-wide transition-all duration-200 cursor-pointer"
              >
                <Snowflake className="w-4 h-4 text-amber-400" />
                <span>Ver Bebidas Geladas</span>
                <ArrowDown className="w-4 h-4 text-stone-400" />
              </button>
            </div>

            {/* Destaques Rápidos em Badges Padronizadas (rounded-xl) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-900/60 border border-stone-800/80">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 flex-shrink-0">
                  <Snowflake className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-xs font-bold text-stone-200">Super Gelada</p>
                  <p className="text-[11px] text-stone-400 truncate">No ponto ideal</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-900/60 border border-stone-800/80">
                <div className="p-2 rounded-lg bg-stone-800 text-stone-300 flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-xs font-bold text-stone-200">Retirada Rápida</p>
                  <p className="text-[11px] text-stone-400 truncate">Direto no Balcão</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 p-3 rounded-xl bg-stone-900/60 border border-stone-800/80">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-xs font-bold text-stone-200">4.9 ★ Avaliações</p>
                  <p className="text-[11px] text-stone-400 truncate">+380 clientes</p>
                </div>
              </div>
            </div>

          </div>

          {/* Lado Direito: Vitrine com Foto Real de Produto Gelado com Gotas de Condensação */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-stone-800 bg-stone-900/70 p-2 shadow-2xl group">
              
              {/* Glow sutil ao fundo */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent rounded-2xl blur-xl opacity-60 group-hover:opacity-90 transition-opacity -z-10" />

              {/* Foto Real de Bebidas no Balde com Gelo e Condensação */}
              <div className="relative rounded-xl overflow-hidden bg-stone-950 aspect-[4/3] sm:aspect-[4/3]">
                <img
                  src="/cerveja-gelada.jpg"
                  alt="Cervejas e bebidas trincando de geladas com condensação no balde de gelo"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Gradiente suave inferior integrado */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent pointer-events-none" />

                {/* Card Inferior integrado com acabamento limpo (sem botões berrantes concorrendo) */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-stone-900/90 backdrop-blur-md border border-stone-800 shadow-xl flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-amber-400 block">
                      Trincando no Balcão
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-stone-100 truncate">
                      Cervejas & Bebidas Super Geladas
                    </p>
                    <p className="text-[11px] text-stone-400 truncate">
                      Consulte o cardápio e retire na hora
                    </p>
                  </div>

                  <button
                    onClick={onExploreClick}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-700 hover:border-amber-500/60 bg-stone-800/80 hover:bg-stone-800 text-stone-200 hover:text-amber-400 text-xs font-semibold transition-all duration-200 flex-shrink-0 cursor-pointer"
                  >
                    <span>Cardápio</span>
                    <ArrowDown className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bloco Inferior: Categorias em Destaque */}
        <div className="pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Categorias em Destaque
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-stone-100">
                O que você encontra na MF Conveniências
              </h2>
            </div>
            <p className="text-xs text-stone-400">
              Clique para navegar direto no cardápio
            </p>
          </div>

          {/* Cards de Atalho Padronizados (rounded-xl) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            
            {/* 1. Cervejas & Balde de Gelo */}
            <div
              onClick={() => handleBannerTagClick('cervejas')}
              className="p-4 rounded-xl bg-stone-900/60 hover:bg-stone-900 border border-stone-800/80 hover:border-amber-500/40 transition-all duration-200 cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Beer className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 border border-stone-700">
                  Super Gelada
                </span>
              </div>
              <h3 className="text-sm font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                Cervejas & Balde
              </h3>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Heineken, Bud, Corona, Spaten & Chopp
              </p>
            </div>

            {/* 2. Refrigerantes 2 Litros */}
            <div
              onClick={() => handleBannerTagClick('refrigerantes')}
              className="p-4 rounded-xl bg-stone-900/60 hover:bg-stone-900 border border-stone-800/80 hover:border-amber-500/40 transition-all duration-200 cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-lg bg-stone-800 text-stone-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CupSoda className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 border border-stone-700">
                  PET 2L & Latas
                </span>
              </div>
              <h3 className="text-sm font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                Coca, Fanta & Pepsi
              </h3>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Refrigerantes trincando e energéticos
              </p>
            </div>

            {/* 3. Doritos, Ruffles & Trident */}
            <div
              onClick={() => handleBannerTagClick('petiscos')}
              className="p-4 rounded-xl bg-stone-900/60 hover:bg-stone-900 border border-stone-800/80 hover:border-amber-500/40 transition-all duration-200 cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-lg bg-stone-800 text-stone-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Cookie className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 border border-stone-700">
                  Crocantes
                </span>
              </div>
              <h3 className="text-sm font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                Doritos, Ruffles & Trident
              </h3>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Salgadinhos originais e gomas de menta
              </p>
            </div>

            {/* 4. Combos, Gelo & Carvão */}
            <div
              onClick={() => handleBannerTagClick('combos')}
              className="p-4 rounded-xl bg-stone-900/60 hover:bg-stone-900 border border-stone-800/80 hover:border-amber-500/40 transition-all duration-200 cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-lg bg-stone-800 text-stone-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Flame className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 border border-stone-700">
                  Econômico
                </span>
              </div>
              <h3 className="text-sm font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                Combos & Churrasco
              </h3>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Whisky, Gin, Gelo 5kg e Carvão 3kg
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

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
        {/* Bloco Superior: Cabeçalho com Apresentação da Marca */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Lado Esquerdo: Mensagem, Benefícios e Chamadas */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Tag de Status da Loja & Localização */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Loja Aberta Agora</span>
              </span>

              <a
                href={STORE_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-stone-300 hover:text-white text-xs font-medium transition-colors"
                title="Ver localização no Google Maps"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{STORE_CONFIG.address}</span>
              </a>
            </div>

            {/* Título Principal & Logo */}
            <div>
              <div className="mb-4 flex justify-center lg:justify-start">
                <Logo size="large" />
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
                Bebidas <span className="gold-gradient-text">Super Geladas</span> & Variedade ao Seu Alcance!
              </h1>
            </div>

            {/* Descrição Comercial Clara */}
            <p className="text-stone-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Cervejas trincando de geladas, combos completos de whisky e gin, refrigerantes 2L, gelo, carvão e petiscos crocantes (Doritos, Ruffles e Trident). Consulte o catálogo e retire direto no balcão!
            </p>

            {/* Ações / Botões Principais */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <Snowflake className="w-4 h-4 text-stone-950" />
                <span>Ver Bebidas Geladas</span>
                <ArrowDown className="w-4 h-4 text-stone-950 animate-bounce" />
              </button>

              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de consultar a disponibilidade de bebidas e fazer um pedido na MF Conveniências.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-600/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pedir no WhatsApp</span>
              </a>
            </div>

            {/* Destaques Rápidos em Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-3 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-stone-900/70 border border-stone-800/80 backdrop-blur-sm">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 flex-shrink-0">
                  <Snowflake className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-xs font-bold text-stone-100">Super Gelada</p>
                  <p className="text-[11px] text-stone-400 truncate">No ponto ideal</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-stone-900/70 border border-stone-800/80 backdrop-blur-sm">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-xs font-bold text-stone-100">Retirada Rápida</p>
                  <p className="text-[11px] text-stone-400 truncate">Direto no Balcão</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 p-3 rounded-2xl bg-stone-900/70 border border-stone-800/80 backdrop-blur-sm">
                <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-400 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-xs font-bold text-stone-100">4.9 ★ Avaliações</p>
                  <p className="text-[11px] text-stone-400 truncate">+380 clientes</p>
                </div>
              </div>
            </div>

          </div>

          {/* Lado Direito: Banner Oficial com Vitrine e Chamada */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 p-2.5 shadow-2xl shadow-amber-500/15 group">
              
              {/* Efeito Glow Dourado ao redor do Card */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 via-yellow-400/20 to-amber-600/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity -z-10" />

              {/* Banner com enquadramento focado */}
              <div className="relative rounded-2xl overflow-hidden bg-stone-950">
                <img
                  src="/banner-mf.jpg"
                  alt="Banner Oficial da MF Conveniências - Bebidas Geladas & Variedade ao Seu Alcance"
                  className="w-full h-auto max-h-[340px] sm:max-h-[380px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                />

                {/* Gradiente suave inferior */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent pointer-events-none" />

                {/* Badge Superior: Fachada & Banner Oficial */}
                <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/90 backdrop-blur-md border border-amber-500/50 text-[11px] font-black text-amber-300 shadow-xl">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Banner Oficial da Loja</span>
                </div>

                {/* Card Inferior sobreposto */}
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-stone-900/95 backdrop-blur-md border border-stone-700/80 shadow-2xl">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-[10px] font-black tracking-wider uppercase text-amber-400 block">
                        Balcão & Prateleira
                      </span>
                      <p className="text-xs sm:text-sm font-black text-white truncate">
                        Bebidas Geladas & Petiscos
                      </p>
                      <p className="text-[11px] text-stone-400 truncate">
                        Consulte preços e retire na hora
                      </p>
                    </div>

                    <button
                      onClick={onExploreClick}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black uppercase transition-all duration-200 flex-shrink-0 cursor-pointer shadow-md"
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

        {/* Bloco Inferior: Vitrine Panorâmica com os Destaques Reais do Banner */}
        <div className="pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                Direto do Banner
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                O que você encontra na MF Conveniências
              </h2>
            </div>
            <p className="text-xs text-stone-400">
              Clique em um dos itens para ver o catálogo imediatamente
            </p>
          </div>

          {/* Cards de Atalho com o que está no Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            
            {/* 1. Cervejas & Balde de Gelo */}
            <div
              onClick={() => handleBannerTagClick('cervejas')}
              className="p-4 rounded-2xl bg-stone-900/80 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-all duration-200 cursor-pointer group shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Beer className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  Super Gelada
                </span>
              </div>
              <h3 className="text-sm font-black text-white group-hover:text-amber-400 transition-colors">
                Cervejas & Balde
              </h3>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Heineken, Bud, Corona, Spaten & Chopp
              </p>
            </div>

            {/* 2. Refrigerantes 2 Litros */}
            <div
              onClick={() => handleBannerTagClick('refrigerantes')}
              className="p-4 rounded-2xl bg-stone-900/80 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-all duration-200 cursor-pointer group shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CupSoda className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-500/30">
                  PET 2L & Latas
                </span>
              </div>
              <h3 className="text-sm font-black text-white group-hover:text-amber-400 transition-colors">
                Coca, Fanta & Pepsi
              </h3>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Refrigerantes trincando e energéticos
              </p>
            </div>

            {/* 3. Doritos, Ruffles & Trident */}
            <div
              onClick={() => handleBannerTagClick('petiscos')}
              className="p-4 rounded-2xl bg-stone-900/80 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-all duration-200 cursor-pointer group shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Cookie className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-950 text-yellow-300 border border-yellow-500/30">
                  Crocantes
                </span>
              </div>
              <h3 className="text-sm font-black text-white group-hover:text-amber-400 transition-colors">
                Doritos, Ruffles & Trident
              </h3>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Salgadinhos originais e gomas de menta
              </p>
            </div>

            {/* 4. Combos, Gelo & Carvão */}
            <div
              onClick={() => handleBannerTagClick('combos')}
              className="p-4 rounded-2xl bg-stone-900/80 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-all duration-200 cursor-pointer group shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Flame className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-950 text-orange-300 border border-orange-500/30">
                  Econômico
                </span>
              </div>
              <h3 className="text-sm font-black text-white group-hover:text-amber-400 transition-colors">
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

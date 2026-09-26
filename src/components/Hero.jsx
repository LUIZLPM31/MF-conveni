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
    <section className="relative overflow-hidden bg-[#0c0e13] border-b border-stone-800/80">
      {/* 
        IMAGEM DE FUNDO DO BANNER DA MARCA EM SEGUNDO PLANO (Estilo Simon Xpress)
        Mostra as bebidas oficiais e o ambiente da loja no segundo plano
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/banner-mf.jpg"
          alt="Banner Oficial MF Conveniências"
          className="w-full h-full object-cover object-[55%_center] sm:object-center filter brightness-[0.78] sm:brightness-[0.82] contrast-[1.12]"
        />
        {/* Camadas de gradientes escuros profissionais (estilo Simon Xpress) para contraste impecável */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e13] via-[#0c0e13]/80 to-[#0c0e13]/60 sm:from-[#0c0e13] sm:via-[#0c0e13]/75 sm:to-[#0c0e13]/50" />
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#0c0e13] via-[#0c0e13]/85 via-45% to-transparent" />
        <div className="absolute -top-10 left-1/3 w-[500px] h-[300px] bg-amber-500/15 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 pt-8 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Bloco Superior: Grade com Mensagem à Esquerda e Composição Visual à Direita */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Lado Esquerdo: Mensagem Principal Direta e Impactante */}
          <div className="lg:col-span-7 space-y-6 text-center sm:text-left">
            
            {/* O QUE É: Tag de Identificação da Marca */}
            <div className="inline-flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18B66A]/10 border border-[#18B66A]/30 text-[#18B66A] text-xs font-bold tracking-wide shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#18B66A] animate-pulse" />
                <span>MF CONVENIÊNCIAS • BALCÃO & CATÁLOGO</span>
              </span>

              <a
                href={STORE_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121816]/90 hover:bg-[#18221E] border border-[#1F2925] text-[#A8B0AC] hover:text-[#F7F7F5] text-xs font-medium transition-colors"
                title="Ver no Google Maps"
              >
                <MapPin className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>{STORE_CONFIG.city}</span>
              </a>
            </div>

            {/* POR QUE COMPRAR AQUI: Headline Principal */}
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F7F7F5] leading-[1.08] drop-shadow-md">
                Tudo o que você precisa.{' '}
                <span className="text-[#18B66A] block sm:inline">Quando você precisa.</span>
              </h1>
            </div>

            {/* O QUE VENDE: Descrição Comercial Clara */}
            <p className="text-[#A8B0AC] text-sm sm:text-base md:text-lg max-w-xl mx-auto sm:mx-0 leading-relaxed font-normal">
              Bebidas geladas, snacks crocantes, doces, combos prontos e gelo. Peça no WhatsApp ou retire direto no balcão!
            </p>

            {/* ASSINATURA DA MARCA */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] text-xs sm:text-sm font-bold">
              <span>✦</span>
              <span>Abriu a vontade? A MF resolve.</span>
            </div>

            {/* COMO PEDIR: Ações / CTAs com Hierarquia Visual Forte */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3.5 pt-1">
              {/* CTA Primário: PEDIR AGORA (Verde Sólido de Conversão) */}
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de fazer um pedido na MF Conveniências.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#18B66A] hover:bg-[#159e5c] text-[#0B0F0E] font-black text-sm uppercase tracking-wider shadow-lg shadow-[#18B66A]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5" />
                <span>PEDIR AGORA</span>
              </a>

              {/* CTA Secundário: VER PRODUTOS (Outline com Glassmorphism) */}
              <button
                onClick={onExploreClick}
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#121816]/80 hover:bg-[#18221E] backdrop-blur-md border border-[#1F2925] hover:border-[#18B66A]/50 text-[#F7F7F5] font-bold text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md"
              >
                <Snowflake className="w-4 h-4 text-[#18B66A]" />
                <span>VER PRODUTOS</span>
                <ArrowDown className="w-4 h-4 text-[#A8B0AC]" />
              </button>
            </div>

            {/* Badges de Destaques Rápidos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 max-w-lg mx-auto sm:mx-0">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#121816]/85 backdrop-blur-md border border-[#1F2925]">
                <div className="p-2 rounded-lg bg-[#18B66A]/10 text-[#18B66A] flex-shrink-0">
                  <Snowflake className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-xs font-bold text-[#F7F7F5]">Super Geladas</p>
                  <p className="text-[11px] text-[#A8B0AC] truncate">No ponto ideal</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#121816]/85 backdrop-blur-md border border-[#1F2925]">
                <div className="p-2 rounded-lg bg-[#18B66A]/10 text-[#18B66A] flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-xs font-bold text-[#F7F7F5]">Retirada Rápida</p>
                  <p className="text-[11px] text-[#A8B0AC] truncate">Direto no Balcão</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 p-3 rounded-xl bg-[#121816]/85 backdrop-blur-md border border-[#1F2925]">
                <div className="p-2 rounded-lg bg-[#FFB800]/10 text-[#FFB800] flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-xs font-bold text-[#F7F7F5]">4.9 ★ Avaliações</p>
                  <p className="text-[11px] text-[#A8B0AC] truncate">+380 clientes</p>
                </div>
              </div>
            </div>

          </div>

          {/* Lado Direito: Composição Visual com Bebidas e Iluminação Verde Profissional */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#1F2925] bg-[#121816]/90 p-2.5 shadow-2xl group">
              
              {/* Efeito Glow com Iluminação Verde da Marca */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#18B66A]/20 via-[#087A47]/20 to-transparent rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity -z-10" />

              {/* Vitrine do Produto com Enquadramento Premium */}
              <div className="relative rounded-xl overflow-hidden bg-[#0B0F0E] aspect-[4/3]">
                <img
                  src="/cerveja-gelada.jpg"
                  alt="Bebidas e Cervejas Super Geladas com Condensação"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Gradiente escuro inferior */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0E] via-[#0B0F0E]/40 to-transparent pointer-events-none" />

                {/* Badge Flutuante: MAIS PEDIDO */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#18B66A] text-[#0B0F0E] text-[11px] font-black uppercase tracking-wider shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>MAIS PEDIDO</span>
                </div>

                {/* Card Inferior integrado com acabamento profissional */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#121816]/95 backdrop-blur-md border border-[#1F2925] shadow-xl flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[10px] font-black tracking-wider uppercase text-[#18B66A] block">
                      TRINCANDO NO BALCÃO
                    </span>
                    <p className="text-xs sm:text-sm font-black text-[#F7F7F5] truncate">
                      Cervejas & Bebidas Geladas
                    </p>
                    <p className="text-[11px] text-[#A8B0AC] truncate">
                      Consulte o cardápio e retire na hora
                    </p>
                  </div>

                  <button
                    onClick={onExploreClick}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#18B66A]/15 hover:bg-[#18221A] border border-[#18B66A]/40 text-[#18B66A] text-xs font-bold transition-all duration-200 flex-shrink-0 cursor-pointer"
                  >
                    <span>Cardápio</span>
                    <ArrowDown className="w-3.5 h-3.5" />
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

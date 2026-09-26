import React from 'react';
import { Search, PhoneCall, Clock, MapPin, ShieldCheck } from 'lucide-react';
import Logo from './Logo';
import { useProducts } from '../context/ProductContext';
import { STORE_CONFIG } from '../data/products';

export default function Navbar({ searchQuery, setSearchQuery }) {
  const { setIsAdminModalOpen, isAdminAuthenticated } = useProducts();

  return (
    <header className="sticky top-0 z-40 glass-header">
      {/* Barra superior de aviso de funcionamento */}
      <div className="bg-stone-950/90 border-b border-stone-800/60 px-4 py-1.5 text-xs text-stone-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400">Loja Aberta</span>
            <span className="hidden sm:inline text-stone-500">•</span>
            <span className="hidden sm:inline flex items-center gap-1 text-stone-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Hoje até às 02h
            </span>
          </div>

          <div className="flex items-center gap-4 text-stone-400 text-[11px] sm:text-xs">
            <a
              href={STORE_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-amber-400 transition-colors"
              title="Ver no Google Maps"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{STORE_CONFIG.city}</span>
            </a>
            <span className="text-stone-500">•</span>
            <span className="text-amber-300 font-medium">Catálogo Online • Retirada no Balcão</span>
          </div>
        </div>
      </div>

      {/* Barra de Navegação Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="hover:opacity-90 transition-opacity">
          <Logo />
        </a>

        {/* Campo de Busca Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar cerveja trincando, whisky, doritos, gelo..."
              className="w-full pl-10 pr-4 py-2 bg-stone-900/80 border border-stone-800 rounded-full text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Ações / Contato & Painel ADM (Visível apenas quando autenticado) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Botão ADM: Somente visível se o lojista já estiver logado */}
          {isAdminAuthenticated && (
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-bold transition-all duration-200"
              title="Você está conectado como Administrador"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Painel ADM</span>
            </button>
          )}

          {/* Botão Instagram Oficial */}
          <a
            href={STORE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-pink-400 text-xs font-bold transition-all duration-200"
            title="Seguir @conveniencia_mf26 no Instagram"
          >
            <svg className="w-3.5 h-3.5 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
            <span className="hidden lg:inline">@{STORE_CONFIG.instagram}</span>
            <span className="lg:hidden">Instagram</span>
          </a>

          {/* Botão WhatsApp Suporte */}
          <a
            href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de tirar uma dúvida sobre as bebidas da MF Conveniências.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:scale-105"
            title="Falar no WhatsApp"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Busca Mobile abaixo da navbar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar bebidas trincando, petiscos, gelo..."
            className="w-full pl-10 pr-4 py-2 bg-stone-900/90 border border-stone-800 rounded-full text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-all"
          />
        </div>
      </div>
    </header>
  );
}

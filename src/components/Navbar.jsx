import React from 'react';
import { Search, PhoneCall, Clock, MapPin } from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { useProducts } from '../context/ProductContext';
import { useTheme } from '../context/ThemeContext';
import { STORE_CONFIG } from '../data/products';

export default function Navbar({ searchQuery, setSearchQuery }) {
  const { setIsAdminModalOpen, isAdminAuthenticated } = useProducts();
  const { isDark } = useTheme();

  return (
    <header className="sticky top-0 z-40 glass-header transition-colors duration-300">
      {/* Barra superior de aviso de funcionamento */}
      <div
        className={`px-4 py-2 text-xs transition-colors duration-300 border-b ${
          isDark
            ? 'bg-[#141416] border-[#3F3F46]/60 text-[#A1A1AA]'
            : 'bg-[#003870] border-blue-900/40 text-blue-100'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${
                  isDark ? 'bg-[#FACC15]' : 'bg-[#38BDF8]'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isDark ? 'bg-[#FACC15]' : 'bg-[#38BDF8]'
                }`}
              />
            </span>
            <span className={`font-semibold ${isDark ? 'text-[#FAFAFA]' : 'text-white'}`}>
              {isDark ? 'Delivery Noturno Aberto' : 'Loja Aberta'}
            </span>
            <span className="hidden sm:inline opacity-40">•</span>
            <span className="hidden sm:inline flex items-center gap-1.5 opacity-90">
              <Clock className="w-3.5 h-3.5" />
              <span>Hoje até às 02h</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
            <a
              href={STORE_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 transition-colors ${
                isDark ? 'hover:text-[#FAFAFA]' : 'hover:text-white'
              }`}
              title="Ver no Google Maps"
            >
              <MapPin className={`w-3.5 h-3.5 ${isDark ? 'text-[#FACC15]' : 'text-amber-300'}`} />
              <span>{STORE_CONFIG.city}</span>
            </a>
            <span className="opacity-30 hidden sm:inline">•</span>
            <span className="hidden sm:inline">Retirada Rápida no Balcão</span>
          </div>
        </div>
      </div>

      {/* Barra de Navegação Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 sm:gap-4">
        {/* Logo da Marca */}
        <a href="#" className="hover:opacity-95 transition-opacity flex-shrink-0">
          <Logo variant="header" />
        </a>

        {/* Campo de Busca Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-6 relative">
          <div className="relative w-full">
            <Search
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
                isDark ? 'text-[#A1A1AA]' : 'text-slate-400'
              }`}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar cerveja trincando, whisky, doritos, gelo..."
              className={`w-full pl-10 pr-4 py-2 rounded-xl text-sm transition-all focus:outline-none ${
                isDark
                  ? 'bg-[#27272A] border border-[#3F3F46] text-[#FAFAFA] placeholder-[#A1A1AA]/60 focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15]/40'
                  : 'bg-white border border-slate-200 text-[#0F172A] placeholder-slate-400 shadow-inner focus:border-[#00509E] focus:ring-2 focus:ring-[#00509E]/30'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs transition-colors ${
                  isDark ? 'text-[#A1A1AA] hover:text-[#FAFAFA]' : 'text-slate-400 hover:text-slate-800'
                }`}
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Ações / Toggle de Tema & Contato & Painel ADM */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Botão de Alternância de Tema (Dark / Light) */}
          <ThemeToggle />

          {/* Botão ADM: Somente visível se o lojista já estiver logado */}
          {isAdminAuthenticated && (
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 ${
                isDark
                  ? 'border-[#FACC15]/40 bg-[#FACC15]/10 hover:bg-[#FACC15]/20 text-[#FACC15]'
                  : 'border-white/40 bg-white/10 hover:bg-white/20 text-white'
              }`}
              title="Você está conectado como Administrador"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              <span className="hidden sm:inline">Painel ADM</span>
            </button>
          )}

          {/* Botão Instagram Oficial */}
          <a
            href={STORE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 border ${
              isDark
                ? 'bg-[#27272A] hover:bg-[#3F3F46] border-[#3F3F46] text-[#A1A1AA] hover:text-pink-400'
                : 'bg-white/10 hover:bg-white/20 border-white/20 text-white hover:text-pink-200'
            }`}
            title="Seguir @conveniencia_mf26 no Instagram"
          >
            <svg
              className="w-3.5 h-3.5 text-pink-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <span>Instagram</span>
          </a>

          {/* Botão WhatsApp de Conversão Direta com a Cor de Ação do Modo */}
          <a
            href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              'Olá! Gostaria de fazer um pedido na MF Conveniências.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 shadow-md ${
              isDark
                ? 'bg-[#FACC15] hover:bg-[#EAB308] text-[#18181B] shadow-[#FACC15]/20'
                : 'bg-[#FF4500] hover:bg-[#E03E00] text-white shadow-[#FF4500]/30'
            }`}
            title="Falar no WhatsApp"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Busca Mobile abaixo da navbar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <Search
            className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
              isDark ? 'text-[#A1A1AA]' : 'text-slate-400'
            }`}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar bebidas trincando, petiscos, gelo..."
            className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs transition-all focus:outline-none ${
              isDark
                ? 'bg-[#27272A] border border-[#3F3F46] text-[#FAFAFA] placeholder-[#A1A1AA]/60 focus:border-[#FACC15]'
                : 'bg-white border border-slate-200 text-[#0F172A] placeholder-slate-400 focus:border-[#00509E]'
            }`}
          />
        </div>
      </div>
    </header>
  );
}

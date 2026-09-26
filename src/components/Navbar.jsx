import React from 'react';
import { Search, PhoneCall, Clock, MapPin, ShieldCheck } from 'lucide-react';
import Logo from './Logo';
import { useProducts } from '../context/ProductContext';
import { STORE_CONFIG } from '../data/products';

export default function Navbar({ searchQuery, setSearchQuery }) {
  const { setIsAdminModalOpen, isAdminAuthenticated } = useProducts();

  return (
    <header className="sticky top-0 z-40 glass-header">
      {/* Barra superior de aviso de funcionamento - visual discreto e refinado */}
      <div className="bg-[#0B0F0E] border-b border-[#1F2925] px-4 py-2 text-xs text-[#A8B0AC]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#18B66A] opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#18B66A]"></span>
            </span>
            <span className="font-semibold text-[#F7F7F5]">Loja Aberta</span>
            <span className="hidden sm:inline text-stone-600">•</span>
            <span className="hidden sm:inline flex items-center gap-1.5 text-[#A8B0AC]">
              <Clock className="w-3.5 h-3.5 text-[#A8B0AC]" />
              <span>Hoje até às 02h</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[#A8B0AC] text-[11px] sm:text-xs">
            <a
              href={STORE_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#F7F7F5] transition-colors"
              title="Ver no Google Maps"
            >
              <MapPin className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>{STORE_CONFIG.city}</span>
            </a>
            <span className="text-[#1F2925] hidden sm:inline">•</span>
            <span className="text-[#A8B0AC] hidden sm:inline">Retirada Rápida no Balcão</span>
          </div>
        </div>
      </div>

      {/* Barra de Navegação Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Logo da Marca */}
        <a href="#" className="hover:opacity-95 transition-opacity">
          <Logo />
        </a>

        {/* Campo de Busca Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8B0AC]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar cerveja trincando, whisky, doritos, gelo..."
              className="w-full pl-10 pr-4 py-2 bg-[#121816] border border-[#1F2925] rounded-xl text-sm text-[#F7F7F5] placeholder-[#A8B0AC]/60 focus:outline-none focus:border-[#18B66A]/70 focus:ring-1 focus:ring-[#18B66A]/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#A8B0AC] hover:text-[#F7F7F5]"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Ações / Contato & Painel ADM */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Botão ADM: Somente visível se o lojista já estiver logado */}
          {isAdminAuthenticated && (
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#18B66A]/40 bg-[#18B66A]/10 hover:bg-[#18B66A]/20 text-[#18B66A] text-xs font-semibold transition-all duration-200"
              title="Você está conectado como Administrador"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#18B66A] animate-pulse" />
              <span>Painel ADM</span>
            </button>
          )}

          {/* Botão Instagram Oficial */}
          <a
            href={STORE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#121816] hover:bg-[#18221E] border border-[#1F2925] text-[#A8B0AC] hover:text-pink-400 text-xs font-medium transition-all duration-200"
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

          {/* Botão WhatsApp de Conversão Direta */}
          <a
            href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de fazer um pedido na MF Conveniências.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#18B66A] hover:bg-[#159e5c] text-[#0B0F0E] text-xs font-black uppercase tracking-wider shadow-md shadow-[#18B66A]/20 transition-all duration-200"
            title="Falar no WhatsApp"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Busca Mobile abaixo da navbar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8B0AC]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar bebidas trincando, petiscos, gelo..."
            className="w-full pl-10 pr-4 py-2 bg-[#121816] border border-[#1F2925] rounded-xl text-xs text-[#F7F7F5] placeholder-[#A8B0AC]/60 focus:outline-none focus:border-[#18B66A]/70 transition-all"
          />
        </div>
      </div>
    </header>
  );
}

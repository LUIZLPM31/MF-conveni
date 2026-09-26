import React from 'react';
import { Heart, ShieldAlert, Phone, Lock } from 'lucide-react';
import Logo from './Logo';
import { STORE_CONFIG } from '../data/products';
import { useProducts } from '../context/ProductContext';

export default function Footer() {
  const { setIsAdminModalOpen } = useProducts();

  return (
    <footer className="bg-[#0B0F0E] border-t border-[#1F2925] pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#1F2925]">
          <div>
            <Logo size="large" showSlogan={true} />
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#121816] hover:bg-[#18221E] border border-[#1F2925] text-[#A8B0AC] hover:text-[#18B66A] text-xs font-bold transition-colors"
            >
              <Phone className="w-4 h-4 text-[#18B66A]" />
              <span>WhatsApp Oficial</span>
            </a>

            <a
              href={STORE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#121816] hover:bg-[#18221E] border border-[#1F2925] text-[#A8B0AC] hover:text-pink-400 text-xs font-bold transition-colors"
            >
              <svg className="w-4 h-4 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              <span>@{STORE_CONFIG.instagram}</span>
            </a>
          </div>
        </div>

        {/* Aviso de Responsabilidade Legal e Álcool */}
        <div className="p-4 rounded-2xl bg-[#121816] border border-[#1F2925] flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <ShieldAlert className="w-6 h-6 text-[#FFB800] flex-shrink-0" />
          <p className="text-xs text-[#A8B0AC] leading-relaxed">
            <strong className="text-[#FFB800] font-bold uppercase">Aviso de Responsabilidade:</strong> É proibida a venda e o fornecimento de bebidas alcoólicas a menores de 18 anos (Lei nº 8.069/90 e Lei nº 13.106/15). Beba com moderação. Se beber, não dirija.
          </p>
        </div>

        {/* Direitos Reservados & Acesso Restrito Discreto */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8B0AC]/70">
          <p>© {new Date().getFullYear()} {STORE_CONFIG.name}. Todos os direitos reservados.</p>
          
          <button
            onClick={() => setIsAdminModalOpen(true)}
            className="text-[#A8B0AC]/50 hover:text-[#A8B0AC] text-[11px] transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
            title="Acesso Restrito do Estabelecimento"
          >
            <Lock className="w-3 h-3 opacity-60" />
            <span>Acesso Restrito</span>
          </button>

          <p className="flex items-center gap-1">
            <span>Abriu a vontade? A MF resolve.</span>
            <Heart className="w-3.5 h-3.5 text-[#18B66A] fill-[#18B66A]" />
          </p>
        </div>

      </div>
    </footer>
  );
}

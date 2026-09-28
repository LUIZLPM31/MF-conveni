import React from 'react';
import { Heart, ShieldAlert, Lock } from 'lucide-react';
import Logo from './Logo';
import { STORE_CONFIG } from '../data/products';
import { useProducts } from '../context/ProductContext';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { setIsAdminModalOpen } = useProducts();
  const { isDark } = useTheme();

  return (
    <footer
      className={`border-t pt-12 pb-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark
          ? 'bg-[#18181B] border-[#3F3F46]'
          : 'bg-slate-50 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b ${
            isDark ? 'border-[#3F3F46]' : 'border-slate-200'
          }`}
        >
          <div>
            <Logo size="large" showSlogan={true} />
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-md shadow-[#25D366]/20 border border-white/20"
            >
              <img
                src="/whatsapp-icon.png"
                alt="WhatsApp"
                className="w-4 h-4 rounded-sm object-contain"
              />
              <span>WhatsApp Oficial</span>
            </a>

            <a
              href={STORE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors border ${
                isDark
                  ? 'bg-[#27272A] hover:bg-[#323238] border-[#3F3F46] text-[#A1A1AA] hover:text-pink-400'
                  : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-pink-600 shadow-sm'
              }`}
            >
              <svg
                className="w-4 h-4 text-pink-500"
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
              <span>@{STORE_CONFIG.instagram}</span>
            </a>
          </div>
        </div>

        {/* Aviso de Responsabilidade Legal e Álcool */}
        <div
          className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left ${
            isDark
              ? 'bg-[#27272A] border-[#3F3F46]'
              : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <ShieldAlert
            className={`w-6 h-6 flex-shrink-0 ${
              isDark ? 'text-[#FACC15]' : 'text-[#FF4500]'
            }`}
          />
          <p className={`text-xs leading-relaxed ${isDark ? 'text-[#A1A1AA]' : 'text-slate-600'}`}>
            <strong
              className={`font-bold uppercase ${
                isDark ? 'text-[#FACC15]' : 'text-[#FF4500]'
              }`}
            >
              Aviso de Responsabilidade:
            </strong>{' '}
            É proibida a venda e o fornecimento de bebidas alcoólicas a menores de 18 anos (Lei nº 8.069/90 e Lei nº 13.106/15). Beba com moderação. Se beber, não dirija.
          </p>
        </div>

        {/* Direitos Reservados & Acesso Restrito Discreto */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
            isDark ? 'text-[#A1A1AA]/70' : 'text-slate-500'
          }`}
        >
          <p>© {new Date().getFullYear()} {STORE_CONFIG.name}. Todos os direitos reservados.</p>
          
          <button
            onClick={() => setIsAdminModalOpen(true)}
            className="opacity-60 hover:opacity-100 text-[11px] transition-opacity flex items-center gap-1.5 focus:outline-none cursor-pointer"
            title="Acesso Restrito do Estabelecimento"
          >
            <Lock className="w-3 h-3" />
            <span>Acesso Restrito</span>
          </button>

          <p className="flex items-center gap-1">
            <span>Abriu a vontade? A MF resolve.</span>
            <Heart
              className={`w-3.5 h-3.5 ${
                isDark ? 'text-[#FACC15] fill-[#FACC15]' : 'text-[#FF4500] fill-[#FF4500]'
              }`}
            />
          </p>
        </div>

      </div>
    </footer>
  );
}

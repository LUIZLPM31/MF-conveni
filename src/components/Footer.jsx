import React from 'react';
import { ShieldAlert, Lock, Heart } from 'lucide-react';
import Logo from './Logo';
import { STORE_CONFIG } from '../data/products';
import { useProducts } from '../context/ProductContext';
import { whatsappUrl } from '../lib/format';

export default function Footer() {
  const { setIsAdminModalOpen } = useProducts();

  return (
    <footer className="border-t border-line bg-surface/50 pt-8 pb-20 sm:pb-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-line">
          <Logo size="md" showSlogan={true} />

          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-whatsapp hover:bg-whatsapp-strong text-white shadow-xs transition"
            >
              <img src="/whatsapp-icon.png" alt="" className="w-4 h-4 object-contain" />
              <span>WhatsApp</span>
            </a>

            <a
              href={STORE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-surface-2 hover:bg-line text-ink border border-line transition"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Aviso Legal +18 */}
        <div className="p-3.5 rounded-2xl bg-surface-2 border border-line flex items-center gap-3 text-left">
          <ShieldAlert className="w-5 h-5 text-brand flex-none" />
          <p className="text-[11px] text-muted leading-relaxed">
            <strong className="text-ink uppercase font-bold">Venda proibida para menores de 18 anos</strong> (Leis 8.069/90 e 13.106/15). Beba com moderação. Se beber, não dirija.
          </p>
        </div>

        {/* Rodapé e Admin */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-muted">
          <p>© {new Date().getFullYear()} {STORE_CONFIG.name}. Todos os direitos reservados.</p>
          
          <button
            type="button"
            onClick={() => setIsAdminModalOpen(true)}
            className="hover:text-ink transition flex items-center gap-1 cursor-pointer"
          >
            <Lock className="w-3 h-3" />
            <span>Área do Lojista</span>
          </button>

          <p className="flex items-center gap-1">
            <span>Abriu a vontade? A MF resolve.</span>
            <Heart className="w-3 h-3 text-brand fill-brand" />
          </p>
        </div>

      </div>
    </footer>
  );
}

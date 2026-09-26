import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  Navigation, 
  Copy, 
  Check 
} from 'lucide-react';
import { STORE_CONFIG } from '../data/products';

export default function StoreInfo() {
  const [copiedPix, setCopiedPix] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(STORE_CONFIG.pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1F2925]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Card 1: Horários de Funcionamento */}
        <div className="p-6 rounded-2xl bg-[#121816] border border-[#1F2925] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-[#18B66A]/10 text-[#18B66A]">
              <Clock className="w-5 h-5" />
            </div>

            <h3 className="text-xl font-bold text-[#F7F7F5] font-display">
              Horários de Atendimento
            </h3>

            <ul className="space-y-2.5 text-xs sm:text-sm text-[#A8B0AC]">
              <li className="flex justify-between pb-2 border-b border-[#1F2925]">
                <span className="text-[#A8B0AC]/80">Segunda a Quinta:</span>
                <span className="font-semibold text-[#F7F7F5]">16h às 00h</span>
              </li>
              <li className="flex justify-between pb-2 border-b border-[#1F2925]">
                <span className="text-[#A8B0AC]/80">Sexta e Sábado:</span>
                <span className="font-semibold text-[#18B66A]">14h às 03h (Madrugada)</span>
              </li>
              <li className="flex justify-between pb-2 border-b border-[#1F2925]">
                <span className="text-[#A8B0AC]/80">Domingo e Feriados:</span>
                <span className="font-semibold text-[#F7F7F5]">11h às 23h</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-[#1F2925] flex items-center gap-2 text-xs text-[#A8B0AC] font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#18B66A] opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#18B66A]"></span>
            </span>
            <span>Estamos abertos e prontos para atender você no balcão!</span>
          </div>
        </div>

        {/* Card 2: Endereço e Retirada */}
        <div className="p-6 rounded-2xl bg-[#121816] border border-[#1F2925] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-[#18B66A]/10 text-[#18B66A]">
              <MapPin className="w-5 h-5" />
            </div>

            <h3 className="text-xl font-bold text-[#F7F7F5] font-display">
              Onde Estamos
            </h3>

            <div className="space-y-1 text-xs sm:text-sm text-[#A8B0AC]">
              <p className="font-bold text-[#F7F7F5]">{STORE_CONFIG.address}</p>
              <p className="text-[#A8B0AC]">{STORE_CONFIG.city}</p>
              <p className="text-[11px] text-[#A8B0AC]/80 pt-1">
                Ponto de fácil acesso com estacionamento rápido na porta para retirada.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#1F2925] flex flex-col sm:flex-row gap-2">
            <a
              href={STORE_CONFIG.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${STORE_CONFIG.address}, ${STORE_CONFIG.city}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#18221E] hover:bg-[#1F2925] text-[#F7F7F5] text-xs font-semibold transition-colors"
            >
              <Navigation className="w-4 h-4 text-[#18B66A]" />
              <span>Google Maps</span>
            </a>

            <a
              href={STORE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#18221E] hover:bg-[#1F2925] border border-[#1F2925] text-[#A8B0AC] hover:text-pink-400 text-xs font-semibold transition-all"
            >
              <svg className="w-4 h-4 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* Card 3: Formas de Pagamento & Chave PIX */}
        <div className="p-6 rounded-2xl bg-[#121816] border border-[#1F2925] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-[#18B66A]/10 text-[#18B66A]">
              <CreditCard className="w-5 h-5" />
            </div>

            <h3 className="text-xl font-bold text-[#F7F7F5] font-display">
              Formas de Pagamento
            </h3>

            <p className="text-xs text-[#A8B0AC]">
              Facilitamos seu pagamento no balcão: PIX instantâneo, Cartão de Crédito/Débito ou Dinheiro.
            </p>

            {/* Box PIX */}
            <div className="p-3 rounded-xl bg-[#0B0F0E] border border-[#1F2925] flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[10px] text-[#A8B0AC]/60 uppercase font-bold block">
                  Chave PIX Oficial
                </span>
                <span className="text-xs font-mono text-[#18B66A] truncate block">
                  {STORE_CONFIG.pixKey}
                </span>
              </div>
              <button
                onClick={handleCopyPix}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#18221E] hover:bg-[#1F2925] text-xs text-[#F7F7F5] transition-colors flex-shrink-0 cursor-pointer"
              >
                {copiedPix ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#18B66A]" />
                    <span className="text-[#18B66A] font-semibold">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#1F2925] flex items-center gap-2 text-xs text-[#A8B0AC]">
            <ShieldCheck className="w-4 h-4 text-[#18B66A] flex-shrink-0" />
            <span>Pagamento 100% seguro no balcão ou via PIX.</span>
          </div>
        </div>

      </div>
    </section>
  );
}

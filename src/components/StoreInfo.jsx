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
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-800/80">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Card 1: Horários de Funcionamento */}
        <div className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800/80 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Clock className="w-5 h-5" />
            </div>

            <h3 className="text-xl font-black text-stone-100">
              Horários de Atendimento
            </h3>

            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300">
              <li className="flex justify-between pb-2 border-b border-stone-800">
                <span className="text-stone-400">Segunda a Quinta:</span>
                <span className="font-semibold text-stone-100">16h às 00h</span>
              </li>
              <li className="flex justify-between pb-2 border-b border-stone-800">
                <span className="text-stone-400">Sexta e Sábado:</span>
                <span className="font-semibold text-amber-400">14h às 03h (Madrugada)</span>
              </li>
              <li className="flex justify-between pb-2 border-b border-stone-800">
                <span className="text-stone-400">Domingo e Feriados:</span>
                <span className="font-semibold text-stone-100">11h às 23h</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-800 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Estamos prontos para atender você agora!</span>
          </div>
        </div>

        {/* Card 2: Endereço e Retirada */}
        <div className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800/80 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <MapPin className="w-5 h-5" />
            </div>

            <h3 className="text-xl font-black text-stone-100">
              Onde Estamos
            </h3>

            <div className="space-y-1 text-xs sm:text-sm text-stone-300">
              <p className="font-bold text-stone-100">{STORE_CONFIG.address}</p>
              <p className="text-stone-400">{STORE_CONFIG.city}</p>
              <p className="text-[11px] text-amber-300 pt-1">
                Ponto de fácil acesso com estacionamento rápido na porta para retirada.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-800 flex flex-col sm:flex-row gap-2">
            <a
              href={STORE_CONFIG.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${STORE_CONFIG.address}, ${STORE_CONFIG.city}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-bold transition-colors"
            >
              <Navigation className="w-4 h-4 text-amber-400" />
              <span>Google Maps</span>
            </a>

            <a
              href={STORE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-amber-900/30 hover:from-purple-800/60 hover:to-pink-800/60 border border-pink-500/30 text-stone-200 hover:text-white text-xs font-bold transition-all"
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
        <div className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800/80 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <CreditCard className="w-5 h-5" />
            </div>

            <h3 className="text-xl font-black text-stone-100">
              Formas de Pagamento
            </h3>

            <p className="text-xs text-stone-400">
              Facilitamos seu pagamento no balcão: PIX instantâneo, Cartão de Crédito/Débito ou Dinheiro.
            </p>

            {/* Box PIX */}
            <div className="p-3 rounded-2xl bg-stone-950/80 border border-stone-800 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[10px] text-stone-500 uppercase font-bold block">
                  Chave PIX Oficial
                </span>
                <span className="text-xs font-mono text-amber-400 truncate block">
                  {STORE_CONFIG.pixKey}
                </span>
              </div>
              <button
                onClick={handleCopyPix}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs text-stone-300 transition-colors flex-shrink-0"
              >
                {copiedPix ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copiado</span>
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

          <div className="mt-6 pt-4 border-t border-stone-800 flex items-center gap-2 text-xs text-stone-400">
            <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Pagamento 100% seguro no balcão ou via PIX.</span>
          </div>
        </div>

      </div>
    </section>
  );
}

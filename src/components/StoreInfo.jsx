import React from 'react';
import { 
  Clock, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  Navigation
} from 'lucide-react';
import { STORE_CONFIG } from '../data/products';

export default function StoreInfo() {
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

        {/* Card 3: Formas de Pagamento (PIX e Cartão) */}
        <div className="p-6 rounded-2xl bg-[#121816] border border-[#1F2925] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-[#18B66A]/10 text-[#18B66A]">
              <CreditCard className="w-5 h-5" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#F7F7F5] font-display">
                Formas de Pagamento
              </h3>
              <p className="text-xs text-[#A8B0AC] mt-1">
                Facilitamos seu pagamento no balcão de forma rápida e segura:
              </p>
            </div>

            {/* Imagem / Bloco Visual Oficial PIX */}
            <div className="p-3.5 rounded-xl bg-[#0B0F0E] border border-[#1F2925] hover:border-[#32BCAD]/50 transition-colors flex items-center gap-3.5">
              <div className="w-16 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-[#32BCAD]/30 shadow-sm bg-[#32BCAD] flex items-center justify-center">
                <img 
                  src="/pix-logo.png" 
                  alt="PIX" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-[#F7F7F5] uppercase tracking-wider">PIX</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#32BCAD]/15 text-[#32BCAD] border border-[#32BCAD]/30">Instantâneo</span>
                </div>
                <p className="text-[11px] text-[#A8B0AC] mt-0.5">Pagamento rápido via QR Code no balcão</p>
              </div>
            </div>

            {/* Imagem / Bloco Visual Cartão */}
            <div className="p-3.5 rounded-xl bg-[#0B0F0E] border border-[#1F2925] hover:border-[#18B66A]/40 transition-colors flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#18B66A]/15 border border-[#18B66A]/30 flex items-center justify-center flex-shrink-0 text-[#18B66A]">
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-black text-[#F7F7F5] uppercase tracking-wider block">
                  Cartão de Crédito & Débito
                </span>
                <div className="flex flex-wrap items-center gap-1.5 mt-1">
                  <span className="px-1.5 py-0.5 rounded bg-[#121816] text-[10px] font-bold text-sky-400 border border-[#1F2925]">Visa</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#121816] text-[10px] font-bold text-amber-400 border border-[#1F2925]">Mastercard</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#121816] text-[10px] font-bold text-rose-400 border border-[#1F2925]">Elo</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#121816] text-[10px] font-bold text-[#18B66A] border border-[#1F2925]">Aproximação</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#1F2925] flex items-center gap-2 text-xs text-[#A8B0AC]">
            <ShieldCheck className="w-4 h-4 text-[#18B66A] flex-shrink-0" />
            <span>Pagamento 100% seguro direto no balcão da conveniência.</span>
          </div>
        </div>

      </div>
    </section>
  );
}

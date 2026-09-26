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

            {/* Imagem / Bloco Visual PIX */}
            <div className="p-3.5 rounded-xl bg-[#0B0F0E] border border-[#1F2925] hover:border-[#32BCAD]/40 transition-colors flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#32BCAD]/15 border border-[#32BCAD]/30 flex items-center justify-center flex-shrink-0 text-[#32BCAD]">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 512 512">
                  <path d="M112.5 124.1c13.7-13.7 32.3-21.4 51.7-21.4h37.4l-64.8 64.8c-12.5 12.5-12.5 32.8 0 45.3l74.5 74.5-74.5 74.5c-12.5 12.5-12.5 32.8 0 45.3l64.8 64.8h-37.4c-19.4 0-38-7.7-51.7-21.4L44.8 383.2c-28.5-28.5-28.5-74.7 0-103.2l67.7-155.9zM399.5 124.1l67.7 67.7c28.5 28.5 28.5 74.7 0 103.2l-67.7 67.7c-13.7 13.7-32.3 21.4-51.7 21.4h-37.4l64.8-64.8c12.5-12.5 12.5-32.8 0-45.3l-74.5-74.5 74.5-74.5c12.5-12.5 12.5-32.8 0-45.3l-64.8-64.8h37.4c19.4 0 38 7.7 51.7 21.4z"/>
                  <path d="M217.2 233.4l38.8-38.8 38.8 38.8c12.5 12.5 32.8 12.5 45.3 0l45.9-45.9c3.2-3.2 4.9-7.5 4.9-12.1s-1.8-8.9-4.9-12.1l-92.4-92.4c-20.9-20.9-54.8-20.9-75.7 0l-92.4 92.4c-6.7 6.7-6.7 17.5 0 24.1l45.9 45.9c12.5 12.5 32.8 12.5 45.3 0l-14.2 2.9zm77.6 45.2l-38.8 38.8-38.8-38.8c-12.5-12.5-32.8-12.5-45.3 0l-45.9 45.9c-6.7 6.7-6.7 17.5 0 24.1l92.4 92.4c20.9 20.9 54.8 20.9 75.7 0l92.4-92.4c6.7-6.7 6.7-17.5 0-24.1l-45.9-45.9c-12.5-12.5-32.8-12.5-45.3 0z"/>
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-[#F7F7F5] uppercase tracking-wider">PIX</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#32BCAD]/15 text-[#32BCAD] border border-[#32BCAD]/30">Instantâneo</span>
                </div>
                <p className="text-[11px] text-[#A8B0AC] mt-0.5">Pagamento rápido via QR Code ou Chave no balcão</p>
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

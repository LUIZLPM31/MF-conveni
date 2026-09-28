import React from 'react';
import { 
  Clock, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  Navigation
} from 'lucide-react';
import { STORE_CONFIG } from '../data/products';
import { useTheme } from '../context/ThemeContext';

export default function StoreInfo() {
  const { isDark } = useTheme();

  return (
    <section
      className={`py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t transition-colors duration-300 ${
        isDark ? 'border-[#3F3F46]' : 'border-slate-200'
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Card 1: Horários de Funcionamento */}
        <div
          className={`p-6 rounded-2xl flex flex-col justify-between border transition-all duration-300 ${
            isDark
              ? 'bg-[#27272A] border-[#3F3F46]'
              : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="space-y-4">
            <div
              className={`inline-flex items-center gap-2 p-2 rounded-xl ${
                isDark ? 'bg-[#FACC15]/10 text-[#FACC15]' : 'bg-[#00509E]/10 text-[#00509E]'
              }`}
            >
              <Clock className="w-5 h-5" />
            </div>

            <h3
              className={`text-xl font-bold font-display ${
                isDark ? 'text-[#FAFAFA]' : 'text-[#0F172A]'
              }`}
            >
              Horários de Atendimento
            </h3>

            <ul
              className={`space-y-2.5 text-xs sm:text-sm ${
                isDark ? 'text-[#A1A1AA]' : 'text-slate-600'
              }`}
            >
              <li
                className={`flex justify-between pb-2 border-b ${
                  isDark ? 'border-[#3F3F46]' : 'border-slate-100'
                }`}
              >
                <span className="opacity-80">Segunda a Quinta:</span>
                <span className={`font-semibold ${isDark ? 'text-[#FAFAFA]' : 'text-[#0F172A]'}`}>
                  16h às 00h
                </span>
              </li>
              <li
                className={`flex justify-between pb-2 border-b ${
                  isDark ? 'border-[#3F3F46]' : 'border-slate-100'
                }`}
              >
                <span className="opacity-80">Sexta e Sábado:</span>
                <span
                  className={`font-semibold ${
                    isDark ? 'text-[#FACC15]' : 'text-[#00509E]'
                  }`}
                >
                  14h às 03h (Madrugada)
                </span>
              </li>
              <li
                className={`flex justify-between pb-2 border-b ${
                  isDark ? 'border-[#3F3F46]' : 'border-slate-100'
                }`}
              >
                <span className="opacity-80">Domingo e Feriados:</span>
                <span className={`font-semibold ${isDark ? 'text-[#FAFAFA]' : 'text-[#0F172A]'}`}>
                  11h às 23h
                </span>
              </li>
            </ul>
          </div>

          <div
            className={`mt-6 pt-4 border-t flex items-center gap-2 text-xs font-medium ${
              isDark
                ? 'border-[#3F3F46] text-[#A1A1AA]'
                : 'border-slate-100 text-slate-500'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${
                  isDark ? 'bg-[#FACC15]' : 'bg-[#00509E]'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isDark ? 'bg-[#FACC15]' : 'bg-[#00509E]'
                }`}
              />
            </span>
            <span>Estamos abertos e prontos para atender você no balcão!</span>
          </div>
        </div>

        {/* Card 2: Endereço e Retirada */}
        <div
          className={`p-6 rounded-2xl flex flex-col justify-between border transition-all duration-300 ${
            isDark
              ? 'bg-[#27272A] border-[#3F3F46]'
              : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="space-y-4">
            <div
              className={`inline-flex items-center gap-2 p-2 rounded-xl ${
                isDark ? 'bg-[#FACC15]/10 text-[#FACC15]' : 'bg-[#00509E]/10 text-[#00509E]'
              }`}
            >
              <MapPin className="w-5 h-5" />
            </div>

            <h3
              className={`text-xl font-bold font-display ${
                isDark ? 'text-[#FAFAFA]' : 'text-[#0F172A]'
              }`}
            >
              Onde Estamos
            </h3>

            <div
              className={`space-y-1 text-xs sm:text-sm ${
                isDark ? 'text-[#A1A1AA]' : 'text-slate-600'
              }`}
            >
              <p className={`font-bold ${isDark ? 'text-[#FAFAFA]' : 'text-[#0F172A]'}`}>
                {STORE_CONFIG.address}
              </p>
              <p>{STORE_CONFIG.city}</p>
              <p className="text-[11px] opacity-80 pt-1">
                Ponto de fácil acesso com estacionamento rápido na porta para retirada.
              </p>
            </div>
          </div>

          <div
            className={`mt-6 pt-4 border-t flex flex-col sm:flex-row gap-2 ${
              isDark ? 'border-[#3F3F46]' : 'border-slate-100'
            }`}
          >
            <a
              href={
                STORE_CONFIG.googleMapsUrl ||
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${STORE_CONFIG.address}, ${STORE_CONFIG.city}`
                )}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-colors border ${
                isDark
                  ? 'bg-[#18181B] hover:bg-[#323238] border-[#3F3F46] text-[#FAFAFA]'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-[#0F172A]'
              }`}
            >
              <Navigation className={`w-4 h-4 ${isDark ? 'text-[#FACC15]' : 'text-[#00509E]'}`} />
              <span>Google Maps</span>
            </a>

            <a
              href={STORE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                isDark
                  ? 'bg-[#18181B] hover:bg-[#323238] border-[#3F3F46] text-[#A1A1AA] hover:text-pink-400'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 hover:text-pink-600'
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
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* Card 3: Formas de Pagamento (PIX e Cartão) */}
        <div
          className={`p-6 rounded-2xl flex flex-col justify-between border transition-all duration-300 ${
            isDark
              ? 'bg-[#27272A] border-[#3F3F46]'
              : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="space-y-4">
            <div
              className={`inline-flex items-center gap-2 p-2 rounded-xl ${
                isDark ? 'bg-[#FACC15]/10 text-[#FACC15]' : 'bg-[#00509E]/10 text-[#00509E]'
              }`}
            >
              <CreditCard className="w-5 h-5" />
            </div>

            <div>
              <h3
                className={`text-xl font-bold font-display ${
                  isDark ? 'text-[#FAFAFA]' : 'text-[#0F172A]'
                }`}
              >
                Formas de Pagamento
              </h3>
              <p className={`text-xs mt-1 ${isDark ? 'text-[#A1A1AA]' : 'text-slate-500'}`}>
                Facilitamos seu pagamento no balcão de forma rápida e segura:
              </p>
            </div>

            {/* Imagem / Bloco Visual Oficial PIX */}
            <div
              className={`p-3.5 rounded-xl border flex items-center gap-3.5 transition-colors ${
                isDark
                  ? 'bg-[#18181B] border-[#3F3F46]'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="w-16 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-[#32BCAD]/30 shadow-sm bg-[#32BCAD] flex items-center justify-center">
                <img
                  src="/pix-logo.png"
                  alt="PIX"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-black uppercase tracking-wider ${
                      isDark ? 'text-[#FAFAFA]' : 'text-[#0F172A]'
                    }`}
                  >
                    PIX
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#32BCAD]/15 text-[#32BCAD] border border-[#32BCAD]/30">
                    Instantâneo
                  </span>
                </div>
                <p className={`text-[11px] mt-0.5 ${isDark ? 'text-[#A1A1AA]' : 'text-slate-500'}`}>
                  Pagamento rápido via QR Code no balcão
                </p>
              </div>
            </div>

            {/* Imagem / Bloco Visual Cartão */}
            <div
              className={`p-3.5 rounded-xl border flex items-center gap-3 transition-colors ${
                isDark
                  ? 'bg-[#18181B] border-[#3F3F46]'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                  isDark
                    ? 'bg-[#FACC15]/15 border-[#FACC15]/30 text-[#FACC15]'
                    : 'bg-[#00509E]/10 border-[#00509E]/25 text-[#00509E]'
                }`}
              >
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <span
                  className={`text-xs font-black uppercase tracking-wider block ${
                    isDark ? 'text-[#FAFAFA]' : 'text-[#0F172A]'
                  }`}
                >
                  Cartão de Crédito & Débito
                </span>
                <div className="flex flex-wrap items-center gap-1.5 mt-1">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                      isDark
                        ? 'bg-[#27272A] text-sky-400 border-[#3F3F46]'
                        : 'bg-white text-sky-600 border-slate-200'
                    }`}
                  >
                    Visa
                  </span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                      isDark
                        ? 'bg-[#27272A] text-amber-400 border-[#3F3F46]'
                        : 'bg-white text-amber-600 border-slate-200'
                    }`}
                  >
                    Mastercard
                  </span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                      isDark
                        ? 'bg-[#27272A] text-rose-400 border-[#3F3F46]'
                        : 'bg-white text-rose-600 border-slate-200'
                    }`}
                  >
                    Elo
                  </span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                      isDark
                        ? 'bg-[#27272A] text-[#FACC15] border-[#3F3F46]'
                        : 'bg-white text-[#00509E] border-slate-200'
                    }`}
                  >
                    Aproximação
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`mt-6 pt-4 border-t flex items-center gap-2 text-xs ${
              isDark
                ? 'border-[#3F3F46] text-[#A1A1AA]'
                : 'border-slate-100 text-slate-500'
            }`}
          >
            <ShieldCheck
              className={`w-4 h-4 flex-shrink-0 ${
                isDark ? 'text-[#FACC15]' : 'text-[#00509E]'
              }`}
            />
            <span>Pagamento 100% seguro direto no balcão da conveniência.</span>
          </div>
        </div>

      </div>
    </section>
  );
}

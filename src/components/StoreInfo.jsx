import React from 'react';
import { 
  Clock, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  Navigation
} from 'lucide-react';
import { STORE_CONFIG } from '../data/products';
import { useStoreStatus, formatHour } from '../lib/storeHours';

export default function StoreInfo() {
  const status = useStoreStatus();

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-line transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: Horários */}
        <div className="p-5 rounded-2xl bg-surface border border-line flex flex-col justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-brand/15 text-brand">
              <Clock className="w-5 h-5 text-brand" />
            </div>

            <div>
              <h3 className="text-base font-extrabold text-ink font-display">
                Horários de Atendimento
              </h3>
              <p className="text-xs text-muted flex items-center gap-1.5 mt-0.5">
                <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-success animate-pulse' : 'bg-danger'}`} />
                <span className="font-semibold text-ink">{status.label}</span>
                <span>· {status.detail}</span>
              </p>
            </div>

            <ul className="space-y-2 text-xs text-muted pt-2 border-t border-line">
              {STORE_CONFIG.schedule?.map((item) => (
                <li key={item.label} className="flex justify-between items-center">
                  <span>{item.label}:</span>
                  <span className="font-bold text-ink">
                    {formatHour(item.open)} às {formatHour(item.close)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Card 2: Endereço & Retirada */}
        <div className="p-5 rounded-2xl bg-surface border border-line flex flex-col justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-brand/15 text-brand">
              <MapPin className="w-5 h-5 text-brand" />
            </div>

            <div>
              <h3 className="text-base font-extrabold text-ink font-display">
                Retirada no Balcão
              </h3>
              <p className="text-xs font-bold text-ink mt-0.5">
                {STORE_CONFIG.address}
              </p>
              <p className="text-xs text-muted">
                {STORE_CONFIG.city}
              </p>
            </div>

            <p className="text-[11px] text-muted/80 leading-relaxed pt-1 border-t border-line">
              Acesso fácil com parada rápida na porta para retirada imediata das suas bebidas.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-line flex gap-2">
            <a
              href={STORE_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-3 rounded-xl bg-surface-2 hover:bg-line text-ink font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
            >
              <Navigation className="w-3.5 h-3.5 text-brand" />
              <span>Rotas no Maps</span>
            </a>

            <a
              href={STORE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-xl bg-surface-2 hover:bg-line text-ink font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
              title="Instagram"
            >
              <svg className="w-4 h-4 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Card 3: Formas de Pagamento */}
        <div className="p-5 rounded-2xl bg-surface border border-line flex flex-col justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-brand/15 text-brand">
              <CreditCard className="w-5 h-5 text-brand" />
            </div>

            <div>
              <h3 className="text-base font-extrabold text-ink font-display">
                Pagamentos Aceitos
              </h3>
              <p className="text-xs text-muted mt-0.5">
                Pague no balcão da loja ou antecipado:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-ink pt-1 border-t border-line">
              <div className="p-2.5 rounded-xl bg-surface-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                <span>PIX Instantâneo</span>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Cartão Débito</span>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>Cartão Crédito</span>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Dinheiro físico</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-line flex items-center gap-1.5 text-[11px] text-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-success flex-none" />
            <span>Pagamento rápido e seguro na retirada no balcão da loja.</span>
          </div>
        </div>

      </div>
    </section>
  );
}

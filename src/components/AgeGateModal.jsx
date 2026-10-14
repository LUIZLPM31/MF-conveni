import React, { useState, useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';
import Logo from './Logo';
import Sheet from './Sheet';

export default function AgeGateModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isVerified = localStorage.getItem('mf_age_verified');
    if (!isVerified) {
      setIsOpen(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem('mf_age_verified', 'true');
    setIsOpen(false);
  };

  const handleReject = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!isOpen) return null;

  return (
    <Sheet
      open={isOpen}
      onClose={() => {}}
      dismissible={false}
      hideHeader={true}
      title="Verificação de Idade"
    >
      <div className="p-6 text-center space-y-4">
        <div className="flex justify-center">
          <Logo size="lg" withText={false} />
        </div>

        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand/20 text-brand">
          <ShieldAlert className="w-6 h-6 text-brand" />
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-ink tracking-tight font-display">
          Você tem 18 anos ou mais?
        </h2>

        <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-sm mx-auto">
          Em cumprimento à legislação brasileira (Lei nº 8.069/90 e Lei nº 13.106/15), a venda de bebidas alcoólicas é proibida para menores de 18 anos.
        </p>

        <div className="flex flex-col gap-2.5 pt-2">
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full py-3.5 px-4 rounded-full bg-brand hover:bg-brand-strong text-on-brand font-black text-sm uppercase tracking-wider shadow-md shadow-brand/20 active:scale-98 transition"
          >
            Sim, sou maior de 18 anos
          </button>

          <button
            type="button"
            onClick={handleReject}
            className="w-full py-3 px-4 rounded-full bg-surface-2 hover:bg-line text-muted font-bold text-xs uppercase tracking-wider transition"
          >
            Não, tenho menos de 18
          </button>
        </div>

        <p className="text-[11px] text-muted/70">
          Beba com responsabilidade. Se beber, não dirija.
        </p>
      </div>
    </Sheet>
  );
}

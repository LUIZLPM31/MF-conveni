import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';
import Logo from './Logo';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-stone-900 border border-amber-500/30 p-6 sm:p-8 shadow-2xl text-center">
        {/* Glow dourado */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-amber-500/20 blur-3xl -z-10" />

        <div className="flex justify-center mb-4">
          <Logo size="large" />
        </div>

        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 mb-4 border border-amber-500/20">
          <ShieldAlert className="w-6 h-6" />
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-stone-100 tracking-tight mb-2">
          Você tem 18 anos ou mais?
        </h2>

        <p className="text-stone-400 text-xs sm:text-sm leading-relaxed mb-6">
          Em cumprimento à legislação brasileira (Lei nº 8.069/90 e Lei nº 13.106/15), a venda de bebidas alcoólicas é proibida para menores de 18 anos.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleReject}
            className="w-full py-3 px-4 rounded-xl border border-stone-700 bg-stone-800/60 hover:bg-stone-800 text-stone-300 font-semibold text-sm transition-colors"
          >
            Não, tenho menos de 18
          </button>

          <button
            onClick={handleConfirm}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all"
          >
            Sim, sou maior de idade
          </button>
        </div>

        <p className="text-[11px] text-stone-500 mt-4">
          Beba com responsabilidade. Se beber, não dirija.
        </p>
      </div>
    </div>
  );
}

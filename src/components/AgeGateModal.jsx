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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F0E]/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-[#121816] border border-[#1F2925] p-6 sm:p-8 shadow-2xl text-center">
        {/* Glow verde sutil */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#18B66A]/15 blur-3xl -z-10" />

        <div className="flex justify-center mb-4">
          <Logo size="large" />
        </div>

        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#18B66A]/10 text-[#18B66A] mb-4 border border-[#18B66A]/30">
          <ShieldAlert className="w-6 h-6" />
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-[#F7F7F5] tracking-tight mb-2">
          Você tem 18 anos ou mais?
        </h2>

        <p className="text-[#A8B0AC] text-xs sm:text-sm leading-relaxed mb-6">
          Em cumprimento à legislação brasileira (Lei nº 8.069/90 e Lei nº 13.106/15), a venda de bebidas alcoólicas é proibida para menores de 18 anos.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleReject}
            className="w-full py-3 px-4 rounded-xl border border-[#1F2925] bg-[#0B0F0E] hover:bg-[#1a2320] text-[#A8B0AC] hover:text-[#F7F7F5] font-semibold text-sm transition-colors"
          >
            Não, tenho menos de 18
          </button>

          <button
            onClick={handleConfirm}
            className="w-full py-3 px-4 rounded-xl bg-[#18B66A] hover:bg-[#087A47] text-[#0B0F0E] font-black text-sm uppercase tracking-wider shadow-lg shadow-[#18B66A]/25 transition-all"
          >
            Sim, sou maior de idade
          </button>
        </div>

        <p className="text-[11px] text-[#A8B0AC]/70 mt-4">
          Beba com responsabilidade. Se beber, não dirija.
        </p>
      </div>
    </div>
  );
}

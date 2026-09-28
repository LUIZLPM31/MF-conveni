import React, { useState, useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';

export default function AgeGateModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useTheme();

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl text-center border ${
          isDark
            ? 'bg-[#27272A] border-[#3F3F46]'
            : 'bg-white border-slate-200'
        }`}
      >
        {/* Glow sutil */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 blur-3xl -z-10 ${
            isDark ? 'bg-[#FACC15]/15' : 'bg-[#00509E]/15'
          }`}
        />

        <div className="flex justify-center mb-4">
          <Logo size="large" />
        </div>

        <div
          className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 border ${
            isDark
              ? 'bg-[#FACC15]/10 text-[#FACC15] border-[#FACC15]/30'
              : 'bg-blue-50 text-[#00509E] border-blue-200'
          }`}
        >
          <ShieldAlert className="w-6 h-6" />
        </div>

        <h2
          className={`text-xl sm:text-2xl font-black tracking-tight mb-2 ${
            isDark ? 'text-[#FAFAFA]' : 'text-[#0F172A]'
          }`}
        >
          Você tem 18 anos ou mais?
        </h2>

        <p
          className={`text-xs sm:text-sm leading-relaxed mb-6 ${
            isDark ? 'text-[#A1A1AA]' : 'text-slate-600'
          }`}
        >
          Em cumprimento à legislação brasileira (Lei nº 8.069/90 e Lei nº 13.106/15), a venda de bebidas alcoólicas é proibida para menores de 18 anos.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleReject}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-colors border ${
              isDark
                ? 'border-[#3F3F46] bg-[#18181B] hover:bg-[#323238] text-[#A1A1AA] hover:text-[#FAFAFA]'
                : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Não, tenho menos de 18
          </button>

          <button
            onClick={handleConfirm}
            className={`w-full py-3 px-4 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg transition-all ${
              isDark
                ? 'bg-[#FACC15] hover:bg-[#EAB308] text-[#18181B] shadow-[#FACC15]/25'
                : 'bg-[#00509E] hover:bg-[#003B75] text-white shadow-blue-500/25'
            }`}
          >
            Sim, sou maior de idade
          </button>
        </div>

        <p className={`text-[11px] mt-4 ${isDark ? 'text-[#A1A1AA]/70' : 'text-slate-400'}`}>
          Beba com responsabilidade. Se beber, não dirija.
        </p>
      </div>
    </div>
  );
}

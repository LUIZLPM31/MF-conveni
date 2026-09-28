import React from 'react';
import { Moon, Sun, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ showLabel = true, className = '' }) {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? 'Alternar para Modo Diurno (Light)' : 'Alternar para Modo Delivery Noturno (Dark)'}
      title={isDark ? 'Mudar para Refrescância e Agilidade (Modo Diurno)' : 'Mudar para Delivery Noturno (Modo Escuro)'}
      className={`group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-300 cursor-pointer select-none border ${
        isDark
          ? 'bg-[#27272A] hover:bg-[#3F3F46] border-[#3F3F46] text-[#FAFAFA]'
          : 'bg-white/90 hover:bg-white border-slate-200 text-[#00509E] shadow-sm'
      } ${className}`}
    >
      {/* Indicador animado com ícones */}
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-4 h-4 text-[#FACC15] transform transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
        ) : (
          <Sun className="w-4 h-4 text-[#FF4500] transform transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110" />
        )}
      </div>

      {showLabel && (
        <div className="flex flex-col text-left leading-none">
          <span className="text-[10px] font-medium opacity-75">
            {isDark ? 'Tema Atual' : 'Tema Atual'}
          </span>
          <span
            className={`text-xs font-bold tracking-tight ${
              isDark ? 'text-[#FACC15]' : 'text-[#00509E]'
            }`}
          >
            {isDark ? 'Noturno' : 'Diurno'}
          </span>
        </div>
      )}

      {/* Pill com badge de destaque */}
      <span
        className={`hidden md:inline-flex items-center gap-1 text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md ${
          isDark
            ? 'bg-[#FACC15]/20 text-[#FACC15] border border-[#FACC15]/30'
            : 'bg-[#FF4500]/10 text-[#FF4500] border border-[#FF4500]/20'
        }`}
      >
        <Sparkles className="w-2.5 h-2.5" />
        {isDark ? 'Delivery' : 'Refrescante'}
      </span>
    </button>
  );
}

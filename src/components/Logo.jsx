import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Logo({ size = 'normal', showSlogan = false, className = '', variant = 'auto' }) {
  const { isDark } = useTheme();
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  // Se variant for auto, adapta ao tema; se for forçado 'light-header', usa contraste branco
  const isHeaderLight = variant === 'header' && !isDark;

  return (
    <div className={`flex flex-col select-none ${className}`}>
      <div className="flex items-center gap-3">
        {/* Símbolo Próprio da Marca "MF" */}
        <div
          className={`${
            isLarge
              ? 'w-13 h-13 rounded-2xl'
              : isSmall
              ? 'w-8 h-8 rounded-lg'
              : 'w-10 h-10 rounded-xl'
          } relative flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
            isDark
              ? 'bg-gradient-to-br from-[#27272A] to-[#18181B] border border-[#FACC15]/40 shadow-lg shadow-[#FACC15]/10'
              : 'bg-gradient-to-br from-[#00509E] to-[#003B75] border border-white/40 shadow-lg shadow-[#00509E]/20'
          }`}
        >
          {/* Coroa Dourada Minimalista da Marca */}
          <svg
            className={`${
              isLarge ? 'w-5 h-4 -top-2' : isSmall ? 'w-3 h-2.5 -top-1' : 'w-4 h-3 -top-1.5'
            } absolute text-[#FFB800] drop-shadow-[0_1px_4px_rgba(255,184,0,0.6)]`}
            viewBox="0 0 48 32"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 28L12 10L24 20L36 10L44 28L38 30H10L4 28Z" />
            <circle cx="12" cy="8" r="3" fill="#FFE082" />
            <circle cx="24" cy="18" r="2.5" fill="#FFE082" />
            <circle cx="36" cy="8" r="3" fill="#FFE082" />
          </svg>

          {/* Letras MF com peso de marca */}
          <span
            className={`${
              isLarge ? 'text-xl' : isSmall ? 'text-xs' : 'text-sm'
            } font-black tracking-tight text-white font-display`}
          >
            MF
          </span>
        </div>

        {/* Textos da Marca: MF CONVENIÊNCIAS */}
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`${
                isLarge ? 'text-2xl sm:text-3xl' : isSmall ? 'text-sm' : 'text-lg sm:text-xl'
              } font-black tracking-tight font-display transition-colors ${
                isDark || isHeaderLight ? 'text-[#FAFAFA]' : 'text-[#0F172A]'
              }`}
            >
              MF
            </span>
            <span
              className={`${
                isLarge
                  ? 'text-xs sm:text-sm tracking-[0.25em]'
                  : isSmall
                  ? 'text-[9px] tracking-[0.16em]'
                  : 'text-[11px] sm:text-xs tracking-[0.2em]'
              } font-extrabold uppercase transition-colors ${
                isDark ? 'text-[#FACC15]' : isHeaderLight ? 'text-amber-300' : 'text-[#00509E]'
              }`}
            >
              CONVENIÊNCIAS
            </span>
          </div>

          <span
            className={`${
              isLarge ? 'text-xs mt-1' : 'text-[10px] mt-0.5'
            } font-medium tracking-wide transition-colors ${
              isDark ? 'text-[#A1A1AA]' : isHeaderLight ? 'text-blue-100' : 'text-slate-500'
            }`}
          >
            Bebidas Geladas & Praticidade
          </span>
        </div>
      </div>

      {showSlogan && (
        <span
          className={`text-xs sm:text-sm font-medium mt-2 transition-colors ${
            isDark ? 'text-[#A1A1AA]' : 'text-slate-500'
          }`}
        >
          Abriu a vontade? A MF resolve.
        </span>
      )}
    </div>
  );
}

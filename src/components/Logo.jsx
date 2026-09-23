import React from 'react';

export default function Logo({ size = 'normal', showSlogan = false }) {
  const isLarge = size === 'large';

  return (
    <div className="flex flex-col select-none">
      <div className="flex items-center gap-2">
        {/* Coroa Dourada e Letras MF inspiradas no banner */}
        <div className="relative flex items-center">
          <svg
            className={`${isLarge ? 'w-10 h-8 -top-5' : 'w-7 h-5 -top-3.5'} absolute left-1 text-amber-400 drop-shadow-[0_2px_8px_rgba(245,158,11,0.6)]`}
            viewBox="0 0 48 32"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 28L12 10L24 20L36 10L44 28L38 30H10L4 28Z" />
            <circle cx="12" cy="8" r="3" fill="#FEF08A" />
            <circle cx="24" cy="18" r="2.5" fill="#FEF08A" />
            <circle cx="36" cy="8" r="3" fill="#FEF08A" />
          </svg>

          <span
            className={`${
              isLarge ? 'text-4xl md:text-5xl pt-2' : 'text-2xl md:text-3xl pt-1'
            } font-black italic tracking-tighter bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-100 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(245,158,11,0.4)] pr-1`}
          >
            MF
          </span>
        </div>

        <div className="flex flex-col leading-none">
          <span
            className={`${
              isLarge ? 'text-xl md:text-2xl tracking-[0.2em]' : 'text-xs md:text-sm tracking-[0.18em]'
            } font-extrabold uppercase text-stone-100 drop-shadow-md`}
          >
            CONVENIÊNCIAS
          </span>
          <span className="text-[9px] md:text-[10px] text-amber-400 font-medium tracking-wider uppercase">
            Bebidas Geladas
          </span>
        </div>
      </div>

      {showSlogan && (
        <span className="text-xs md:text-sm font-medium italic text-amber-300/90 mt-1">
          Bebidas Geladas & Variedade ao Seu Alcance!
        </span>
      )}
    </div>
  );
}

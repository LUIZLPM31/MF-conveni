import React from 'react';

/**
 * Marca MF: selo escuro com letras amarelas e coroa dourada.
 * size: 'sm' | 'md' | 'lg'
 */
export default function Logo({ size = 'md', withText = true, showSlogan = false, className = '' }) {
  const badge = {
    sm: 'size-9 rounded-xl text-sm',
    md: 'size-11 rounded-2xl text-base',
    lg: 'size-14 rounded-2xl text-xl',
  }[size];
  const crown = { sm: 'w-3.5 -top-1.5', md: 'w-4 -top-2', lg: 'w-5 -top-2.5' }[size];
  const title = { sm: 'text-base', md: 'text-lg', lg: 'text-2xl' }[size];

  return (
    <div className={`flex select-none items-center gap-2.5 ${className}`}>
      <div
        className={`${badge} relative grid flex-none place-items-center bg-[#171614] font-display font-black tracking-tight text-[#FFC51A] shadow-md shadow-black/20 ring-1 ring-white/10`}
        aria-hidden={withText ? 'true' : undefined}
        aria-label={withText ? undefined : 'MF Conveniências'}
      >
        <svg
          className={`${crown} absolute text-[#FFB800] drop-shadow-[0_1px_3px_rgba(255,184,0,0.6)]`}
          viewBox="0 0 48 32"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M4 28L12 10L24 20L36 10L44 28L38 30H10L4 28Z" />
          <circle cx="12" cy="8" r="3" fill="#FFE082" />
          <circle cx="24" cy="18" r="2.5" fill="#FFE082" />
          <circle cx="36" cy="8" r="3" fill="#FFE082" />
        </svg>
        MF
      </div>

      {withText && (
        <div className="flex flex-col leading-none">
          <span className={`${title} font-display font-extrabold tracking-tight`}>
            MF Conveniências
          </span>
          {showSlogan && (
            <span className="mt-1.5 text-xs font-medium text-muted">Abriu a vontade? A MF resolve.</span>
          )}
        </div>
      )}
    </div>
  );
}

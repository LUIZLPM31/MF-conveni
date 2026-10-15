import React, { useState } from 'react';

// Arquivo oficial da marca
export const LOGO_SRC = '/logo-mf.png';

/**
 * Marca MF: logotipo oficial (coroa + "MF Conveniência" sobre fundo preto).
 * Se a imagem falhar, cai para o selo SVG antigo como fallback.
 * size: 'sm' | 'md' | 'lg'
 */
export default function Logo({ size = 'md', withText = true, showSlogan = false, className = '' }) {
  const [imgFailed, setImgFailed] = useState(false);

  const badge = {
    sm: 'h-11 w-11 sm:h-12 sm:w-12 rounded-2xl',
    md: 'h-13 w-13 sm:h-14 sm:w-14 rounded-2xl',
    lg: 'h-20 w-20 rounded-3xl',
  }[size];

  const crown = { sm: 'w-3.5 -top-1.5', md: 'w-4 -top-2', lg: 'w-5 -top-2.5' }[size];
  const title = { sm: 'text-base', md: 'text-lg', lg: 'text-2xl' }[size];

  return (
    <div className={`flex select-none items-center gap-2.5 ${className}`}>
      {!imgFailed ? (
        <div
          className={`${badge} relative flex-none overflow-hidden bg-black shadow-md shadow-black/25 ring-1 ring-black/10 dark:ring-white/10 flex items-center justify-center`}
        >
          <img
            src={LOGO_SRC}
            alt={withText ? '' : 'MF Conveniência'}
            aria-hidden={withText ? 'true' : undefined}
            onError={() => setImgFailed(true)}
            className="h-full w-full object-contain p-1"
            draggable="false"
          />
        </div>
      ) : (
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
      )}

      {withText && (
        <div className="flex flex-col leading-none">
          <span className={`${title} font-display font-extrabold tracking-tight text-ink`}>
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

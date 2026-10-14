import React, { useEffect, useId } from 'react';
import { X } from 'lucide-react';

/**
 * Folha inferior (bottom sheet) no celular e modal centralizado no desktop.
 * Trava o scroll da página, fecha com Esc/backdrop (se dismissible) e
 * respeita a área segura do iPhone no rodapé.
 */
export default function Sheet({
  open,
  onClose,
  title,
  headerAction,
  children,
  footer,
  dismissible = true,
  hideHeader = false,
}) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && dismissible) onClose?.();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose, dismissible]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title && !hideHeader ? titleId : undefined}
      aria-label={hideHeader ? title : undefined}
    >
      <div
        className="absolute inset-0 animate-fade-in bg-black/55 backdrop-blur-[2px]"
        onClick={dismissible ? onClose : undefined}
        aria-hidden="true"
      />

      <div className="relative flex max-h-[92dvh] w-full animate-sheet-up flex-col overflow-hidden rounded-t-[28px] bg-surface text-ink shadow-2xl sm:max-w-md sm:rounded-[28px]">
        {/* Alça de arraste (visual) */}
        <div className="flex justify-center pt-2.5 sm:hidden" aria-hidden="true">
          <span className="h-1.5 w-10 rounded-full bg-line" />
        </div>

        {!hideHeader && (
          <div className="flex items-center justify-between gap-3 px-5 pb-3 pt-3 sm:pt-5">
            <h2 id={titleId} className="text-lg font-extrabold tracking-tight">
              {title}
            </h2>
            <div className="flex items-center gap-1">
              {headerAction}
              {dismissible && (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Fechar"
                  className="grid size-9 place-items-center rounded-full bg-surface-2 text-ink transition hover:bg-line active:scale-90"
                >
                  <X className="size-5" />
                </button>
              )}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>

        {footer && (
          <div className="border-t border-line bg-surface px-5 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

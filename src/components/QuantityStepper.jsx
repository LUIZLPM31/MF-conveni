import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

/**
 * Seletor de quantidade em pílula amarela (– 2 +).
 * Com quantidade 1, o botão da esquerda vira lixeira quando `removable`.
 */
export default function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  removable = true,
  size = 'md',
  label = 'item',
}) {
  const isSmall = size === 'sm';
  const button = isSmall ? 'size-8' : 'size-11';
  const icon = isSmall ? 'size-4' : 'size-5';
  const showTrash = removable && quantity <= 1;

  return (
    <div
      className={`inline-flex items-center rounded-full bg-brand text-on-brand shadow-md shadow-black/10 ${
        isSmall ? 'h-8' : 'h-11'
      }`}
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        onClick={onDecrement}
        aria-label={showTrash ? `Remover ${label}` : `Diminuir quantidade de ${label}`}
        className={`${button} grid place-items-center rounded-full transition hover:bg-black/10 active:scale-90`}
      >
        {showTrash ? <Trash2 className={isSmall ? 'size-3.5' : 'size-4'} /> : <Minus className={icon} />}
      </button>
      <span
        key={quantity}
        className={`animate-pop text-center font-extrabold tabular-nums ${
          isSmall ? 'min-w-5 text-sm' : 'min-w-7 text-base'
        }`}
        aria-live="polite"
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        aria-label={`Aumentar quantidade de ${label}`}
        className={`${button} grid place-items-center rounded-full transition hover:bg-black/10 active:scale-90`}
      >
        <Plus className={icon} />
      </button>
    </div>
  );
}

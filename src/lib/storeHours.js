import { useEffect, useState } from 'react';
import { STORE_CONFIG } from '../data/products';

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + (m || 0);
};

/** '16:00' -> '16h' | '16:30' -> '16h30' */
export const formatHour = (hhmm) => {
  const [h, m] = hhmm.split(':');
  return m && m !== '00' ? `${h}h${m}` : `${h}h`;
};

const entryForDay = (schedule, day) => schedule.find((e) => e.days.includes(day));

/**
 * Calcula se a loja está aberta a partir de STORE_CONFIG.schedule.
 * Horários de fechamento menores ou iguais à abertura atravessam a meia-noite.
 * Feriados não são modelados (usam o horário do dia da semana).
 */
export function getStoreStatus(now = new Date(), schedule = STORE_CONFIG.schedule) {
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();

  const today = entryForDay(schedule, day);
  if (today) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);
    const end = close <= open ? 24 * 60 : close;
    if (minutes >= open && minutes < end) {
      return { isOpen: true, label: 'Aberto agora', detail: `Fecha às ${formatHour(today.close)}` };
    }
  }

  const yesterday = entryForDay(schedule, (day + 6) % 7);
  if (yesterday) {
    const open = toMinutes(yesterday.open);
    const close = toMinutes(yesterday.close);
    if (close <= open && minutes < close) {
      return { isOpen: true, label: 'Aberto agora', detail: `Fecha às ${formatHour(yesterday.close)}` };
    }
  }

  if (today && minutes < toMinutes(today.open)) {
    return { isOpen: false, label: 'Fechado', detail: `Abre hoje às ${formatHour(today.open)}` };
  }

  for (let offset = 1; offset <= 7; offset += 1) {
    const next = entryForDay(schedule, (day + offset) % 7);
    if (next) {
      const when = offset === 1 ? 'amanhã' : next.label.split(' ')[0].toLowerCase();
      return { isOpen: false, label: 'Fechado', detail: `Abre ${when} às ${formatHour(next.open)}` };
    }
  }

  return { isOpen: false, label: 'Fechado', detail: '' };
}

/** Status da loja atualizado a cada minuto. */
export function useStoreStatus() {
  const [status, setStatus] = useState(() => getStoreStatus());
  useEffect(() => {
    const id = setInterval(() => setStatus(getStoreStatus()), 60_000);
    return () => clearInterval(id);
  }, []);
  return status;
}

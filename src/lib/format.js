import { STORE_CONFIG } from '../data/products';

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

/** Formata um valor numérico como moeda brasileira (ex.: R$ 8,99). */
export function formatBRL(value) {
  return brl.format(Number(value) || 0);
}

/** Percentual de desconto inteiro, ou 0 quando não há preço antigo maior. */
export function discountPercent(product) {
  const price = Number(product?.price);
  const oldPrice = Number(product?.oldPrice);
  if (!oldPrice || !price || oldPrice <= price) return 0;
  return Math.round((1 - price / oldPrice) * 100);
}

/** Texto em minúsculas e sem acentos, para busca tolerante (carvao = Carvão). */
export function normalizeText(text = '') {
  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/** Link do WhatsApp da loja com mensagem opcional. */
export function whatsappUrl(message = '') {
  const base = `https://wa.me/${STORE_CONFIG.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

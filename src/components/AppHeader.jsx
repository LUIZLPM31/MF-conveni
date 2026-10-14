import React, { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import { ChevronDown, MapPin, Search, TrendingUp, X } from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { POPULAR_SEARCHES, STORE_CONFIG } from '../data/products';
import { whatsappUrl } from '../lib/format';
import { useStoreStatus } from '../lib/storeHours';

/**
 * Topo fixo no estilo app de delivery: local de retirada, status da loja e busca.
 * Publica a própria altura em --header-h para a barra de categorias grudar logo abaixo.
 */
const AppHeader = forwardRef(function AppHeader({ searchQuery, setSearchQuery, onSearchSubmit }, inputRef) {
  const headerRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const status = useStoreStatus();

  useLayoutEffect(() => {
    const element = headerRef.current;
    if (!element) return undefined;
    const publish = () =>
      document.documentElement.style.setProperty('--header-h', `${element.offsetHeight}px`);
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const pickSuggestion = (term) => {
    setSearchQuery(term);
    setIsFocused(false);
    inputRef?.current?.blur();
    onSearchSubmit?.();
  };

  const showSuggestions = isFocused && searchQuery.trim() === '';

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 bg-header pt-[env(safe-area-inset-top)] text-on-header shadow-[0_6px_20px_-12px_rgba(0,0,0,0.35)] transition-colors duration-300"
    >
      <div className="mx-auto max-w-6xl px-4">
        {/* Linha 1: marca, local e ações */}
        <div className="flex h-16 items-center gap-3">
          <a href="#" aria-label="MF Conveniências — início" className="flex-none transition active:scale-95">
            <Logo size="sm" withText={false} />
          </a>

          <a
            href={STORE_CONFIG.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group min-w-0 flex-1 leading-tight"
            title="Ver no Google Maps"
          >
            <span className="flex items-center gap-1.5 text-[11px] font-semibold opacity-75">
              <span
                className={`size-2 flex-none rounded-full ${status.isOpen ? 'bg-success' : 'bg-danger'} ${
                  status.isOpen ? 'animate-pulse' : ''
                }`}
              />
              <span className="truncate">
                {status.label} · {status.detail}
              </span>
            </span>
            <span className="flex items-center gap-1 text-[15px] font-extrabold">
              <MapPin className="size-4 flex-none" />
              <span className="truncate">Retirada: {STORE_CONFIG.address}</span>
              <ChevronDown className="size-4 flex-none transition-transform group-hover:translate-y-0.5" />
            </span>
          </a>

          <a
            href={whatsappUrl('Olá! Gostaria de fazer um pedido na MF Conveniências.')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-black/10 transition hover:-translate-y-0.5 hover:bg-whatsapp-strong sm:flex"
          >
            <img src="/whatsapp-icon.png" alt="" className="size-4 object-contain" />
            WhatsApp
          </a>

          <ThemeToggle />
        </div>

        {/* Linha 2: busca */}
        <div className="relative pb-3">
          <form
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              inputRef?.current?.blur();
              onSearchSubmit?.();
            }}
          >
            <label htmlFor="busca-produtos" className="sr-only">
              Buscar produtos
            </label>
            <Search className="pointer-events-none absolute left-4 top-[22px] size-5 -translate-y-1/2 text-muted" />
            <input
              ref={inputRef}
              id="busca-produtos"
              type="search"
              inputMode="search"
              enterKeyHint="search"
              autoComplete="off"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 150)}
              placeholder="Buscar cerveja, gelo, petiscos…"
              className="h-11 w-full rounded-full border border-transparent bg-surface pl-12 pr-11 text-[15px] font-medium text-ink shadow-sm outline-none transition placeholder:text-muted/80 focus:border-ink/20 focus:ring-4 focus:ring-black/5 [&::-webkit-search-cancel-button]:hidden"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  inputRef?.current?.focus();
                }}
                aria-label="Limpar busca"
                className="absolute right-1.5 top-[22px] grid size-8 -translate-y-1/2 place-items-center rounded-full bg-surface-2 text-muted transition hover:text-ink active:scale-90"
              >
                <X className="size-4" />
              </button>
            )}
          </form>

          {/* Buscas populares ao focar no campo vazio */}
          {showSuggestions && (
            <div className="absolute inset-x-0 top-[52px] z-10 animate-fade-in rounded-2xl border border-line bg-surface p-4 text-ink shadow-xl">
              <p className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted">
                <TrendingUp className="size-4" />
                Buscas populares
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => pickSuggestion(term)}
                    className="rounded-full bg-surface-2 px-3.5 py-2 text-sm font-semibold transition hover:bg-brand hover:text-on-brand active:scale-95"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
});

export default AppHeader;

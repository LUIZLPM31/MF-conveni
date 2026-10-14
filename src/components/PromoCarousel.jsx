import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const BANNERS = [
  {
    id: 'mf',
    image: '/banner-mf.jpg',
    eyebrow: 'MF Conveniências',
    title: 'Abriu a vontade?\nA MF resolve.',
    cta: 'Ver tudo',
    category: 'todos',
  },
  {
    id: 'geladas',
    image: '/cerveja-gelada.jpg',
    eyebrow: 'Trincando de gelada',
    title: 'Cervejas no ponto\npra retirar agora',
    cta: 'Ver geladas',
    category: 'cervejas',
  },
  {
    id: 'combos',
    image: '/ambiente-loja.jpg',
    eyebrow: 'Economize no rolê',
    title: 'Combos prontos\ncom gelo incluso',
    cta: 'Ver combos',
    category: 'combos',
  },
];

const AUTOPLAY_MS = 5000;

export default function PromoCarousel({ onSelectCategory }) {
  const trackRef = useRef(null);
  const pausedUntil = useRef(0);
  const [active, setActive] = useState(0);

  const scrollToIndex = (index) => {
    const track = trackRef.current;
    const slide = track?.children[index];
    if (!track || !slide) return;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft - 16, behavior: 'smooth' });
  };

  // Atualiza o indicador conforme o usuário arrasta
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const slideWidth = track.children[0]?.offsetWidth || 1;
    setActive(Math.round(track.scrollLeft / (slideWidth + 12)));
  };

  // Autoplay que pausa quando o usuário interage
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => {
      if (Date.now() < pausedUntil.current || document.hidden) return;
      setActive((current) => {
        const next = (current + 1) % BANNERS.length;
        scrollToIndex(next);
        return next;
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, []);

  const pause = () => {
    pausedUntil.current = Date.now() + 8000;
  };

  return (
    <section aria-label="Destaques" className="mx-auto max-w-6xl pt-4">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onPointerDown={pause}
        onTouchStart={pause}
        className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4"
      >
        {BANNERS.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            onClick={() => onSelectCategory(banner.category)}
            className="group relative aspect-[16/9] w-[88%] flex-none snap-start overflow-hidden rounded-3xl bg-surface-2 text-left shadow-lg shadow-black/10 sm:aspect-[21/9] sm:w-[70%] lg:w-[48%]"
            aria-label={`${banner.title.replace('\n', ' ')} — ${banner.cta}`}
          >
            <img
              src={banner.image}
              alt=""
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <span className="inline-block rounded-full bg-brand px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-on-brand">
                {banner.eyebrow}
              </span>
              <p className="mt-2 whitespace-pre-line font-display text-[22px] font-extrabold leading-[1.1] text-white sm:text-3xl">
                {banner.title}
              </p>
              <span className="mt-2.5 inline-flex items-center gap-1 text-sm font-bold text-white/90">
                {banner.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Indicadores */}
      <div className="mt-3 flex justify-center gap-1.5" role="tablist" aria-label="Selecionar destaque">
        {BANNERS.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-label={`Destaque ${index + 1}`}
            onClick={() => {
              pause();
              setActive(index);
              scrollToIndex(index);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              active === index ? 'w-6 bg-ink' : 'w-1.5 bg-ink/20'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

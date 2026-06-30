import { useState, TouchEvent, useEffect } from 'react';
import { ZoomIn } from 'lucide-react';
import type { Product } from '../data/products';

interface Props {
  product: Product;
  isSpecialEdition?: boolean;
  onClick: () => void;
  isFirst?: boolean; // Permet de cibler uniquement la première carte pour l'animation
}

export default function ProductCard({ product, isSpecialEdition, onClick, isFirst = false }: Props) {
  const [imgIndex, setImgIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const [hasHovered, setHasHovered] = useState(false);

  const hasMultipleImages = product.images.length > 1;

  // Déclenche l'indicateur visuel et l'animation sur mobile / tactile
  useEffect(() => {
    if (hasMultipleImages) {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      if (isTouchDevice) {
        setShowSwipeHint(true);
        // Masque l'indicateur après l'animation (3,5 secondes)
        const timer = setTimeout(() => setShowSwipeHint(false), 3500);
        return () => clearTimeout(timer);
      }
    }
  }, [product.images, hasMultipleImages]);

  const prev = (e: React.MouseEvent | TouchEvent) => {
    e.stopPropagation();
    setImgIndex(i => (i - 1 + product.images.length) % product.images.length);
  };

  const next = (e: React.MouseEvent | TouchEvent) => {
    e.stopPropagation();
    setImgIndex(i => (i + 1) % product.images.length);
  };

  // --- Gestion du Survol (PC) ---
  const handleMouseEnter = () => {
    if (hasMultipleImages && !hasHovered) {
      setImgIndex(1);
      setHasHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (hasMultipleImages) {
      setImgIndex(0);
      setHasHovered(false);
    }
  };

  // --- Gestion du Swipe (Mobile) ---
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setShowSwipeHint(false); // Coupe l'animation dès que l'utilisateur touche l'écran
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;
    const minSwipeDistance = 40;

    if (Math.abs(diffX) > minSwipeDistance) {
      e.stopPropagation();
      if (diffX > 0) {
        next(e);
      } else {
        prev(e);
      }
    }
    setTouchStartX(null);
  };

  // --- Gestion du clic pour Google Analytics ---
  const handleCardClick = () => {
    // 1. Envoi uniquement du nom et de l'id à Google Analytics (sans les prix textuels qui bloquent les rapports)
    if (typeof window !== 'undefined' && (window as any).gtag !== undefined) {
      (window as any).gtag('event', 'select_item', {
        item_list_id: "catalogue_principal",
        item_list_name: "Catalogue Lix'Scènes",
        items: [
          {
            item_id: product.id.toString(),
            item_name: product.name
          }
        ]
      });
    }

    // 2. Déclenchement de la modal d'origine
    onClick();
  };

  return (
    <article
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        isSpecialEdition
          ? 'bg-white border-2 border-brand-blue/30 hover:border-brand-blue hover:shadow-brand-blue/20'
          : 'bg-white border border-stone-200 hover:border-stone-400 hover:shadow-stone-300/40'
      }`}
    >
      {/* Préchargement de la deuxième image */}
      {hasMultipleImages && (
        <link rel="preload" as="image" href={product.images[1]} />
      )}

      {/* Image area */}
      <div 
        className="relative aspect-[3/4] overflow-hidden bg-stone-100 select-none touch-pan-y"
        onTouchStart={hasMultipleImages ? handleTouchStart : undefined}
        onTouchEnd={hasMultipleImages ? handleTouchEnd : undefined}
      >
        {/* Images avec animation Teaser CSS sur la toute première carte */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            animation: (isFirst && showSwipeHint) ? 'swipeTeaser 2.5s ease-in-out infinite' : 'none'
          }}
        >
          {product.images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`${product.name} — vue ${idx + 1}`}
              className={`w-full h-full object-cover object-center transition-opacity duration-500 group-hover:scale-105 pointer-events-none absolute inset-0 ${
                idx === imgIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
              }`}
            />
          ))}
        </div>

        {/* Badge "Swipe" flottant + Doigt qui bouge (Uniquement sur mobile au début) */}
        {showSwipeHint && (
          <div className="absolute top-3 right-3 z-20 pointer-events-none bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg transition-opacity duration-500">
            {/* Icône SVG d'une main/doigt qui swipe horizontalement */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              className="w-3.5 h-3.5"
              style={{ animation: 'fingerMove 1.2s ease-in-out infinite' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 1 1 3.15 0v3m-3.15-3a1.575 1.575 0 0 0-3.15 0v5.25M13.2 4.575a1.575 1.575 0 1 1 3.15 0v3m0-3a1.575 1.575 0 0 1 3.15 0v6.75a6.75 6.75 0 0 1-13.5 0v-5.25" />
            </svg>
            <span>Swipe</span>
          </div>
        )}

        {/* Special badge */}
        {isSpecialEdition && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className="text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{ background: '#1A2FA0' }}
            >
              Édition Spéciale
            </span>
          </div>
        )}

        {/* Zoom hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/5 pointer-events-none">
          <div className="bg-white/90 rounded-full p-2.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <ZoomIn size={16} className="text-stone-700" />
          </div>
        </div>

        {/* Flèches de Navigation (PC) */}
        {hasMultipleImages && (
          <>
            <div
              onClick={prev}
              role="button"
              aria-label="Image précédente"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/60 z-10 cursor-pointer"
            >
              <span className="text-xs">◀</span>
            </div>
            <div
              onClick={next}
              role="button"
              aria-label="Image suivante"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/60 z-10 cursor-pointer"
            >
              <span className="text-xs">▶</span>
            </div>

            {/* Points de Navigation */}
            <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 z-10">
              {product.images.map((_, i) => (
                <div
                  key={i}
                  onClick={e => { e.stopPropagation(); setImgIndex(i); }}
                  role="button"
                  aria-label={`Photo ${i + 1}`}
                  className={`rounded-full transition-all duration-200 cursor-pointer ${
                    i === imgIndex
                      ? 'w-4 h-1.5 bg-white'
                      : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-black text-stone-900 text-sm sm:text-base leading-tight mb-3 uppercase tracking-tight">
          {product.name}
        </h3>

        <div className="mb-4">
          <p className="text-stone-400 text-[10px] uppercase tracking-widest font-bold mb-1.5">
            Tailles
          </p>
          <span className="inline-block bg-stone-100 text-stone-700 text-xs font-semibold px-3 py-1 rounded-full border border-stone-200">
            {product.sizes}
          </span>
        </div>

        <div
          className={`mt-auto pt-3 border-t flex items-center justify-between ${
            isSpecialEdition ? 'border-brand-blue/20' : 'border-stone-100'
          }`}
        >
          <span
            className="text-xl font-black"
            style={{ color: isSpecialEdition ? '#1A2FA0' : '#C41B1B' }}
          >
            {product.price} €
          </span>
          <span className="text-stone-300 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
            <ZoomIn size={10} />
            Voir
          </span>
        </div>
      </div>

      {/* Styles des animations injectés proprement */}
      <style>{`
        /* L'image glisse légèrement à gauche, à droite, puis revient au centre */
        @keyframes swipeTeaser {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-30px); }
          50% { transform: translateX(20px); }
          75% { transform: translateX(0); }
        }
        /* Le petit doigt imite un glissement de gauche à droite */
        @keyframes fingerMove {
          0%, 100% { transform: translateX(4px); opacity: 0.4; }
          50% { transform: translateX(-4px); opacity: 1; }
        }
      `}</style>
    </article>
  );
}

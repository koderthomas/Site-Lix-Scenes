import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState, TouchEvent } from 'react';
import type { Product } from '../data/products';

interface Props {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: Props) {
  const [activeImg, setActiveImg] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(false);

  const hasMultipleImages = product.images.length > 1;

  // Bloque le défilement du body + active l'indicateur de swipe sur mobile
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';

    if (hasMultipleImages) {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      if (isTouchDevice) {
        setShowSwipeHint(true);
        const timer = setTimeout(() => setShowSwipeHint(false), 3500);
        return () => {
          window.removeEventListener('keydown', handler);
          document.body.style.overflow = '';
          clearTimeout(timer);
        };
      }
    }

    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, hasMultipleImages]);

  const prev = () => setActiveImg(i => (i - 1 + product.images.length) % product.images.length);
  const next = () => setActiveImg(i => (i + 1) % product.images.length);

  // --- Gestion du Swipe ---
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setShowSwipeHint(false); // Cache l'indice dès que l'utilisateur interagit
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (diffX > minSwipeDistance) {
      next();
    } else if (diffX < -minSwipeDistance) {
      prev();
    }
    
    setTouchStartX(null);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-stretch justify-end"
      onClick={onClose}
    >
      {/* Préchargement de toutes les images de la galerie pour une navigation instantanée */}
      {product.images.map((src, idx) => (
        <link key={idx} rel="preload" as="image" href={src} />
      ))}

      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Panel — slides from right */}
      <div
        className="relative z-10 flex flex-col bg-white w-full max-w-2xl h-full overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'slideIn 0.28s cubic-bezier(0.16,1,0.3,1)' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors"
        >
          <X size={18} className="text-stone-700" />
        </button>

        {/* Special edition badge */}
        {product.isSpecial && (
          <div className="absolute top-4 left-4 z-20">
            <span
              className="text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full"
              style={{ background: '#1A2FA0' }}
            >
              Édition Spéciale
            </span>
          </div>
        )}

        {/* Main image with navigation */}
        <div 
          className="relative bg-stone-100 shrink-0 select-none touch-pan-y overflow-hidden" 
          style={{ minHeight: '55vh' }}
          onTouchStart={hasMultipleImages ? handleTouchStart : undefined}
          onTouchEnd={hasMultipleImages ? handleTouchEnd : undefined}
        >
          {/* Wrapper avec l'animation de va-et-vient lors de l'ouverture de la modal */}
          <div
            className="w-full h-full"
            style={{
              animation: showSwipeHint ? 'swipeTeaserModal 2.5s ease-in-out infinite' : 'none'
            }}
          >
            <img
              key={activeImg}
              src={product.images[activeImg]}
              alt={`${product.name} — photo ${activeImg + 1}`}
              className="w-full h-full object-contain pointer-events-none"
              style={{ minHeight: '55vh', maxHeight: '65vh' }}
            />
          </div>

          {/* Badge "Swipe" flottant + Doigt qui bouge sur mobile au départ */}
          {showSwipeHint && (
            <div className="absolute top-4 right-16 z-20 pointer-events-none bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg transition-opacity duration-500">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                className="w-3.5 h-3.5"
                style={{ animation: 'fingerMoveModal 1.2s ease-in-out infinite' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 1 1 3.15 0v3m-3.15-3a1.575 1.575 0 0 0-3.15 0v5.25M13.2 4.575a1.575 1.575 0 1 1 3.15 0v3m0-3a1.575 1.575 0 0 1 3.15 0v6.75a6.75 6.75 0 0 1-13.5 0v-5.25" />
              </svg>
              <span>Swipe</span>
            </div>
          )}

          {hasMultipleImages && (
            <>
              <button
                onClick={prev}
                aria-label="Photo précédente"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors z-10"
              >
                <ChevronLeft size={18} className="text-stone-700" />
              </button>
              <button
                onClick={next}
                aria-label="Photo suivante"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors z-10"
              >
                <ChevronRight size={18} className="text-stone-700" />
              </button>

              {/* Dot indicator */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    aria-label={`Photo ${i + 1}`}
                    className={`rounded-full transition-all duration-200 ${
                      i === activeImg
                        ? 'w-5 h-2 bg-stone-800'
                        : 'w-2 h-2 bg-stone-400 hover:bg-stone-600'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Thumbnails row */}
        {hasMultipleImages && (
          <div className="flex gap-2 px-5 py-3 border-b border-stone-100 overflow-x-auto shrink-0">
            {product.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  i === activeImg ? 'border-stone-800' : 'border-stone-200 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={src}
                  alt={`Miniature ${i + 1}`}
                  className="w-full h-full object-cover object-top"
                />
              </button>
            ))}
          </div>
        )}

        {/* Product info */}
        <div className="flex-1 p-6 sm:p-8">
          {/* Category breadcrumb */}
          <p className="text-stone-400 text-[10px] uppercase tracking-widest font-bold mb-2">
            {product.isSpecial ? 'Édition Spéciale · Schlapp von Lixingen' : 'Collection Lix\'Scènes'}
          </p>

          <h2
            className="font-black text-stone-900 text-2xl sm:text-3xl uppercase tracking-tight leading-none mb-6"
          >
            {product.name}
          </h2>

          {/* Sizes */}
          <div className="mb-6">
            <p className="text-stone-400 text-[10px] uppercase tracking-widest font-bold mb-2">
              Tailles disponibles
            </p>
            <div className="inline-flex items-center gap-2 bg-stone-100 rounded-xl px-4 py-2.5 border border-stone-200">
              <span className="text-stone-800 font-bold text-sm">{product.sizes}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-stone-100">
            <span
              className="text-4xl font-black"
              style={{ color: product.isSpecial ? '#1A2FA0' : '#C41B1B' }}
            >
              {product.price} €
            </span>
            <span className="text-stone-400 text-sm font-medium">/ article</span>
          </div>

          {/* Info note */}
          <div className="rounded-xl bg-stone-50 border border-stone-200 p-4">
            <p className="text-stone-500 text-sm leading-relaxed">
              Cet article est disponible lors de nos événements et chez les membres de l'association. Pour toute commande, contactez-nous via nos réseaux sociaux.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        /* L'image glisse légèrement à gauche, à droite, puis revient au centre */
        @keyframes swipeTeaserModal {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-30px); }
          50% { transform: translateX(20px); }
          75% { transform: translateX(0); }
        }
        /* Le petit doigt imite un glissement de gauche à droite */
        @keyframes fingerMoveModal {
          0%, 100% { transform: translateX(4px); opacity: 0.4; }
          50% { transform: translateX(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

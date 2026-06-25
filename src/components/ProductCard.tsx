import { useState, TouchEvent } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import type { Product } from '../data/products';

interface Props {
  product: Product;
  isSpecialEdition?: boolean;
  onClick: () => void;
}

export default function ProductCard({ product, isSpecialEdition, onClick }: Props) {
  const [imgIndex, setImgIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const prev = (e: React.MouseEvent | TouchEvent) => {
    e.stopPropagation();
    setImgIndex(i => (i - 1 + product.images.length) % product.images.length);
  };

  const next = (e: React.MouseEvent | TouchEvent) => {
    e.stopPropagation();
    setImgIndex(i => (i + 1) % product.images.length);
  };

  // --- Gestion du Swipe ---
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;
    const minSwipeDistance = 40; // Seuil en pixels légèrement plus sensible pour les cartes

    if (Math.abs(diffX) > minSwipeDistance) {
      // Bloque l'ouverture de la modal liée au onClick de l'article
      e.stopPropagation();
      
      if (diffX > 0) {
        next(e);
      } else {
        prev(e);
      }
    }
    
    setTouchStartX(null);
  };
  // -------------------------

  return (
    <article
      onClick={onClick}
      className={`group rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        isSpecialEdition
          ? 'bg-white border-2 border-brand-blue/30 hover:border-brand-blue hover:shadow-brand-blue/20'
          : 'bg-white border border-stone-200 hover:border-stone-400 hover:shadow-stone-300/40'
      }`}
    >
      {/* Image area */}
      <div 
        className="relative aspect-[3/4] overflow-hidden bg-stone-100 select-none touch-pan-y"
        onTouchStart={product.images.length > 1 ? handleTouchStart : undefined}
        onTouchEnd={product.images.length > 1 ? handleTouchEnd : undefined}
      >
        <img
          key={imgIndex}
          src={product.images[imgIndex]}
          alt={`${product.name} — vue ${imgIndex + 1}`}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 pointer-events-none"
        />

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
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/10">
          <div className="bg-white/90 rounded-full p-2.5 shadow-lg">
            <ZoomIn size={16} className="text-stone-700" />
          </div>
        </div>

        {/* Image navigation — only shows if multiple images */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Image précédente"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70 z-10"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={next}
              aria-label="Image suivante"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70 z-10"
            >
              <ChevronRight size={14} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 z-10">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setImgIndex(i); }}
                  aria-label={`Photo ${i + 1}`}
                  className={`rounded-full transition-all duration-200 ${
                    i === imgIndex
                      ? 'w-4 h-1.5 bg-white'
                      : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
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
    </article>
  );
}

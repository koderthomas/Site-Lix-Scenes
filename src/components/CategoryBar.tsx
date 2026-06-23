import type { Category } from '../data/products';
import { categories, products } from '../data/products';

interface Props {
  active: Category;
  onChange: (c: Category) => void;
}

export default function CategoryBar({ active, onChange }: Props) {
  const count = (cat: Category) =>
    cat === 'tous' ? products.length : products.filter(p => p.category === cat).length;

  return (
    <div className="sticky top-16 sm:top-20 z-40 bg-[#111]/90 backdrop-blur border-b border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
          {categories.map(cat => {
            const isActive = active === cat.id;
            const isSpecial = cat.id === 'edition-speciale';
            return (
              <button
                key={cat.id}
                onClick={() => onChange(cat.id)}
                className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide transition-all duration-200 ${
                  isActive
                    ? isSpecial
                      ? 'text-white'
                      : 'bg-brand-coral text-white shadow-lg shadow-brand-coral/30'
                    : 'text-white/50 hover:text-white hover:bg-white/8'
                }`}
                style={
                  isActive && isSpecial
                    ? { background: '#1A2FA0' }
                    : undefined
                }
              >
                {cat.label}
                <span
                  className={`tabular-nums rounded-full px-1.5 py-px text-[10px] font-black ${
                    isActive ? 'bg-white/25 text-white' : 'bg-white/8 text-white/30'
                  }`}
                >
                  {count(cat.id)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

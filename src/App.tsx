import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryBar from './components/CategoryBar';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import Footer from './components/Footer';
import { products, categories } from './data/products';
import type { Category, Product } from './data/products';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('tous');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // [IDÉE : CATÉGORIES] Fonction centralisée pour changer de catégorie et envoyer le tag à GA
  const handleCategoryChange = (categoryId: Category) => {
    setActiveCategory(categoryId);

    if (typeof window !== 'undefined' && (window as any).gtag !== undefined) {
      (window as any).gtag('event', 'view_item_list', {
        item_category: categoryId
      });
    }
  };

  const filtered =
    activeCategory === 'tous'
      ? products
      : products.filter(p => p.category === activeCategory);

  const activeLabel = categories.find(c => c.id === activeCategory)?.label ?? '';
  const isSpecialEditionView = activeCategory === 'edition-speciale';

  return (
    <div className="min-h-screen bg-[#111111]">
      <Header />
      <Hero />
      {/* Utilisation de notre nouvelle fonction de changement de catégorie avec tag GA */}
      <CategoryBar active={activeCategory} onChange={handleCategoryChange} />

      <main
        className={`py-10 sm:py-14 transition-colors duration-300 ${
          isSpecialEditionView ? 'bg-[#0A0F2E]' : 'bg-stone-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="w-1 h-8 rounded-full"
                style={{ background: isSpecialEditionView ? '#2845CC' : '#C41B1B' }}
              />
              <div>
                <h2
                  className={`font-black text-xl sm:text-2xl uppercase tracking-tight ${
                    isSpecialEditionView ? 'text-white' : 'text-stone-900'
                  }`}
                >
                  {activeCategory === 'tous' ? 'Tous les articles' : activeLabel}
                </h2>
                {isSpecialEditionView && (
                  <p className="text-white/40 text-xs uppercase tracking-widest font-bold mt-0.5">
                    Schlapp von Lixingen
                  </p>
                )}
              </div>
            </div>
            <span
              className={`text-xs font-bold uppercase tracking-wider tabular-nums ${
                isSpecialEditionView ? 'text-white/30' : 'text-stone-400'
              }`}
            >
              {filtered.length} article{filtered.length > 1 ? 's' : ''}
            </span>
          </div>

          {/* Special edition intro */}
          {isSpecialEditionView && (
            <div className="mb-10 p-6 rounded-2xl border border-brand-blue/20 bg-white/5">
              <p className="text-white/70 text-sm leading-relaxed">
                La collection{' '}
                <strong className="text-white">Édition Spéciale Schlapp von Lixingen</strong>{' '}
                célèbre l'histoire et l'identité de l'association à travers un graphisme exclusif.
                Disponible en quantité limitée lors de nos événements.
              </p>
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filtered.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                isSpecialEdition={product.isSpecial}
                onClick={() => setSelectedProduct(product)}
                isFirst={index === 0} // Transmet l'info pour l'animation visuelle de Swipe
              />
            ))}
          </div>
        </div>
      </main>

      {/* Special Edition teaser */}
      {activeCategory !== 'edition-speciale' && (
        <section
          className="py-14 sm:py-20 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0D1A6B 0%, #1A2FA0 50%, #0D1A6B 100%)' }}
        >
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 bg-brand-coral" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-10 bg-brand-coral" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
              <div className="flex-1 text-center sm:text-left">
                <p className="text-brand-coral text-xs font-black uppercase tracking-[0.25em] mb-3">
                  Collection exclusive
                </p>
                <h2 className="text-white font-black text-3xl sm:text-5xl uppercase leading-tight tracking-tight mb-4">
                  Édition<br />
                  <span className="text-brand-coral">Spéciale</span>
                </h2>
                <p className="text-white/60 text-sm mb-2 font-semibold uppercase tracking-wider">
                  Schlapp von Lixingen
                </p>
                <p className="text-white/40 text-sm max-w-sm mb-8">
                  Un graphisme exclusif, deux modèles. À ne pas manquer.
                </p>
                <button
                  onClick={() => handleCategoryChange('edition-speciale')} // Tag GA envoyé ici aussi
                  className="inline-flex items-center gap-2 bg-white text-[#1A2FA0] font-black text-sm uppercase tracking-wider px-7 py-3.5 rounded-full hover:bg-brand-coral hover:text-white transition-all duration-200 shadow-xl"
                >
                  Découvrir la collection
                </button>
              </div>

              <div className="flex gap-4 shrink-0">
                {products
                  .filter(p => p.category === 'edition-speciale')
                  .map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      className="relative hover:scale-105 transition-transform duration-200"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-28 sm:w-36 h-36 sm:h-48 object-cover object-top rounded-xl border-2 border-white/20 shadow-2xl"
                      />
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />

      {/* Product modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

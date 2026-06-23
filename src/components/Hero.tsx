export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#111111]">
      {/* Split DA posters banner */}
      <div className="flex">
        {/* Summer Live #6 — main visual, landscape crop */}
        <div className="relative flex-1 h-56 sm:h-80 lg:h-96 overflow-hidden">
          <img
            src="images/articles/Direction_artistique_(3).jpg"
            alt="Summer Live #6 — 4 Juillet 2026"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          {/* Dark gradient bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
        </div>

        {/* Bonne Année — secondary, narrow strip */}
        <div className="relative w-28 sm:w-44 lg:w-56 h-56 sm:h-80 lg:h-96 overflow-hidden border-l-2 border-[#111]">
          <img
            src="images/articles/Direction_artistique_(2).jpg"
            alt="Bonne Année 2026 — Lix'Scènes"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      </div>

      {/* Title bar below posters */}
      <div className="px-4 sm:px-6 lg:px-8 py-7 sm:py-10 border-b border-white/8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <p className="text-brand-coral text-[10px] font-black uppercase tracking-[0.3em] mb-2">
              Association Lix'Scènes — Live Music
            </p>
            <h1 className="font-black text-white text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-none">
              Notre{' '}
              <span className="text-brand-coral">Collection</span>
            </h1>
            <p className="text-white/40 text-sm mt-3 max-w-md">
              Articles brodés &amp; sérigraphiés — disponibles à nos événements
            </p>
          </div>
          <div className="flex gap-6 shrink-0">
            <div className="text-center sm:text-right">
              <p className="text-white font-black text-2xl">17</p>
              <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">Articles</p>
            </div>
            <div className="w-px bg-white/10 self-stretch" />
            <div className="text-center sm:text-right">
              <p className="text-white font-black text-2xl">15 €</p>
              <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">Dès</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

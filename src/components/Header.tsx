export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-stone-950/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <img
            src="images/Logo.jpg"
            alt="Lix'Scènes Live Music"
            className="h-24 sm:h-32 w-auto object-contain"
          />
          <div className="hidden sm:flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-coral" />
            <span className="text-white/50 text-sm font-medium tracking-widest uppercase">
              Catalogue Officiel
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

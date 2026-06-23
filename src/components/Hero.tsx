export default function Hero() {
  return (
    <section className="w-full bg-stone-950 overflow-hidden">
      {/* On définit une hauteur fixe propre qui s'adapte aux écrans (téléphone, tablette, PC) */}
      <div className="flex h-[200px] sm:h-[300px] md:h-[400px] w-full">
        
        {/* 1. BANNIÈRE PRINCIPALE (GAUCHE & CENTRE) */}
        <div className="flex-[3] relative min-w-0 bg-stone-950">
          <img
            src="images/articles/Direction_artistique_long.jpg"
            alt="Summer Live #6 — 4 Juillet 2026"
            /* CORRIGÉ : object-contain affiche l'affiche SUM Live à 100% sans la tronquer */
            className="w-full h-full object-contain object-center"
          />
        </div>

        {/* 2. BANNIÈRE SECONDAIRE (DROITE) */}
        {/* Changement de bg-stone-900 à bg-white pour que le fond blanc de ton logo s'intègre parfaitement */}
        <div className="flex-1 min-w-[180px] max-w-[320px] border-l border-white/10 bg-white hidden sm:block">
          <img
            src="images/Logo.jpg"
            alt="Bonne Année 2026 — Lix'Scènes"
            /* CORRIGÉ : object-contain pour que le logo rond reste entier */
            className="w-full h-full object-contain object-center"
          />
        </div>

      </div>
    </section>
  );
}

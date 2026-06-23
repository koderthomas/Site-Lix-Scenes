import { Facebook, Instagram, Palette, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/8">

      {/* Message blocks — coral background strip */}
      <div className="border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Couleur perso */}
            <div className="rounded-2xl border border-brand-coral/20 bg-brand-coral/5 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Palette size={16} className="text-brand-coral shrink-0" />
                <p className="text-brand-coral font-black text-sm uppercase tracking-wider">
                  Une couleur en tête ? On en parle !
                </p>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                T'as flashé sur un modèle mais t'aurais préféré une autre couleur ?
              </p>
              <p className="text-white/70 text-sm leading-relaxed mt-2">
                Pas de souci ! Si tu as une idée précise ou une envie folle, viens nous en parler,
                on verra ce qu'on peut faire ensemble !
              </p>
            </div>

            {/* Merci */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Heart size={16} className="text-white/60 shrink-0" />
                <p className="text-white font-black text-sm uppercase tracking-wider">
                  Merci pour ton soutien
                </p>
                <Heart size={16} className="text-white/60 shrink-0" />
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                En achetant un produit Lix'Scènes, tu ne soutiens pas seulement notre projet,
                tu le fais <strong className="text-white">vivre</strong> !
              </p>
              <p className="text-white/70 text-sm leading-relaxed mt-2">
                Chaque vente contribue directement à l'organisation de nos concerts, à faire vibrer
                notre scène à Lixing, et à faire connaître notre passion pour la musique.
              </p>
              <p className="text-white/70 text-sm leading-relaxed mt-2">
                Et quand tu portes nos tee-shirts, sweats ou casquettes, tu deviens notre meilleur
                ambassadeur !
              </p>
              <p className="text-white font-bold text-sm mt-4">
                Alors un immense merci pour ça !
              </p>
              <p className="text-white/40 text-xs mt-1">L'équipe Lix'Scènes</p>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <img
              src="/images/Logo.jpg"
              alt="Lix'Scènes"
              className="h-12 w-auto object-contain"
            />
            <div>
              <p className="text-white font-black text-sm uppercase tracking-tight">Lix'Scènes</p>
              <p className="text-white/30 text-xs">Association Live Music</p>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/p/Lixsc%C3%A8nes-100057350264627/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook Lix'Scènes"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white bg-white/6 hover:bg-[#1877F2]/20 border border-white/10 px-3.5 py-2 rounded-full transition-all duration-200 text-sm font-medium"
            >
              <Facebook size={14} />
              <span>Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/lix.scenes/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram @lix.scenes"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white bg-white/6 hover:bg-[#E1306C]/20 border border-white/10 px-3.5 py-2 rounded-full transition-all duration-200 text-sm font-medium"
            >
              <Instagram size={14} />
              <span>@lix.scenes</span>
            </a>
          </div>

          {/* Legal */}
          <p className="text-white/15 text-xs text-center sm:text-right">
            © {new Date().getFullYear()} Lix'Scènes — Tous droits réservés
          </p>

        </div>
      </div>
    </footer>
  );
}

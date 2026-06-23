import { Download, FileText } from 'lucide-react';
import { pdfs } from '../data/products';

export default function CatalogueDownload() {
  return (
    <section className="py-12 sm:py-16" style={{ background: '#1A2FA0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest font-bold mb-1">
              Téléchargement gratuit
            </p>
            <h2 className="text-white font-black text-2xl sm:text-3xl uppercase tracking-tight">
              Catalogue PDF
            </h2>
          </div>
          <p className="text-white/60 text-sm max-w-xs">
            Retrouvez tous les visuels en haute définition dans nos catalogues officiels.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {pdfs.map((pdf) => (
            <a
              key={pdf.file}
              href={pdf.file}
              download
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-xl p-4 transition-all duration-200"
            >
              <div className="shrink-0 w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center">
                <FileText size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm truncate">{pdf.label}</p>
                <p className="text-white/50 text-xs">{pdf.description}</p>
              </div>
              <Download
                size={16}
                className="shrink-0 text-white/40 group-hover:text-white transition-colors"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

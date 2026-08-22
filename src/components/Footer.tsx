import React from 'react';
import { Phone, MessageCircle, Globe, MapPin, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#08080a] border-t border-white/10 text-zinc-400 py-16 px-6 sm:px-12 font-light text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
        {/* Col 1: Brand & CRECI (5 cols) */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/logo-cardoso.png"
                alt="Cardoso Imóveis"
                className="h-10 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)]"
              />
              <div className="border-l border-white/15 pl-3">
                <div className="text-white font-serif text-sm tracking-widest uppercase">CARDOSO IMÓVEIS</div>
                <div className="text-amber-400 text-[10px] font-mono tracking-widest uppercase">CRECI 73.567</div>
              </div>
            </div>

            <p className="text-zinc-400 max-w-sm leading-relaxed mb-6">
              Apresentação cuidadosa, organizada e exclusiva de imóveis selecionados em Alagoas.
            </p>
          </div>

          <div className="text-zinc-500 font-mono text-[11px] tracking-wider">
            © {new Date().getFullYear()} CARDOSO IMÓVEIS · TODOS OS DIREITOS RESERVADOS.
          </div>
        </div>

        {/* Col 2: Contatos (4 cols) */}
        <div className="md:col-span-4 space-y-3">
          <div className="text-amber-400 font-mono uppercase tracking-widest text-[11px] mb-4">
            CANAIS DE ATENDIMENTO
          </div>

          <div className="flex items-center gap-3 text-zinc-300">
            <Phone className="w-4 h-4 text-amber-400" />
            <span>(82) 99999-9999 / (82) 3333-3333</span>
          </div>

          <div className="flex items-center gap-3 text-zinc-300">
            <MessageCircle className="w-4 h-4 text-amber-400" />
            <a
              href="https://wa.me/5582999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors"
            >
              WhatsApp Atendimento VIP
            </a>
          </div>

          <div className="flex items-center gap-3 text-zinc-300">
            <Globe className="w-4 h-4 text-amber-400" />
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors"
            >
              @cardosoimoveis.al
            </a>
          </div>

          <div className="flex items-center gap-3 text-zinc-300 pt-2">
            <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Ponta Verde, Maceió — Alagoas</span>
          </div>
        </div>

        {/* Col 3: Legal & Links (3 cols) */}
        <div className="md:col-span-3 space-y-3">
          <div className="text-amber-400 font-mono uppercase tracking-widest text-[11px] mb-4">
            INFORMAÇÕES LEGAIS
          </div>

          <div>
            <span className="hover:text-white transition-colors cursor-pointer block py-1">
              Políticas de Privacidade
            </span>
          </div>

          <div>
            <span className="hover:text-white transition-colors cursor-pointer block py-1">
              Termos de Uso
            </span>
          </div>

          <div className="flex items-center gap-2 text-zinc-500 pt-4">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>Apresentação Verificada</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

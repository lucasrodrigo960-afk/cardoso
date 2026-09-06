import React from 'react';
import { MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0C0E11] py-16 border-t border-[#252A34]/50 text-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#252A34]/40">
          {/* Column 1: Brand */}
          <div className="md:col-span-5 space-y-3">
            <div className="font-serif text-xl text-[#F8F9FA] font-light">
              Cardoso <span className="text-[#C5A880] italic">Imóveis</span>
            </div>
            <p className="text-[#687082] font-light max-w-md leading-relaxed">
              Curadoria imobiliária de alto padrão em Alagoas. Projetos singulares que fundem autenticidade arquitetônica, paisagens costeiras e design atemporal.
            </p>
          </div>

          {/* Column 2: Broker info */}
          <div className="md:col-span-4 space-y-2">
            <div className="font-mono text-[10px] uppercase text-[#C5A880] tracking-widest font-semibold">
              Corretor Responsável
            </div>
            <p className="text-[#F8F9FA] font-serif text-sm">Douglas Cardoso</p>
            <p className="text-[#687082] font-mono">CRECI 73.567 — Região Alagoas</p>
            <p className="text-[#A6ACB8] font-light pt-1">Ponta Verde, Maceió — AL</p>
          </div>

          {/* Column 3: Exclusive Customer Support */}
          <div className="md:col-span-3 space-y-2">
            <div className="font-mono text-[10px] uppercase text-[#C5A880] tracking-widest font-semibold">
              Atendimento Exclusivo
            </div>
            <a
              href="https://wa.me/5582999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#F8F9FA] hover:text-[#C5A880] transition-colors py-1"
            >
              <MessageSquare className="w-4 h-4 text-[#C5A880]" />
              <span>Conversar via WhatsApp</span>
            </a>
            <p className="text-[#687082] font-light">
              Atendimento sob agendamento prévio.
            </p>
          </div>
        </div>

        {/* Bottom Disclaimers */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[#687082] font-light">
          <p>© 2026 Cardoso Imóveis. Todos os direitos reservados.</p>
          <p className="text-center md:text-right max-w-xl text-[11px]">
            As perspectivas ilustrativas, metragens e especificações técnicas estão sujeitas a validação contratual. Vendas sob regime de exclusividade.
          </p>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { ArrowUp, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { Property } from '../types';

interface ScheduleVisitSectionProps {
  tour: Property;
  onBackToTop: () => void;
}

export const ScheduleVisitSection: React.FC<ScheduleVisitSectionProps> = ({
  tour,
  onBackToTop,
}) => {
  const whatsappNumber = tour.consultantPhone || '5582999999999';
  const whatsappMessage = encodeURIComponent(
    `Olá, Douglas Cardoso! Concluí a apresentação do imóvel "${tour.propertyName}" (${tour.location}) e gostaria de agendar uma visita presencial.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section id="agendar-visita" className="w-full py-24 relative overflow-hidden bg-[#FBFBFC]">
      {/* Ambient subtle background glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#C5A880]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-1">
          <span className="font-mono text-[11px] uppercase text-[#9C7D54] tracking-[0.2em] font-semibold">
            Próximo Passo
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#111827] font-light tracking-tight">
            Gostou do que viu?
          </h2>
          <p className="text-sm text-[#6B7280] font-light">
            Agende uma visita privativa e conheça pessoalmente cada detalhe arquitetônico desta residência.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Corretor Executivo Card */}
          <div className="p-8 sm:p-12 rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] flex flex-col items-center text-center space-y-6 shadow-xl">
            {/* CEO Avatar with Golden Frame & Online Badge */}
            <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-[#C5A880] to-[#E2D3BE] shadow-md">
              <img
                src={tour.consultantImage || '/assets/ceo-card.png'}
                alt={tour.consultantName || 'Douglas Cardoso'}
                className="w-full h-full object-cover rounded-full bg-[#FFFFFF]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/ceo-card.png';
                }}
              />
              <div
                className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#FFFFFF] flex items-center justify-center shadow-sm"
                title="Online no WhatsApp"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-3xl text-[#111827] font-medium">
                {tour.consultantName || 'Douglas Cardoso'}
              </h3>
              <p className="font-mono text-xs text-[#9C7D54] uppercase tracking-wider font-semibold">
                {tour.consultantTitle || 'CRECI 73.567 — Especialista Ponta Verde'}
              </p>
              <p className="text-xs text-[#6B7280] font-light pt-2 max-w-sm mx-auto italic font-serif">
                “Será um prazer conduzir uma experiência imersiva e tirar todas as suas dúvidas financeiras e estruturais.”
              </p>
            </div>

            <div className="w-full pt-2 max-w-md space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl btn-gold-warm text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-md text-white"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Falar Direto no WhatsApp</span>
              </a>

              <div className="flex items-center justify-center gap-6 text-xs text-[#6B7280] pt-1">
                <span className="flex items-center gap-1.5 font-mono text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#9C7D54]" /> Sigilo Garantido
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#9C7D54]" /> Imóvel Exclusivo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Return to Top Button */}
        <div className="text-center mt-16">
          <button
            onClick={onBackToTop}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#9C7D54] hover:text-[#7A5F3A] transition-colors cursor-pointer group font-semibold"
          >
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
            <span>Voltar ao Início do Site</span>
          </button>
        </div>
      </div>
    </section>
  );
};

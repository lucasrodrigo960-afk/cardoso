import React from 'react';
import { ArrowUp, PhoneCall, Calendar } from 'lucide-react';
import type { Property } from '../types';

interface ScheduleVisitSectionProps {
  tour: Property;
  onBackToTop: () => void;
  onScheduleVisit?: () => void;
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
    <section id="contact" className="relative min-h-[90vh] py-24 px-4 sm:px-6 bg-[#08090A] flex flex-col justify-center items-center overflow-hidden">
      {/* Background Estate Photo */}
      <div className="absolute inset-0 z-0">
        <img
          src={tour.heroImage}
          alt={tour.propertyName}
          className="w-full h-full object-cover filter brightness-[0.35] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-transparent to-[#08090A]/80" />
      </div>

      {/* Content Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-12">
        <div className="text-amber-400 font-mono text-xs tracking-[0.25em] uppercase mb-3">
          Próximo Passo
        </div>
        <h2 className="text-4xl sm:text-6xl font-extralight text-white font-serif tracking-tight mb-3">
          GOSTOU DO QUE VIU?
        </h2>
        <p className="text-base sm:text-xl text-zinc-300 font-serif italic font-light">
          Agende uma visita e conheça o imóvel pessoalmente.
        </p>
      </div>

      {/* Main Glass Card (Douglas Cardoso CEO Executive Presentation) */}
      <div className="relative z-10 w-full max-w-2xl bg-[#0f0f12]/80 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 border border-amber-400/35 shadow-[0_20px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.15)] text-center my-auto">
        {/* CEO Avatar with Golden Frame */}
        <div className="relative w-36 h-36 mx-auto rounded-full p-1 bg-gradient-to-tr from-amber-600 via-amber-300 to-amber-500 shadow-[0_0_30px_rgba(212,175,55,0.5)] mb-6">
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-slate-950">
            <img
              src={tour.consultantImage || '/assets/ceo-card.png'}
              alt={tour.consultantName || 'Douglas Cardoso'}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/ceo-card.png';
              }}
            />
          </div>
        </div>

        {/* CEO Name */}
        <h3 className="text-3xl sm:text-4xl font-light font-serif text-white mb-1 tracking-wide">
          {tour.consultantName || 'Douglas Cardoso'}
        </h3>

        {/* CEO Subtitle */}
        <div className="text-amber-400 font-mono text-xs font-semibold tracking-[0.25em] uppercase mb-6">
          {tour.consultantTitle || 'CEO - CRECI 73.567'}
        </div>

        {/* Quote */}
        <p className="text-sm sm:text-base text-amber-200/90 font-serif italic font-light mb-10 max-w-md mx-auto leading-relaxed">
          “Será um prazer apresentar pessoalmente cada detalhe desta propriedade.”
        </p>

        {/* Direct Action Buttons Pair (NO Forms) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
          {/* Button 1: AGENDAR VISITA (Direct WhatsApp Action) */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-1/2 py-3.5 px-6 rounded-full bg-slate-100 hover:bg-white text-slate-950 font-bold text-xs tracking-[0.2em] uppercase border border-amber-400/80 shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-slate-950" />
            <span>AGENDAR VISITA</span>
          </a>

          {/* Button 2: FALAR COM UM CONSULTOR */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-1/2 py-3.5 px-6 rounded-full bg-[#1c1c20] hover:bg-[#25252a] text-white font-bold text-xs tracking-[0.2em] uppercase border border-amber-400/60 shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-amber-400" />
            <span>FALAR COM CONSULTOR</span>
          </a>
        </div>
      </div>

      {/* Return to Top Button */}
      <button
        onClick={onBackToTop}
        className="relative z-10 mt-12 inline-flex items-center gap-2 text-xs font-serif tracking-[0.25em] text-amber-400 hover:text-amber-300 uppercase transition-colors cursor-pointer group"
      >
        <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
        <span>VOLTAR AO INÍCIO DO SITE</span>
      </button>
    </section>
  );
};

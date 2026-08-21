import React from 'react';
import { ArrowUp, PhoneCall, Calendar } from 'lucide-react';
import type { Tour } from '../types';

interface FinalCTAProps {
  tour: Tour;
  onBackToTop: () => void;
  onScheduleVisit: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ tour, onBackToTop, onScheduleVisit }) => {
  const whatsappNumber = tour.consultantPhone || '5582999999999';
  const whatsappMessage = encodeURIComponent(
    `Olá, Douglas Cardoso! Concluí o tour exclusivo da propriedade "${tour.propertyName}" (${tour.location}) e gostaria de conversar sobre o agendamento da minha visita.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section id="contact" className="relative min-h-screen py-24 px-4 sm:px-6 bg-[#08080a] flex flex-col justify-center items-center overflow-hidden">
      {/* Background Estate Photo with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={tour.heroImage}
          alt={tour.propertyName}
          className="w-full h-full object-cover filter brightness-[0.35] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-[#08080a]/80" />
      </div>

      {/* Main Glass Card (Exact Replica of User Reference Image) */}
      <div className="relative z-10 w-full max-w-2xl bg-[#0f0f12]/75 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 border border-amber-400/35 shadow-[0_20px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.15)] text-center my-auto">
        {/* CEO Avatar with Golden Metallic Frame */}
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

        {/* Action Buttons Pair */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
          {/* Button 1: AGENDAR UMA VISITA (Light Marble style button) */}
          <button
            onClick={onScheduleVisit}
            className="w-full sm:w-1/2 py-3.5 px-6 rounded-full bg-slate-100 hover:bg-white text-slate-950 font-bold text-xs tracking-[0.2em] uppercase border border-amber-400/80 shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-slate-950" />
            <span>AGENDAR UMA VISITA</span>
          </button>

          {/* Button 2: FALAR COM DOUGLAS (Dark Glossy style button with phone icon) */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-1/2 py-3.5 px-6 rounded-full bg-[#1c1c20] hover:bg-[#25252a] text-white font-bold text-xs tracking-[0.2em] uppercase border border-amber-400/60 shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-amber-400" />
            <span>FALAR COM DOUGLAS</span>
          </a>
        </div>
      </div>

      {/* Return to Top Button below Card */}
      <button
        onClick={onBackToTop}
        className="relative z-10 mt-12 inline-flex items-center gap-2 text-xs font-serif tracking-[0.25em] text-amber-400 hover:text-amber-300 uppercase transition-colors cursor-pointer group"
      >
        <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
        <span>VOLTAR AO INÍCIO DO TOUR</span>
      </button>

      {/* Brand Footer */}
      <div className="relative z-10 mt-10 text-center border-t border-white/10 pt-6 max-w-md w-full">
        <div className="text-xs text-zinc-400 font-serif font-light tracking-wider mb-1">
          CARDOSO IMOB • ESTE IMÓVEL É EXCLUSIVO
        </div>
        <div className="text-[10px] text-zinc-500 font-mono tracking-widest">
          CRECI 73.567 • PLATAFORMA PRIVATIVA DE VISITA DIGITAL
        </div>
      </div>
    </section>
  );
};

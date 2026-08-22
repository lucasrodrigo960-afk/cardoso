import React from 'react';
import { ArrowDown, ShieldCheck } from 'lucide-react';
import type { Tour, Room } from '../types';

interface HeroOverviewProps {
  tour: Tour;
  onStartExplore: () => void;
  onSelectRoom?: (room: Room) => void;
}

export const HeroOverview: React.FC<HeroOverviewProps> = ({ tour, onStartExplore }) => {
  return (
    <section id="overview" className="relative min-h-[92vh] flex flex-col justify-end pb-16 pt-28 bg-[#0b0c0e] overflow-hidden">
      {/* Background Hero Media */}
      <div className="absolute inset-0 z-0">
        {tour.heroVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-70 filter brightness-[0.75] contrast-[1.05] scale-105"
            src={tour.heroVideo}
          />
        ) : (
          <img
            src={tour.heroImage}
            alt={tour.propertyName}
            className="w-full h-full object-cover opacity-70 filter brightness-[0.75] contrast-[1.05] scale-105"
          />
        )}
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-[#0b0c0e]/40 to-[#0b0c0e]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_#0b0c0e_95%)] opacity-80" />
      </div>

      {/* Editorial Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 w-full flex flex-col items-center text-center">
        {/* Discrete Brand Badge */}
        <div className="mb-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141518]/80 border border-white/10 text-amber-400 text-[11px] font-mono tracking-[0.25em] uppercase backdrop-blur-md mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>CARDOSO IMÓVEIS · IMÓVEL SELECIONADO</span>
          </div>
        </div>

        {/* Property Name */}
        <h1 className="text-4xl sm:text-7xl lg:text-8xl font-extralight text-white tracking-tight font-serif mb-3 leading-none drop-shadow-2xl">
          {tour.propertyName}
        </h1>

        {/* Location Sub-text */}
        <p className="text-base md:text-xl font-light text-zinc-300 tracking-[0.2em] uppercase mb-4 font-serif">
          {tour.location}
        </p>

        {/* Short Sentence */}
        <p className="text-sm md:text-base text-zinc-300 font-light italic mb-8 max-w-lg mx-auto font-serif">
          "{tour.tagline || 'Conheça todos os detalhes deste imóvel antes de agendar sua visita.'}"
        </p>

        {/* Specs & Price Line */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-sm text-zinc-300 font-light mb-10">
          <span className="text-white font-serif text-2xl font-normal">{tour.price}</span>
          <span className="hidden md:inline text-amber-500/50">•</span>
          <span className="tracking-[0.2em] uppercase text-xs text-zinc-300 font-light">
            {tour.details.builtAreaM2} m² · {tour.details.bedrooms} QUARTOS · {tour.details.suites} SUÍTES · {tour.details.parkingSpaces} VAGAS
          </span>
        </div>

        {/* Elegant Action Button */}
        <div className="flex flex-col items-center gap-8">
          <button
            onClick={onStartExplore}
            className="group px-9 py-4 rounded-full bg-[#141518]/90 hover:bg-white text-white hover:text-black border border-white/20 hover:border-white font-light text-xs tracking-[0.3em] uppercase transition-all duration-500 shadow-2xl backdrop-blur-md cursor-pointer flex items-center gap-3"
          >
            <span>EXPLORAR IMÓVEL</span>
            <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
          </button>

          {/* Subtle Scroll Indicator */}
          <div
            onClick={onStartExplore}
            className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-zinc-500 hover:text-amber-400 cursor-pointer transition-colors"
          >
            <span>SCROLL PARA EXPLORAR</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-amber-400/80 to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

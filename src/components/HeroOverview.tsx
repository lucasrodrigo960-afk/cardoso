import React from 'react';
import { ArrowDown, ArrowUpRight, ShieldCheck } from 'lucide-react';
import type { Tour, Room } from '../types';

interface HeroOverviewProps {
  tour: Tour;
  onStartExplore: () => void;
  onSelectRoom?: (room: Room) => void;
}

export const HeroOverview: React.FC<HeroOverviewProps> = ({ tour, onStartExplore, onSelectRoom }) => {
  const topRooms = tour.rooms.slice(0, 3);

  return (
    <section id="overview" className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 bg-[#0b0c0e] overflow-hidden">
      {/* Background Hero Media */}
      <div className="absolute inset-0 z-0">
        {tour.heroVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-65 filter brightness-[0.75] contrast-[1.1] scale-105"
            src={tour.heroVideo}
          />
        ) : (
          <img
            src={tour.heroImage}
            alt={tour.propertyName}
            className="w-full h-full object-cover opacity-65 filter brightness-[0.75] contrast-[1.1] scale-105"
          />
        )}
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-[#0b0c0e]/30 to-[#0b0c0e]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c0e]/90 via-transparent to-[#0b0c0e]/40" />
      </div>

      {/* Main Hero Header Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full my-auto py-12">
        <div className="max-w-3xl">
          {/* Logo 3D */}
          <div className="mb-6 flex items-center gap-4">
            <img
              src="/assets/logo-hero-gold.jpg"
              alt="Cardoso Imóveis"
              className="h-16 sm:h-20 w-auto object-contain mix-blend-screen filter drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            />
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141518]/80 border border-white/10 text-amber-400 text-[10px] font-mono tracking-[0.2em] uppercase backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ESTE IMÓVEL É EXCLUSIVO CARDOSO IMÓVEIS</span>
            </div>
          </div>

          {/* Display Typography */}
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-extralight text-white font-serif tracking-tight leading-none mb-4 drop-shadow-2xl">
            {tour.propertyName}
          </h1>

          <p className="text-xl sm:text-2xl font-serif italic text-amber-200/90 font-light mb-6">
            {tour.location}
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-zinc-300 font-light mb-8">
            <span className="text-2xl font-serif text-white font-normal">{tour.price}</span>
            <span className="text-amber-500/50">•</span>
            <span className="tracking-[0.2em] uppercase text-xs text-zinc-300">
              {tour.details.builtAreaM2} m² · {tour.details.bedrooms} QUARTOS · {tour.details.suites} SUÍTES · {tour.details.parkingSpaces} VAGAS
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onStartExplore}
              className="btn-gold-warm px-8 py-4 rounded-2xl text-xs uppercase tracking-[0.25em] flex items-center gap-3 cursor-pointer"
            >
              <span>COMEÇAR TOUR DIGITAL</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Hero Micro-Feature Cards Strip */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full pt-8 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topRooms.map((room) => (
            <div
              key={room.id}
              onClick={() => onSelectRoom ? onSelectRoom(room) : onStartExplore()}
              className="group glass-dark-card p-5 rounded-2xl border border-white/10 hover:border-amber-400/50 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-2">
                  <span>{room.number}</span>
                  <span>{room.areaM2} m²</span>
                </div>
                <h4 className="text-lg font-serif font-light text-white mb-1 group-hover:text-amber-300 transition-colors">
                  {room.name}
                </h4>
                <p className="text-xs text-zinc-400 font-light line-clamp-2 leading-relaxed">
                  {room.subtitle}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-300 font-light uppercase tracking-wider group-hover:text-amber-400">
                <span>EXPLORAR</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

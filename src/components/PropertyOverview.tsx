import React from 'react';
import type { Property } from '../types';

interface PropertyOverviewProps {
  tour: Property;
}

export const PropertyOverview: React.FC<PropertyOverviewProps> = ({ tour }) => {
  const { details } = tour;

  const keyStats = [
    details.builtAreaM2 ? { number: `${details.builtAreaM2} m²`, label: 'ÁREA CONSTRUÍDA' } : null,
    details.bedrooms ? { number: String(details.bedrooms).padStart(2, '0'), label: 'QUARTOS' } : null,
    details.suites ? { number: String(details.suites).padStart(2, '0'), label: 'SUÍTES' } : null,
    details.bathrooms ? { number: String(details.bathrooms).padStart(2, '0'), label: 'BANHEIROS' } : null,
    details.parkingSpaces ? { number: String(details.parkingSpaces).padStart(2, '0'), label: 'VAGAS' } : null,
  ].filter(Boolean) as { number: string; label: string }[];

  return (
    <section id="property-overview" className="py-24 md:py-32 px-6 sm:px-12 max-w-7xl mx-auto bg-[#08090A]">
      <div className="max-w-4xl mx-auto text-left">
        {/* Sub-header */}
        <div className="text-amber-400 font-mono text-xs tracking-[0.25em] uppercase mb-3">
          Apresentação Cuidadosa
        </div>

        {/* Title */}
        <h2 className="text-4xl sm:text-6xl font-extralight text-white font-serif tracking-tight mb-8">
          CONHEÇA O IMÓVEL
        </h2>

        {/* Description */}
        <p className="text-zinc-300 font-light text-base sm:text-xl leading-relaxed font-serif italic mb-16 max-w-3xl">
          "{tour.description}"
        </p>

        {/* Big Thin Numbers Separated by Fine Lines (1px) — Rendered ONLY if data exists */}
        {keyStats.length > 0 && (
          <div className={`grid grid-cols-2 md:grid-cols-${Math.min(keyStats.length, 4)} border-y border-white/10 py-10 gap-8 md:gap-0 md:divide-x divide-white/10`}>
            {keyStats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-start md:px-8 first:pl-0 last:pr-0">
                <div className="text-4xl sm:text-6xl font-serif font-extralight text-white mb-2 tracking-tight">
                  {stat.number}
                </div>
                <div className="text-xs font-mono tracking-[0.2em] text-amber-400/90 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

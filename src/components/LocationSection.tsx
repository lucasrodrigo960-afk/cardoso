import React from 'react';
import type { Tour } from '../types';

interface LocationSectionProps {
  tour: Tour;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ tour }) => {
  return (
    <section id="location" className="py-32 px-6 sm:px-12 max-w-7xl mx-auto bg-[#0b0c0e]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="text-amber-400 font-mono text-xs tracking-[0.25em] uppercase mb-3">
          03 · REGIÃO & ENTORNO DA PROPRIEDADE
        </div>
        <h2 className="text-4xl sm:text-6xl font-extralight text-white font-serif tracking-tight mb-4">
          LOCALIZAÇÃO & REGIÃO
        </h2>
        <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
          {tour.isExactLocation ? tour.address : 'Bairro nobre de altíssima valorização. Endereço exato disponibilizado sob agendamento de visita privativa.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Left: Aerial Region Print Image (7 cols) */}
        <div className="lg:col-span-7 relative h-[420px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl bg-[#141518] border border-white/10">
          <img
            src={tour.regionMapPrint}
            alt="Foto Aérea da Região"
            className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-transparent to-transparent opacity-80" />

          <div className="absolute bottom-6 left-6 z-10 text-xs font-mono text-white tracking-widest uppercase bg-[#0b0c0e]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">
            📍 {tour.location}
          </div>
        </div>

        {/* Right: AO REDOR DO IMÓVEL Clean Editorial List (5 cols) */}
        <div className="lg:col-span-5 glass-dark-card rounded-3xl p-8 border border-white/15 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono text-amber-400 tracking-[0.2em] uppercase mb-6 pb-3 border-b border-white/10">
              AO REDOR DO IMÓVEL
            </div>

            <div className="divide-y divide-white/10">
              {tour.regionMarkers
                .filter((m) => m.category !== 'estate')
                .map((marker) => (
                  <div key={marker.id} className="py-4 flex items-center justify-between group">
                    <div>
                      <div className="text-base font-serif font-light text-white group-hover:text-amber-300 transition-colors">
                        {marker.title}
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider mt-0.5">
                        {marker.category === 'beach'
                          ? 'Lazer'
                          : marker.category === 'shopping'
                          ? 'Compras'
                          : marker.category === 'supermarket'
                          ? 'Conveniência'
                          : marker.category === 'school'
                          ? 'Educação'
                          : 'Serviços'}
                      </div>
                    </div>

                    <div className="font-mono text-sm font-semibold text-amber-400 tracking-wider flex-shrink-0 ml-4">
                      {marker.timeText}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 text-xs text-zinc-500 font-light leading-relaxed">
            Localização privilegiada no polo mais exclusivo da região, próximo a gastronomia internacional, serviços e lazer.
          </div>
        </div>
      </div>
    </section>
  );
};

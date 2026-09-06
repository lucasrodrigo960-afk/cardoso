import React from 'react';
import type { Property } from '../types';

interface LocationSectionProps {
  tour: Property;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ tour }) => {
  const loc = tour.locationData || {
    city: tour.cityState || 'Maceió/AL',
    neighborhood: tour.neighborhood || tour.location,
    isExactLocation: false,
    regionMapPrint: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80',
    nearbyPlaces: []
  };

  return (
    <section id="location" className="py-24 md:py-32 px-6 sm:px-12 max-w-7xl mx-auto bg-[#08090A]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="text-amber-400 font-mono text-xs tracking-[0.25em] uppercase mb-3">
          Região & Entorno da Propriedade
        </div>
        <h2 className="text-4xl sm:text-6xl font-extralight text-white font-serif tracking-tight mb-4">
          LOCALIZAÇÃO & REGIÃO
        </h2>
        <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
          {loc.isExactLocation && loc.address
            ? loc.address
            : `Bairro ${loc.neighborhood} — ${loc.city}. Endereço exato disponibilizado sob agendamento de visita privativa.`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Left: Aerial Region Print Image (7 cols) */}
        <div className="lg:col-span-7 relative h-[420px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl bg-[#141518] border border-white/10">
          <img
            src={loc.regionMapPrint}
            alt="Foto Aérea da Região"
            className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-transparent to-transparent opacity-80" />

          <div className="absolute bottom-6 left-6 z-10 text-xs font-mono text-white tracking-widest uppercase bg-[#08090A]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">
            📍 {loc.neighborhood} — {loc.city}
          </div>
        </div>

        {/* Right: AO REDOR DO IMÓVEL List (5 cols) */}
        {loc.nearbyPlaces && loc.nearbyPlaces.length > 0 && (
          <div className="lg:col-span-5 glass-dark-card rounded-3xl p-8 border border-white/15 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-amber-400 tracking-[0.2em] uppercase mb-6 pb-3 border-b border-white/10">
                AO REDOR DO IMÓVEL
              </div>

              <div className="divide-y divide-white/10">
                {loc.nearbyPlaces.map((place) => (
                  <div key={place.id} className="py-4 flex items-center justify-between group">
                    <div>
                      <div className="text-base font-serif font-light text-white group-hover:text-amber-300 transition-colors">
                        {place.title}
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider mt-0.5">
                        {place.category === 'beach'
                          ? 'Lazer & Praia'
                          : place.category === 'shopping'
                          ? 'Compras'
                          : place.category === 'supermarket'
                          ? 'Conveniência'
                          : 'Serviços'}
                      </div>
                    </div>

                    <div className="font-mono text-sm font-semibold text-amber-400 tracking-wider flex-shrink-0 ml-4">
                      {place.timeText}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 text-xs text-zinc-500 font-light leading-relaxed">
              Localização privilegiada no polo mais valorizado da região, com acesso fácil a gastronomia e serviços.
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

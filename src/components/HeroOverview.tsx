import React from 'react';
import { Box, Calendar } from 'lucide-react';
import type { Property } from '../types';

interface HeroOverviewProps {
  tour: Property;
  onStartExplore: () => void;
}

export const HeroOverview: React.FC<HeroOverviewProps> = ({ tour, onStartExplore }) => {
  return (
    <section id="overview" className="relative w-full pt-28 pb-16 border-b border-[#252A34]/40 bg-[#0D0F12] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Top Meta Badge & Crest */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1F27]/80 backdrop-blur-md border border-[#252A34] shadow-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
              Tour Exclusivo • {tour.details.propertyType || 'Residência Fechada'}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F8F9FA] tracking-tight max-w-4xl leading-tight font-light">
            {tour.propertyName}
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-[#E2D3BE]/90 mt-2 font-light">
            {tour.location}
          </p>
        </div>

        {/* Main Showcase Feature Card with Split Aesthetic */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#14171D] border border-[#252A34] shadow-2xl group">
          <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden">
            {tour.heroVideo ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] filter brightness-[0.9]"
                src={tour.heroVideo}
              />
            ) : (
              <img
                src={tour.heroImage}
                alt={tour.propertyName}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] filter brightness-[0.9]"
              />
            )}

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-[#0D0F12]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0F12]/80 via-transparent to-transparent hidden lg:block" />

            {/* Bottom Floating Investment Bar Inside Hero */}
            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 z-20">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
                  Valor de Aquisição
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-3xl sm:text-4xl text-[#F8F9FA] font-light tracking-tight">
                    {tour.price}
                  </span>
                  {tour.details.condoFee && (
                    <span className="text-xs text-[#687082] font-mono">
                      | Condomínio {tour.details.condoFee}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#A6ACB8] font-light">
                  {tour.tagline || 'Apresentação exclusiva gravada em altíssima definição'}
                </p>
              </div>

              {/* Action Buttons Pair */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onStartExplore}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A1F27]/90 backdrop-blur-md border border-[#252A34] text-[#F8F9FA] font-mono text-xs hover:border-[#C5A880] transition-all cursor-pointer"
                >
                  <Box className="w-4 h-4 text-[#C5A880]" />
                  <span>Explorar em 3D</span>
                </button>

                <a
                  href={`https://wa.me/${tour.consultantPhone || '5582999999999'}?text=${encodeURIComponent(
                    `Olá, Douglas Cardoso! Gostaria de mais informações sobre o imóvel "${tour.propertyName}".`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-gold-warm text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_24px_rgba(197,168,128,0.25)]"
                >
                  <Calendar className="w-4 h-4 text-[#111317]" />
                  <span>Solicitar Apresentação</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

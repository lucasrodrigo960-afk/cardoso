import React from 'react';
import { Box, Calendar } from 'lucide-react';
import type { Property } from '../types';

interface HeroOverviewProps {
  tour: Property;
  onStartExplore: () => void;
}

export const HeroOverview: React.FC<HeroOverviewProps> = ({ tour, onStartExplore }) => {
  return (
    <section id="overview" className="relative w-full pt-28 pb-16 border-b border-[#E5E7EB] bg-[#FBFBFC] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Top Meta Badge & Crest */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F4EBE1]/80 backdrop-blur-md border border-[#C5A880]/30 shadow-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9C7D54] animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9C7D54] font-semibold">
              Tour Exclusivo • {tour.details.propertyType || 'Residência Fechada'}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#111827] tracking-tight max-w-4xl leading-tight font-light">
            {tour.propertyName}
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-[#9C7D54] mt-2 font-light">
            {tour.location}
          </p>
        </div>

        {/* Main Showcase Feature Card */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#E5E7EB] shadow-xl group">
          <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden">
            {tour.heroVideo ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] filter brightness-[0.98]"
                src={tour.heroVideo}
              />
            ) : (
              <img
                src={tour.heroImage}
                alt={tour.propertyName}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] filter brightness-[0.98]"
              />
            )}

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/70 via-[#111827]/20 to-transparent" />
          </div>

          {/* Bottom Floating Investment & Action Bar */}
          <div className="p-6 sm:p-8 bg-[#FFFFFF] border-t border-[#E5E7EB] flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#9C7D54] font-semibold">
                Valor de Aquisição
              </span>
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl text-[#111827] font-light tracking-tight">
                  {tour.price}
                </span>
                {tour.details.condoFee && (
                  <span className="text-xs text-[#6B7280] font-mono">
                    | Condomínio {tour.details.condoFee}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#4B5563] font-light">
                {tour.tagline || 'Apresentação exclusiva gravada em altíssima definição'}
              </p>
            </div>

            {/* Action Buttons Pair */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <button
                onClick={onStartExplore}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#F8F9FA] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#111827] font-mono text-xs hover:border-[#C5A880] transition-all cursor-pointer font-medium"
              >
                <Box className="w-4 h-4 text-[#9C7D54]" />
                <span>Explorar em 3D</span>
              </button>

              <a
                href={`https://wa.me/${tour.consultantPhone || '5582999999999'}?text=${encodeURIComponent(
                  `Olá, Douglas Cardoso! Gostaria de mais informações sobre o imóvel "${tour.propertyName}".`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl btn-gold-warm text-xs font-semibold uppercase tracking-wider transition-all shadow-md text-white"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Solicitar Apresentação</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import type { Tour } from '../types';

interface PropertyDetailsProps {
  tour: Tour;
}

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({ tour }) => {
  const { details } = tour;

  const bigMetrics = [
    { number: `${details.builtAreaM2} m²`, label: 'ÁREA CONSTRUÍDA' },
    { number: `${details.landAreaM2} m²`, label: 'TERRENO' },
    { number: String(details.bedrooms).padStart(2, '0'), label: 'DORMITÓRIOS' },
    { number: String(details.suites).padStart(2, '0'), label: 'SUÍTES' },
    { number: String(details.bathrooms).padStart(2, '0'), label: 'BANHEIROS' },
    { number: String(details.parkingSpaces).padStart(2, '0'), label: 'VAGAS COBERTAS' },
  ];

  return (
    <section id="details" className="py-32 px-6 sm:px-12 max-w-7xl mx-auto bg-[#0b0c0e]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="text-amber-400 font-mono text-xs tracking-[0.25em] uppercase mb-3">
          04 · FICHA TÉCNICA & ESPECIFICAÇÕES
        </div>
        <h2 className="text-4xl sm:text-6xl font-extralight text-white font-serif tracking-tight mb-4">
          DETALHES DO IMÓVEL
        </h2>
        <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
          Métricas consolidadas de engenharia e atributos exclusivos da propriedade.
        </p>
      </div>

      {/* Huge Clean Numbers Grid (Glass dark card surface) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
        {bigMetrics.map((item, idx) => (
          <div key={idx} className="glass-dark-card rounded-3xl p-8 sm:p-10 flex flex-col justify-center items-start border border-white/10">
            <div className="text-4xl sm:text-6xl font-serif text-white font-light mb-2 tracking-tight">
              {item.number}
            </div>
            <div className="text-xs font-mono tracking-[0.2em] text-amber-400 uppercase">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* High-End Features Editorial Box */}
      <div className="glass-dark-card rounded-3xl p-8 sm:p-12 border border-white/15">
        <div className="text-xs font-mono text-amber-400 tracking-[0.2em] uppercase mb-8 pb-4 border-b border-white/10">
          ATRIBUTOS ARQUITETÔNICOS & TECNOLÓGICOS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {details.features.map((feature, idx) => (
            <div key={idx} className="py-3 border-b border-white/5 flex items-center gap-4 text-sm text-zinc-200 font-light">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {(details.condoFee || details.iptu) && (
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-8 text-xs text-zinc-400 font-light">
            {details.condoFee && (
              <div>
                <span className="text-zinc-500 font-mono uppercase tracking-widest block mb-1">CONDOMÍNIO</span>
                <span className="text-white font-serif text-base">{details.condoFee}</span>
              </div>
            )}
            {details.iptu && (
              <div>
                <span className="text-zinc-500 font-mono uppercase tracking-widest block mb-1">IPTU ANUAL</span>
                <span className="text-white font-serif text-base">{details.iptu}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

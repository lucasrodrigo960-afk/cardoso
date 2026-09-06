import React from 'react';
import { Check } from 'lucide-react';
import type { Property } from '../types';

interface FactualDetailsProps {
  tour: Property;
}

export const FactualDetails: React.FC<FactualDetailsProps> = ({ tour }) => {
  const { details } = tour;

  const factualRows = [
    details.propertyType ? { label: 'Tipo de Imóvel', value: details.propertyType } : null,
    details.builtAreaM2 ? { label: 'Área Construída / Privativa', value: `${details.builtAreaM2} m²` } : null,
    details.landAreaM2 ? { label: 'Área do Terreno', value: `${details.landAreaM2} m²` } : null,
    details.bedrooms ? { label: 'Dormitórios', value: `${details.bedrooms} quartos` } : null,
    details.suites ? { label: 'Suítes Privativas', value: `${details.suites} suítes` } : null,
    details.bathrooms ? { label: 'Banheiros Totais', value: `${details.bathrooms} banheiros` } : null,
    details.parkingSpaces ? { label: 'Vagas de Garagem', value: `${details.parkingSpaces} vagas` } : null,
    details.furnishedStatus ? { label: 'Status da Mobília', value: details.furnishedStatus } : null,
    details.constructionYear ? { label: 'Ano de Construção', value: details.constructionYear } : null,
    details.condoFee ? { label: 'Taxa de Condomínio', value: details.condoFee } : null,
    details.iptu ? { label: 'IPTU Anual', value: details.iptu } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <section id="details" className="py-24 md:py-32 px-6 sm:px-12 max-w-7xl mx-auto bg-[#08090A]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: SOBRE O IMÓVEL Technical Sheet (7 cols) */}
        <div className="lg:col-span-7">
          <div className="text-amber-400 font-mono text-xs tracking-[0.25em] uppercase mb-3">
            Ficha Técnica Consolidada
          </div>
          <h2 className="text-3xl sm:text-5xl font-extralight text-white font-serif tracking-tight mb-8">
            SOBRE O IMÓVEL
          </h2>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {factualRows.map((row, idx) => (
              <div key={idx} className="py-4 flex items-center justify-between text-xs sm:text-sm">
                <span className="text-zinc-400 font-light uppercase tracking-wider">{row.label}</span>
                <span className="text-white font-serif font-light text-right">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: O QUE VOCÊ VAI ENCONTRAR (5 cols) */}
        {details.features && details.features.length > 0 && (
          <div className="lg:col-span-5 bg-[#121316] rounded-3xl p-8 sm:p-10 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="text-amber-400 font-mono text-xs tracking-[0.25em] uppercase mb-3">
                Diferenciais Reais
              </div>
              <h3 className="text-2xl sm:text-3xl font-extralight text-white font-serif tracking-tight mb-8">
                O QUE VOCÊ VAI ENCONTRAR
              </h3>

              <div className="space-y-4">
                {details.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-zinc-200 font-light">
                    <div className="w-4 h-4 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 text-xs text-zinc-500 font-mono tracking-widest uppercase text-center">
              CARDOSO IMÓVEIS · INFORMAÇÕES VERIFICADAS
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

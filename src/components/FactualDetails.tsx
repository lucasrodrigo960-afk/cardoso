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
    details.suites ? { label: 'Suítes Privativas', value: `${details.suites} suítes plenas` } : null,
    details.bathrooms ? { label: 'Banheiros Totais', value: `${details.bathrooms} banheiros / lavabos` } : null,
    details.parkingSpaces ? { label: 'Vagas de Garagem', value: `${details.parkingSpaces} vagas cobertas` } : null,
    details.furnishedStatus ? { label: 'Status da Mobília', value: details.furnishedStatus } : null,
    details.constructionYear ? { label: 'Ano de Construção', value: details.constructionYear } : null,
    details.condoFee ? { label: 'Taxa de Condomínio', value: details.condoFee } : null,
    details.iptu ? { label: 'IPTU Anual', value: details.iptu } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <section id="ficha-tecnica" className="w-full py-20 border-b border-[#E5E7EB] bg-[#FBFBFC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Technical Spec Sheet (Left Column - 6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-1">
              <span className="font-mono text-[11px] uppercase text-[#9C7D54] tracking-[0.2em] font-semibold">
                Ficha Técnica Consolidada
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#111827] font-light tracking-tight">
                Sobre o Imóvel
              </h2>
            </div>

            <div className="rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#E5E7EB] divide-y divide-[#E5E7EB] text-xs sm:text-sm shadow-sm">
              {factualRows.map((row, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 hover:bg-[#F9FAFB] transition-colors">
                  <span className="text-[#6B7280] font-light uppercase tracking-wider">{row.label}</span>
                  <span className="text-[#111827] font-medium font-serif">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Diferenciais Reais (Right Column - 6 cols) */}
          {details.features && details.features.length > 0 && (
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-1">
                <span className="font-mono text-[11px] uppercase text-[#9C7D54] tracking-[0.2em] font-semibold">
                  Diferenciais de Construção
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#111827] font-light tracking-tight">
                  O Que Você Vai Encontrar
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {details.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] space-y-2 hover:border-[#C5A880] transition-colors shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#F4EBE1] text-[#9C7D54] flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                    <h4 className="font-serif text-sm text-[#111827] font-medium">
                      {feature}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

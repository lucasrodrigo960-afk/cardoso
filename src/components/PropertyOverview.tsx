import React from 'react';
import { CheckCircle2, Sun } from 'lucide-react';
import type { Property } from '../types';

interface PropertyOverviewProps {
  tour: Property;
}

export const PropertyOverview: React.FC<PropertyOverviewProps> = ({ tour }) => {
  const { details } = tour;

  const keyStats = [
    details.builtAreaM2 ? { label: 'ÁREA PRIVATIVA', number: `${details.builtAreaM2}`, sub: 'metros quadrados' } : null,
    details.landAreaM2 ? { label: 'TERRENO TOTAL', number: `${details.landAreaM2}`, sub: 'm² de lote nobre' } : null,
    details.bedrooms ? { label: 'DORMITÓRIOS', number: String(details.bedrooms).padStart(2, '0'), sub: details.suites ? `${details.suites} suítes plenas` : 'dormitórios' } : null,
    details.bathrooms ? { label: 'BANHEIROS', number: String(details.bathrooms).padStart(2, '0'), sub: 'acabamento em granito' } : null,
    details.parkingSpaces ? { label: 'GARAGENS', number: String(details.parkingSpaces).padStart(2, '0'), sub: 'vagas cobertas' } : null,
    details.hasPool ? { label: 'LAZER EXCLUSIVO', number: 'Sim', sub: 'piscina & gourmet' } : null,
  ].filter(Boolean) as { label: string; number: string; sub: string }[];

  return (
    <section id="conheca-o-imovel" className="w-full py-20 border-b border-[#252A34]/30 bg-[#0D0F12]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Editorial Description */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-1">
              <span className="font-mono text-[11px] uppercase text-[#C5A880] tracking-[0.16em]">
                Apresentação de Alto Padrão
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F8F9FA] font-light tracking-tight">
                Conheça a Residência
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#A6ACB8] font-light leading-relaxed">
              "{tour.description}"
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#A6ACB8]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                <span>Documentação 100% Regular</span>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-[#C5A880]" />
                <span>Orientação Nascente Total</span>
              </div>
            </div>
          </div>

          {/* Right Spec Matrix Minimalist */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#252A34] rounded-2xl overflow-hidden border border-[#252A34]">
              {keyStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-[#14171D] p-5 flex flex-col justify-between h-36 group hover:bg-[#1A1F27] transition-colors"
                >
                  <span className="font-mono text-[10px] uppercase text-[#C5A880] tracking-widest font-semibold">
                    {stat.label}
                  </span>
                  <div>
                    <div className="font-serif text-3xl text-[#F8F9FA] font-light tracking-tight">
                      {stat.number}
                    </div>
                    <div className="text-[11px] text-[#687082] font-light mt-0.5">
                      {stat.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

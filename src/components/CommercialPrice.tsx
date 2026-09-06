import React from 'react';
import { ArrowRight, Tag } from 'lucide-react';
import type { Property } from '../types';

interface CommercialPriceProps {
  tour: Property;
  onInterest: () => void;
}

export const CommercialPrice: React.FC<CommercialPriceProps> = ({ tour, onInterest }) => {
  return (
    <section id="commercial" className="w-full py-16 px-6 sm:px-10 max-w-7xl mx-auto bg-[#FBFBFC]">
      <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFFFF] border border-[#C5A880]/40 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-[#9C7D54] font-mono text-xs tracking-[0.25em] uppercase mb-2 font-semibold">
            <Tag className="w-3.5 h-3.5" />
            <span>INFORMAÇÕES COMERCIAIS</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif text-[#111827] font-light mb-1">
            Valor de Investimento do Imóvel
          </h3>
          <p className="text-xs text-[#687082] font-light mb-4">
            {tour.propertyName} · {tour.location}
          </p>

          <div className="text-4xl sm:text-6xl font-serif text-[#111827] font-light tracking-tight mb-4">
            {tour.price}
          </div>

          {(tour.details.condoFee || tour.details.iptu) && (
            <div className="flex flex-wrap gap-6 text-xs text-[#4B5563] font-light border-t border-[#E5E7EB] pt-4">
              {tour.details.condoFee && (
                <div>
                  <span className="text-[#687082] uppercase tracking-widest block font-mono text-[10px]">CONDOMÍNIO</span>
                  <span className="text-[#111827] font-serif font-medium">{tour.details.condoFee}</span>
                </div>
              )}
              {tour.details.iptu && (
                <div>
                  <span className="text-[#687082] uppercase tracking-widest block font-mono text-[10px]">IPTU ANUAL</span>
                  <span className="text-[#111827] font-serif font-medium">{tour.details.iptu}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="w-full md:w-auto flex-shrink-0">
          <button
            onClick={onInterest}
            className="btn-gold-warm w-full md:w-auto px-8 py-4 rounded-2xl text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 cursor-pointer shadow-lg font-semibold"
          >
            <span>FALAR COM UM CONSULTOR</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

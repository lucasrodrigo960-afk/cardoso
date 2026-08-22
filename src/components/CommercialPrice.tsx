import React from 'react';
import { ArrowRight, Tag } from 'lucide-react';
import type { Tour } from '../types';

interface CommercialPriceProps {
  tour: Tour;
  onInterest: () => void;
}

export const CommercialPrice: React.FC<CommercialPriceProps> = ({ tour, onInterest }) => {
  return (
    <section id="commercial" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto bg-[#0b0c0e]">
      <div className="glass-dark-card rounded-3xl p-8 sm:p-12 border border-amber-400/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs tracking-[0.25em] uppercase mb-2">
            <Tag className="w-3.5 h-3.5" />
            <span>INFORMAÇÕES COMERCIAIS</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif text-white font-light mb-1">
            Valor de Investimento do Imóvel
          </h3>
          <p className="text-xs text-zinc-400 font-light mb-4">
            {tour.propertyName} · {tour.location}
          </p>

          <div className="text-4xl sm:text-6xl font-serif text-white font-extralight tracking-tight mb-4">
            {tour.price}
          </div>

          {(tour.details.condoFee || tour.details.iptu) && (
            <div className="flex flex-wrap gap-6 text-xs text-zinc-400 font-light border-t border-white/10 pt-4">
              {tour.details.condoFee && (
                <div>
                  <span className="text-zinc-500 uppercase tracking-widest block font-mono text-[10px]">CONDOMÍNIO</span>
                  <span className="text-white font-serif">{tour.details.condoFee}</span>
                </div>
              )}
              {tour.details.iptu && (
                <div>
                  <span className="text-zinc-500 uppercase tracking-widest block font-mono text-[10px]">IPTU ANUAL</span>
                  <span className="text-white font-serif">{tour.details.iptu}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="w-full md:w-auto flex-shrink-0">
          <button
            onClick={onInterest}
            className="btn-gold-warm w-full md:w-auto px-10 py-5 rounded-2xl text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-3 cursor-pointer shadow-xl"
          >
            <span>TENHO INTERESSE NESTE IMÓVEL</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

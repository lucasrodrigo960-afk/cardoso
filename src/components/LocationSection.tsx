import React from 'react';
import { MapPin, Waves, ShoppingBag, ShoppingCart, ShieldCheck } from 'lucide-react';
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
    <section id="localizacao" className="w-full py-20 border-b border-[#E5E7EB] bg-[#FBFBFC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-1">
          <span className="font-mono text-[11px] uppercase text-[#9C7D54] tracking-[0.2em] font-semibold">
            {loc.neighborhood} — {loc.city}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#111827] font-light tracking-tight">
            Localização Nobre & Privilegiada
          </h2>
          <p className="text-sm text-[#6B7280] font-light leading-relaxed">
            A tranquilidade e segurança aliadas ao melhor que a região oferece em alta gastronomia, lazer e serviços essenciais.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Interactive Aerial Map Print (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#E5E7EB] relative bg-[#FFFFFF] min-h-[380px] shadow-md">
            <img
              src={loc.regionMapPrint}
              alt="Foto Aérea da Região"
              className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/60 via-transparent to-transparent opacity-80" />

            {/* Map Overlay Label */}
            <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-[#FFFFFF]/95 backdrop-blur-md border border-[#E5E7EB] shadow-md flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#9C7D54]" />
              <div>
                <div className="font-serif text-xs text-[#111827] font-semibold">{tour.propertyName}</div>
                <div className="font-mono text-[10px] text-[#6B7280]">
                  {loc.isExactLocation && loc.address ? loc.address : 'Endereço estrito compartilhado sob agendamento'}
                </div>
              </div>
            </div>
          </div>

          {/* POIs & Distances Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h3 className="font-serif text-xl text-[#111827] font-light mb-4">
                Mobilidade e Conveniência
              </h3>

              {loc.nearbyPlaces && loc.nearbyPlaces.map((place) => (
                <div
                  key={place.id}
                  className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] flex items-center justify-between hover:border-[#C5A880] transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#F4EBE1]/70 flex items-center justify-center text-[#9C7D54]">
                      {place.category === 'beach' ? (
                        <Waves className="w-4 h-4" />
                      ) : place.category === 'shopping' ? (
                        <ShoppingBag className="w-4 h-4" />
                      ) : (
                        <ShoppingCart className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="font-serif text-sm text-[#111827] font-medium">
                        {place.title}
                      </div>
                      <div className="text-[11px] text-[#6B7280] font-mono">
                        {place.category === 'beach' ? 'Lazer & Praia' : place.category === 'shopping' ? 'Compras & Gastronomia' : 'Conveniência'}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-xs text-[#9C7D54] font-semibold block">
                      {place.timeText}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] text-xs text-[#6B7280] flex items-center gap-3 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-[#9C7D54] flex-shrink-0" />
              <span>Localização protegida por perímetro restrito com monitoramento perimetral.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

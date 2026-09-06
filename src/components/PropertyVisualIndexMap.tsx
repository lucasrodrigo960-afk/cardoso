import React from 'react';
import { Compass, ChevronRight, Layers, ArrowUpRight } from 'lucide-react';
import type { Property, Room } from '../types';

interface PropertyVisualIndexMapProps {
  tour: Property;
  onSelectRoom: (room: Room) => void;
}

const DEFAULT_CATEGORIES = [
  { id: 'area-social', name: 'ÁREA SOCIAL', order: 1 },
  { id: 'area-intima', name: 'ÁREA ÍNTIMA', order: 2 },
  { id: 'area-externa', name: 'ÁREA EXTERNA', order: 3 },
];

export const PropertyVisualIndexMap: React.FC<PropertyVisualIndexMapProps> = ({
  tour,
  onSelectRoom,
}) => {
  const rootRooms = (tour.rooms || []).filter((r) => !r.parentId);
  const categories = (tour.categories && tour.categories.length > 0)
    ? tour.categories
    : DEFAULT_CATEGORIES;

  return (
    <section id="tour3d" className="w-full py-20 border-b border-[#E5E7EB] bg-[#FBFBFC] select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFFFF] border border-[#E5E7EB] shadow-sm mb-3">
            <Compass className="w-4 h-4 text-[#C5A880]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
              Índice Arquitetônico da Propriedade
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#111827] font-light tracking-tight">
            MAPA DE AMBIENTES
          </h2>
          <p className="text-sm text-[#687082] font-light leading-relaxed">
            Selecione qualquer setor ou ambiente no índice visual abaixo para abrir sua apresentação fotográfica detalhada.
          </p>
        </div>

        {/* Visual Index Diagram Container */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-xl space-y-8">
          {categories.map((cat) => {
            const categoryRooms = rootRooms.filter((r) => r.categoryId === cat.id);
            // If rooms don't specify categoryId, display them in the first category
            const roomsToDisplay = categoryRooms.length > 0
              ? categoryRooms
              : (cat.id === 'area-social' ? rootRooms : []);

            if (roomsToDisplay.length === 0) return null;

            return (
              <div key={cat.id} className="space-y-4">
                {/* Category Header Bar */}
                <div className="flex items-center gap-3 pb-2 border-b border-[#E5E7EB]">
                  <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#9C7D54] font-semibold">
                    {cat.name}
                  </h3>
                </div>

                {/* Rooms & Subrooms Fluxogram Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {roomsToDisplay.map((room) => {
                    const childRooms = (tour.rooms || []).filter((r) => r.parentId === room.id);

                    return (
                      <div
                        key={room.id}
                        className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#C5A880] transition-all shadow-sm hover:shadow-md group flex flex-col justify-between"
                      >
                        {/* Root Room Header Box */}
                        <div>
                          <div
                            onClick={() => onSelectRoom(room)}
                            className="flex items-center justify-between cursor-pointer mb-3"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 rounded-lg bg-[#C5A880]/15 text-[#9C7D54] font-mono text-xs font-semibold flex items-center justify-center">
                                {room.number}
                              </span>
                              <div>
                                <h4 className="font-serif text-base text-[#111827] font-medium group-hover:text-[#9C7D54] transition-colors">
                                  {room.name}
                                </h4>
                                {room.areaM2 && (
                                  <span className="text-[11px] font-mono text-[#687082]">
                                    {room.areaM2} m² privativos
                                  </span>
                                )}
                              </div>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-[#9C7D54] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>

                          {/* Sub-rooms Hierarchy Connection Box (Quarto, Closet, Banheiro) */}
                          {childRooms.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-[#E5E7EB] space-y-2">
                              <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#687082] uppercase tracking-wider">
                                <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
                                <span>Subambientes da {room.name}:</span>
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                {childRooms.map((cr) => (
                                  <button
                                    key={cr.id}
                                    onClick={() => onSelectRoom(cr)}
                                    className="p-2 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#C5A880] hover:bg-[#F3F4F6] text-left text-xs font-mono transition-all cursor-pointer flex items-center justify-between text-[#374151]"
                                  >
                                    <span className="truncate">{cr.name}</span>
                                    <ChevronRight className="w-3 h-3 text-[#C5A880]" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

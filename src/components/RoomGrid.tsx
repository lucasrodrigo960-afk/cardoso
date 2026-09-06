import React, { useState } from 'react';
import { ArrowRight, Layers, Play } from 'lucide-react';
import type { Room } from '../types';

interface RoomGridProps {
  rooms: Room[];
  onSelectRoom: (room: Room) => void;
}

export const RoomGrid: React.FC<RoomGridProps> = ({ rooms, onSelectRoom }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Root rooms only in main grid
  const rootRooms = rooms.filter((r) => !r.parentId);

  const filteredRooms = activeCategory === 'all'
    ? rootRooms
    : rootRooms.filter((r) => r.categoryId === activeCategory);

  return (
    <section id="ambientes" className="w-full py-20 border-b border-[#E5E7EB] bg-[#FBFBFC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-1">
            <span className="font-mono text-[11px] uppercase text-[#C5A880] tracking-[0.2em] font-semibold">
              Setores & Distribuição
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#111827] font-light tracking-tight">
              Explore por Ambientes
            </h2>
            <p className="text-sm text-[#687082] font-light max-w-xl">
              Cada espaço foi planejado para maximizar a entrada de ventilação natural e a integração dos momentos de convivência.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1 p-1 bg-[#FFFFFF] rounded-xl border border-[#E5E7EB]">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'area-social', label: 'Sociais' },
              { id: 'area-intima', label: 'Íntimos' },
              { id: 'area-externa', label: 'Lazer' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#111827] text-white font-semibold shadow-sm'
                    : 'text-[#687082] hover:text-[#111827]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => {
            const childRooms = rooms.filter((r) => r.parentId === room.id);
            const hasVideo = room.media?.some((m) => m.type === 'video');

            return (
              <div
                key={room.id}
                onClick={() => onSelectRoom(room)}
                className="group relative rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#C5A880] transition-all duration-500 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                {/* Photo Aspect Ratio 4/3 */}
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <img
                    src={room.coverImage}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.98]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/40 via-transparent to-transparent" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E5E7EB] text-[10px] font-mono uppercase text-[#9C7D54] font-semibold">
                    {room.categoryId === 'area-social'
                      ? 'Área Social'
                      : room.categoryId === 'area-intima'
                      ? 'Área Íntima'
                      : room.categoryId === 'area-externa'
                      ? 'Lazer Privativo'
                      : 'Ambiente'}
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {hasVideo && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#111827]/80 backdrop-blur-md text-[10px] font-mono text-white border border-white/20">
                        <Play className="w-3 h-3 text-[#C5A880]" />
                        <span>VÍDEO</span>
                      </span>
                    )}
                    {childRooms.length > 0 && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/90 backdrop-blur-md text-[10px] font-mono text-[#111827] border border-[#E5E7EB]">
                        <Layers className="w-3 h-3 text-[#C5A880]" />
                        <span>{childRooms.length} SUBAMBIENTES</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-xl text-[#111827] group-hover:text-[#9C7D54] transition-colors font-medium">
                    {room.name}
                  </h3>

                  {room.subtitle && (
                    <p className="text-xs text-[#687082] font-light line-clamp-2 leading-relaxed">
                      {room.subtitle}
                    </p>
                  )}

                  <div className="pt-2 flex items-center justify-between text-xs text-[#C5A880]">
                    <span className="font-mono text-[11px] font-semibold">
                      {room.areaM2 ? `${room.areaM2}m² Privativos` : 'Ambiente Exclusivo'}
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

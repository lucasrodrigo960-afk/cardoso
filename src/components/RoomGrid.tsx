import React, { useState } from 'react';
import { ArrowRight, Compass, Layers } from 'lucide-react';
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
    <section id="ambientes" className="w-full py-20 border-b border-[#252A34]/30 bg-[#0D0F12]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-1">
            <span className="font-mono text-[11px] uppercase text-[#C5A880] tracking-[0.2em]">
              Setores & Distribuição
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F8F9FA] font-light tracking-tight">
              Explore por Ambientes
            </h2>
            <p className="text-sm text-[#687082] font-light max-w-xl">
              Cada espaço foi planejado para maximizar a entrada de ventilação natural e a integração dos momentos de convivência.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1 p-1 bg-[#14171D] rounded-xl border border-[#252A34]">
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
                    ? 'bg-[#1A1F27] text-[#F8F9FA] border border-[#252A34] font-semibold'
                    : 'text-[#687082] hover:text-[#F8F9FA]'
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
            const has360 = room.media?.some((m) => m.type === 'panorama');

            return (
              <div
                key={room.id}
                onClick={() => onSelectRoom(room)}
                className="group relative rounded-2xl overflow-hidden bg-[#14171D] border border-[#252A34] hover:border-[#C5A880]/60 transition-all duration-500 cursor-pointer flex flex-col justify-between shadow-xl"
              >
                {/* Photo Aspect Ratio 4/3 */}
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <img
                    src={room.coverImage}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.9]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14171D] via-transparent to-transparent" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0D0F12]/80 backdrop-blur-md border border-[#252A34] text-[10px] font-mono uppercase text-[#C5A880]">
                    {room.categoryId === 'area-social'
                      ? 'Área Social'
                      : room.categoryId === 'area-intima'
                      ? 'Área Íntima'
                      : room.categoryId === 'area-externa'
                      ? 'Lazer Privativo'
                      : 'Ambiente'}
                  </div>

                  {/* Photo & 360 Badges */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {has360 && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 backdrop-blur-md text-[10px] font-mono text-[#E2C399] border border-amber-400/40">
                        <Compass className="w-3 h-3" />
                        <span>360°</span>
                      </span>
                    )}
                    {childRooms.length > 0 && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 backdrop-blur-md text-[10px] font-mono text-[#F8F9FA]">
                        <Layers className="w-3 h-3 text-[#C5A880]" />
                        <span>{childRooms.length}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-xl text-[#F8F9FA] group-hover:text-[#E2D3BE] transition-colors font-light">
                    {room.name}
                  </h3>

                  {room.subtitle && (
                    <p className="text-xs text-[#687082] font-light line-clamp-2 leading-relaxed">
                      {room.subtitle}
                    </p>
                  )}

                  <div className="pt-2 flex items-center justify-between text-xs text-[#C5A880]">
                    <span className="font-mono text-[11px]">
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

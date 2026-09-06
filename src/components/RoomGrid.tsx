import React from 'react';
import { Camera, ArrowUpRight, Compass, Layers } from 'lucide-react';
import type { Room } from '../types';

interface RoomGridProps {
  rooms: Room[];
  onSelectRoom: (room: Room) => void;
}

export const RoomGrid: React.FC<RoomGridProps> = ({ rooms, onSelectRoom }) => {
  // Only display root rooms / parent rooms or main rooms in grid (hide subrooms from top grid, they are accessed via parents!)
  const rootRooms = rooms.filter((r) => !r.parentId);

  return (
    <section id="rooms" className="py-24 md:py-32 px-6 sm:px-12 max-w-7xl mx-auto bg-[#08090A]">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="text-amber-400 font-mono text-xs tracking-[0.25em] uppercase mb-3">
          Visita Guiada por Ambientes
        </div>
        <h2 className="text-4xl sm:text-6xl font-extralight text-white font-serif tracking-tight mb-4">
          EXPLORE A PROPRIEDADE
        </h2>
        <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
          Selecione qualquer um dos ambientes abaixo para acessar mídias em alta definição, panoramas 360° e subambientes privativos.
        </p>
      </div>

      {/* Grid of Root / Parent Rooms */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rootRooms.map((room) => {
          // Count subrooms under this parent
          const childRooms = rooms.filter((r) => r.parentId === room.id);
          const has360 = room.media?.some((m) => m.type === 'panorama');

          return (
            <div
              key={room.id}
              onClick={() => onSelectRoom(room)}
              className="group relative h-[480px] rounded-3xl overflow-hidden glass-dark-card border border-white/10 hover:border-amber-400/60 transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col justify-between shadow-2xl"
            >
              {/* Background Photography */}
              <div className="absolute inset-0 z-0">
                <img
                  src={room.coverImage}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter brightness-[0.75]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-[#08090A]/30 to-black/40" />
              </div>

              {/* Top Badges */}
              <div className="relative z-10 p-6 flex items-center justify-between">
                <span className="font-mono text-xs font-semibold px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-amber-300 border border-white/10">
                  {room.number}
                </span>

                <div className="flex items-center gap-2">
                  {has360 && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-amber-300 bg-amber-500/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-400/40">
                      <Compass className="w-3 h-3" />
                      <span>360°</span>
                    </span>
                  )}
                  {childRooms.length > 0 && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-white bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                      <Layers className="w-3 h-3 text-amber-400" />
                      <span>{childRooms.length} SUBAMBIENTES</span>
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-[10px] font-mono text-zinc-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    <Camera className="w-3 h-3 text-amber-400" />
                    <span>{room.media?.length || 1}</span>
                  </span>
                </div>
              </div>

              {/* Bottom Details Overlay */}
              <div className="relative z-10 p-6 bg-gradient-to-t from-[#08090A] via-[#08090A]/90 to-transparent">
                {room.areaM2 && (
                  <div className="text-[11px] font-mono text-amber-400 uppercase tracking-widest mb-1">
                    {room.areaM2} m² PRIVATIVOS
                  </div>
                )}

                <h3 className="text-2xl font-serif font-light text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {room.name}
                </h3>

                {room.subtitle && (
                  <p className="text-xs text-zinc-400 font-light line-clamp-2 leading-relaxed mb-4">
                    {room.subtitle}
                  </p>
                )}

                {/* Subrooms Preview Chips */}
                {childRooms.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {childRooms.map((cr) => (
                      <span
                        key={cr.id}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300"
                      >
                        {cr.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-300 uppercase tracking-widest font-light group-hover:text-amber-400">
                  <span>EXPLORAR AMBIENTE</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

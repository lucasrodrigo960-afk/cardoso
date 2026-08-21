import React from 'react';
import { Video, Camera, ArrowUpRight } from 'lucide-react';
import type { Room } from '../types';

interface RoomGridProps {
  rooms: Room[];
  onSelectRoom: (room: Room) => void;
}

export const RoomGrid: React.FC<RoomGridProps> = ({ rooms, onSelectRoom }) => {
  return (
    <section id="rooms" className="py-32 px-6 sm:px-12 max-w-7xl mx-auto bg-[#0b0c0e]">
      {/* Section Header (Inspired by Reference 1) */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="text-amber-400 font-mono text-xs tracking-[0.25em] uppercase mb-3">
          01 · VISITA GUIADA POR AMBIENTES
        </div>
        <h2 className="text-4xl sm:text-6xl font-extralight text-white font-serif tracking-tight mb-4">
          EXPLORE A PROPRIEDADE
        </h2>
        <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
          Selecione qualquer um dos ambientes abaixo para acessar galerias exclusivas de fotos, vídeos em 4K e especificações detalhadas de cada cômodo.
        </p>
      </div>

      {/* Grid of Vertical Portrait Media Cards (Inspired by Reference 1 "Popular Tours") */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            onClick={() => onSelectRoom(room)}
            className="group relative h-[480px] rounded-2xl overflow-hidden glass-dark-card border border-white/10 hover:border-amber-400/60 transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col justify-between shadow-2xl"
          >
            {/* Background Photography */}
            <div className="absolute inset-0 z-0">
              <img
                src={room.coverImage}
                alt={room.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter brightness-[0.75]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-[#0b0c0e]/30 to-black/40" />
            </div>

            {/* Top Badges */}
            <div className="relative z-10 p-5 flex items-center justify-between">
              <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-white/10">
                {room.number}
              </span>

              <div className="flex items-center gap-2">
                {room.videoUrl && (
                  <span className="flex items-center gap-1 text-[10px] font-mono text-amber-300 bg-amber-500/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-400/40">
                    <Video className="w-3 h-3" />
                    <span>4K</span>
                  </span>
                )}
                <span className="flex items-center gap-1 text-[10px] font-mono text-zinc-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  <Camera className="w-3 h-3 text-amber-400" />
                  <span>{room.photos.length}</span>
                </span>
              </div>
            </div>

            {/* Bottom Details Overlay (Exact Reference 1 style) */}
            <div className="relative z-10 p-6 bg-gradient-to-t from-[#0b0c0e] via-[#0b0c0e]/90 to-transparent">
              <div className="text-[11px] font-mono text-amber-400 uppercase tracking-widest mb-1">
                {room.areaM2} m² PRIVATIVOS
              </div>

              <h3 className="text-2xl font-serif font-light text-white mb-2 group-hover:text-amber-300 transition-colors">
                {room.name}
              </h3>

              <p className="text-xs text-zinc-400 font-light line-clamp-2 leading-relaxed mb-4">
                {room.subtitle}
              </p>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-300 uppercase tracking-widest font-light group-hover:text-amber-400">
                <span>EXPLORAR</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

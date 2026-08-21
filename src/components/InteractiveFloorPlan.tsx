import React from 'react';
import { MapPin, MousePointerClick } from 'lucide-react';
import type { Room, FloorPlanSpot } from '../types';

interface InteractiveFloorPlanProps {
  floorPlanImage?: string;
  hotspots: FloorPlanSpot[];
  rooms: Room[];
  onSelectRoom: (room: Room) => void;
}

export const InteractiveFloorPlan: React.FC<InteractiveFloorPlanProps> = ({
  floorPlanImage,
  hotspots,
  rooms,
  onSelectRoom,
}) => {
  const getRoomById = (roomId: string) => rooms.find((r) => r.id === roomId);

  return (
    <section id="floorplan" className="py-32 px-6 sm:px-12 max-w-7xl mx-auto bg-[#0b0c0e]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="text-amber-400 font-mono text-xs tracking-[0.25em] uppercase mb-3">
          02 · ARQUITETURA & PLANTA BAIXA
        </div>
        <h2 className="text-4xl sm:text-6xl font-extralight text-white font-serif tracking-tight mb-4">
          A PLANTA
        </h2>
        <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
          Navegue pela distribuição espacial da propriedade. Clique em qualquer um dos marcadores da planta para acessar diretamente o ambiente correspondente.
        </p>
      </div>

      {/* Blueprint Visual Box (Glass dark card) */}
      <div className="glass-dark-card rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden shadow-2xl">
        {/* Top Hint Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 text-xs text-zinc-400 font-light">
          <div className="flex items-center gap-2">
            <MousePointerClick className="w-4 h-4 text-amber-400" />
            <span className="uppercase font-mono tracking-[0.15em]">Selecione um cômodo na planta</span>
          </div>
          <span className="font-mono text-zinc-500 hidden sm:inline">{hotspots.length} Marcadores Interativos</span>
        </div>

        {/* Blueprint Canvas Container */}
        <div className="relative w-full h-[400px] sm:h-[550px] bg-[#08080a] rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center">
          <img
            src={
              floorPlanImage ||
              'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80'
            }
            alt="Planta Baixa"
            className="w-full h-full object-cover filter brightness-[0.6] contrast-[1.1] opacity-80"
          />

          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

          {/* Hotspots */}
          {hotspots.map((spot, idx) => {
            const targetRoom = getRoomById(spot.roomId);
            if (!targetRoom) return null;

            return (
              <button
                key={idx}
                onClick={() => onSelectRoom(targetRoom)}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              >
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-8 h-8 rounded-full bg-amber-400/40 animate-ping" />

                  <div className="relative z-10 px-3.5 py-1.5 rounded-full bg-[#121316]/90 text-white font-semibold text-xs shadow-xl flex items-center gap-2 border border-amber-400/60 group-hover:bg-amber-400 group-hover:text-black transition-all">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 group-hover:text-black" />
                    <span className="tracking-wider uppercase text-[11px] font-mono">{spot.label}</span>
                  </div>
                </div>

                {/* Hover Popover */}
                <div className="absolute left-1/2 bottom-full mb-3 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 w-52 glass-dark-card p-3 rounded-2xl border border-amber-400/50 shadow-2xl text-left z-30">
                  <img
                    src={targetRoom.coverImage}
                    alt={targetRoom.name}
                    className="w-full h-24 object-cover rounded-xl mb-2"
                  />
                  <div className="text-xs font-serif text-white tracking-wide truncate">{targetRoom.name}</div>
                  <div className="text-[10px] text-amber-400 font-mono mt-0.5">{targetRoom.areaM2} m² · Clique para abrir</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Text Shortcuts Row */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-3">
          {hotspots.map((spot, idx) => {
            const targetRoom = getRoomById(spot.roomId);
            if (!targetRoom) return null;

            return (
              <button
                key={idx}
                onClick={() => onSelectRoom(targetRoom)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-amber-400 hover:text-black text-zinc-300 border border-white/10 text-xs font-mono tracking-wider uppercase transition-all cursor-pointer"
              >
                [{spot.label}]
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

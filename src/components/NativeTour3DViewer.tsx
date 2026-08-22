import React, { useState } from 'react';
import { Compass, Layers, Maximize2, Minimize2, MoveUp } from 'lucide-react';
import type { Tour } from '../types';

interface NativeTour3DViewerProps {
  tour: Tour;
  onOpenAdminEditor?: () => void;
}

export const NativeTour3DViewer: React.FC<NativeTour3DViewerProps> = ({ tour }) => {
  const [activeRoomId, setActiveRoomId] = useState<string>(
    tour.rooms[0]?.id || ''
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const activeRoom = tour.rooms.find((r) => r.id === activeRoomId) || tour.rooms[0];

  if (!activeRoom) {
    return null;
  }

  const currentPhoto = activeRoom.photos[activePhotoIndex] || activeRoom.coverImage;
  const hotspots = activeRoom.hotspots3D || [];

  const handleHotspotClick = (targetRoomId: string) => {
    const target = tour.rooms.find((r) => r.id === targetRoomId);
    if (target) {
      setActiveRoomId(target.id);
      setActivePhotoIndex(0);
    }
  };

  return (
    <section id="tour3d" className="py-24 md:py-32 px-6 sm:px-12 max-w-7xl mx-auto bg-[#0b0c0e]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="text-amber-400 font-mono text-xs tracking-[0.25em] uppercase mb-3">
          Motor de Tour Virtual Nativo Próprio
        </div>
        <h2 className="text-4xl sm:text-6xl font-extralight text-white font-serif tracking-tight mb-4">
          EXPLORE ANTES DE VISITAR
        </h2>
        <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
          Navegue tridimensionalmente entre os ambientes. Clique nas setas e marcadores na tela para "caminhar" pelos cômodos da propriedade.
        </p>
      </div>

      {/* Main 3D Native Canvas Container */}
      <div
        className={`relative w-full transition-all duration-500 rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black ${
          isFullscreen
            ? 'fixed inset-0 z-50 rounded-none h-screen w-screen border-none'
            : 'h-[500px] sm:h-[650px] md:h-[750px]'
        }`}
      >
        {/* Room Photo Media */}
        <div className="relative w-full h-full overflow-hidden select-none">
          <img
            src={currentPhoto}
            alt={activeRoom.name}
            className="w-full h-full object-cover transition-opacity duration-700 filter brightness-[0.85] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 pointer-events-none" />

          {/* Interactive 3D Passage Hotspots (Setas e Pinos de Transição) */}
          {hotspots.map((spot) => {
            const targetRoom = tour.rooms.find((r) => r.id === spot.targetRoomId);

            return (
              <button
                key={spot.id}
                onClick={() => handleHotspotClick(spot.targetRoomId)}
                style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%` }}
                className="absolute z-30 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              >
                <div className="relative flex flex-col items-center">
                  {/* Glowing Radar Pulse Ring */}
                  <span className="absolute w-12 h-12 rounded-full bg-amber-400/40 animate-ping pointer-events-none" />

                  {/* Hotspot Pin Icon */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-[#121316]/90 border-2 border-amber-400 text-amber-400 flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.6)] group-hover:scale-125 group-hover:bg-amber-400 group-hover:text-black transition-all">
                    <MoveUp className="w-5 h-5 transition-transform group-hover:translate-y-1" />
                  </div>

                  {/* Floating Badge Label */}
                  <div className="mt-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white font-mono text-[11px] uppercase tracking-wider border border-white/20 shadow-xl group-hover:bg-amber-400 group-hover:text-black transition-all whitespace-nowrap">
                    {spot.label || (targetRoom ? `IR PARA ${targetRoom.name}` : 'AVANÇAR')}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Top Control Bar */}
        <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-3 bg-[#0b0c0e]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 text-white">
            <Compass className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span className="font-mono text-xs uppercase tracking-widest text-amber-300 font-semibold">
              {activeRoom.number} · {activeRoom.name}
            </span>
            <span className="text-zinc-500 font-mono text-xs">({activeRoom.areaM2} m²)</span>
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white hover:bg-amber-400 hover:text-black transition-all cursor-pointer"
              title="Tela Cheia"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Room Switcher Drawer at Bottom */}
        <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between gap-4 pointer-events-none">
          {/* Room Selector Pills */}
          <div className="pointer-events-auto flex items-center gap-2 overflow-x-auto p-2 bg-black/80 backdrop-blur-md rounded-2xl border border-white/15 max-w-full">
            <div className="flex items-center gap-1.5 px-3 text-[10px] font-mono text-zinc-400 uppercase tracking-widest border-r border-white/10 flex-shrink-0">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>CÔMODOS</span>
            </div>

            {tour.rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => {
                  setActiveRoomId(room.id);
                  setActivePhotoIndex(0);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all flex-shrink-0 cursor-pointer flex items-center gap-2 ${
                  room.id === activeRoom.id
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-lg scale-105'
                    : 'bg-white/5 hover:bg-white/15 text-zinc-300 border border-white/10'
                }`}
              >
                <span>{room.number}</span>
                <span className="hidden sm:inline font-serif font-light">{room.name}</span>
              </button>
            ))}
          </div>

          {/* Photo Sub-navigation if room has multiple photos */}
          {activeRoom.photos.length > 1 && (
            <div className="pointer-events-auto hidden md:flex items-center gap-1 bg-black/80 backdrop-blur-md p-1.5 rounded-xl border border-white/15">
              {activeRoom.photos.map((_, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => setActivePhotoIndex(pIdx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    pIdx === activePhotoIndex ? 'bg-amber-400 scale-125' : 'bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

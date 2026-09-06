import React, { useState } from 'react';
import { Maximize2, Minimize2, Compass, Layers, ExternalLink } from 'lucide-react';
import type { Property, Room } from '../types';

interface VirtualTour3DProps {
  tour: Property;
  onSelectRoom?: (room: Room) => void;
}

export const VirtualTour3D: React.FC<VirtualTour3DProps> = ({ tour, onSelectRoom }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'matterport' | 'floors'>('matterport');

  const tour3DUrl = tour.tour3DUrl || 'https://my.matterport.com/show/?m=sample_3d_tour';

  return (
    <section id="tour3d" className="py-24 md:py-32 px-6 sm:px-12 max-w-7xl mx-auto bg-[#08090A]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="text-amber-400 font-mono text-xs tracking-[0.25em] uppercase mb-3">
          Experiência Imersiva
        </div>
        <h2 className="text-4xl sm:text-6xl font-extralight text-white font-serif tracking-tight mb-4">
          TOUR VIRTUAL 3D
        </h2>
        <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
          Caminhe livremente pelos ambientes da propriedade em tempo real. Alterne a visão ou explore cômodos específicos no menu inferior.
        </p>
      </div>

      {/* Main Tour Container */}
      <div
        className={`relative w-full transition-all duration-500 rounded-3xl overflow-hidden glass-dark-card border border-white/15 shadow-2xl ${
          isFullscreen
            ? 'fixed inset-0 z-50 rounded-none h-screen w-screen border-none'
            : 'h-[550px] sm:h-[680px]'
        }`}
      >
        {/* Top Floating Control Bar */}
        <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
          {/* Mode Switcher */}
          <div className="pointer-events-auto flex items-center gap-2 bg-[#08090A]/85 backdrop-blur-md p-1.5 rounded-full border border-white/15">
            <button
              onClick={() => setActiveTab('matterport')}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'matterport'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Imersão 3D</span>
            </button>
          </div>

          {/* Fullscreen & External Controls */}
          <div className="pointer-events-auto flex items-center gap-3">
            <a
              href={tour3DUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono text-zinc-300 hover:text-amber-300 border border-white/15 transition-colors"
            >
              <span>Abrir em Nova Aba</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-3 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-amber-400 hover:text-slate-950 border border-white/15 transition-all cursor-pointer shadow-lg"
              title="Tela Cheia"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 3D iFrame Canvas */}
        <iframe
          src={tour3DUrl}
          title="Tour Virtual 3D da Propriedade"
          className="w-full h-full border-0 filter brightness-[0.95]"
          allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />

        {/* Room Quick Switcher Drawer at Bottom */}
        {tour.rooms && tour.rooms.length > 0 && (
          <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-2 overflow-x-auto p-2 bg-[#08090A]/90 backdrop-blur-md rounded-2xl border border-white/15 max-w-full">
              <div className="flex items-center gap-1.5 px-3 text-[10px] font-mono text-amber-400 uppercase tracking-widest border-r border-white/10 flex-shrink-0">
                <Layers className="w-3.5 h-3.5" />
                <span>CÔMODOS</span>
              </div>

              {tour.rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => onSelectRoom && onSelectRoom(room)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-amber-400/20 hover:text-amber-300 border border-white/10 text-xs font-mono tracking-wider text-zinc-200 uppercase transition-all flex-shrink-0 cursor-pointer flex items-center gap-2"
                >
                  <span>{room.number}</span>
                  <span className="hidden sm:inline font-serif font-light">{room.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

import React from 'react';
import { X } from 'lucide-react';
import type { Room } from '../types';
import { RoomMediaViewer } from './RoomMediaViewer';
import { ContextualTourNavigation } from './ContextualTourNavigation';

interface RoomModalViewerProps {
  room: Room;
  allRooms: Room[];
  onClose: () => void;
  onNavigateRoom: (room: Room) => void;
}

export const RoomModalViewer: React.FC<RoomModalViewerProps> = ({
  room,
  allRooms,
  onClose,
  onNavigateRoom,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl text-white p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl glass-dark-card rounded-3xl border border-white/15 shadow-2xl flex flex-col my-auto max-h-[96vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-[#0b0c0e]/90">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-amber-400 tracking-widest uppercase">
              CÔMODO {room.number}
            </span>
            <span className="text-zinc-600">|</span>
            <h2 className="text-xl md:text-2xl font-light font-serif text-white tracking-wide">
              {room.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            title="Fechar (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto max-h-[calc(96vh-160px)]">
          {/* Left: Room Media Viewer (7 cols) */}
          <div className="lg:col-span-7 bg-[#0b0c0e]/60 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
            <RoomMediaViewer room={room} />
          </div>

          {/* Right: Room Specs & Contextual Navigation Sidebar (5 cols) */}
          <div className="lg:col-span-5 p-8 flex flex-col justify-between bg-[#121316]/90">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                  {room.areaM2 ? `${room.areaM2} m² PRIVATIVOS` : 'AMBIENTE EXCLUSIVO'}
                </span>
              </div>

              <h3 className="text-3xl font-light font-serif text-white mb-3">
                {room.name}
              </h3>
              {room.subtitle && (
                <p className="text-sm text-zinc-300 font-light leading-relaxed mb-8">
                  {room.subtitle}
                </p>
              )}

              {/* Characteristics Chips */}
              {room.characteristics && room.characteristics.length > 0 && (
                <div className="mb-8">
                  <div className="text-xs text-amber-400 font-mono tracking-widest uppercase mb-4">
                    ATRIBUTOS DO AMBIENTE
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {room.characteristics.map((char, i) => (
                      <div
                        key={i}
                        className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-200 font-light backdrop-blur-md"
                      >
                        {char}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contextual & Hierarchical Navigation (Pai / Filho / Irmão) */}
            <ContextualTourNavigation
              activeRoom={room}
              allRooms={allRooms}
              onNavigateToRoom={onNavigateRoom}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

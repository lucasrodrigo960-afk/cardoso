import React, { useState, useEffect } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Compass, Route } from 'lucide-react';
import type { Property, Room } from '../types';

interface GuidedTourBarProps {
  tour: Property;
  onSelectRoom: (room: Room) => void;
}

export const GuidedTourBar: React.FC<GuidedTourBarProps> = ({ tour, onSelectRoom }) => {
  const [tourMode, setTourMode] = useState<'guided' | 'free'>('guided');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Sequence of room IDs for guided tour
  const sequence = tour.guidedTourSequence && tour.guidedTourSequence.length > 0
    ? tour.guidedTourSequence
    : tour.rooms.map((r) => r.id);

  const currentRoomId = sequence[currentIndex] || sequence[0];
  const currentRoom = tour.rooms.find((r) => r.id === currentRoomId) || tour.rooms[0];

  // Auto advance timer when isPlaying is active
  useEffect(() => {
    let timer: any = null;
    if (isPlaying && tourMode === 'guided') {
      timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= sequence.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 7000); // 7s auto stay per room
    }
    return () => clearInterval(timer);
  }, [isPlaying, sequence.length, tourMode]);

  const handleGoToRoom = (idx: number) => {
    setCurrentIndex(idx);
    const targetRoom = tour.rooms.find((r) => r.id === sequence[idx]);
    if (targetRoom) {
      onSelectRoom(targetRoom);
    }
  };

  const handleNext = () => {
    if (currentIndex < sequence.length - 1) {
      handleGoToRoom(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      handleGoToRoom(currentIndex - 1);
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] border-b border-[#E5E7EB] py-4 shadow-sm select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Mode Selector */}
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-xl bg-[#F3F4F6] border border-[#E5E7EB] flex items-center gap-1">
            <button
              onClick={() => {
                setTourMode('guided');
                setIsPlaying(false);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                tourMode === 'guided'
                  ? 'bg-[#C5A880] text-[#111827] font-semibold shadow-sm'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              <Route className="w-3.5 h-3.5" />
              <span>Visita Guiada</span>
            </button>

            <button
              onClick={() => {
                setTourMode('free');
                setIsPlaying(false);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                tourMode === 'free'
                  ? 'bg-[#111827] text-white font-semibold shadow-sm'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Exploração Livre</span>
            </button>
          </div>
        </div>

        {/* Guided Tour Interactive Controls */}
        {tourMode === 'guided' ? (
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono w-full md:w-auto justify-center md:justify-end">
            <div className="flex items-center gap-2 text-[#374151]">
              <span className="text-[#C5A880] font-semibold">
                AMBIENTE {currentIndex + 1} DE {sequence.length}:
              </span>
              <span className="font-serif text-[#111827] font-medium text-sm">
                {currentRoom?.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="p-2 rounded-lg bg-[#F3F4F6] hover:bg-[#E5E7EB] disabled:opacity-30 text-[#111827] transition-all cursor-pointer border border-[#E5E7EB]"
                title="Ambiente Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3 py-1.5 rounded-lg bg-[#111827] text-white hover:bg-[#1F2937] transition-all cursor-pointer font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#C5A880]" /> : <Play className="w-3.5 h-3.5 text-[#C5A880]" />}
                <span>{isPlaying ? 'PAUSAR' : 'REPRODUZIR'}</span>
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === sequence.length - 1}
                className="p-2 rounded-lg bg-[#F3F4F6] hover:bg-[#E5E7EB] disabled:opacity-30 text-[#111827] transition-all cursor-pointer border border-[#E5E7EB]"
                title="Próximo Ambiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-xs text-[#687082] font-mono">
            💡 Selecione qualquer ambiente no mapa ou grid para visualizar fotos em HD.
          </div>
        )}
      </div>
    </div>
  );
};

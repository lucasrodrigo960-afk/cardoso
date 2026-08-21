import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Maximize2, Layers } from 'lucide-react';
import type { Room } from '../types';
import { FullscreenGallery } from './FullscreenGallery';

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
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showFullscreenGallery, setShowFullscreenGallery] = useState(false);

  const sortedRooms = [...allRooms].sort((a, b) => a.order - b.order);
  const currentIndex = sortedRooms.findIndex((r) => r.id === room.id);
  const prevRoom = currentIndex > 0 ? sortedRooms[currentIndex - 1] : null;
  const nextRoom = currentIndex < sortedRooms.length - 1 ? sortedRooms[currentIndex + 1] : null;

  const handlePrevPhoto = () => {
    setActivePhotoIdx((prev) => (prev === 0 ? room.photos.length - 1 : prev - 1));
  };

  const handleNextPhoto = () => {
    setActivePhotoIdx((prev) => (prev === room.photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl text-white p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
      {/* Modal Container (Dark Glass Card inspired by Reference 2) */}
      <div className="relative w-full max-w-6xl glass-dark-card rounded-3xl border border-white/15 shadow-2xl flex flex-col my-auto max-h-[96vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-[#0b0c0e]/80">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto max-h-[calc(96vh-130px)]">
          {/* Left: Main Photo Gallery (7 cols) */}
          <div className="lg:col-span-7 bg-[#0b0c0e]/60 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="relative w-full h-[360px] sm:h-[450px] rounded-2xl overflow-hidden group shadow-2xl bg-black">
              <img
                src={room.photos[activePhotoIdx] || room.coverImage}
                alt={room.name}
                className="w-full h-full object-cover transition-all duration-500 filter brightness-[0.95]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Gallery Arrows */}
              {room.photos.length > 1 && (
                <>
                  <button
                    onClick={handlePrevPhoto}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-black/90 hover:scale-110 transition-all cursor-pointer border border-white/10 backdrop-blur-md"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleNextPhoto}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-black/90 hover:scale-110 transition-all cursor-pointer border border-white/10 backdrop-blur-md"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Zoom Trigger */}
              <button
                onClick={() => setShowFullscreenGallery(true)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 border border-white/10 text-white hover:bg-amber-400 hover:text-black transition-all flex items-center gap-2 text-xs uppercase tracking-wider backdrop-blur-md"
              >
                <Maximize2 className="w-4 h-4" />
                <span className="hidden sm:inline">Ampliar</span>
              </button>

              {/* Photo Counter */}
              <div className="absolute bottom-4 left-4 font-mono text-xs text-zinc-300 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                {activePhotoIdx + 1} / {room.photos.length} FOTOS
              </div>
            </div>

            {/* Thumbnails Row */}
            {room.photos.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pt-4 pb-2 scrollbar-none">
                {room.photos.map((photo, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`w-20 h-14 rounded-xl overflow-hidden border transition-all flex-shrink-0 cursor-pointer ${
                      idx === activePhotoIdx
                        ? 'border-amber-400 scale-105 shadow-md'
                        : 'border-transparent opacity-40 hover:opacity-100'
                    }`}
                  >
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Room Specs Sidebar (5 cols) */}
          <div className="lg:col-span-5 p-8 flex flex-col justify-between bg-[#121316]/90">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                  {room.areaM2} m² PRIVATIVOS
                </span>

                {room.videoUrl && (
                  <button
                    onClick={() => setShowVideoModal(true)}
                    className="btn-gold-warm px-4 py-2 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>ASSISTIR VÍDEO</span>
                  </button>
                )}
              </div>

              <h3 className="text-3xl font-light font-serif text-white mb-3">
                {room.name}
              </h3>
              <p className="text-sm text-zinc-300 font-light leading-relaxed mb-8">
                {room.subtitle}
              </p>

              {/* Characteristics Frosted Chips (Inspired by Reference 2) */}
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
            </div>

            {/* Video Callout Bar */}
            {room.videoUrl && (
              <div
                onClick={() => setShowVideoModal(true)}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/50 flex items-center justify-between cursor-pointer transition-all group backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-black flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                    <Play className="w-4 h-4 fill-black ml-0.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white uppercase tracking-wider">Vídeo Exclusivo em 4K</div>
                    <div className="text-[11px] text-zinc-400">Clique para reproduzir o registro em vídeo</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer: Inter-Room Navigation */}
        <div className="flex items-center justify-between px-8 py-4 border-t border-white/10 bg-[#0b0c0e]">
          {prevRoom ? (
            <button
              onClick={() => {
                setActivePhotoIdx(0);
                onNavigateRoom(prevRoom);
              }}
              className="flex items-center gap-2 text-xs font-light tracking-widest text-zinc-300 hover:text-amber-400 uppercase transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>← {prevRoom.number} {prevRoom.name}</span>
            </button>
          ) : (
            <div />
          )}

          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-widest font-mono">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Navegação entre Cômodos</span>
          </div>

          {nextRoom ? (
            <button
              onClick={() => {
                setActivePhotoIdx(0);
                onNavigateRoom(nextRoom);
              }}
              className="flex items-center gap-2 text-xs font-light tracking-widest text-white hover:text-amber-400 uppercase transition-colors cursor-pointer"
            >
              <span>{nextRoom.number} {nextRoom.name} →</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Video Player Modal */}
      {showVideoModal && room.videoUrl && (
        <div className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl bg-black rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 bg-[#0b0c0e] border-b border-white/10">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                VÍDEO 4K · {room.name}
              </span>
              <button
                onClick={() => setShowVideoModal(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative w-full aspect-video bg-black">
              <video
                src={room.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox */}
      {showFullscreenGallery && (
        <FullscreenGallery
          photos={room.photos}
          initialIndex={activePhotoIdx}
          onClose={() => setShowFullscreenGallery(false)}
        />
      )}
    </div>
  );
};

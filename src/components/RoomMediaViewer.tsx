import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Compass, Maximize2, Play, Image as ImageIcon } from 'lucide-react';
import type { Room, PropertyMedia } from '../types';
import { FullscreenGallery } from './FullscreenGallery';

interface RoomMediaViewerProps {
  room: Room;
}

export const RoomMediaViewer: React.FC<RoomMediaViewerProps> = ({ room }) => {
  const mediaList: PropertyMedia[] = room.media && room.media.length > 0
    ? room.media
    : (room.photos || [room.coverImage]).map((url, i) => ({
        id: `m_${i}`,
        type: 'image',
        url,
        title: `Fotografia ${i + 1}`
      }));

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [is360Active, setIs360Active] = useState(false);

  const activeMedia = mediaList[activeMediaIndex] || mediaList[0];
  const photoUrls = mediaList.map((m) => m.url);

  const handlePrev = () => {
    setActiveMediaIndex((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveMediaIndex((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Display Surface */}
      <div className="relative w-full h-[360px] sm:h-[480px] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl group">
        {activeMedia.type === 'panorama' ? (
          /* Interactive 360 Panorama Mode */
          <div className="relative w-full h-full">
            <img
              src={activeMedia.url}
              alt={activeMedia.title || room.name}
              className={`w-full h-full object-cover transition-transform duration-1000 ${
                is360Active ? 'scale-125' : 'scale-105'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
              <button
                onClick={() => setIs360Active(!is360Active)}
                className="w-16 h-16 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-110 transition-all cursor-pointer mb-3"
              >
                <Compass className="w-8 h-8 animate-spin-slow" />
              </button>
              <div className="text-xs font-mono text-amber-300 uppercase tracking-widest font-semibold">
                Navegação Panorâmica 360°
              </div>
              <div className="text-xs text-zinc-300 font-light mt-1">
                {is360Active ? 'Arraste para girar a visão 360°' : 'Clique para ativar o leitor panorâmico'}
              </div>
            </div>
          </div>
        ) : activeMedia.type === 'video' ? (
          /* Video 4K Mode */
          <div className="relative w-full h-full bg-black">
            <video
              src={activeMedia.url}
              controls
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          /* HD Image Photo Mode */
          <div className="relative w-full h-full">
            <img
              src={activeMedia.url}
              alt={activeMedia.title || room.name}
              className="w-full h-full object-cover transition-transform duration-700 filter brightness-[0.95]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* Gallery Arrow Controls */}
        {mediaList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 hover:scale-110 transition-all cursor-pointer border border-white/10 backdrop-blur-md z-20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 hover:scale-110 transition-all cursor-pointer border border-white/10 backdrop-blur-md z-20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Top Media Type Badge */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-300 font-mono text-[11px] uppercase tracking-wider border border-white/10 flex items-center gap-1.5">
            {activeMedia.type === 'panorama' ? (
              <>
                <Compass className="w-3.5 h-3.5" />
                <span>360° PANORAMA</span>
              </>
            ) : activeMedia.type === 'video' ? (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>VÍDEO 4K</span>
              </>
            ) : (
              <>
                <ImageIcon className="w-3.5 h-3.5" />
                <span>FOTO HD</span>
              </>
            )}
          </span>
        </div>

        {/* Zoom Lightbox Trigger */}
        <button
          onClick={() => setShowFullscreen(true)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-amber-400 hover:text-black transition-all cursor-pointer border border-white/10 backdrop-blur-md"
          title="Ampliar"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Counter */}
        <div className="absolute bottom-4 left-4 z-20 font-mono text-[11px] text-zinc-300 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          {activeMediaIndex + 1} / {mediaList.length} MÍDIAS
        </div>
      </div>

      {/* Media Thumbnails Row */}
      {mediaList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto py-1 scrollbar-none">
          {mediaList.map((m, idx) => (
            <button
              key={m.id || idx}
              onClick={() => setActiveMediaIndex(idx)}
              className={`w-20 h-14 rounded-xl overflow-hidden border transition-all flex-shrink-0 cursor-pointer relative ${
                idx === activeMediaIndex
                  ? 'border-amber-400 scale-105 shadow-md'
                  : 'border-transparent opacity-40 hover:opacity-100'
              }`}
            >
              <img src={m.url} alt="" className="w-full h-full object-cover" />
              {m.type === 'panorama' && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Compass className="w-4 h-4 text-amber-300" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {showFullscreen && (
        <FullscreenGallery
          photos={photoUrls}
          initialIndex={activeMediaIndex}
          onClose={() => setShowFullscreen(false)}
        />
      )}
    </div>
  );
};

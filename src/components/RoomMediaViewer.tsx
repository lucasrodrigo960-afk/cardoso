import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Play, Image as ImageIcon } from 'lucide-react';
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
        type: 'image' as const,
        url,
        title: `Fotografia ${i + 1}`
      }));

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const activeMedia = mediaList[activeMediaIndex] || mediaList[0];
  const photoUrls = mediaList.map((m) => m.url);

  const handlePrev = () => {
    setActiveMediaIndex((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveMediaIndex((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-4 w-full select-none">
      {/* Main Display Surface */}
      <div className="relative w-full h-[360px] sm:h-[450px] rounded-2xl overflow-hidden bg-[#111827] border border-[#E5E7EB] shadow-xl group">
        {activeMedia.type === 'video' ? (
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
              className="w-full h-full object-cover transition-transform duration-700 ease-out filter brightness-[0.98]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* Gallery Arrow Controls */}
        {mediaList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#111827]/70 text-white hover:bg-[#111827] transition-all cursor-pointer backdrop-blur-md z-20"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#111827]/70 text-white hover:bg-[#111827] transition-all cursor-pointer backdrop-blur-md z-20"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Top Media Type Badge */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#111827]/80 backdrop-blur-md text-white font-mono text-[11px] uppercase tracking-wider border border-white/20 flex items-center gap-1.5">
            {activeMedia.type === 'video' ? (
              <>
                <Play className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>VÍDEO 4K</span>
              </>
            ) : (
              <>
                <ImageIcon className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>FOTO HD</span>
              </>
            )}
          </span>
        </div>

        {/* Zoom Lightbox Trigger */}
        <button
          onClick={() => setShowFullscreen(true)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#111827]/70 text-white hover:bg-[#C5A880] hover:text-[#111827] transition-all cursor-pointer backdrop-blur-md"
          title="Ampliar"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Counter */}
        <div className="absolute bottom-4 left-4 z-20 font-mono text-[11px] text-white bg-[#111827]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
          {activeMediaIndex + 1} / {mediaList.length} FOTOS
        </div>
      </div>

      {/* Media Thumbnails Row */}
      {mediaList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto py-1">
          {mediaList.map((m, idx) => (
            <button
              key={m.id || idx}
              onClick={() => setActiveMediaIndex(idx)}
              className={`w-20 h-14 rounded-xl overflow-hidden border transition-all flex-shrink-0 cursor-pointer relative ${
                idx === activeMediaIndex
                  ? 'border-[#C5A880] scale-105 shadow-md ring-2 ring-[#C5A880]/40'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={m.url} alt="" className="w-full h-full object-cover" />
              {m.type === 'video' && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Play className="w-4 h-4 text-white" />
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

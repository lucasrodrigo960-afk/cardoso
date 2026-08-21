import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface FullscreenGalleryProps {
  photos: string[];
  initialIndex: number;
  onClose: () => void;
}

export const FullscreenGallery: React.FC<FullscreenGalleryProps> = ({
  photos,
  initialIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const toggleZoom = () => {
    setZoomLevel((prev) => (prev === 1 ? 1.8 : 1));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 text-white select-none backdrop-blur-lg">
      {/* Top Bar */}
      <div className="flex items-center justify-between z-10">
        <div className="text-xs font-mono text-amber-400/90 tracking-widest uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
          Fotografia {currentIndex + 1} de {photos.length}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleZoom}
            className="p-2.5 rounded-full bg-white/10 hover:bg-amber-500/20 text-white hover:text-amber-300 transition-colors"
            title="Zoom"
          >
            {zoomLevel === 1 ? <ZoomIn className="w-5 h-5" /> : <ZoomOut className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-amber-500/20 text-white hover:text-amber-300 transition-colors"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Display */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden my-4">
        {photos.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 z-20 p-3.5 rounded-full bg-black/70 border border-amber-500/30 text-amber-300 hover:bg-amber-500/30 hover:scale-110 transition-all cursor-pointer shadow-2xl"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div className="w-full h-full flex items-center justify-center p-2">
          <img
            src={photos[currentIndex]}
            alt={`Foto ${currentIndex + 1}`}
            style={{ transform: `scale(${zoomLevel})` }}
            className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl transition-transform duration-300 cursor-zoom-in"
            onClick={toggleZoom}
          />
        </div>

        {photos.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 z-20 p-3.5 rounded-full bg-black/70 border border-amber-500/30 text-amber-300 hover:bg-amber-500/30 hover:scale-110 transition-all cursor-pointer shadow-2xl"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      {photos.length > 1 && (
        <div className="flex items-center justify-center gap-3 overflow-x-auto py-2 z-10">
          {photos.map((photo, idx) => (
            <button
              key={idx}
              onClick={() => {
                setZoomLevel(1);
                setCurrentIndex(idx);
              }}
              className={`w-16 h-12 rounded-md overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                idx === currentIndex ? 'border-amber-400 scale-105 shadow-[0_0_15px_rgba(212,175,55,0.8)]' : 'border-transparent opacity-50 hover:opacity-100'
              }`}
            >
              <img src={photo} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

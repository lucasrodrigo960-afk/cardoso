import React, { useState } from 'react';
import { Camera, Maximize2 } from 'lucide-react';
import { FullscreenGallery } from './FullscreenGallery';
import type { Tour } from '../types';

interface EditorialGalleryProps {
  tour: Tour;
}

export const EditorialGallery: React.FC<EditorialGalleryProps> = ({ tour }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const photos = tour.galleryPhotos.length > 0
    ? tour.galleryPhotos
    : tour.rooms.flatMap((r) => r.photos);

  return (
    <section id="gallery" className="py-24 md:py-32 px-6 sm:px-12 max-w-7xl mx-auto bg-[#0b0c0e]">
      {/* Section Header */}
      <div className="max-w-3xl mb-16 text-left">
        <div className="text-amber-400 font-mono text-xs tracking-[0.25em] uppercase mb-3">
          Ensaio Fotográfico
        </div>
        <h2 className="text-4xl sm:text-6xl font-extralight text-white font-serif tracking-tight mb-4">
          GALERIA DE FOTOS
        </h2>
        <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
          Registros em alta resolução apresentando os acabamentos, iluminação e cada espaço do imóvel.
        </p>
      </div>

      {/* Editorial Layout Composition (1 Wide → 2 Pairs → 1 Panoramic) */}
      <div className="space-y-6">
        {/* Photo 1: Large Panoramic Header */}
        {photos[0] && (
          <div
            onClick={() => setLightboxIndex(0)}
            className="group relative w-full h-[400px] sm:h-[550px] rounded-3xl overflow-hidden cursor-pointer shadow-2xl bg-[#121316] border border-white/10"
          >
            <img
              src={photos[0]}
              alt="Fotografia Principal"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-[0.9]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10 text-white">
              <span className="font-mono text-xs text-amber-300 tracking-widest uppercase">Fotografia 01</span>
              <span className="flex items-center gap-2 text-xs font-light tracking-wider group-hover:text-amber-400">
                <Maximize2 className="w-4 h-4" />
                <span>AMPLIAR</span>
              </span>
            </div>
          </div>
        )}

        {/* Photo 2 & 3: Side-by-side Pair */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {photos.slice(1, 3).map((photo, idx) => (
            <div
              key={idx + 1}
              onClick={() => setLightboxIndex(idx + 1)}
              className="group relative h-[350px] sm:h-[450px] rounded-3xl overflow-hidden cursor-pointer shadow-2xl bg-[#121316] border border-white/10"
            >
              <img
                src={photo}
                alt={`Fotografia ${idx + 2}`}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-[0.9]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10 text-white">
                <span className="font-mono text-xs text-amber-300 tracking-widest uppercase">Fotografia 0{idx + 2}</span>
                <span className="flex items-center gap-2 text-xs font-light tracking-wider group-hover:text-amber-400">
                  <Maximize2 className="w-4 h-4" />
                  <span>AMPLIAR</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Remaining Photos Grid */}
        {photos.length > 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            {photos.slice(3).map((photo, idx) => (
              <div
                key={idx + 3}
                onClick={() => setLightboxIndex(idx + 3)}
                className="group relative h-[280px] sm:h-[350px] rounded-2xl overflow-hidden cursor-pointer shadow-xl bg-[#121316] border border-white/10"
              >
                <img
                  src={photo}
                  alt={`Fotografia ${idx + 4}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 text-white text-xs">
                  <span className="font-mono text-[11px] text-amber-300">0{idx + 4}</span>
                  <Camera className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-400" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxIndex !== null && (
        <FullscreenGallery
          photos={photos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
};

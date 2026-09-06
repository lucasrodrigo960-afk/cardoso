import React, { useState } from 'react';
import { Camera, Maximize2 } from 'lucide-react';
import { FullscreenGallery } from './FullscreenGallery';
import type { Property } from '../types';

interface EditorialGalleryProps {
  tour: Property;
}

export const EditorialGallery: React.FC<EditorialGalleryProps> = ({ tour }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Aggregate photos from property galleryPhotos and room media
  const aggregatedFromRooms = tour.rooms.flatMap((r) =>
    r.media ? r.media.map((m) => m.url) : r.photos || []
  );

  const photos = tour.galleryPhotos && tour.galleryPhotos.length > 0
    ? tour.galleryPhotos
    : aggregatedFromRooms;

  if (!photos || photos.length === 0) {
    return null;
  }

  return (
    <section id="galeria" className="w-full py-20 border-b border-[#E5E7EB] bg-[#FBFBFC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-1">
            <span className="font-mono text-[11px] uppercase text-[#9C7D54] tracking-[0.2em] font-semibold">
              Ensaio Fotográfico Arquitetônico
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#111827] font-light tracking-tight">
              Galeria de Imagens
            </h2>
            <p className="text-sm text-[#6B7280] font-light">
              Registros em alta definição apresentando acabamentos, iluminação e cada ângulo da propriedade.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-xs text-[#4B5563] font-mono">
            <Camera className="w-4 h-4 text-[#9C7D54]" />
            <span>Fotografia Autoral Cardoso Imóveis</span>
          </div>
        </div>

        {/* Asymmetrical Editorial Gallery Mosaic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Large Hero Showcase Photo (8 cols) */}
          {photos[0] && (
            <div
              onClick={() => setLightboxIndex(0)}
              className="md:col-span-8 relative rounded-2xl overflow-hidden group cursor-pointer bg-[#FFFFFF] border border-[#E5E7EB] shadow-md"
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={photos[0]}
                  alt="Fotografia Principal 01"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.98]"
                />
                <div className="absolute inset-0 bg-[#111827]/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E5E7EB] shadow-sm">
                  <span className="font-serif text-xs text-[#111827] font-medium">01 // Perspectiva Principal</span>
                  <Maximize2 className="w-4 h-4 text-[#9C7D54]" />
                </div>
              </div>
            </div>
          )}

          {/* Stacked Photo (4 cols) */}
          {photos[1] && (
            <div
              onClick={() => setLightboxIndex(1)}
              className="md:col-span-4 relative rounded-2xl overflow-hidden group cursor-pointer bg-[#FFFFFF] border border-[#E5E7EB] shadow-md"
            >
              <div className="aspect-[16/10] md:aspect-[4/5] w-full overflow-hidden">
                <img
                  src={photos[1]}
                  alt="Fotografia 02"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.98]"
                />
                <div className="absolute inset-0 bg-[#111827]/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E5E7EB] shadow-sm">
                  <span className="font-serif text-xs text-[#111827] font-medium">02 // Salão Social & Pé-direito</span>
                  <Maximize2 className="w-4 h-4 text-[#9C7D54]" />
                </div>
              </div>
            </div>
          )}

          {/* Row of 3 Photos (4 cols each) */}
          {photos.slice(2, 5).map((photo, idx) => (
            <div
              key={idx + 2}
              onClick={() => setLightboxIndex(idx + 2)}
              className="md:col-span-4 relative rounded-2xl overflow-hidden group cursor-pointer bg-[#FFFFFF] border border-[#E5E7EB] shadow-md"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={photo}
                  alt={`Fotografia 0${idx + 3}`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.98]"
                />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E5E7EB] shadow-sm">
                  <span className="font-serif text-xs text-[#111827] font-medium">0{idx + 3} // Registro Editorial</span>
                  <Maximize2 className="w-3.5 h-3.5 text-[#9C7D54]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
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

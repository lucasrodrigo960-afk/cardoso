import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight, Layers, Play, Image as ImageIcon, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import type { Room, PropertyMedia } from '../types';
import { FullscreenGallery } from './FullscreenGallery';

interface RoomPresenterModalProps {
  room: Room;
  allRooms: Room[];
  onClose: () => void;
  onNavigateRoom: (room: Room) => void;
}

export const RoomPresenterModal: React.FC<RoomPresenterModalProps> = ({
  room,
  allRooms,
  onClose,
  onNavigateRoom,
}) => {
  const mediaList: PropertyMedia[] = room.media && room.media.length > 0
    ? room.media
    : (room.photos || [room.coverImage]).map((url, i) => ({
        id: `m_${i}`,
        type: 'image' as const,
        url,
        title: `Fotografia ${i + 1}`
      }));

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [showFullscreenGallery, setShowFullscreenGallery] = useState(false);

  const activeMedia = mediaList[activeMediaIndex] || mediaList[0];
  const photoUrls = mediaList.map((m) => m.url);

  // 1. Parent Room Resolution
  const parentRoom = room.parentId
    ? allRooms.find((r) => r.id === room.parentId)
    : null;

  // 2. Direct Subrooms / Children Resolution
  const childRooms = allRooms.filter((r) => r.parentId === room.id);

  // 3. Sibling Subrooms Resolution
  const siblingSubrooms = room.parentId
    ? allRooms.filter((r) => r.parentId === room.parentId)
    : [];

  const contextualSubrooms = parentRoom ? siblingSubrooms : childRooms;

  // 4. Next Sibling Subroom Target (e.g. Quarto -> Banheiro)
  let nextSiblingRoom: Room | null = null;
  if (contextualSubrooms.length > 0) {
    const currIdx = contextualSubrooms.findIndex((r) => r.id === room.id);
    if (currIdx >= 0 && currIdx < contextualSubrooms.length - 1) {
      nextSiblingRoom = contextualSubrooms[currIdx + 1];
    } else if (currIdx === -1 && childRooms.length > 0) {
      nextSiblingRoom = childRooms[0];
    }
  }

  // 5. Next Sequential Room Target
  const nextSequentialRoom = room.nextRoomId
    ? allRooms.find((r) => r.id === room.nextRoomId)
    : null;

  const primaryNextTarget = nextSiblingRoom || nextSequentialRoom;

  // 6. Previous Room Target
  const prevSequentialRoom = room.previousRoomId
    ? allRooms.find((r) => r.id === room.previousRoomId)
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0F12]/90 backdrop-blur-xl p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-300 text-[#111827]">
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#FFFFFF] rounded-3xl border border-[#E5E7EB] shadow-2xl flex flex-col my-auto max-h-[96vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-[#E5E7EB] bg-[#FBFBFC]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#C5A880] tracking-widest uppercase font-semibold">
              CÔMODO {room.number}
            </span>
            <span className="text-[#D1D5DB]">|</span>
            <h2 className="text-xl font-serif text-[#111827] font-light">
              {room.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] transition-all cursor-pointer"
            title="Fechar (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto max-h-[calc(96vh-140px)]">
          {/* Left Column: Large Main Photo & Media Viewer (7 cols) */}
          <div className="lg:col-span-7 bg-[#F3F4F6] p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E5E7EB]">
            <div className="space-y-4 w-full">
              {/* Main Photo Surface [FOTO GRANDE] */}
              <div className="relative w-full h-[360px] sm:h-[450px] rounded-2xl overflow-hidden bg-[#111827] border border-[#E5E7EB] shadow-xl group">
                {activeMedia.type === 'video' ? (
                  <video
                    src={activeMedia.url}
                    controls
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={activeMedia.url}
                    alt={activeMedia.title || room.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out filter brightness-[0.98]"
                  />
                )}

                {/* Slider Controls */}
                {mediaList.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveMediaIndex((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1))
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#111827]/70 text-white hover:bg-[#111827] transition-all cursor-pointer backdrop-blur-md"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveMediaIndex((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#111827]/70 text-white hover:bg-[#111827] transition-all cursor-pointer backdrop-blur-md"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {/* Bottom Photo Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                  <div className="px-3 py-1 rounded-full bg-[#111827]/80 backdrop-blur-md text-white font-mono text-[11px] flex items-center gap-1.5 border border-white/20">
                    <ImageIcon className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>FOTO FOTOGRÁFICA EM ALTA DEFINIÇÃO</span>
                  </div>

                  {mediaList.length > 1 && (
                    <button
                      onClick={() => setShowFullscreenGallery(true)}
                      className="px-3.5 py-1.5 rounded-full bg-[#C5A880] text-[#111827] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#E2C399] transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <span>VER MAIS FOTOS ({mediaList.length})</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Thumbnails Row */}
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
            </div>
          </div>

          {/* Right Column: Room Description & Contextual Navigation Sidebar (5 cols) */}
          <div className="lg:col-span-5 p-8 flex flex-col justify-between bg-[#FFFFFF]">
            <div>
              {/* Context Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E5E7EB]">
                <span className="font-mono text-xs text-[#C5A880] uppercase tracking-widest font-semibold">
                  {room.areaM2 ? `${room.areaM2} m² PRIVATIVOS` : 'AMBIENTE DA PROPRIEDADE'}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-3xl font-serif font-light text-[#111827] mb-2">
                {room.name}
              </h3>
              {room.subtitle && (
                <p className="text-xs font-serif italic text-[#6B7280] mb-4">
                  {room.subtitle}
                </p>
              )}
              {room.description && (
                <p className="text-sm text-[#4B5563] font-light leading-relaxed mb-6">
                  {room.description}
                </p>
              )}

              {/* Characteristics Chips */}
              {room.characteristics && room.characteristics.length > 0 && (
                <div className="mb-6">
                  <div className="font-mono text-[10px] text-[#C5A880] tracking-widest uppercase font-semibold mb-3">
                    CARACTERÍSTICAS DESTE AMBIENTE
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {room.characteristics.map((char, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-[#F3F4F6] border border-[#E5E7EB] text-xs text-[#374151] font-light flex items-center gap-1.5"
                      >
                        <Check className="w-3 h-3 text-[#C5A880]" />
                        <span>{char}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contextual & Subroom Navigation */}
            <div className="pt-4 border-t border-[#E5E7EB] space-y-4">
              {/* Contextual Sub-rooms Selector Bar (e.g. AMBIENTES DA SUÍTE MASTER: [QUARTO] [CLOSET] [BANHEIRO]) */}
              {contextualSubrooms.length > 0 && (
                <div className="p-3 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB]">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-semibold mb-2">
                    <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>
                      AMBIENTES DA {parentRoom ? parentRoom.name : room.name} ({contextualSubrooms.length})
                    </span>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto py-1">
                    {contextualSubrooms.map((subroom) => {
                      const isActive = subroom.id === room.id;
                      return (
                        <button
                          key={subroom.id}
                          onClick={() => onNavigateRoom(subroom)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all flex-shrink-0 cursor-pointer ${
                            isActive
                              ? 'bg-[#C5A880] text-[#111827] font-semibold shadow-sm'
                              : 'bg-[#FFFFFF] hover:bg-[#F3F4F6] text-[#374151] border border-[#E5E7EB]'
                          }`}
                        >
                          {subroom.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Navigation Action Buttons (← Suíte Master | Banheiro →) */}
              <div className="flex items-center justify-between gap-3 pt-2">
                {parentRoom ? (
                  <button
                    onClick={() => onNavigateRoom(parentRoom)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#374151] text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border border-[#E5E7EB]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>← {parentRoom.name}</span>
                  </button>
                ) : prevSequentialRoom ? (
                  <button
                    onClick={() => onNavigateRoom(prevSequentialRoom)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#374151] text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border border-[#E5E7EB]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>← {prevSequentialRoom.name}</span>
                  </button>
                ) : (
                  <div />
                )}

                {primaryNextTarget && (
                  <button
                    onClick={() => onNavigateRoom(primaryNextTarget)}
                    className="btn-gold-warm px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer ml-auto"
                  >
                    <span>
                      {nextSiblingRoom
                        ? `${nextSiblingRoom.name.toUpperCase()} →`
                        : `${primaryNextTarget.name.toUpperCase()} →`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {showFullscreenGallery && (
        <FullscreenGallery
          photos={photoUrls}
          initialIndex={activeMediaIndex}
          onClose={() => setShowFullscreenGallery(false)}
        />
      )}
    </div>
  );
};

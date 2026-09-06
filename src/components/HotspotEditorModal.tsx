import React, { useState } from 'react';
import { X, Plus, Trash2, MoveUp, Save } from 'lucide-react';
import type { Property, Hotspot3D } from '../types';

interface HotspotEditorModalProps {
  tour: Property;
  onSaveTour: (updatedTour: Property) => void;
  onClose: () => void;
}

export const HotspotEditorModal: React.FC<HotspotEditorModalProps> = ({
  tour,
  onSaveTour,
  onClose,
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    tour.rooms[0]?.id || ''
  );
  const [currentTour, setCurrentTour] = useState<Property>(tour);
  const [pendingHotspot, setPendingHotspot] = useState<{ x: number; y: number } | null>(null);
  const [newLabel, setNewLabel] = useState('');
  const [newTargetRoomId, setNewTargetRoomId] = useState(
    tour.rooms[1]?.id || tour.rooms[0]?.id || ''
  );

  const selectedRoom = currentTour.rooms.find((r) => r.id === selectedRoomId) || currentTour.rooms[0];

  if (!selectedRoom) return null;

  const currentHotspots = selectedRoom.hotspots3D || [];
  const roomImage = (selectedRoom.photos && selectedRoom.photos[0]) || selectedRoom.media?.[0]?.url || selectedRoom.coverImage;

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPendingHotspot({ x: Math.round(x), y: Math.round(y) });
  };

  const handleAddHotspot = () => {
    if (!pendingHotspot) return;

    const targetRoom = currentTour.rooms.find((r) => r.id === newTargetRoomId);
    const newHotspot: Hotspot3D = {
      id: `hs_${Date.now()}`,
      label: newLabel || (targetRoom ? `IR PARA ${targetRoom.name}` : 'AVANÇAR'),
      targetRoomId: newTargetRoomId,
      xPercent: pendingHotspot.x,
      yPercent: pendingHotspot.y,
      type: 'arrow',
    };

    const updatedRooms = currentTour.rooms.map((r) => {
      if (r.id === selectedRoom.id) {
        return {
          ...r,
          hotspots3D: [...(r.hotspots3D || []), newHotspot],
        };
      }
      return r;
    });

    const updatedTour = { ...currentTour, rooms: updatedRooms };
    setCurrentTour(updatedTour);
    setPendingHotspot(null);
    setNewLabel('');
  };

  const handleDeleteHotspot = (hsId: string) => {
    const updatedRooms = currentTour.rooms.map((r) => {
      if (r.id === selectedRoom.id) {
        return {
          ...r,
          hotspots3D: (r.hotspots3D || []).filter((h) => h.id !== hsId),
        };
      }
      return r;
    });

    const updatedTour = { ...currentTour, rooms: updatedRooms };
    setCurrentTour(updatedTour);
  };

  const handleSaveAll = () => {
    onSaveTour(currentTour);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 text-white overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#121316] rounded-3xl border border-white/15 shadow-2xl flex flex-col max-h-[96vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-[#0b0c0e]">
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block">
              EDITOR VISUAL DE HOTSPOTS 3D
            </span>
            <h3 className="text-xl font-serif text-white">
              Posicionar Marcadores de Passagem no Cômodo
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveAll}
              className="btn-gold-warm px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>SALVAR TUDO</span>
            </button>

            <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto max-h-[calc(96vh-130px)]">
          {/* Left Canvas (8 cols) */}
          <div className="lg:col-span-8 p-6 bg-[#0b0c0e] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
            {/* Room Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest mr-2">CÔMODO:</span>
              {currentTour.rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => {
                    setSelectedRoomId(room.id);
                    setPendingHotspot(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                    room.id === selectedRoom.id
                      ? 'bg-amber-400 text-black font-bold'
                      : 'bg-white/5 text-zinc-300 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {room.number} {room.name}
                </button>
              ))}
            </div>

            {/* Clickable Image Surface */}
            <div className="relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden border border-white/15 bg-black cursor-crosshair">
              <div
                onClick={handleImageClick}
                className="relative w-full h-full"
              >
                <img
                  src={roomImage}
                  alt={selectedRoom.name}
                  className="w-full h-full object-cover select-none"
                />

                {/* Existing Hotspots */}
                {currentHotspots.map((spot) => (
                  <div
                    key={spot.id}
                    style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  >
                    <div className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-xs shadow-xl border-2 border-black">
                      <MoveUp className="w-5 h-5" />
                    </div>
                    <div className="mt-1 px-2 py-0.5 rounded bg-black/90 text-white font-mono text-[10px] whitespace-nowrap">
                      {spot.label}
                    </div>
                  </div>
                ))}

                {/* Pending New Hotspot Marker */}
                {pendingHotspot && (
                  <div
                    style={{ left: `${pendingHotspot.x}%`, top: `${pendingHotspot.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-bounce"
                  >
                    <div className="w-12 h-12 rounded-full bg-cyan-400 text-black flex items-center justify-center font-bold text-xs shadow-xl border-2 border-white">
                      <Plus className="w-6 h-6" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="text-center text-xs text-zinc-400 font-mono mt-3">
              💡 CLIQUE EM QUALQUER PONTO DA FOTO ACIMA PARA DEFINIR A POSIÇÃO DA SETA
            </div>
          </div>

          {/* Right Sidebar Form (4 cols) */}
          <div className="lg:col-span-4 p-6 bg-[#121316] space-y-6">
            {/* Create New Hotspot Card */}
            {pendingHotspot ? (
              <div className="p-5 rounded-2xl bg-amber-400/10 border border-amber-400/40 space-y-4">
                <div className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                  NOVO MARCADOR DEFINIDO ({pendingHotspot.x}%, {pendingHotspot.y}%)
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">Rótulo / Texto do Botão:</label>
                  <input
                    type="text"
                    placeholder="Ex: IR PARA A COZINHA"
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    className="w-full bg-[#0b0c0e] border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">Cômodo de Destino:</label>
                  <select
                    value={newTargetRoomId}
                    onChange={(e) => setNewTargetRoomId(e.target.value)}
                    className="w-full bg-[#0b0c0e] border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    {currentTour.rooms.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.number} {r.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleAddHotspot}
                    className="btn-gold-warm w-full py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold"
                  >
                    ADICIONAR SETA
                  </button>
                  <button
                    onClick={() => setPendingHotspot(null)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-xs text-zinc-300"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-zinc-400 font-light">
                Clique na foto à esquerda para escolher onde colocar a seta de transição.
              </div>
            )}

            {/* List of Existing Hotspots for Selected Room */}
            <div>
              <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">
                MARCADORES DESTE CÔMODO ({currentHotspots.length})
              </div>

              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {currentHotspots.map((hs) => {
                  const targetRoom = currentTour.rooms.find((r) => r.id === hs.targetRoomId);

                  return (
                    <div
                      key={hs.id}
                      className="p-3 rounded-xl bg-[#0b0c0e] border border-white/10 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-semibold text-white">{hs.label}</div>
                        <div className="text-[10px] text-zinc-400 font-mono">
                          Destino: {targetRoom ? targetRoom.name : hs.targetRoomId} ({hs.xPercent}%, {hs.yPercent}%)
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteHotspot(hs.id)}
                        className="p-1.5 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

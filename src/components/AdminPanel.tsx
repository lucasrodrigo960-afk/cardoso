import React, { useState } from 'react';
import { X, Save, Plus, Trash2, Link, Copy, Check, Lock, RefreshCw } from 'lucide-react';
import type { Tour, Room } from '../types';

interface AdminPanelProps {
  currentTour: Tour;
  onSaveTour: (updatedTour: Tour) => void;
  onResetDemo: () => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  currentTour,
  onSaveTour,
  onResetDemo,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'rooms' | 'floorplan' | 'region'>('general');
  const [tourData, setTourData] = useState<Tour>(JSON.parse(JSON.stringify(currentTour)));
  const [copiedLink, setCopiedLink] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleCopyLink = () => {
    const exclusiveUrl = `${window.location.origin}/?tour=${tourData.slug}`;
    navigator.clipboard.writeText(exclusiveUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleSave = () => {
    onSaveTour(tourData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleUpdateRoom = (index: number, field: keyof Room, value: any) => {
    const updatedRooms = [...tourData.rooms];
    updatedRooms[index] = { ...updatedRooms[index], [field]: value };
    setTourData({ ...tourData, rooms: updatedRooms });
  };

  const handleAddRoom = () => {
    const newNumber = String(tourData.rooms.length + 1).padStart(2, '0');
    const newRoom: Room = {
      id: `room-${Date.now()}`,
      number: newNumber,
      name: 'NOVO AMBIENTE',
      subtitle: 'Descrição detalhada do novo cômodo.',
      areaM2: 25,
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      photos: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'],
      characteristics: ['Iluminação de LED', 'Piso de Mármore'],
      order: tourData.rooms.length + 1,
    };
    setTourData({ ...tourData, rooms: [...tourData.rooms, newRoom] });
  };

  const handleDeleteRoom = (index: number) => {
    const updatedRooms = tourData.rooms.filter((_, i) => i !== index);
    setTourData({ ...tourData, rooms: updatedRooms });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 text-white">
      <div className="relative w-full max-w-5xl bg-[#121214] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-[#08080a]">
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-amber-400" />
            <div>
              <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">PAINEL ADMINISTRATIVO</div>
              <h2 className="text-lg font-serif font-light text-white">Gestão de Tour Exclusivo</h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-full bg-white hover:bg-amber-400 text-black font-light text-xs uppercase tracking-widest transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Salvar Alterações</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {savedSuccess && (
          <div className="bg-emerald-600 text-white text-xs font-light px-8 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>As alterações do Tour foram salvas com sucesso!</span>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 bg-[#08080a] px-8 gap-8 text-xs font-light tracking-widest uppercase overflow-x-auto">
          <button
            onClick={() => setActiveTab('general')}
            className={`py-4 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'general' ? 'border-amber-400 text-amber-300' : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Geral & Link
          </button>
          <button
            onClick={() => setActiveTab('rooms')}
            className={`py-4 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'rooms' ? 'border-amber-400 text-amber-300' : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Ambientes ({tourData.rooms.length})
          </button>
          <button
            onClick={() => setActiveTab('floorplan')}
            className={`py-4 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'floorplan' ? 'border-amber-400 text-amber-300' : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Planta Baixa
          </button>
          <button
            onClick={() => setActiveTab('region')}
            className={`py-4 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'region' ? 'border-amber-400 text-amber-300' : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Print da Região
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto max-h-[calc(92vh-160px)] space-y-6">
          {/* TAB 1: GENERAL INFO & EXCLUSIVE LINK */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              {/* Link Generator Box */}
              <div className="bg-[#08080a] p-6 rounded-xl border border-white/10">
                <div className="text-xs font-light text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Link className="w-4 h-4" />
                  <span>Link Exclusivo Gerado para Enviar ao Cliente</span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    readOnly
                    value={`${window.location.origin}/?tour=${tourData.slug}`}
                    className="w-full bg-[#121214] border border-white/10 rounded-xl py-3 px-4 text-xs font-mono text-amber-300"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-light text-xs uppercase tracking-widest flex items-center gap-2 flex-shrink-0 cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? 'Copiado!' : 'Copiar Link'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-light text-zinc-400 uppercase tracking-widest mb-1.5">Nome do Imóvel</label>
                  <input
                    type="text"
                    value={tourData.propertyName}
                    onChange={(e) => setTourData({ ...tourData, propertyName: e.target.value })}
                    className="w-full bg-[#08080a] border border-white/10 rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-light text-zinc-400 uppercase tracking-widest mb-1.5">Localização (Cidade - UF)</label>
                  <input
                    type="text"
                    value={tourData.location}
                    onChange={(e) => setTourData({ ...tourData, location: e.target.value })}
                    className="w-full bg-[#08080a] border border-white/10 rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-light text-zinc-400 uppercase tracking-widest mb-1.5">Valor de Venda</label>
                  <input
                    type="text"
                    value={tourData.price}
                    onChange={(e) => setTourData({ ...tourData, price: e.target.value })}
                    className="w-full bg-[#08080a] border border-white/10 rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-light text-zinc-400 uppercase tracking-widest mb-1.5">URL Foto de Capa (Hero)</label>
                  <input
                    type="text"
                    value={tourData.heroImage}
                    onChange={(e) => setTourData({ ...tourData, heroImage: e.target.value })}
                    className="w-full bg-[#08080a] border border-white/10 rounded-xl p-3 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-[#08080a] border border-white/10">
                <div>
                  <div className="text-xs font-light text-white">Privacidade da Localização</div>
                  <div className="text-[11px] text-zinc-500 font-light">Esconder o endereço exato para manter exclusividade VIP</div>
                </div>
                <button
                  type="button"
                  onClick={() => setTourData({ ...tourData, isExactLocation: !tourData.isExactLocation })}
                  className={`px-4 py-2 rounded-xl text-xs font-light uppercase tracking-wider transition-all ${
                    tourData.isExactLocation
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white/10 text-amber-300 border border-white/10'
                  }`}
                >
                  {tourData.isExactLocation ? 'Localização Exata Exibida' : 'Localização Reservada'}
                </button>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={onResetDemo}
                  className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-light uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Restaurar Dados Demonstrativos</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: ROOMS */}
          {activeTab === 'rooms' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-light text-amber-400 uppercase tracking-widest">Ambientes Cadastrados</h3>
                <button
                  onClick={handleAddRoom}
                  className="px-4 py-2 rounded-full bg-white text-black font-light text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Ambiente</span>
                </button>
              </div>

              <div className="space-y-4">
                {tourData.rooms.map((room, idx) => (
                  <div key={room.id} className="bg-[#08080a] p-5 rounded-xl border border-white/10 space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-amber-400">
                          {room.number}
                        </span>
                        <input
                          type="text"
                          value={room.name}
                          onChange={(e) => handleUpdateRoom(idx, 'name', e.target.value)}
                          className="bg-[#121214] border border-white/10 rounded-lg px-3 py-1 text-xs text-white font-light"
                        />
                      </div>

                      <button
                        onClick={() => handleDeleteRoom(idx)}
                        className="p-1.5 text-zinc-500 hover:text-red-400"
                        title="Remover Cômodo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="block text-zinc-500 text-[10px] uppercase mb-1">Metragem (m²)</label>
                        <input
                          type="number"
                          value={room.areaM2}
                          onChange={(e) => handleUpdateRoom(idx, 'areaM2', Number(e.target.value))}
                          className="w-full bg-[#121214] border border-white/10 rounded-lg p-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-zinc-500 text-[10px] uppercase mb-1">Imagem Capa (URL)</label>
                        <input
                          type="text"
                          value={room.coverImage}
                          onChange={(e) => handleUpdateRoom(idx, 'coverImage', e.target.value)}
                          className="w-full bg-[#121214] border border-white/10 rounded-lg p-2 text-white truncate"
                        />
                      </div>

                      <div>
                        <label className="block text-zinc-500 text-[10px] uppercase mb-1">Vídeo 4K (URL MP4)</label>
                        <input
                          type="text"
                          value={room.videoUrl || ''}
                          onChange={(e) => handleUpdateRoom(idx, 'videoUrl', e.target.value)}
                          placeholder="https://..."
                          className="w-full bg-[#121214] border border-white/10 rounded-lg p-2 text-white truncate"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FLOOR PLAN */}
          {activeTab === 'floorplan' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-light text-zinc-400 uppercase tracking-widest mb-2">URL da Imagem da Planta Baixa</label>
                <input
                  type="text"
                  value={tourData.floorPlanImage || ''}
                  onChange={(e) => setTourData({ ...tourData, floorPlanImage: e.target.value })}
                  className="w-full bg-[#08080a] border border-white/10 rounded-xl p-3 text-xs text-white"
                />
              </div>
            </div>
          )}

          {/* TAB 4: REGION PRINT */}
          {activeTab === 'region' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-light text-zinc-400 uppercase tracking-widest mb-2">URL da Imagem/Print Aéreo da Região (JPG, PNG, WEBP)</label>
                <input
                  type="text"
                  value={tourData.regionMapPrint}
                  onChange={(e) => setTourData({ ...tourData, regionMapPrint: e.target.value })}
                  className="w-full bg-[#08080a] border border-white/10 rounded-xl p-3 text-xs text-white"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

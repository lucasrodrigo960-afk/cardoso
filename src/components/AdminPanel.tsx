import React, { useState } from 'react';
import { X, Save, Plus, Trash2, RotateCcw, Download, Upload, Image, Map, DollarSign, List, Palette } from 'lucide-react';
import type { Property } from '../types';

interface AdminPanelProps {
  currentTour: Property;
  onSaveTour: (updatedTour: Property) => void;
  onResetDemo: () => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  currentTour,
  onSaveTour,
  onResetDemo,
  onClose,
}) => {
  const [formData, setFormData] = useState<Property>(currentTour);
  const [activeTab, setActiveTab] = useState<'general' | 'rooms' | 'gallery' | 'location' | 'features' | 'theme'>('general');
  const [newFeatureText, setNewFeatureText] = useState('');
  const [newGalleryPhotoUrl, setNewGalleryPhotoUrl] = useState('');

  const handleTextChange = (field: keyof Property, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDetailChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      details: { ...prev.details, [field]: value },
    }));
  };

  const handleLocationChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      locationData: {
        ...prev.locationData,
        [field]: value,
      },
    }));
  };

  const handleAddRoom = () => {
    const newRoom = {
      id: `r_${Date.now()}`,
      categoryId: 'area-social',
      number: String(formData.rooms.length + 1).padStart(2, '0'),
      name: 'NOVO CÔMODO',
      subtitle: 'Descrição do novo cômodo',
      areaM2: 20,
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: `m_${Date.now()}`, type: 'image' as const, url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', title: 'Foto Principal' }
      ],
      photos: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
      characteristics: ['Iluminação Natural', 'Acabamento de Alto Padrão'],
      order: formData.rooms.length + 1,
    };

    setFormData((prev) => ({
      ...prev,
      rooms: [...prev.rooms, newRoom],
    }));
  };

  const handleDeleteRoom = (roomId: string) => {
    setFormData((prev) => ({
      ...prev,
      rooms: prev.rooms.filter((r) => r.id !== roomId),
    }));
  };

  const handleRoomChange = (roomId: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      rooms: prev.rooms.map((r) => {
        if (r.id === roomId) {
          return { ...r, [field]: value };
        }
        return r;
      }),
    }));
  };

  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return;
    setFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        features: [...prev.details.features, newFeatureText.trim()],
      },
    }));
    setNewFeatureText('');
  };

  const handleDeleteFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        features: prev.details.features.filter((_, i) => i !== index),
      },
    }));
  };

  const handleAddGalleryPhoto = () => {
    if (!newGalleryPhotoUrl.trim()) return;
    setFormData((prev) => ({
      ...prev,
      galleryPhotos: [...prev.galleryPhotos, newGalleryPhotoUrl.trim()],
    }));
    setNewGalleryPhotoUrl('');
  };

  const handleDeleteGalleryPhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      galleryPhotos: prev.galleryPhotos.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    onSaveTour(formData);
    onClose();
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `cardoso_${formData.slug || 'imovel'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && json.propertyName) {
          setFormData(json);
          alert('Configuração do imóvel importada com sucesso!');
        }
      } catch (err) {
        alert('Erro ao ler arquivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 text-white overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#121316] rounded-3xl border border-white/15 shadow-2xl flex flex-col max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-[#08090A]">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-mono text-xs tracking-widest uppercase">PAINEL DE CONTROLE</span>
            <span className="text-zinc-600">|</span>
            <h2 className="text-xl font-serif text-white">{formData.propertyName}</h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="btn-gold-warm px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-lg font-bold"
            >
              <Save className="w-4 h-4" />
              <span>SALVAR ALTERAÇÕES</span>
            </button>

            <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex items-center gap-2 px-8 py-3 bg-[#08090A] border-b border-white/10 overflow-x-auto">
          {[
            { id: 'general', label: 'Geral & Preço', icon: DollarSign },
            { id: 'rooms', label: 'Ambientes & Mídias', icon: Image },
            { id: 'gallery', label: 'Galeria Fotográfica', icon: Image },
            { id: 'location', label: 'Localização & Região', icon: Map },
            { id: 'features', label: 'Ficha Técnica & Atributos', icon: List },
            { id: 'theme', label: 'Estilo & Cores', icon: Palette },
          ].map((tab) => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400'
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(95vh-180px)] space-y-6">
          {/* TAB 1: GERAL & PREÇO */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif text-white border-b border-white/10 pb-2">Informações do Imóvel</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-amber-400 uppercase mb-2">Nome do Imóvel:</label>
                  <input
                    type="text"
                    value={formData.propertyName}
                    onChange={(e) => handleTextChange('propertyName', e.target.value)}
                    className="w-full bg-[#08090A] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-amber-400 uppercase mb-2">Bairro e Cidade/UF:</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleTextChange('location', e.target.value)}
                    className="w-full bg-[#08090A] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-amber-400 uppercase mb-2">Preço de Venda:</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => handleTextChange('price', e.target.value)}
                    className="w-full bg-[#08090A] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white font-serif text-lg text-amber-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-amber-400 uppercase mb-2">Condomínio:</label>
                  <input
                    type="text"
                    value={formData.details.condoFee || ''}
                    onChange={(e) => handleDetailChange('condoFee', e.target.value)}
                    className="w-full bg-[#08090A] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-amber-400 uppercase mb-2">Descrição Factual:</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleTextChange('description', e.target.value)}
                  className="w-full bg-[#08090A] border border-white/15 rounded-xl p-4 text-xs text-white leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 2: AMBIENTES */}
          {activeTab === 'rooms' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-lg font-serif text-white">Cômodos do Imóvel ({formData.rooms.length})</h3>
                <button
                  onClick={handleAddRoom}
                  className="btn-gold-warm px-4 py-2 rounded-xl text-xs uppercase font-bold flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo Cômodo</span>
                </button>
              </div>

              <div className="space-y-6">
                {formData.rooms.map((room) => (
                  <div key={room.id} className="p-5 rounded-2xl bg-[#08090A] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-mono text-amber-400 uppercase font-bold">
                        {room.number} · {room.name}
                      </div>
                      <button
                        onClick={() => handleDeleteRoom(room.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Nome:</label>
                        <input
                          type="text"
                          value={room.name}
                          onChange={(e) => handleRoomChange(room.id, 'name', e.target.value)}
                          className="w-full bg-[#121316] border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Área m²:</label>
                        <input
                          type="number"
                          value={room.areaM2 || 0}
                          onChange={(e) => handleRoomChange(room.id, 'areaM2', Number(e.target.value))}
                          className="w-full bg-[#121316] border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Imagem Capa:</label>
                        <input
                          type="text"
                          value={room.coverImage}
                          onChange={(e) => handleRoomChange(room.id, 'coverImage', e.target.value)}
                          className="w-full bg-[#121316] border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: GALERIA */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif text-white border-b border-white/10 pb-2">Galeria de Fotos</h3>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="URL da foto"
                  value={newGalleryPhotoUrl}
                  onChange={(e) => setNewGalleryPhotoUrl(e.target.value)}
                  className="w-full bg-[#08090A] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
                />
                <button
                  onClick={handleAddGalleryPhoto}
                  className="btn-gold-warm px-5 py-2.5 rounded-xl text-xs uppercase font-bold flex-shrink-0"
                >
                  Adicionar
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {formData.galleryPhotos.map((photo, idx) => (
                  <div key={idx} className="relative group h-28 rounded-xl overflow-hidden bg-black border border-white/10">
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleDeleteGalleryPhoto(idx)}
                      className="absolute top-2 right-2 p-1 rounded bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: LOCALIZAÇÃO */}
          {activeTab === 'location' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif text-white border-b border-white/10 pb-2">Localização & Mapa</h3>

              <div>
                <label className="block text-xs font-mono text-amber-400 uppercase mb-2">URL da Foto Aérea do Mapa:</label>
                <input
                  type="text"
                  value={formData.locationData?.regionMapPrint || ''}
                  onChange={(e) => handleLocationChange('regionMapPrint', e.target.value)}
                  className="w-full bg-[#08090A] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>
            </div>
          )}

          {/* TAB 5: DIFERENCIAIS */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif text-white border-b border-white/10 pb-2">Diferenciais do Imóvel</h3>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Novo diferencial"
                  value={newFeatureText}
                  onChange={(e) => setNewFeatureText(e.target.value)}
                  className="w-full bg-[#08090A] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
                />
                <button
                  onClick={handleAddFeature}
                  className="btn-gold-warm px-5 py-2.5 rounded-xl text-xs uppercase font-bold flex-shrink-0"
                >
                  Adicionar
                </button>
              </div>

              <div className="space-y-2">
                {formData.details.features.map((feat, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#08090A] border border-white/10 flex items-center justify-between text-xs text-zinc-200">
                    <span>{feat}</span>
                    <button onClick={() => handleDeleteFeature(idx)} className="text-red-400 hover:text-red-300">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between px-8 py-4 border-t border-white/10 bg-[#08090A] text-xs">
          <div className="flex items-center gap-4">
            <button onClick={handleExportJSON} className="flex items-center gap-2 text-zinc-300 hover:text-amber-400 font-mono">
              <Download className="w-4 h-4" />
              <span>Exportar JSON</span>
            </button>

            <label className="flex items-center gap-2 text-zinc-300 hover:text-amber-400 font-mono cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>Importar JSON</span>
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>
          </div>

          <button onClick={onResetDemo} className="flex items-center gap-2 text-red-400 hover:text-red-300 font-mono">
            <RotateCcw className="w-4 h-4" />
            <span>Restaurar Padrão Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

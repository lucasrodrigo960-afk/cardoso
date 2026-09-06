import React, { useState } from 'react';
import {
  X, Save, RotateCcw, Download, Upload, Palette,
  Image, Map, DollarSign, List, Move
} from 'lucide-react';
import type { Property } from '../types';
import { SectionReorderModal } from './SectionReorderModal';

interface AdminPanelManagerProps {
  currentTour: Property;
  onSaveTour: (updatedTour: Property) => void;
  onResetDemo: () => void;
  onClose: () => void;
}

export const AdminPanelManager: React.FC<AdminPanelManagerProps> = ({
  currentTour,
  onSaveTour,
  onResetDemo,
  onClose,
}) => {
  const [formData, setFormData] = useState<Property>(currentTour);
  const [activeTab, setActiveTab] = useState<'theme' | 'general' | 'rooms' | 'gallery' | 'location' | 'features'>('theme');
  const [showReorderModal, setShowReorderModal] = useState(false);
  const [newGalleryPhotoUrl, setNewGalleryPhotoUrl] = useState('');
  const [newFeatureText, setNewFeatureText] = useState('');

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

  const handleThemeChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      themeConfig: {
        accentColor: '#C5A880',
        backgroundColor: '#FBFBFC',
        surfaceColor: '#FFFFFF',
        textColor: '#111827',
        titleFontFamily: 'serif-playfair',
        bodyFontFamily: 'sans-jakarta',
        ...prev.themeConfig,
        [field]: value,
      },
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
          alert('Configuração de imóvel importada com sucesso!');
        }
      } catch (err) {
        alert('Erro ao ler arquivo JSON.');
      }
    };
    reader.readAsText(file);
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

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 text-[#111827] overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#FFFFFF] rounded-3xl border border-[#E5E7EB] shadow-2xl flex flex-col max-h-[96vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-[#E5E7EB] bg-[#FBFBFC]">
          <div className="flex items-center gap-3">
            <span className="text-[#C5A880] font-mono text-xs tracking-widest uppercase font-semibold">PAINEL ADMIN 100% EDITÁVEL</span>
            <span className="text-zinc-300">|</span>
            <h2 className="text-xl font-serif text-[#111827]">{formData.propertyName}</h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowReorderModal(true)}
              className="px-3.5 py-2 rounded-xl bg-[#F3F4F6] hover:bg-[#E5E7EB] border border-[#E5E7EB] text-xs text-[#374151] font-mono uppercase tracking-wider flex items-center gap-2"
            >
              <Move className="w-3.5 h-3.5" />
              <span>Ordem das Seções</span>
            </button>

            <button
              onClick={handleSave}
              className="btn-gold-warm px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-lg font-semibold"
            >
              <Save className="w-4 h-4" />
              <span>SALVAR TUDO</span>
            </button>

            <button onClick={onClose} className="p-2 text-zinc-400 hover:text-[#111827]">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-8 py-3 bg-[#FBFBFC] border-b border-[#E5E7EB] overflow-x-auto">
          {[
            { id: 'theme', label: 'Cores, Fontes & Logos', icon: Palette },
            { id: 'general', label: 'Dados & Comercial', icon: DollarSign },
            { id: 'rooms', label: 'Ambientes do Imóvel', icon: Image },
            { id: 'gallery', label: 'Galeria de Fotos', icon: Image },
            { id: 'location', label: 'Planta & Localização', icon: Map },
            { id: 'features', label: 'Ficha Técnica & Atributos', icon: List },
          ].map((tab) => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-[#C5A880] text-[#111827] font-semibold shadow-sm'
                    : 'bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#4B5563]'
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto max-h-[calc(96vh-180px)] space-y-6 bg-[#FFFFFF]">
          {/* TAB 1: CORES, FONTES & LOGOS */}
          {activeTab === 'theme' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif text-[#111827] border-b border-[#E5E7EB] pb-2">
                Estilo Visual, Cores & Tipografia
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-[#C5A880] uppercase mb-2">Cor de Destaque / Acento (Hex):</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.themeConfig?.accentColor || '#C5A880'}
                      onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                      className="w-12 h-10 bg-transparent cursor-pointer rounded-lg border border-[#E5E7EB]"
                    />
                    <input
                      type="text"
                      value={formData.themeConfig?.accentColor || '#C5A880'}
                      onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                      className="w-full bg-[#FBFBFC] border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs text-[#111827]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#C5A880] uppercase mb-2">Fonte dos Títulos:</label>
                  <select
                    value={formData.themeConfig?.titleFontFamily || 'serif-playfair'}
                    onChange={(e) => handleThemeChange('titleFontFamily', e.target.value)}
                    className="w-full bg-[#FBFBFC] border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs text-[#111827]"
                  >
                    <option value="serif-playfair">Playfair Display (Serif Clássica Elegante)</option>
                    <option value="sans-jakarta">Plus Jakarta Sans (Sans-Serif Moderna Limpa)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DADOS & COMERCIAL */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif text-[#111827] border-b border-[#E5E7EB] pb-2">
                Informações Fatuais & Preço Comercial
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-[#C5A880] uppercase mb-2">Nome do Imóvel:</label>
                  <input
                    type="text"
                    value={formData.propertyName}
                    onChange={(e) => handleTextChange('propertyName', e.target.value)}
                    className="w-full bg-[#FBFBFC] border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs text-[#111827]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#C5A880] uppercase mb-2">Bairro e Cidade/UF:</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleTextChange('location', e.target.value)}
                    className="w-full bg-[#FBFBFC] border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs text-[#111827]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#C5A880] uppercase mb-2">Valor de Venda (Preço):</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => handleTextChange('price', e.target.value)}
                    className="w-full bg-[#FBFBFC] border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs text-[#111827] font-serif text-lg font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#C5A880] uppercase mb-2">Taxa de Condomínio:</label>
                  <input
                    type="text"
                    value={formData.details.condoFee || ''}
                    onChange={(e) => handleDetailChange('condoFee', e.target.value)}
                    className="w-full bg-[#FBFBFC] border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs text-[#111827]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#C5A880] uppercase mb-2">Descrição Factual do Imóvel:</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleTextChange('description', e.target.value)}
                  className="w-full bg-[#FBFBFC] border border-[#E5E7EB] rounded-xl p-4 text-xs text-[#111827] leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 3: AMBIENTES */}
          {activeTab === 'rooms' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif text-[#111827] border-b border-[#E5E7EB] pb-2">
                Ambientes Cadastrados ({formData.rooms.length})
              </h3>

              <div className="space-y-3">
                {formData.rooms.map((room) => (
                  <div
                    key={room.id}
                    className="p-4 rounded-xl bg-[#FBFBFC] border border-[#E5E7EB] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <img src={room.coverImage} alt="" className="w-14 h-10 object-cover rounded-lg" />
                      <div>
                        <div className="font-serif text-sm font-medium text-[#111827]">{room.name}</div>
                        <div className="text-[11px] font-mono text-[#687082]">
                          {room.number} · {room.areaM2 ? `${room.areaM2} m²` : 'Sem metragem especificada'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: GALERIA */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif text-[#111827] border-b border-[#E5E7EB] pb-2">
                Galeria Fotográfica
              </h3>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="URL da nova foto"
                  value={newGalleryPhotoUrl}
                  onChange={(e) => setNewGalleryPhotoUrl(e.target.value)}
                  className="w-full bg-[#FBFBFC] border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs text-[#111827]"
                />
                <button
                  onClick={handleAddGalleryPhoto}
                  className="btn-gold-warm px-5 py-2.5 rounded-xl text-xs uppercase font-semibold flex-shrink-0"
                >
                  Adicionar
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {formData.galleryPhotos.map((photo, idx) => (
                  <div key={idx} className="relative group h-28 rounded-xl overflow-hidden bg-[#F3F4F6] border border-[#E5E7EB]">
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

          {/* TAB 5: LOCALIZAÇÃO */}
          {activeTab === 'location' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif text-[#111827] border-b border-[#E5E7EB] pb-2">
                Mapa da Região
              </h3>

              <div>
                <label className="block text-xs font-mono text-[#C5A880] uppercase mb-2">URL do Mapa Aéreo:</label>
                <input
                  type="text"
                  value={formData.locationData?.regionMapPrint || ''}
                  onChange={(e) => handleLocationChange('regionMapPrint', e.target.value)}
                  className="w-full bg-[#FBFBFC] border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs text-[#111827]"
                />
              </div>
            </div>
          )}

          {/* TAB 6: DIFERENCIAIS */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif text-[#111827] border-b border-[#E5E7EB] pb-2">
                Diferenciais do Imóvel
              </h3>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Novo diferencial"
                  value={newFeatureText}
                  onChange={(e) => setNewFeatureText(e.target.value)}
                  className="w-full bg-[#FBFBFC] border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs text-[#111827]"
                />
                <button
                  onClick={handleAddFeature}
                  className="btn-gold-warm px-5 py-2.5 rounded-xl text-xs uppercase font-semibold flex-shrink-0"
                >
                  Adicionar
                </button>
              </div>

              <div className="space-y-2">
                {formData.details.features.map((feat, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#FBFBFC] border border-[#E5E7EB] flex items-center justify-between text-xs text-[#374151]">
                    <span>{feat}</span>
                    <button onClick={() => handleDeleteFeature(idx)} className="text-red-600 hover:text-red-700">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between px-8 py-4 border-t border-[#E5E7EB] bg-[#FBFBFC] text-xs">
          <div className="flex items-center gap-4">
            <button onClick={handleExportJSON} className="flex items-center gap-2 text-[#4B5563] hover:text-[#111827] font-mono">
              <Download className="w-4 h-4" />
              <span>Exportar JSON</span>
            </button>

            <label className="flex items-center gap-2 text-[#4B5563] hover:text-[#111827] font-mono cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>Importar JSON</span>
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>
          </div>

          <button onClick={onResetDemo} className="flex items-center gap-2 text-red-600 hover:text-red-700 font-mono">
            <RotateCcw className="w-4 h-4" />
            <span>Restaurar Padrão Demo</span>
          </button>
        </div>
      </div>

      {/* Section Reorder Modal */}
      {showReorderModal && (
        <SectionReorderModal
          tour={formData}
          onSaveTour={(updated) => setFormData(updated)}
          onClose={() => setShowReorderModal(false)}
        />
      )}
    </div>
  );
};

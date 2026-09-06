import React, { useState } from 'react';
import {
  X, Save, RotateCcw, Download, Upload, Palette, Navigation,
  Image, Map, DollarSign, List, Move
} from 'lucide-react';
import type { Property } from '../types';
import { HotspotEditorModal } from './HotspotEditorModal';
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
  const [activeTab, setActiveTab] = useState<'theme' | 'general' | 'rooms3d' | 'gallery' | 'location' | 'features'>('theme');
  const [showHotspotModal, setShowHotspotModal] = useState(false);
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
        accentColor: '#d4af37',
        backgroundColor: '#08090A',
        surfaceColor: '#121316',
        textColor: '#f4f4f5',
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
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 text-white overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#121316] rounded-3xl border border-white/15 shadow-2xl flex flex-col max-h-[96vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-[#08090A]">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-mono text-xs tracking-widest uppercase">PAINEL ADMIN 100% EDITÁVEL</span>
            <span className="text-zinc-600">|</span>
            <h2 className="text-xl font-serif text-white">{formData.propertyName}</h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowReorderModal(true)}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-amber-300 font-mono uppercase tracking-wider flex items-center gap-2"
            >
              <Move className="w-3.5 h-3.5" />
              <span>Ordem das Seções</span>
            </button>

            <button
              onClick={handleSave}
              className="btn-gold-warm px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>SALVAR TUDO</span>
            </button>

            <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-8 py-3 bg-[#08090A] border-b border-white/10 overflow-x-auto">
          {[
            { id: 'theme', label: 'Cores, Fontes & Logos', icon: Palette },
            { id: 'general', label: 'Dados & Comercial', icon: DollarSign },
            { id: 'rooms3d', label: 'Tour 3D Nativo & Hotspots', icon: Navigation },
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

        {/* Content Body */}
        <div className="p-8 overflow-y-auto max-h-[calc(96vh-180px)] space-y-6">
          {/* TAB 1: CORES, FONTES & LOGOS */}
          {activeTab === 'theme' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif text-white border-b border-white/10 pb-2">
                Estilo Visual, Cores & Tipografia
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-amber-400 uppercase mb-2">Cor de Destaque / Acento (Hex):</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.themeConfig?.accentColor || '#d4af37'}
                      onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                      className="w-12 h-10 bg-transparent cursor-pointer rounded-lg border border-white/20"
                    />
                    <input
                      type="text"
                      value={formData.themeConfig?.accentColor || '#d4af37'}
                      onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                      className="w-full bg-[#08090A] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-amber-400 uppercase mb-2">Tom do Fundo Principal:</label>
                  <select
                    value={formData.themeConfig?.backgroundColor || '#08090A'}
                    onChange={(e) => handleThemeChange('backgroundColor', e.target.value)}
                    className="w-full bg-[#08090A] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
                  >
                    <option value="#08090A">Preto Obsidian (#08090A)</option>
                    <option value="#08090a">Preto Grafite Escuro (#08090a)</option>
                    <option value="#0a0d14">Azul Marinho Noturno (#0a0d14)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-amber-400 uppercase mb-2">Fonte dos Títulos:</label>
                  <select
                    value={formData.themeConfig?.titleFontFamily || 'serif-playfair'}
                    onChange={(e) => handleThemeChange('titleFontFamily', e.target.value)}
                    className="w-full bg-[#08090A] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
                  >
                    <option value="serif-playfair">Playfair Display (Serif Clássica Elegante)</option>
                    <option value="serif-cinzel">Cinzel (Serif Editorial de Luxo)</option>
                    <option value="sans-jakarta">Plus Jakarta Sans (Sans-Serif Moderna Limpa)</option>
                    <option value="mono">Monoespaçada Arquitetônica</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-amber-400 uppercase mb-2">URL da Logo Customizada:</label>
                  <input
                    type="text"
                    value={formData.themeConfig?.logoUrl || ''}
                    onChange={(e) => handleThemeChange('logoUrl', e.target.value)}
                    placeholder="/assets/logo-cardoso.png ou URL da imagem"
                    className="w-full bg-[#08090A] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DADOS & COMERCIAL */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif text-white border-b border-white/10 pb-2">
                Informações Fatuais & Preço Comercial
              </h3>

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
                  <label className="block text-xs font-mono text-amber-400 uppercase mb-2">Valor de Venda (Preço):</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => handleTextChange('price', e.target.value)}
                    className="w-full bg-[#08090A] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white font-serif text-lg text-amber-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-amber-400 uppercase mb-2">Taxa de Condomínio:</label>
                  <input
                    type="text"
                    value={formData.details.condoFee || ''}
                    onChange={(e) => handleDetailChange('condoFee', e.target.value)}
                    className="w-full bg-[#08090A] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-amber-400 uppercase mb-2">IPTU Anual:</label>
                  <input
                    type="text"
                    value={formData.details.iptu || ''}
                    onChange={(e) => handleDetailChange('iptu', e.target.value)}
                    className="w-full bg-[#08090A] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-amber-400 uppercase mb-2">Frase de Chamada (Tagline):</label>
                  <input
                    type="text"
                    value={formData.tagline || ''}
                    onChange={(e) => handleTextChange('tagline', e.target.value)}
                    className="w-full bg-[#08090A] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white font-serif italic"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-amber-400 uppercase mb-2">Descrição Factual do Imóvel:</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleTextChange('description', e.target.value)}
                  className="w-full bg-[#08090A] border border-white/15 rounded-xl p-4 text-xs text-white leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 3: TOUR 3D NATIVO & HOTSPOTS */}
          {activeTab === 'rooms3d' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-serif text-white">Cômodos & Hotspots 3D Nativos</h3>
                  <p className="text-xs text-zinc-400 font-light">
                    Navegação interativa tridimensional por setas e pontos de passagem.
                  </p>
                </div>

                <button
                  onClick={() => setShowHotspotModal(true)}
                  className="btn-gold-warm px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest flex items-center gap-2 font-bold cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>ABRIR EDITOR VISUAL DE SETAS 3D</span>
                </button>
              </div>

              {/* List of Rooms */}
              <div className="space-y-4">
                {formData.rooms.map((room) => (
                  <div
                    key={room.id}
                    className="p-5 rounded-2xl bg-[#08090A] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-white/10">
                        <img src={room.coverImage} alt={room.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-xs font-mono text-amber-400">{room.number} {room.areaM2 ? `· ${room.areaM2} m²` : ''}</div>
                        <div className="text-base font-serif text-white">{room.name}</div>
                        <div className="text-[11px] text-zinc-400">
                          {room.hotspots3D?.length || 0} setas de transição configuradas
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: GALERIA DE FOTOS */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif text-white border-b border-white/10 pb-2">
                Gerenciador da Galeria Fotográfica
              </h3>

              {/* Add Photo Form */}
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="URL da nova fotografia (https://...)"
                  value={newGalleryPhotoUrl}
                  onChange={(e) => setNewGalleryPhotoUrl(e.target.value)}
                  className="w-full bg-[#08090A] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
                />
                <button
                  onClick={handleAddGalleryPhoto}
                  className="btn-gold-warm px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest flex-shrink-0 font-bold"
                >
                  Adicionar Foto
                </button>
              </div>

              {/* Photos Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {formData.galleryPhotos.map((photo, idx) => (
                  <div key={idx} className="relative group h-32 rounded-xl overflow-hidden border border-white/15 bg-black">
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleDeleteGalleryPhoto(idx)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PLANTA & LOCALIZAÇÃO */}
          {activeTab === 'location' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif text-white border-b border-white/10 pb-2">
                Mapa de Localização da Região
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-amber-400 uppercase mb-2">URL da Imagem do Mapa Aéreo:</label>
                  <input
                    type="text"
                    value={formData.locationData?.regionMapPrint || ''}
                    onChange={(e) => handleLocationChange('regionMapPrint', e.target.value)}
                    className="w-full bg-[#08090A] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: FICHA TÉCNICA & DIFERENCIAIS */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif text-white border-b border-white/10 pb-2">
                Diferenciais Reais do Imóvel
              </h3>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Novo diferencial (Ex: Varanda com Churrasqueira)"
                  value={newFeatureText}
                  onChange={(e) => setNewFeatureText(e.target.value)}
                  className="w-full bg-[#08090A] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
                />
                <button
                  onClick={handleAddFeature}
                  className="btn-gold-warm px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest flex-shrink-0 font-bold"
                >
                  Adicionar
                </button>
              </div>

              <div className="space-y-2">
                {formData.details.features.map((feat, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#08090A] border border-white/10 flex items-center justify-between text-xs text-zinc-200">
                    <span>{feat}</span>
                    <button
                      onClick={() => handleDeleteFeature(idx)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer JSON Import / Export & Reset */}
        <div className="flex flex-wrap items-center justify-between px-8 py-4 border-t border-white/10 bg-[#08090A] text-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-2 text-zinc-300 hover:text-amber-400 font-mono transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Exportar JSON</span>
            </button>

            <label className="flex items-center gap-2 text-zinc-300 hover:text-amber-400 font-mono transition-colors cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>Importar JSON</span>
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>
          </div>

          <button
            onClick={onResetDemo}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 font-mono"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restaurar Padrão Demo</span>
          </button>
        </div>
      </div>

      {/* Hotspot Editor Modal Overlay */}
      {showHotspotModal && (
        <HotspotEditorModal
          tour={formData}
          onSaveTour={(updated) => setFormData(updated)}
          onClose={() => setShowHotspotModal(false)}
        />
      )}

      {/* Section Reorder Modal Overlay */}
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

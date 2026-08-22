import React, { useState } from 'react';
import { X, ArrowUp, ArrowDown, Save, GripVertical } from 'lucide-react';
import type { Tour } from '../types';

interface SectionReorderModalProps {
  tour: Tour;
  onSaveTour: (updatedTour: Tour) => void;
  onClose: () => void;
}

const SECTION_LABELS: Record<string, string> = {
  overview: 'Hero Principal (Logo Cardoso Gigante & Card Flutuante)',
  'property-overview': 'Conheça o Imóvel (Descrição Factual & Números)',
  tour3d: 'Tour Virtual 3D Nativo (Navegação Interativa por Setas)',
  rooms: 'Visita por Ambientes (Cards dos Cômodos)',
  gallery: 'Galeria Fotográfica Editorial',
  location: 'Localização & Região no Mapa',
  details: 'Sobre o Imóvel (Ficha Técnica & Atributos)',
  commercial: 'Informações Comerciais (Valor & Condomínio)',
  contact: 'Encerramento (Card Executivo Douglas Cardoso)',
};

export const SectionReorderModal: React.FC<SectionReorderModalProps> = ({
  tour,
  onSaveTour,
  onClose,
}) => {
  const defaultOrder = [
    'overview',
    'property-overview',
    'tour3d',
    'rooms',
    'gallery',
    'location',
    'details',
    'commercial',
    'contact',
  ];

  const [order, setOrder] = useState<string[]>(
    (tour.sectionOrder || defaultOrder).filter((sec) => sec !== 'floorplan')
  );

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...order];
    const temp = newOrder[index - 1];
    newOrder[index - 1] = newOrder[index];
    newOrder[index] = temp;
    setOrder(newOrder);
  };

  const moveDown = (index: number) => {
    if (index === order.length - 1) return;
    const newOrder = [...order];
    const temp = newOrder[index + 1];
    newOrder[index + 1] = newOrder[index];
    newOrder[index] = temp;
    setOrder(newOrder);
  };

  const handleSave = () => {
    onSaveTour({
      ...tour,
      sectionOrder: order,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 text-white overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#121316] rounded-3xl border border-white/15 shadow-2xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block">
              ORGANIZADOR DE LAYOUT
            </span>
            <h3 className="text-2xl font-serif text-white">
              Reordenar Seções da Página Pública
            </h3>
          </div>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-zinc-400 font-light mb-6">
          Use os botões de seta para mover as seções para cima ou para baixo e definir a sequência de navegação do visitante.
        </p>

        {/* List of Sections */}
        <div className="space-y-3 mb-8">
          {order.map((secId, index) => (
            <div
              key={secId}
              className="p-4 rounded-2xl bg-[#0b0c0e] border border-white/10 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-zinc-500" />
                <span className="font-mono text-amber-400 font-bold w-6">{index + 1}.</span>
                <span className="font-serif text-white text-sm">
                  {SECTION_LABELS[secId] || secId}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 disabled:opacity-30 text-white"
                  title="Mover para Cima"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveDown(index)}
                  disabled={index === order.length - 1}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 disabled:opacity-30 text-white"
                  title="Mover para Baixo"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-white/10 pt-6">
          <button
            onClick={() => setOrder(defaultOrder)}
            className="text-xs text-zinc-400 hover:text-white font-mono"
          >
            Restaurar Ordem Padrão
          </button>

          <button
            onClick={handleSave}
            className="btn-gold-warm px-8 py-3.5 rounded-2xl text-xs uppercase tracking-widest flex items-center gap-2 font-bold cursor-pointer shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>SALVAR SEQUÊNCIA DE SEÇÕES</span>
          </button>
        </div>
      </div>
    </div>
  );
};

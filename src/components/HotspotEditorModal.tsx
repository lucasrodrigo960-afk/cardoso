import React from 'react';
import { X } from 'lucide-react';
import type { Property } from '../types';

interface HotspotEditorModalProps {
  tour: Property;
  onSaveTour: (updatedTour: Property) => void;
  onClose: () => void;
}

export const HotspotEditorModal: React.FC<HotspotEditorModalProps> = ({
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 text-[#111827]">
      <div className="bg-white p-6 rounded-2xl max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-serif mb-2">Editor de Hotspots</h3>
        <p className="text-xs text-zinc-600">
          O novo conceito do Tour Exclusive é focado em apresentações fotográficas interativas ambiente por ambiente. Os hotspots 3D foram desativados.
        </p>
      </div>
    </div>
  );
};

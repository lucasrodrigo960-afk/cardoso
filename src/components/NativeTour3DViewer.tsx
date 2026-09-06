import React from 'react';
import type { Property } from '../types';
import { PropertyVisualIndexMap } from './PropertyVisualIndexMap';

interface NativeTour3DViewerProps {
  tour: Property;
  onOpenAdminEditor?: () => void;
}

export const NativeTour3DViewer: React.FC<NativeTour3DViewerProps> = ({ tour }) => {
  return <PropertyVisualIndexMap tour={tour} onSelectRoom={() => {}} />;
};

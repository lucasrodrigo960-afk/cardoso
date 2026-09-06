import React from 'react';
import type { Property } from '../types';
import { PropertyVisualIndexMap } from './PropertyVisualIndexMap';

interface VirtualTour3DProps {
  tour: Property;
}

export const VirtualTour3D: React.FC<VirtualTour3DProps> = ({ tour }) => {
  return <PropertyVisualIndexMap tour={tour} onSelectRoom={() => {}} />;
};

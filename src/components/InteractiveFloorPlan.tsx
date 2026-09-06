import React from 'react';
import type { Property } from '../types';
import { PropertyVisualIndexMap } from './PropertyVisualIndexMap';

interface InteractiveFloorPlanProps {
  tour: Property;
}

export const InteractiveFloorPlan: React.FC<InteractiveFloorPlanProps> = ({ tour }) => {
  return <PropertyVisualIndexMap tour={tour} onSelectRoom={() => {}} />;
};

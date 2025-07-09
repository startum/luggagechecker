
import { LuggageDimensions } from '@/utils/types';
import { useUnit } from '@/contexts/UnitContext';

interface LuggageVisualizerProps {
  dimensions: LuggageDimensions;
}

export const LuggageVisualizer = ({ dimensions }: LuggageVisualizerProps) => {
  const { formatValue } = useUnit();
  
  return (
    <div 
      className="bg-gray-50 p-4 rounded-lg mb-6"
      role="img"
      aria-label="Interactive online luggage size checker to compare cabin baggage dimensions with airline restrictions"
    >
      <h4 className="text-sm font-medium mb-3">Visual Representation</h4>
      <div className="flex items-center justify-center">
        <div 
          className="bg-seafoam/20 border border-seafoam/30 rounded-md"
          style={{
            width: `${Math.min(150, dimensions.width * 1.5)}px`,
            height: `${Math.min(150, dimensions.height * 1.5)}px`,
            transform: `perspective(800px) rotateY(30deg)`,
            position: 'relative',
            boxShadow: '10px 10px 0 rgba(107, 213, 225, 0.1)'
          }}
        >
          <div className="text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-seafoam-dark font-medium">
            {formatValue(dimensions.width, 'length')} × {formatValue(dimensions.height, 'length')}
          </div>
          <div className="absolute bottom-0 right-0 transform translate-x-full text-xs p-1 text-gray-500">
            {formatValue(dimensions.depth, 'length')}
          </div>
        </div>
      </div>
    </div>
  );
};

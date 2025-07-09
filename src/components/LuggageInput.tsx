
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LuggageDimensions } from '@/utils/types';
import { Ruler, Scale, Package, Weight } from 'lucide-react';
import { DimensionInput } from './luggage/DimensionInput';
import { LuggageVisualizer } from './luggage/LuggageVisualizer';
import { useUnit } from '@/contexts/UnitContext';

interface LuggageInputProps {
  onSubmit: (dimensions: LuggageDimensions) => void;
  initialDimensions?: LuggageDimensions;
}

/**
 * LuggageInput Component
 * 
 * Allows users to input and adjust luggage dimensions (width, height, depth, and weight)
 * using sliders or direct input. Provides visual feedback through a 3D representation.
 * 
 * @param {Function} onSubmit - Handler for form submission with dimension data
 * @param {LuggageDimensions} initialDimensions - Optional initial values for dimensions
 */
export const LuggageInput = ({ onSubmit, initialDimensions }: LuggageInputProps) => {
  // State to track current luggage dimensions
  const [dimensions, setDimensions] = useState<LuggageDimensions>(
    initialDimensions || {
      width: 40,
      height: 55,
      depth: 20,
      weight: 10
    }
  );
  
  const { unitSystem, toggleUnitSystem, formatValue } = useUnit();
  
  // Handle dimension change from either slider or input
  const handleDimensionChange = (dimension: keyof LuggageDimensions, value: number) => {
    setDimensions(prev => ({ ...prev, [dimension]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(dimensions);
  };
  
  return (
    <div 
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in LuggageInput"
      aria-label="Luggage Size Checker Tool"
      role="region"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Enter Your Luggage Dimensions</h3>
        <Button 
          onClick={(e) => {
            e.preventDefault();
            toggleUnitSystem();
          }}
          variant="outline" 
          size="sm"
          className="flex items-center gap-1.5"
        >
          {unitSystem === 'metric' ? (
            <>
              <Ruler className="h-3.5 w-3.5" />
              <span>cm/kg</span>
            </>
          ) : (
            <>
              <Weight className="h-3.5 w-3.5" />
              <span>in/lb</span>
            </>
          )}
        </Button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Width Input */}
          <DimensionInput
            label="Width"
            icon={<Ruler className="h-4 w-4 text-seafoam" />}
            value={dimensions.width}
            min={10}
            max={100}
            step={1}
            tooltip="Measure the width of your bag at its widest point."
            onChange={(value) => handleDimensionChange('width', value)}
            dimension="length"
          />
          
          {/* Height Input */}
          <DimensionInput
            label="Height"
            icon={<Ruler className="h-4 w-4 text-coral" />}
            value={dimensions.height}
            min={10}
            max={100}
            step={1}
            tooltip="Measure from the bottom to the top of your bag."
            onChange={(value) => handleDimensionChange('height', value)}
            dimension="length"
          />
          
          {/* Depth Input */}
          <DimensionInput
            label="Depth"
            icon={<Package className="h-4 w-4 text-lavender" />}
            value={dimensions.depth}
            min={5}
            max={50}
            step={1}
            tooltip="Measure from front to back at the deepest point."
            onChange={(value) => handleDimensionChange('depth', value)}
            dimension="length"
          />
          
          {/* Weight Input */}
          <DimensionInput
            label="Weight"
            icon={<Scale className="h-4 w-4 text-sunshine" />}
            value={dimensions.weight}
            min={1}
            max={35}
            step={0.5}
            tooltip="Include all contents of your bag in the weight."
            onChange={(value) => handleDimensionChange('weight', value)}
            dimension="weight"
          />
        </div>
        
        {/* Visual Representation */}
        <LuggageVisualizer dimensions={dimensions} />
        
        <Button type="submit" className="w-full">
          Check Baggage Size
        </Button>
      </form>
    </div>
  );
};

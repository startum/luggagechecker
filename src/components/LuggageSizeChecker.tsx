import React, { useState } from 'react';
import { Ruler, Package, Scale, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUnit } from '@/contexts/UnitContext';

export const LuggageSizeChecker = () => {
  const { unitSystem } = useUnit();
  const [dimensions, setDimensions] = useState({
    width: 40,
    height: 55,  
    depth: 20,
    weight: 10
  });

  const handleSliderChange = (field: string, value: number[]) => {
    setDimensions(prev => ({ ...prev, [field]: value[0] }));
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    setDimensions(prev => ({ ...prev, [field]: numValue }));
  };

  const checkBaggageSize = () => {
    // This would typically navigate to results or show a modal
    console.log('Checking baggage size:', dimensions);
  };

  const maxDimensions = {
    width: unitSystem === 'metric' ? 100 : 40,
    height: unitSystem === 'metric' ? 100 : 40, 
    depth: unitSystem === 'metric' ? 100 : 40,
    weight: unitSystem === 'metric' ? 50 : 110
  };

  return (
    <Card className="p-6 bg-white shadow-lg">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Enter Your Luggage Dimensions</h2>
          <Badge variant="outline" className="px-3 py-1">
            {unitSystem === 'metric' ? 'cm/kg' : 'in/lbs'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Width Input */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Ruler className="h-4 w-4 text-teal-500" />
              <label className="font-medium text-gray-700">Width</label>
              <Info className="h-4 w-4 text-gray-400" />
            </div>
            <div className="space-y-2">
              <Slider
                value={[dimensions.width]}
                onValueChange={(value) => handleSliderChange('width', value)}
                max={maxDimensions.width}
                step={1}
                className="w-full"
              />
              <Input
                type="number"
                value={dimensions.width}
                onChange={(e) => handleInputChange('width', e.target.value)}
                className="text-center"
                min="0"
                max={maxDimensions.width}
              />
            </div>
          </div>

          {/* Height Input */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Ruler className="h-4 w-4 text-coral" />
              <label className="font-medium text-gray-700">Height</label>
              <Info className="h-4 w-4 text-gray-400" />
            </div>
            <div className="space-y-2">
              <Slider
                value={[dimensions.height]}
                onValueChange={(value) => handleSliderChange('height', value)}
                max={maxDimensions.height}
                step={1}
                className="w-full"
              />
              <Input
                type="number"
                value={dimensions.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                className="text-center"
                min="0"
                max={maxDimensions.height}
              />
            </div>
          </div>

          {/* Depth Input */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-purple-500" />
              <label className="font-medium text-gray-700">Depth</label>
              <Info className="h-4 w-4 text-gray-400" />
            </div>
            <div className="space-y-2">
              <Slider
                value={[dimensions.depth]}
                onValueChange={(value) => handleSliderChange('depth', value)}
                max={maxDimensions.depth}
                step={1}
                className="w-full"
              />
              <Input
                type="number"
                value={dimensions.depth}
                onChange={(e) => handleInputChange('depth', e.target.value)}
                className="text-center"
                min="0"
                max={maxDimensions.depth}
              />
            </div>
          </div>

          {/* Weight Input */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-amber-500" />
              <label className="font-medium text-gray-700">Weight</label>
              <Info className="h-4 w-4 text-gray-400" />
            </div>
            <div className="space-y-2">
              <Slider
                value={[dimensions.weight]}
                onValueChange={(value) => handleSliderChange('weight', value)}
                max={maxDimensions.weight}
                step={1}
                className="w-full"
              />
              <Input
                type="number"
                value={dimensions.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                className="text-center"
                min="0"
                max={maxDimensions.weight}
              />
            </div>
          </div>
        </div>

        {/* Visual Representation */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Visual Representation</h3>
          <div className="flex justify-center">
            <div className="relative">
              <div 
                className="bg-teal-200 border-2 border-teal-300 rounded-lg flex items-center justify-center relative"
                style={{
                  width: `${Math.max(100, dimensions.width * 2)}px`,
                  height: `${Math.max(100, dimensions.height * 2)}px`,
                }}
              >
                <div className="text-teal-700 font-medium text-center">
                  <div>{dimensions.width} {unitSystem === 'metric' ? 'cm' : 'in'} ×</div>
                  <div>{dimensions.height} {unitSystem === 'metric' ? 'cm' : 'in'}</div>
                </div>
              </div>
              <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 text-sm text-gray-600">
                {dimensions.depth} {unitSystem === 'metric' ? 'cm' : 'in'}
              </div>
            </div>
          </div>
        </div>

        {/* Check Button */}
        <Button 
          onClick={checkBaggageSize}
          className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-semibold py-3 text-lg"
        >
          Check Baggage Size
        </Button>
      </div>
    </Card>
  );
};
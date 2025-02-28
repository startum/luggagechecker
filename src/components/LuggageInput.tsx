
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { LuggageDimensions } from '@/utils/types';
import { Ruler, Scale, Package, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LuggageInputProps {
  onSubmit: (dimensions: LuggageDimensions) => void;
  initialDimensions?: LuggageDimensions;
}

export const LuggageInput = ({ onSubmit, initialDimensions }: LuggageInputProps) => {
  const [dimensions, setDimensions] = useState<LuggageDimensions>(
    initialDimensions || {
      width: 40,
      height: 55,
      depth: 20,
      weight: 10
    }
  );
  
  const handleInputChange = (dimension: keyof LuggageDimensions, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setDimensions(prev => ({ ...prev, [dimension]: numValue }));
    }
  };
  
  const handleSliderChange = (dimension: keyof LuggageDimensions, value: number[]) => {
    setDimensions(prev => ({ ...prev, [dimension]: value[0] }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(dimensions);
  };
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in LuggageInput">
      <h3 className="text-lg font-semibold mb-4">Enter Your Luggage Dimensions</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Width Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="flex items-center gap-1.5">
                <Ruler className="h-4 w-4 text-seafoam" />
                Width (cm)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Measure the width of your bag at its widest point.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-4">
              <Slider
                value={[dimensions.width]}
                min={10}
                max={100}
                step={1}
                onValueChange={(value) => handleSliderChange('width', value)}
                className="flex-grow [&>.bg-primary]:bg-salmon"
              />
              <Input
                type="number"
                value={dimensions.width}
                onChange={(e) => handleInputChange('width', e.target.value)}
                className="w-16"
                min={10}
                max={100}
              />
            </div>
          </div>
          
          {/* Height Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="flex items-center gap-1.5">
                <Ruler className="h-4 w-4 text-coral" />
                Height (cm)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Measure from the bottom to the top of your bag.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-4">
              <Slider
                value={[dimensions.height]}
                min={10}
                max={100}
                step={1}
                onValueChange={(value) => handleSliderChange('height', value)}
                className="flex-grow [&>.bg-primary]:bg-salmon"
              />
              <Input
                type="number"
                value={dimensions.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                className="w-16"
                min={10}
                max={100}
              />
            </div>
          </div>
          
          {/* Depth Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="flex items-center gap-1.5">
                <Package className="h-4 w-4 text-lavender" />
                Depth (cm)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Measure from front to back at the deepest point.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-4">
              <Slider
                value={[dimensions.depth]}
                min={5}
                max={50}
                step={1}
                onValueChange={(value) => handleSliderChange('depth', value)}
                className="flex-grow [&>.bg-primary]:bg-salmon"
              />
              <Input
                type="number"
                value={dimensions.depth}
                onChange={(e) => handleInputChange('depth', e.target.value)}
                className="w-16"
                min={5}
                max={50}
              />
            </div>
          </div>
          
          {/* Weight Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="flex items-center gap-1.5">
                <Scale className="h-4 w-4 text-sunshine" />
                Weight (kg)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Include all contents of your bag in the weight.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-4">
              <Slider
                value={[dimensions.weight]}
                min={1}
                max={35}
                step={0.5}
                onValueChange={(value) => handleSliderChange('weight', value)}
                className="flex-grow [&>.bg-primary]:bg-salmon"
              />
              <Input
                type="number"
                value={dimensions.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                className="w-16"
                min={1}
                max={35}
                step={0.5}
              />
            </div>
          </div>
        </div>
        
        {/* Visual Representation */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
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
                {dimensions.width} × {dimensions.height} cm
              </div>
              <div className="absolute bottom-0 right-0 transform translate-x-full text-xs p-1 text-gray-500">
                {dimensions.depth} cm
              </div>
            </div>
          </div>
        </div>
        
        <Button type="submit" className="w-full bg-coral hover:bg-coral-dark">
          Check Baggage Size
        </Button>
      </form>
    </div>
  );
};


import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ReactNode } from 'react';
import { useUnit } from '@/contexts/UnitContext';

interface DimensionInputProps {
  label: string;
  icon: ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  tooltip: string;
  onChange: (value: number) => void;
  dimension: 'length' | 'weight';
}

export const DimensionInput = ({
  label,
  icon,
  value,
  min,
  max,
  step,
  tooltip,
  onChange,
  dimension = 'length'
}: DimensionInputProps) => {
  const { unitSystem, convertToDisplayUnit } = useUnit();
  
  const handleSliderChange = (values: number[]) => {
    onChange(values[0]);
  };

  const handleInputChange = (inputValue: string) => {
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue)) {
      if (unitSystem === 'imperial') {
        // Convert from imperial to metric for internal storage
        if (dimension === 'length') {
          // Convert inches to cm
          onChange(Number((numValue / 0.393701).toFixed(1)));
        } else {
          // Convert lb to kg
          onChange(Number((numValue / 2.20462).toFixed(1)));
        }
      } else {
        onChange(numValue);
      }
    }
  };

  // Calculate min, max values in the displayed unit
  const displayedMin = convertToDisplayUnit(min, dimension);
  const displayedMax = convertToDisplayUnit(max, dimension);
  const displayedStep = unitSystem === 'imperial' 
    ? (dimension === 'length' ? 0.5 : 0.5) 
    : step;
  const displayedValue = convertToDisplayUnit(value, dimension);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Label className="flex items-center gap-1.5">
          {icon}
          {label}
        </Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Info className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center gap-4">
        <Slider
          value={[displayedValue]}
          min={displayedMin}
          max={displayedMax}
          step={displayedStep}
          onValueChange={(newValues) => {
            const newValue = newValues[0];
            if (unitSystem === 'imperial') {
              // Convert back to metric for internal storage
              if (dimension === 'length') {
                // Convert inches to cm
                onChange(Number((newValue / 0.393701).toFixed(1)));
              } else {
                // Convert lb to kg
                onChange(Number((newValue / 2.20462).toFixed(1)));
              }
            } else {
              onChange(newValue);
            }
          }}
          className="flex-grow"
        />
        <Input
          type="number"
          value={displayedValue}
          onChange={(e) => handleInputChange(e.target.value)}
          className="w-16"
          min={displayedMin}
          max={displayedMax}
          step={displayedStep}
        />
      </div>
    </div>
  );
};

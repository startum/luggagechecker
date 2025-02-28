
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ReactNode } from 'react';

interface DimensionInputProps {
  label: string;
  icon: ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  tooltip: string;
  onChange: (value: number) => void;
}

export const DimensionInput = ({
  label,
  icon,
  value,
  min,
  max,
  step,
  tooltip,
  onChange
}: DimensionInputProps) => {
  const handleSliderChange = (values: number[]) => {
    onChange(values[0]);
  };

  const handleInputChange = (inputValue: string) => {
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue)) {
      onChange(numValue);
    }
  };

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
          value={[value]}
          min={min}
          max={max}
          step={step}
          onValueChange={handleSliderChange}
          className="flex-grow [&>.bg-primary]:bg-salmon"
        />
        <Input
          type="number"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          className="w-16"
          min={min}
          max={max}
          step={step}
        />
      </div>
    </div>
  );
};

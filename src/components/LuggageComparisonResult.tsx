
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Airline, LuggageDimensions } from '@/utils/types';

interface LuggageComparisonResultProps {
  airline: Airline;
  luggageDimensions: LuggageDimensions;
}

export const LuggageComparisonResult = ({ airline, luggageDimensions }: LuggageComparisonResultProps) => {
  // Check if luggage fits
  const luggageFits = 
    luggageDimensions.width <= airline.carryOn.maxWidth &&
    luggageDimensions.height <= airline.carryOn.maxHeight &&
    luggageDimensions.depth <= airline.carryOn.maxDepth &&
    luggageDimensions.weight <= airline.carryOn.maxWeight;
  
  return (
    <div className={`mt-6 p-5 rounded-xl border ${
      luggageFits 
        ? "bg-teal/10 border-teal/20" 
        : "bg-salmon/10 border-salmon/20"
    } animate-fade-in`}>
      <div className="flex items-center gap-3 mb-3">
        {luggageFits ? (
          <>
            <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center">
              <Check className="h-5 w-5 text-teal" />
            </div>
            <h3 className="font-semibold text-teal-dark">Your luggage fits!</h3>
          </>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-salmon/20 flex items-center justify-center">
              <X className="h-5 w-5 text-salmon" />
            </div>
            <h3 className="font-semibold text-salmon-dark">Exceeds limits</h3>
          </>
        )}
      </div>
      
      <p className={`text-sm ${luggageFits ? "text-teal-dark" : "text-salmon-dark"} mb-3`}>
        {luggageFits 
          ? "Your luggage meets the carry-on requirements for this airline."
          : "Your luggage does not meet the carry-on requirements for this airline."}
      </p>
      
      {!luggageFits && (
        <div className="space-y-2 text-sm text-salmon-dark">
          {luggageDimensions.width > airline.carryOn.maxWidth && (
            <p>Width exceeds by {luggageDimensions.width - airline.carryOn.maxWidth}cm</p>
          )}
          {luggageDimensions.height > airline.carryOn.maxHeight && (
            <p>Height exceeds by {luggageDimensions.height - airline.carryOn.maxHeight}cm</p>
          )}
          {luggageDimensions.depth > airline.carryOn.maxDepth && (
            <p>Depth exceeds by {luggageDimensions.depth - airline.carryOn.maxDepth}cm</p>
          )}
          {luggageDimensions.weight > airline.carryOn.maxWeight && (
            <p>Weight exceeds by {luggageDimensions.weight - airline.carryOn.maxWeight}kg</p>
          )}
        </div>
      )}
      
      {!luggageFits && (
        <div className="mt-4">
          <a href={airline.website} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="w-full bg-salmon hover:bg-salmon-dark text-sm">
              Check Baggage Options
            </Button>
          </a>
        </div>
      )}
    </div>
  );
};

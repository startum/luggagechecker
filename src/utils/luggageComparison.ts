
import { LuggageDimensions, ComparisonResult, Airline } from './types';

export class LuggageComparisonService {
  compareLuggage(dimensions: LuggageDimensions, airline: Airline): ComparisonResult {
    const { width, height, depth, weight } = dimensions;
    const { maxWidth, maxHeight, maxDepth, maxWeight } = airline.carryOn;
    
    // Check if dimensions fit
    const fits = width <= maxWidth && height <= maxHeight && depth <= maxDepth && weight <= maxWeight;
    
    let details = fits 
      ? "Your luggage fits within the carry-on limits."
      : "Your luggage exceeds the carry-on limits.";
      
    if (!fits) {
      if (width > maxWidth) details += ` Width exceeds by ${width - maxWidth}cm.`;
      if (height > maxHeight) details += ` Height exceeds by ${height - maxHeight}cm.`;
      if (depth > maxDepth) details += ` Depth exceeds by ${depth - maxDepth}cm.`;
      if (weight > maxWeight) details += ` Weight exceeds by ${weight - maxWeight}kg.`;
    }
    
    return { airline, fits, details };
  }

  compareWithMultipleAirlines(dimensions: LuggageDimensions, airlines: Airline[]): ComparisonResult[] {
    return airlines.map(airline => this.compareLuggage(dimensions, airline));
  }
}

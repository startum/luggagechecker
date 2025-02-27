
import { Airline, FilterCriteria } from './types';

export class AirlineSearchService {
  searchAirlines(airlines: Airline[], criteria: FilterCriteria): Airline[] {
    let results = [...airlines];
    
    // Filter by search term
    if (criteria.search) {
      const searchTerm = criteria.search.toLowerCase();
      results = results.filter(airline => 
        airline.name.toLowerCase().includes(searchTerm) || 
        airline.code.toLowerCase().includes(searchTerm) ||
        (airline.country && airline.country.toLowerCase().includes(searchTerm))
      );
    }
    
    // Sort by restrictiveness if specified
    if (criteria.restrictive) {
      results.sort((a, b) => {
        // Calculate total allowed volume
        const volumeA = a.carryOn.maxWidth * a.carryOn.maxHeight * a.carryOn.maxDepth;
        const volumeB = b.carryOn.maxWidth * b.carryOn.maxHeight * b.carryOn.maxDepth;
        return volumeA - volumeB; // Most restrictive first
      });
    }
    
    return results;
  }
}

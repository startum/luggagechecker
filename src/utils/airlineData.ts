
import { Airline, FilterCriteria, LuggageDimensions, ComparisonResult } from './types';
import { fetchAirlinesFromDatabase } from './supabaseService';
import { toast } from "sonner";

class AirlineService {
  private airlines: Airline[] = [];
  private favorites: string[] = [];
  private isLoaded: boolean = false;

  constructor() {
    this.loadFavorites();
    this.loadAirlinesFromDB();
  }

  async loadAirlinesFromDB(): Promise<void> {
    if (this.isLoaded) return;
    
    try {
      const dbAirlines = await fetchAirlinesFromDatabase();
      if (dbAirlines && dbAirlines.length > 0) {
        this.airlines = dbAirlines;
        this.isLoaded = true;
        console.log(`Loaded ${dbAirlines.length} airlines from database`);
      }
    } catch (error) {
      console.error('Failed to load airlines from database:', error);
    }
  }

  async getAllAirlines(): Promise<Airline[]> {
    if (!this.isLoaded) {
      await this.loadAirlinesFromDB();
    }
    return this.airlines;
  }

  async getAirlineById(id: string): Promise<Airline | undefined> {
    if (!this.isLoaded) {
      await this.loadAirlinesFromDB();
    }
    return this.airlines.find(airline => airline.id === id);
  }

  async searchAirlines(criteria: FilterCriteria): Promise<Airline[]> {
    if (!this.isLoaded) {
      await this.loadAirlinesFromDB();
    }
    
    let results = [...this.airlines];
    
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

  async compareLuggage(dimensions: LuggageDimensions, airlineIds: string[]): Promise<ComparisonResult[]> {
    if (!this.isLoaded) {
      await this.loadAirlinesFromDB();
    }
    
    const results: ComparisonResult[] = [];
    
    for (const id of airlineIds) {
      const airline = await this.getAirlineById(id);
      if (!airline) continue;
      
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
      
      results.push({ airline, fits, details });
    }
    
    return results;
  }

  async getFavorites(): Promise<Airline[]> {
    if (!this.isLoaded) {
      await this.loadAirlinesFromDB();
    }
    return this.airlines.filter(airline => this.favorites.includes(airline.id));
  }

  toggleFavorite(airlineId: string): boolean {
    const index = this.favorites.indexOf(airlineId);
    if (index === -1) {
      this.favorites.push(airlineId);
      this.saveFavorites();
      toast.success("Added to favorites");
      return true;
    } else {
      this.favorites.splice(index, 1);
      this.saveFavorites();
      toast.success("Removed from favorites");
      return false;
    }
  }

  isFavorite(airlineId: string): boolean {
    return this.favorites.includes(airlineId);
  }

  private saveFavorites(): void {
    localStorage.setItem('airline-favorites', JSON.stringify(this.favorites));
  }

  private loadFavorites(): void {
    try {
      const storedFavorites = localStorage.getItem('airline-favorites');
      if (storedFavorites) {
        this.favorites = JSON.parse(storedFavorites);
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  }
}

// Create singleton instance
const airlineService = new AirlineService();
export default airlineService;

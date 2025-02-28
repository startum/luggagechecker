
import { Airline, FilterCriteria, LuggageDimensions, ComparisonResult } from './types';
import { fetchAirlinesFromDatabase } from './supabaseService';
import { toast } from "sonner";

class AirlineService {
  private airlines: Airline[] = [];
  private favorites: string[] = [];
  private isLoaded: boolean = false;

  constructor() {
    console.log("🏁 AirlineService initialized");
    this.loadFavorites();
    this.loadAirlinesFromDB();
  }

  async loadAirlinesFromDB(): Promise<void> {
    if (this.isLoaded && this.airlines.length > 0) return;
    
    try {
      console.log("🌐 Loading airlines from database...");
      const dbAirlines = await fetchAirlinesFromDatabase();
      if (dbAirlines && dbAirlines.length > 0) {
        this.airlines = dbAirlines;
        this.isLoaded = true;
        console.log(`✅ Loaded ${dbAirlines.length} airlines from database`);
      } else {
        console.error('❌ No airlines loaded from database');
        toast.error("Failed to load airline data");
      }
    } catch (error) {
      console.error('❌ Failed to load airlines from database:', error);
      toast.error("Error loading airline data");
    }
  }

  async getAllAirlines(): Promise<Airline[]> {
    if (!this.isLoaded || this.airlines.length === 0) {
      await this.loadAirlinesFromDB();
    }
    
    if (this.airlines.length === 0) {
      // For demo purposes, return some dummy data if database fetch fails
      console.warn("⚠️ Returning fallback airline data");
      return [
        {
          id: "ryanair",
          name: "Ryanair",
          code: "FR",
          logo: "https://logo.clearbit.com/ryanair.com",
          website: "https://www.ryanair.com",
          country: "Ireland",
          carryOn: {
            maxWidth: 40,
            maxHeight: 55,
            maxDepth: 20,
            maxWeight: 10,
            notes: "Standard carry-on allowance"
          },
          checkedBaggage: [
            {
              maxWidth: 80,
              maxHeight: 120,
              maxDepth: 40,
              maxWeight: 20,
              price: "From €20.99"
            }
          ],
          popularRoutes: ["London to Dublin", "Madrid to Rome"]
        },
        {
          id: "easyjet",
          name: "EasyJet",
          code: "U2",
          logo: "https://logo.clearbit.com/easyjet.com",
          website: "https://www.easyjet.com",
          country: "United Kingdom",
          carryOn: {
            maxWidth: 45,
            maxHeight: 56,
            maxDepth: 25,
            maxWeight: 15,
            notes: "One cabin bag per passenger"
          },
          checkedBaggage: [
            {
              maxWidth: 80,
              maxHeight: 120,
              maxDepth: 40,
              maxWeight: 23,
              price: "From €15.99"
            }
          ],
          popularRoutes: ["London to Barcelona", "Paris to Nice"]
        }
      ];
    }
    
    return this.airlines;
  }

  async getAirlineById(id: string): Promise<Airline | undefined> {
    if ((!this.isLoaded || this.airlines.length === 0) && id) {
      await this.loadAirlinesFromDB();
    }
    
    return this.airlines.find(airline => airline.id === id);
  }

  async searchAirlines(criteria: FilterCriteria): Promise<Airline[]> {
    if (!this.isLoaded || this.airlines.length === 0) {
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
    if (!this.isLoaded || this.airlines.length === 0) {
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
    console.log("🔍 getFavorites() called, favorites:", this.favorites);
    if (!this.isLoaded || this.airlines.length === 0) {
      console.log("🔄 Airlines not loaded yet, loading from DB...");
      await this.loadAirlinesFromDB();
    }
    
    const favoriteAirlines = this.airlines.filter(airline => this.favorites.includes(airline.id));
    console.log("✅ Retrieved favorite airlines:", favoriteAirlines.length);
    return favoriteAirlines;
  }

  toggleFavorite(airlineId: string): boolean {
    console.log("🔄 toggleFavorite called for:", airlineId);
    console.log("📋 Current favorites before toggle:", [...this.favorites]);
    
    const index = this.favorites.indexOf(airlineId);
    if (index === -1) {
      this.favorites.push(airlineId);
      this.saveFavorites();
      toast.success("Added to favorites");
      console.log("➕ Added to favorites:", airlineId);
      console.log("📋 Updated favorites:", [...this.favorites]);
      this.notifyFavoritesChanged();
      return true;
    } else {
      this.favorites.splice(index, 1);
      this.saveFavorites();
      toast.success("Removed from favorites");
      console.log("➖ Removed from favorites:", airlineId);
      console.log("📋 Updated favorites:", [...this.favorites]);
      this.notifyFavoritesChanged();
      return false;
    }
  }

  isFavorite(airlineId: string): boolean {
    return this.favorites.includes(airlineId);
  }

  private notifyFavoritesChanged(): void {
    // Dispatch a custom event that components can listen for
    console.log("🔔 Dispatching favoritesChanged event");
    const event = new CustomEvent('favoritesChanged');
    window.dispatchEvent(event);
  }

  private saveFavorites(): void {
    localStorage.setItem('airline-favorites', JSON.stringify(this.favorites));
    console.log("💾 Saved favorites to localStorage:", this.favorites);
  }

  private loadFavorites(): void {
    try {
      const storedFavorites = localStorage.getItem('airline-favorites');
      console.log("📂 Loading favorites from localStorage:", storedFavorites);
      if (storedFavorites) {
        this.favorites = JSON.parse(storedFavorites);
        console.log("📋 Loaded favorites:", this.favorites);
      } else {
        console.log("ℹ️ No favorites found in localStorage");
      }
    } catch (error) {
      console.error('❌ Failed to load favorites:', error);
    }
  }
}

// Create singleton instance
const airlineService = new AirlineService();
export default airlineService;

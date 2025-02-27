
import { Airline, FilterCriteria, LuggageDimensions, ComparisonResult } from './types';
import { toast } from "sonner";

// Mock airline data
const airlines: Airline[] = [
  {
    id: "ryanair",
    name: "Ryanair",
    code: "FR",
    logo: "https://images.unsplash.com/photo-1583810111145-069345044bf5?q=80&w=120&auto=format&fit=crop",
    website: "https://www.ryanair.com",
    carryOn: {
      maxWidth: 40,
      maxHeight: 55,
      maxDepth: 20,
      maxWeight: 10,
      notes: "Priority customers can bring an additional small bag (40x20x25cm)"
    },
    checkedBaggage: [
      {
        maxWidth: 75,
        maxHeight: 81,
        maxDepth: 119,
        maxWeight: 20,
        price: "From €20.99"
      },
      {
        maxWidth: 75,
        maxHeight: 81,
        maxDepth: 119,
        maxWeight: 32,
        price: "From €35.99"
      }
    ],
    popularRoutes: ["London - Dublin", "London - Barcelona", "Madrid - Milan"]
  },
  {
    id: "easyjet",
    name: "EasyJet",
    code: "U2",
    logo: "https://images.unsplash.com/photo-1583810111145-069345044bf5?q=80&w=120&auto=format&fit=crop",
    website: "https://www.easyjet.com",
    carryOn: {
      maxWidth: 45,
      maxHeight: 56,
      maxDepth: 25,
      maxWeight: 15,
      notes: "One cabin bag per person"
    },
    checkedBaggage: [
      {
        maxWidth: 70,
        maxHeight: 90,
        maxDepth: 120,
        maxWeight: 23,
        price: "From £6.99"
      },
      {
        maxWidth: 70,
        maxHeight: 90,
        maxDepth: 120,
        maxWeight: 32,
        price: "From £12.99"
      }
    ],
    popularRoutes: ["London - Paris", "London - Nice", "London - Amsterdam"]
  },
  {
    id: "britishairways",
    name: "British Airways",
    code: "BA",
    logo: "https://images.unsplash.com/photo-1583810111145-069345044bf5?q=80&w=120&auto=format&fit=crop",
    website: "https://www.britishairways.com",
    carryOn: {
      maxWidth: 45,
      maxHeight: 56,
      maxDepth: 25,
      maxWeight: 23,
      notes: "Plus one personal item"
    },
    checkedBaggage: [
      {
        maxWidth: 90,
        maxHeight: 75,
        maxDepth: 43,
        maxWeight: 23,
        price: "Usually included in ticket"
      },
      {
        maxWidth: 90,
        maxHeight: 75,
        maxDepth: 43,
        maxWeight: 32,
        price: "Additional fee may apply"
      }
    ],
    popularRoutes: ["London - New York", "London - Dubai", "London - Singapore"]
  },
  {
    id: "lufthansa",
    name: "Lufthansa",
    code: "LH",
    logo: "https://images.unsplash.com/photo-1583810111145-069345044bf5?q=80&w=120&auto=format&fit=crop",
    website: "https://www.lufthansa.com",
    carryOn: {
      maxWidth: 40,
      maxHeight: 55,
      maxDepth: 23,
      maxWeight: 8,
      notes: "Economy class, plus one personal item"
    },
    checkedBaggage: [
      {
        maxWidth: 80,
        maxHeight: 80,
        maxDepth: 120,
        maxWeight: 23,
        price: "Usually included in ticket"
      }
    ],
    popularRoutes: ["Frankfurt - London", "Munich - New York", "Frankfurt - Tokyo"]
  },
  {
    id: "airfrance",
    name: "Air France",
    code: "AF",
    logo: "https://images.unsplash.com/photo-1583810111145-069345044bf5?q=80&w=120&auto=format&fit=crop",
    website: "https://www.airfrance.com",
    carryOn: {
      maxWidth: 55,
      maxHeight: 35,
      maxDepth: 25,
      maxWeight: 12,
      notes: "Economy class, plus one personal item"
    },
    checkedBaggage: [
      {
        maxWidth: 158,
        maxHeight: 158,
        maxDepth: 158,
        maxWeight: 23,
        price: "Usually included in ticket"
      }
    ],
    popularRoutes: ["Paris - New York", "Paris - Tokyo", "Paris - Johannesburg"]
  },
  {
    id: "americanairlines",
    name: "American Airlines",
    code: "AA",
    logo: "https://images.unsplash.com/photo-1583810111145-069345044bf5?q=80&w=120&auto=format&fit=crop",
    website: "https://www.aa.com",
    carryOn: {
      maxWidth: 56,
      maxHeight: 36,
      maxDepth: 23,
      maxWeight: 10,
      notes: "Plus one personal item"
    },
    checkedBaggage: [
      {
        maxWidth: 157,
        maxHeight: 157,
        maxDepth: 157,
        maxWeight: 23,
        price: "From $30 per bag"
      }
    ],
    popularRoutes: ["Dallas - New York", "Miami - London", "Los Angeles - Tokyo"]
  },
];

// Service class to handle airline data operations
class AirlineService {
  private airlines: Airline[] = airlines;
  private favorites: string[] = [];

  constructor() {
    // Load favorites from localStorage
    this.loadFavorites();
  }

  // Get all airlines
  getAllAirlines(): Airline[] {
    return this.airlines;
  }

  // Get airline by ID
  getAirlineById(id: string): Airline | undefined {
    return this.airlines.find(airline => airline.id === id);
  }

  // Search airlines by criteria
  searchAirlines(criteria: FilterCriteria): Airline[] {
    let results = [...this.airlines];
    
    // Filter by search term
    if (criteria.search) {
      const searchTerm = criteria.search.toLowerCase();
      results = results.filter(airline => 
        airline.name.toLowerCase().includes(searchTerm) || 
        airline.code.toLowerCase().includes(searchTerm)
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
    
    // Filter by region
    if (criteria.region) {
      // This would require actual region data in the airline objects
      // For now, we'll just return the results without filtering by region
    }
    
    return results;
  }

  // Compare luggage with airline policies
  compareLuggage(dimensions: LuggageDimensions, airlineIds: string[]): ComparisonResult[] {
    const results: ComparisonResult[] = [];
    
    for (const id of airlineIds) {
      const airline = this.getAirlineById(id);
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

  // Favorites management
  getFavorites(): Airline[] {
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

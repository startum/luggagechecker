
import { Airline, FilterCriteria, LuggageDimensions, ComparisonResult } from './types';
import { fetchAirlinesFromDatabase } from './supabaseService';
import { FavoritesManager } from './favorites';
import { LuggageComparisonService } from './luggageComparison';
import { AirlineSearchService } from './airlineSearch';

class AirlineService {
  private airlines: Airline[] = [];
  private isLoaded: boolean = false;
  private favoritesManager: FavoritesManager;
  private luggageComparisonService: LuggageComparisonService;
  private searchService: AirlineSearchService;

  constructor() {
    this.favoritesManager = new FavoritesManager();
    this.luggageComparisonService = new LuggageComparisonService();
    this.searchService = new AirlineSearchService();
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
    return this.searchService.searchAirlines(this.airlines, criteria);
  }

  async compareLuggage(dimensions: LuggageDimensions, airlineIds: string[]): Promise<ComparisonResult[]> {
    if (!this.isLoaded) {
      await this.loadAirlinesFromDB();
    }
    
    const selectedAirlines = this.airlines.filter(airline => airlineIds.includes(airline.id));
    return this.luggageComparisonService.compareWithMultipleAirlines(dimensions, selectedAirlines);
  }

  async getFavorites(): Promise<Airline[]> {
    if (!this.isLoaded) {
      await this.loadAirlinesFromDB();
    }
    const favoriteIds = this.favoritesManager.getFavoriteIds();
    return this.airlines.filter(airline => favoriteIds.includes(airline.id));
  }

  toggleFavorite(airlineId: string): boolean {
    return this.favoritesManager.toggleFavorite(airlineId);
  }

  isFavorite(airlineId: string): boolean {
    return this.favoritesManager.isFavorite(airlineId);
  }
}

// Create singleton instance
const airlineService = new AirlineService();
export default airlineService;

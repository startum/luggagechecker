
export interface Airline {
  id: string;
  name: string;
  code: string;
  logo: string;
  website: string;
  carryOn: LuggagePolicy;
  checkedBaggage: LuggagePolicy[];
  popularRoutes: string[];
}

export interface LuggagePolicy {
  maxWidth: number;  // cm
  maxHeight: number; // cm
  maxDepth: number;  // cm
  maxWeight: number; // kg
  notes?: string;
  price?: string;    // Basic price info as string
}

export interface LuggageDimensions {
  width: number;
  height: number;
  depth: number;
  weight: number;
}

export type FilterCriteria = {
  search: string;
  restrictive?: boolean; // Sort by most restrictive first
  region?: string;       // e.g., "Europe", "North America"
};

export type ComparisonResult = {
  airline: Airline;
  fits: boolean;
  details: string;
};

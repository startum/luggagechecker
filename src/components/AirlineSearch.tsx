
import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { AirlineCard } from './AirlineCard';
import airlineService from '@/utils/airlineData';
import { Airline, FilterCriteria, LuggageDimensions } from '@/utils/types';

interface AirlineSearchProps {
  initialSearch?: string;
  filterByDimensions?: boolean;
  luggageDimensions?: LuggageDimensions;
  limit?: number;
}

export const AirlineSearch = ({ 
  initialSearch = '', 
  filterByDimensions = false,
  luggageDimensions,
  limit
}: AirlineSearchProps) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [showFilters, setShowFilters] = useState(false);
  const [allAirlines, setAllAirlines] = useState<Airline[]>([]);
  const [displayedAirlines, setDisplayedAirlines] = useState<Airline[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    search: initialSearch,
    restrictive: false
  });

  // Initial load of airlines
  useEffect(() => {
    console.log("Initial load of AirlineSearch");
    const loadAirlines = async () => {
      setLoading(true);
      try {
        console.log("Fetching all airlines");
        const airlines = await airlineService.getAllAirlines();
        console.log(`Loaded ${airlines.length} airlines`);
        setAllAirlines(airlines);
        
        // Apply initial filtering
        const filtered = applyFilters(airlines);
        setDisplayedAirlines(filtered);
      } catch (error) {
        console.error('Error loading airlines:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAirlines();
  }, []);

  // Apply all filters and return filtered results
  const applyFilters = (airlines: Airline[]) => {
    let results = [...airlines];
    
    // Apply search filter if present
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      results = results.filter(airline => 
        airline.name.toLowerCase().includes(searchLower) || 
        airline.code.toLowerCase().includes(searchLower) ||
        (airline.country && airline.country.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply dimension filtering if enabled
    if (filterByDimensions && luggageDimensions) {
      results = results.filter(airline => 
        airline.carryOn.maxWidth >= luggageDimensions.width &&
        airline.carryOn.maxHeight >= luggageDimensions.height &&
        airline.carryOn.maxDepth >= luggageDimensions.depth &&
        airline.carryOn.maxWeight >= luggageDimensions.weight
      );
    }
    
    // Sort by restrictiveness if specified
    if (filterCriteria.restrictive) {
      results.sort((a, b) => {
        const volumeA = a.carryOn.maxWidth * a.carryOn.maxHeight * a.carryOn.maxDepth;
        const volumeB = b.carryOn.maxWidth * b.carryOn.maxHeight * b.carryOn.maxDepth;
        return volumeA - volumeB; // Most restrictive first
      });
    }
    
    // Apply limit if specified
    if (limit && limit > 0) {
      results = results.slice(0, limit);
    }
    
    return results;
  };

  // Update displayed airlines when search term changes
  useEffect(() => {
    console.log(`Search term changed to: "${searchTerm}"`);
    if (allAirlines.length > 0) {
      const filtered = applyFilters(allAirlines);
      setDisplayedAirlines(filtered);
    }
  }, [searchTerm, filterCriteria.restrictive]);

  // Perform search
  const handleSearch = () => {
    console.log(`Performing search for: "${searchTerm}"`);
    if (allAirlines.length > 0) {
      const filtered = applyFilters(allAirlines);
      setDisplayedAirlines(filtered);
    }
  };

  // Toggle sort by restrictiveness
  const toggleRestrictive = () => {
    console.log(`Toggling restrictive filter`);
    setFilterCriteria(prev => ({ 
      ...prev, 
      restrictive: !prev.restrictive 
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    console.log(`Clearing all filters`);
    setSearchTerm('');
    setFilterCriteria({ search: '', restrictive: false });
  };

  return (
    <div className="w-full">
      {/* Search and Filter Controls */}
      <div className="mb-6 animate-fade-in">
        <form className="relative mb-4" onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Search airlines by name, code or country" 
            className="pl-10 pr-20 h-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
            <Button 
              type="submit" 
              variant="default" 
              size="sm" 
              className="h-9"
            >
              <Search className="h-4 w-4 mr-1" /> Search
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowFilters(!showFilters)}
              className="h-8 w-8"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </form>
        
        {/* Filter Options */}
        {showFilters && (
          <div className="bg-white p-4 rounded-md shadow-sm mb-4 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Filters</h3>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
                <X className="h-3 w-3 mr-1" /> Clear all
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="restrictive" 
                  checked={filterCriteria.restrictive}
                  onCheckedChange={toggleRestrictive}
                />
                <Label htmlFor="restrictive" className="text-sm">
                  Show most restrictive first
                </Label>
              </div>
            </div>
          </div>
        )}
        
        {/* Search Results Count */}
        <div className="text-sm text-gray-500 mb-2">
          {loading ? (
            "Loading airlines..."
          ) : (
            `${displayedAirlines.length} ${displayedAirlines.length === 1 ? 'airline' : 'airlines'} found`
          )}
        </div>
      </div>
      
      {/* Results Grid */}
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : displayedAirlines.length > 0 ? (
        <div className="grid gap-4">
          {displayedAirlines.map((airline, index) => (
            <AirlineCard 
              key={airline.id} 
              airline={airline}
              compact={true}
              delay={index * 0.1}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-md shadow-sm">
          <p className="text-gray-500">No airlines found matching your search criteria.</p>
          <Button variant="link" onClick={clearFilters} className="mt-2">
            Clear filters and try again
          </Button>
        </div>
      )}
    </div>
  );
};

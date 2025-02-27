
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
}

export const AirlineSearch = ({ 
  initialSearch = '', 
  filterByDimensions = false,
  luggageDimensions
}: AirlineSearchProps) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [showFilters, setShowFilters] = useState(false);
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    search: initialSearch,
    restrictive: false
  });

  // Initial load of airlines
  useEffect(() => {
    const loadAirlines = async () => {
      setLoading(true);
      try {
        const allAirlines = await airlineService.getAllAirlines();
        setAirlines(allAirlines);
        updateAirlines(allAirlines, filterCriteria);
      } catch (error) {
        console.error('Error loading airlines:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAirlines();
  }, []);

  // Update filter criteria whenever search term changes
  useEffect(() => {
    const updatedCriteria = { ...filterCriteria, search: searchTerm };
    setFilterCriteria(updatedCriteria);
    updateAirlines(airlines, updatedCriteria);
  }, [searchTerm]);

  // Handle changes to other filter criteria (not search term)
  useEffect(() => {
    if (filterCriteria.restrictive !== undefined) {
      updateAirlines(airlines, filterCriteria);
    }
  }, [filterCriteria.restrictive]);

  // Function to update airlines based on current criteria
  const updateAirlines = async (allAirlines: Airline[], criteria: FilterCriteria) => {
    setLoading(true);
    try {
      let results = await airlineService.searchAirlines(criteria);
      
      // Apply dimension filtering if needed
      if (filterByDimensions && luggageDimensions) {
        results = results.filter(airline => 
          airline.carryOn.maxWidth >= luggageDimensions.width &&
          airline.carryOn.maxHeight >= luggageDimensions.height &&
          airline.carryOn.maxDepth >= luggageDimensions.depth &&
          airline.carryOn.maxWeight >= luggageDimensions.weight
        );
      }
      
      setAirlines(results);
    } catch (error) {
      console.error('Error updating airlines:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle sort by restrictiveness
  const toggleRestrictive = () => {
    setFilterCriteria({ 
      ...filterCriteria, 
      restrictive: !filterCriteria.restrictive 
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setFilterCriteria({ search: '', restrictive: false });
  };

  return (
    <div className="w-full">
      {/* Search and Filter Controls */}
      <div className="mb-6 animate-fade-in">
        <form className="relative mb-4" onSubmit={(e) => e.preventDefault()}>
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
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4 animate-fade-in">
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
              
              {/* More filter options could be added here */}
            </div>
          </div>
        )}
        
        {/* Search Results Count */}
        <div className="text-sm text-gray-500 mb-2">
          {loading ? (
            "Loading airlines..."
          ) : (
            `${airlines.length} ${airlines.length === 1 ? 'airline' : 'airlines'} found`
          )}
        </div>
      </div>
      
      {/* Results Grid */}
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin h-10 w-10 border-4 border-coral border-t-transparent rounded-full"></div>
        </div>
      ) : airlines.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {airlines.map((airline, index) => (
            <AirlineCard 
              key={airline.id} 
              airline={airline} 
              delay={index * 0.1}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
          <p className="text-gray-500">No airlines found matching your search criteria.</p>
          <Button variant="link" onClick={clearFilters} className="mt-2">
            Clear filters and try again
          </Button>
        </div>
      )}
    </div>
  );
};

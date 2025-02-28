
import { useState, useEffect } from 'react';
import { Search, Plane } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AirlineCard } from './AirlineCard';
import airlineService from '@/utils/airlineData';
import { Airline, LuggageDimensions } from '@/utils/types';
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger 
} from '@/components/ui/dialog';

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
  limit = 6
}: AirlineSearchProps) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [allAirlines, setAllAirlines] = useState<Airline[]>([]);
  const [displayedAirlines, setDisplayedAirlines] = useState<Airline[]>([]);
  const [featuredAirlines, setFeaturedAirlines] = useState<Airline[]>([]);
  const [suggestedAirlines, setSuggestedAirlines] = useState<Airline[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedAirline, setSelectedAirline] = useState<Airline | null>(null);

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
        
        // Set featured airlines (first 6)
        const featured = airlines.slice(0, limit);
        setFeaturedAirlines(featured);
        
        // Initialize displayed airlines
        setDisplayedAirlines(featured);
      } catch (error) {
        console.error('Error loading airlines:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAirlines();
  }, [limit]);

  // Filter airlines based on search term for suggestions
  useEffect(() => {
    if (searchTerm.trim() && allAirlines.length > 0) {
      const searchLower = searchTerm.toLowerCase();
      const filtered = allAirlines.filter(airline => 
        airline.name.toLowerCase().includes(searchLower) || 
        airline.code.toLowerCase().includes(searchLower) ||
        (airline.country && airline.country.toLowerCase().includes(searchLower))
      ).slice(0, 5); // Limit to 5 suggestions
      
      setSuggestedAirlines(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestedAirlines([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, allAirlines]);

  // Handle search form submission
  const handleSearch = () => {
    console.log(`Performing search for: "${searchTerm}"`);
    if (allAirlines.length > 0 && searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      const filtered = allAirlines.filter(airline => 
        airline.name.toLowerCase().includes(searchLower) || 
        airline.code.toLowerCase().includes(searchLower) ||
        (airline.country && airline.country.toLowerCase().includes(searchLower))
      );
      
      setDisplayedAirlines(filtered.slice(0, limit));
    } else {
      // If search is empty, show featured airlines
      setDisplayedAirlines(featuredAirlines);
    }
    setShowSuggestions(false);
  };

  // Handle suggestion click
  const handleSuggestionClick = (airline: Airline) => {
    console.log(`Selected airline: ${airline.name}`);
    setSearchTerm(airline.name);
    setSuggestedAirlines([]);
    setShowSuggestions(false);
    setSelectedAirline(airline);
    
    // Update displayed airlines to show the selected one first
    const updatedDisplay = [airline, ...featuredAirlines.filter(a => a.id !== airline.id)];
    setDisplayedAirlines(updatedDisplay.slice(0, limit));
  };

  // Handle input blur
  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <div className="w-full">
      {/* Search Controls */}
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
            onFocus={() => setShowSuggestions(suggestedAirlines.length > 0)}
            onBlur={handleInputBlur}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Button 
              type="submit" 
              variant="default" 
              size="sm" 
              className="h-9"
            >
              <Search className="h-4 w-4 mr-1" /> Search
            </Button>
          </div>
          
          {/* Autocomplete Suggestions */}
          {showSuggestions && (
            <div className="absolute z-10 w-full bg-white shadow-lg rounded-md mt-1 border border-gray-200 max-h-60 overflow-auto">
              {suggestedAirlines.map(airline => (
                <div 
                  key={airline.id}
                  className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(airline)}
                >
                  {airline.logo && (
                    <img 
                      src={airline.logo} 
                      alt={`${airline.name} logo`}
                      className="w-8 h-8 mr-3 object-contain"
                    />
                  )}
                  <div>
                    <div className="font-medium">{airline.name}</div>
                    <div className="text-xs text-gray-500">{airline.code} • {airline.country}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </form>
        
        {/* Search Results Count */}
        <div className="text-sm text-gray-500 mb-2">
          {loading ? (
            "Loading airlines..."
          ) : (
            `Showing top ${Math.min(displayedAirlines.length, limit)} airlines`
          )}
        </div>
      </div>
      
      {/* Results Grid */}
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedAirlines.length > 0 ? displayedAirlines.map((airline, index) => (
            <Dialog key={airline.id}>
              <DialogTrigger asChild>
                <div className="cursor-pointer bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      {airline.logo ? (
                        <img 
                          src={airline.logo} 
                          alt={`${airline.name} logo`}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <Plane className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{airline.name}</h3>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <span className="font-mono">{airline.code}</span>
                        {airline.country && (
                          <>
                            <span>•</span>
                            <span>{airline.country}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-500">Max Dimensions:</span>
                      <span className="font-medium">
                        {airline.carryOn.maxWidth} × {airline.carryOn.maxHeight} × {airline.carryOn.maxDepth} cm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Max Weight:</span>
                      <span className="font-medium">{airline.carryOn.maxWeight} kg</span>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <AirlineCard airline={airline} compact={false} />
              </DialogContent>
            </Dialog>
          )) : (
            <div className="text-center py-12 bg-white rounded-md shadow-sm col-span-3">
              <p className="text-gray-500">No airlines found matching your search criteria.</p>
              <Button variant="link" onClick={() => {
                setSearchTerm('');
                setDisplayedAirlines(featuredAirlines);
              }} className="mt-2">
                Show popular airlines instead
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

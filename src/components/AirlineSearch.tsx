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

  useEffect(() => {
    console.log("Initial load of AirlineSearch");
    const loadAirlines = async () => {
      setLoading(true);
      try {
        console.log("Fetching all airlines");
        const airlines = await airlineService.getAllAirlines();
        console.log(`Loaded ${airlines.length} airlines`);
        setAllAirlines(airlines);
        
        const featured = airlines.slice(0, limit);
        setFeaturedAirlines(featured);
        
        setDisplayedAirlines(featured);
      } catch (error) {
        console.error('Error loading airlines:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAirlines();
  }, [limit]);

  useEffect(() => {
    if (searchTerm.trim() && allAirlines.length > 0) {
      const searchLower = searchTerm.toLowerCase();
      const filtered = allAirlines.filter(airline => 
        airline.name.toLowerCase().includes(searchLower) || 
        airline.code.toLowerCase().includes(searchLower) ||
        (airline.country && airline.country.toLowerCase().includes(searchLower))
      ).slice(0, 5);
      
      setSuggestedAirlines(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestedAirlines([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, allAirlines]);

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
      setDisplayedAirlines(featuredAirlines);
    }
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (airline: Airline) => {
    console.log(`Selected airline: ${airline.name}`);
    setSearchTerm(airline.name);
    setSuggestedAirlines([]);
    setShowSuggestions(false);
    setSelectedAirline(airline);
    
    const updatedDisplay = [airline, ...featuredAirlines.filter(a => a.id !== airline.id)];
    setDisplayedAirlines(updatedDisplay.slice(0, limit));
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <div className="w-full">
      <div className="mb-4 sm:mb-6 animate-fade-in">
        <form className="relative mb-3 sm:mb-4 flex gap-2" onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search airlines by name, code or country" 
              className="pl-10 h-10 sm:h-12 text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowSuggestions(suggestedAirlines.length > 0)}
              onBlur={handleInputBlur}
            />
            
            {showSuggestions && (
              <div className="absolute z-10 w-full bg-white shadow-lg rounded-md mt-1 border border-gray-200 max-h-60 overflow-auto">
                {suggestedAirlines.map(airline => (
                  <div 
                    key={airline.id}
                    className="flex items-center p-2 sm:p-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(airline)}
                  >
                    {airline.logo && (
                      <img 
                        src={airline.logo} 
                        alt={`${airline.name} logo`}
                        className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 object-contain"
                      />
                    )}
                    <div>
                      <div className="font-medium text-sm sm:text-base">{airline.name}</div>
                      <div className="text-xs text-gray-500">{airline.code} • {airline.country}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button 
            type="submit" 
            variant="default" 
            className="h-10 sm:h-12 px-4 sm:px-6"
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> 
            <span className="hidden xs:inline">Search</span>
          </Button>
        </form>
        
        <div className="text-xs sm:text-sm text-gray-500 mb-2">
          {loading ? (
            "Loading airlines..."
          ) : (
            `Showing top ${Math.min(displayedAirlines.length, limit)} airlines`
          )}
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center p-4 sm:p-12">
          <div className="animate-spin h-8 w-8 sm:h-10 sm:w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {displayedAirlines.length > 0 ? displayedAirlines.map((airline, index) => (
            <Dialog key={airline.id}>
              <DialogTrigger asChild>
                <div className="cursor-pointer bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-4 hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                  <div className="flex items-center mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                      {airline.logo ? (
                        <img 
                          src={airline.logo} 
                          alt={`${airline.name} logo`}
                          className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                        />
                      ) : (
                        <Plane className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm sm:text-base">{airline.name}</h3>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <span className="font-mono">{airline.code}</span>
                        {airline.country && (
                          <>
                            <span>•</span>
                            <span className="hidden xs:inline">{airline.country}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs sm:text-sm">
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
            <div className="text-center py-8 sm:py-12 bg-white rounded-md shadow-sm col-span-1 sm:col-span-2">
              <p className="text-gray-500 text-sm sm:text-base">No airlines found matching your search criteria.</p>
              <Button variant="link" onClick={() => {
                setSearchTerm('');
                setDisplayedAirlines(featuredAirlines);
              }} className="mt-2 text-xs sm:text-sm">
                Show popular airlines instead
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

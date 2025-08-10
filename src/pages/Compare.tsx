import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { LuggageInput } from '@/components/LuggageInput';
import { ComparisonView } from '@/components/ComparisonView';
import { Button } from '@/components/ui/button';
import { Search, Plus, X, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import airlineService from '@/utils/airlineData';
import { Airline, LuggageDimensions } from '@/utils/types';
const Compare = () => {
  const navigate = useNavigate();
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [luggageDimensions, setLuggageDimensions] = useState<LuggageDimensions>({
    width: 40,
    height: 55,
    depth: 20,
    weight: 10
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Airline[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    // Try to load luggage dimensions from session storage
    try {
      const storedDimensions = sessionStorage.getItem('luggage-dimensions');
      if (storedDimensions) {
        setLuggageDimensions(JSON.parse(storedDimensions));
      }
    } catch (error) {
      console.error('Failed to load luggage dimensions:', error);
    }
  }, []);

  // Live search as user types
  useEffect(() => {
    const performLiveSearch = async () => {
      if (searchTerm.trim().length >= 2) {
        try {
          const results = await airlineService.searchAirlines({
            search: searchTerm
          });
          setSearchResults(results);
        } catch (error) {
          console.error('Error searching airlines:', error);
          setSearchResults([]);
        }
      } else if (searchTerm.trim().length === 0) {
        // When search is cleared, show popular airlines
        try {
          const allAirlines = await airlineService.getAllAirlines();
          setSearchResults(allAirlines.slice(0, 8)); // Show first 8 airlines as popular
        } catch (error) {
          console.error('Error loading popular airlines:', error);
          setSearchResults([]);
        }
      }
    };

    // Use debounce to avoid too many API calls
    const timeoutId = setTimeout(performLiveSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);
  const handleLuggageSubmit = (dimensions: LuggageDimensions) => {
    // Store dimensions
    sessionStorage.setItem('luggage-dimensions', JSON.stringify(dimensions));
    setLuggageDimensions(dimensions);
  };
  const addAirline = (airlineId: string) => {
    if (!selectedAirlines.includes(airlineId)) {
      setSelectedAirlines([...selectedAirlines, airlineId]);
    }
    setDialogOpen(false);
  };
  const removeAirline = (airlineId: string) => {
    setSelectedAirlines(selectedAirlines.filter(id => id !== airlineId));
  };
  const [selectedAirlineObjects, setSelectedAirlineObjects] = useState<Airline[]>([]);
  useEffect(() => {
    const fetchSelectedAirlines = async () => {
      if (selectedAirlines.length === 0) {
        setSelectedAirlineObjects([]);
        return;
      }
      const airlinePromises = selectedAirlines.map(id => airlineService.getAirlineById(id));
      const airlines = await Promise.all(airlinePromises);

      // Filter out any undefined results (airlines that weren't found)
      setSelectedAirlineObjects(airlines.filter((airline): airline is Airline => airline !== undefined));
    };
    fetchSelectedAirlines();
  }, [selectedAirlines]);

  // Load initial popular airlines when dialog opens
  useEffect(() => {
    const loadInitialAirlines = async () => {
      if (dialogOpen && searchResults.length === 0) {
        try {
          const allAirlines = await airlineService.getAllAirlines();
          setSearchResults(allAirlines.slice(0, 8)); // Show first 8 airlines
        } catch (error) {
          console.error('Error loading initial airlines:', error);
        }
      }
    };
    loadInitialAirlines();
  }, [dialogOpen, searchResults.length]);
  return <Layout>
      <div className="py-10 layout-container">
        {/* Back Button */}
        <Button variant="ghost" size="sm" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        
        <h1 className="text-3xl font-bold mb-8">Luggage size checker</h1>
        
        <div className="space-y-6">
          {/* Luggage Input */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <LuggageInput onSubmit={handleLuggageSubmit} initialDimensions={luggageDimensions} />
          </div>
          
          {/* Selected Airlines */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Selected Airlines</h3>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                    <Plus className="h-3.5 w-3.5" /> Add Airline
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-xl">
                  <h3 className="text-lg font-semibold mb-4">Add Airline to Comparison</h3>
                  
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input type="text" placeholder="Search airlines" className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto pr-2 space-y-2">
                    {searchResults.map(airline => <div key={airline.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer flex justify-between items-center" onClick={() => addAirline(airline.id)}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                            <img src={airline.logo} alt={airline.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-medium">{airline.name}</p>
                            <p className="text-xs text-gray-500">{airline.code}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>)}
                    
                    {searchResults.length === 0 && searchTerm && <div className="text-center py-4">
                        <p className="text-gray-500">No airlines found matching "{searchTerm}"</p>
                      </div>}
                    
                    {searchResults.length === 0 && !searchTerm && <div className="text-center py-4">
                        <p className="text-gray-500">Search for airlines to add to your comparison</p>
                      </div>}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            {selectedAirlineObjects.length > 0 ? <div className="space-y-3">
                {selectedAirlineObjects.map(airline => <div key={airline.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                        <img src={airline.logo} alt={airline.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="font-medium text-sm">{airline.name}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeAirline(airline.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>)}
              </div> : <div className="text-center py-6 bg-gray-50 rounded-lg">
                <p className="text-gray-500 mb-3">No airlines selected for comparison.</p>
                <Button variant="outline" size="sm" onClick={() => setDialogOpen(true)}>
                  <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Airline
                </Button>
              </div>}
          </div>
          
          {/* Comparison Results */}
          {selectedAirlines.length > 0 ? <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <ComparisonView luggageDimensions={luggageDimensions} airlineIds={selectedAirlines} />
            </div> : <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-3">No airlines selected yet</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Click "Add Airline" above to select airlines and compare how your luggage measures up against their baggage policies.
              </p>
            </div>}
          
          {/* Airalo eSIM Promotional Section */}
          {selectedAirlines.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Travelling abroad? Save up to 90% on roaming - get an eSIM in 2 minutes with Airalo.</h3>
              <div dangerouslySetInnerHTML={{
                __html: `<script async src="https://tpemd.com/content?trs=448606&shmarker=664168.airalo-affiliate&locale=en&powered_by=true&color_button=%23f2685f&color_focused=%23f2685f&secondary=%23FFFFFF&dark=%2311100f&light=%23FFFFFF&special=%23FFFFFf&border_radius=5&plain=false&no_labels=true&promo_id=8588&campaign_id=541" charset="utf-8"></script>`
              }} />
            </div>
          )}
        </div>
      </div>
    </Layout>;
};
export default Compare;
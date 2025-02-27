
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { LuggageInput } from '@/components/LuggageInput';
import { ComparisonView } from '@/components/ComparisonView';
import { AirlineCard } from '@/components/AirlineCard';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import airlineService from '@/utils/airlineData';
import { Airline, LuggageDimensions } from '@/utils/types';

const Compare = () => {
  const navigate = useNavigate();
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [filteredAirlines, setFilteredAirlines] = useState<Airline[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedAirlines, setSelectedAirlines] = useState<Airline[]>([]);
  const [luggageDimensions, setLuggageDimensions] = useState<LuggageDimensions | null>(null);
  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Try to load luggage dimensions from session storage
        const storedDimensions = sessionStorage.getItem('luggage-dimensions');
        if (storedDimensions) {
          setLuggageDimensions(JSON.parse(storedDimensions));
        }
        
        // Load all airlines
        const allAirlines = await airlineService.getAllAirlines();
        setAirlines(allAirlines);
        setFilteredAirlines(allAirlines);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredAirlines(airlines);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = airlines.filter(airline => 
        airline.name.toLowerCase().includes(term) || 
        airline.code.toLowerCase().includes(term) ||
        (airline.country && airline.country.toLowerCase().includes(term))
      );
      setFilteredAirlines(filtered);
    }
  }, [searchTerm, airlines]);
  
  const toggleAirlineSelection = (airline: Airline) => {
    setSelectedAirlines(prevSelected => {
      // Check if airline is already selected
      const isSelected = prevSelected.some(a => a.id === airline.id);
      
      if (isSelected) {
        // Remove airline from selection
        return prevSelected.filter(a => a.id !== airline.id);
      } else {
        // Add airline to selection (max 3)
        if (prevSelected.length < 3) {
          return [...prevSelected, airline];
        }
        return prevSelected;
      }
    });
  };
  
  const handleLuggageSubmit = (dimensions: LuggageDimensions) => {
    sessionStorage.setItem('luggage-dimensions', JSON.stringify(dimensions));
    setLuggageDimensions(dimensions);
  };
  
  return (
    <Layout>
      <div className="py-10 layout-container">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        
        <h1 className="text-3xl font-bold mb-6">Compare Airlines</h1>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
          <h2 className="text-xl font-semibold mb-4">Enter Luggage Dimensions</h2>
          <LuggageInput 
            onSubmit={handleLuggageSubmit}
            initialDimensions={luggageDimensions || undefined}
          />
        </div>
        
        {luggageDimensions && selectedAirlines.length > 0 && (
          <div className="mb-8 animate-fade-in">
            <ComparisonView 
              luggageDimensions={luggageDimensions}
              airlineIds={selectedAirlines.map(airline => airline.id)}
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Selected Airlines */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Selected Airlines</h2>
              <p className="text-sm text-gray-500 mb-4">Select up to 3 airlines to compare</p>
              
              {selectedAirlines.length === 0 ? (
                <div className="py-8 text-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No airlines selected yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedAirlines.map(airline => (
                    <div 
                      key={airline.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={airline.logo} 
                          alt={airline.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=120&auto=format&fit=crop";
                          }}
                        />
                      </div>
                      <span className="flex-grow font-medium text-sm">{airline.name}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => toggleAirlineSelection(airline)}
                        className="h-8 w-8 p-0"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6 6 18"></path>
                          <path d="m6 6 12 12"></path>
                        </svg>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Airline Selection */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Choose Airlines to Compare</h2>
              
              {/* Search */}
              <div className="relative mb-6">
                <Input
                  type="text"
                  placeholder="Search airlines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
              
              {loading ? (
                <div className="flex justify-center p-12">
                  <div className="animate-spin h-10 w-10 border-4 border-coral border-t-transparent rounded-full"></div>
                </div>
              ) : filteredAirlines.length > 0 ? (
                <div className="space-y-3">
                  {filteredAirlines.map(airline => (
                    <div
                      key={airline.id}
                      className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => toggleAirlineSelection(airline)}
                    >
                      <div className="flex items-center gap-3 flex-grow">
                        <div className="flex-shrink-0">
                          <Checkbox 
                            id={`airline-${airline.id}`}
                            checked={selectedAirlines.some(a => a.id === airline.id)}
                            onCheckedChange={() => toggleAirlineSelection(airline)}
                            className="pointer-events-none"
                          />
                        </div>
                        <div className="w-8 h-8 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src={airline.logo} 
                            alt={airline.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=120&auto=format&fit=crop";
                            }}
                          />
                        </div>
                        <Label 
                          htmlFor={`airline-${airline.id}`}
                          className="font-medium cursor-pointer"
                        >
                          {airline.name}
                        </Label>
                      </div>
                      <div className="flex-shrink-0 text-sm text-gray-500">
                        {airline.code}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No airlines found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Compare;

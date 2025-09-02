import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Ruler, Package, Scale, Info, Plus, X, Search, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useUnit } from '@/contexts/UnitContext';
import airlineService from '@/utils/airlineData';
import { Airline } from '@/utils/types';

export const LuggageSizeChecker = () => {
  const { unitSystem } = useUnit();
  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState({
    width: 40,
    height: 55,  
    depth: 20,
    weight: 10
  });
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Airline[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAirlineObjects, setSelectedAirlineObjects] = useState<Airline[]>([]);

  const handleSliderChange = (field: string, value: number[]) => {
    setDimensions(prev => ({ ...prev, [field]: value[0] }));
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    setDimensions(prev => ({ ...prev, [field]: numValue }));
  };

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

  // Fetch selected airline objects
  useEffect(() => {
    const fetchSelectedAirlines = async () => {
      if (selectedAirlines.length === 0) {
        setSelectedAirlineObjects([]);
        return;
      }
      const airlinePromises = selectedAirlines.map(id => airlineService.getAirlineById(id));
      const airlines = await Promise.all(airlinePromises);
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

  const addAirline = (airlineId: string) => {
    if (!selectedAirlines.includes(airlineId)) {
      setSelectedAirlines([...selectedAirlines, airlineId]);
    }
    setDialogOpen(false);
  };

  const removeAirline = (airlineId: string) => {
    setSelectedAirlines(selectedAirlines.filter(id => id !== airlineId));
  };

  const checkBaggageSize = () => {
    // Store both dimensions and selected airlines in sessionStorage
    sessionStorage.setItem('luggage-dimensions', JSON.stringify(dimensions));
    sessionStorage.setItem('selected-airlines', JSON.stringify(selectedAirlines));
    
    // Navigate to compare page with results
    navigate('/compare');
  };

  const maxDimensions = {
    width: unitSystem === 'metric' ? 100 : 40,
    height: unitSystem === 'metric' ? 100 : 40, 
    depth: unitSystem === 'metric' ? 100 : 40,
    weight: unitSystem === 'metric' ? 50 : 110
  };

  return (
    <Card className="p-6 bg-white shadow-lg">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Enter Your Luggage Dimensions</h2>
          <div className="flex items-center gap-3">
            <Link 
              to="/measure-bag-dimensions" 
              className="text-sm text-teal-600 hover:text-teal-700 underline flex items-center gap-1"
            >
              <Info className="w-4 h-4" />
              How to measure?
            </Link>
            <Badge variant="outline" className="px-3 py-1">
              {unitSystem === 'metric' ? 'cm/kg' : 'in/lbs'}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Width Input */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Ruler className="h-4 w-4 text-teal-500" />
              <label className="font-medium text-gray-700">Width</label>
              <Info className="h-4 w-4 text-gray-400" />
            </div>
            <div className="space-y-2">
              <Slider
                value={[dimensions.width]}
                onValueChange={(value) => handleSliderChange('width', value)}
                max={maxDimensions.width}
                step={1}
                className="w-full"
              />
              <Input
                type="number"
                value={dimensions.width}
                onChange={(e) => handleInputChange('width', e.target.value)}
                className="text-center"
                min="0"
                max={maxDimensions.width}
              />
            </div>
          </div>

          {/* Height Input */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Ruler className="h-4 w-4 text-coral" />
              <label className="font-medium text-gray-700">Height</label>
              <Info className="h-4 w-4 text-gray-400" />
            </div>
            <div className="space-y-2">
              <Slider
                value={[dimensions.height]}
                onValueChange={(value) => handleSliderChange('height', value)}
                max={maxDimensions.height}
                step={1}
                className="w-full"
              />
              <Input
                type="number"
                value={dimensions.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                className="text-center"
                min="0"
                max={maxDimensions.height}
              />
            </div>
          </div>

          {/* Depth Input */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-purple-500" />
              <label className="font-medium text-gray-700">Depth</label>
              <Info className="h-4 w-4 text-gray-400" />
            </div>
            <div className="space-y-2">
              <Slider
                value={[dimensions.depth]}
                onValueChange={(value) => handleSliderChange('depth', value)}
                max={maxDimensions.depth}
                step={1}
                className="w-full"
              />
              <Input
                type="number"
                value={dimensions.depth}
                onChange={(e) => handleInputChange('depth', e.target.value)}
                className="text-center"
                min="0"
                max={maxDimensions.depth}
              />
            </div>
          </div>

          {/* Weight Input */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-amber-500" />
              <label className="font-medium text-gray-700">Weight</label>
              <Info className="h-4 w-4 text-gray-400" />
            </div>
            <div className="space-y-2">
              <Slider
                value={[dimensions.weight]}
                onValueChange={(value) => handleSliderChange('weight', value)}
                max={maxDimensions.weight}
                step={1}
                className="w-full"
              />
              <Input
                type="number"
                value={dimensions.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                className="text-center"
                min="0"
                max={maxDimensions.weight}
              />
            </div>
          </div>
        </div>

        {/* Visual Representation */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Visual Representation</h3>
          <div className="flex justify-center">
            <div className="relative">
              <div 
                className="bg-teal-200 border-2 border-teal-300 rounded-lg flex items-center justify-center relative"
                style={{
                  width: `${Math.max(100, dimensions.width * 2)}px`,
                  height: `${Math.max(100, dimensions.height * 2)}px`,
                }}
              >
                <div className="text-teal-700 font-medium text-center">
                  <div>{dimensions.width} {unitSystem === 'metric' ? 'cm' : 'in'} ×</div>
                  <div>{dimensions.height} {unitSystem === 'metric' ? 'cm' : 'in'}</div>
                </div>
              </div>
              <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 text-sm text-gray-600">
                {dimensions.depth} {unitSystem === 'metric' ? 'cm' : 'in'}
              </div>
            </div>
          </div>
        </div>

        {/* Airlines Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900">Select Airlines to Compare</h3>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">
                {selectedAirlines.length} airline{selectedAirlines.length !== 1 ? 's' : ''} selected
              </span>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                    <Plus className="h-3.5 w-3.5" /> Add Airline
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-xl">
                  <h3 className="text-lg font-semibold mb-4">Add Airline to Compare</h3>
                  
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input 
                      type="text" 
                      placeholder="Search airlines" 
                      className="pl-10" 
                      value={searchTerm} 
                      onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto pr-2 space-y-2">
                    {searchResults.map(airline => (
                      <div 
                        key={airline.id} 
                        className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer flex justify-between items-center" 
                        onClick={() => addAirline(airline.id)}
                      >
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
                      </div>
                    ))}
                    
                    {searchResults.length === 0 && searchTerm && (
                      <div className="text-center py-4">
                        <p className="text-gray-500">No airlines found matching "{searchTerm}"</p>
                      </div>
                    )}
                    
                    {searchResults.length === 0 && !searchTerm && (
                      <div className="text-center py-4">
                        <p className="text-gray-500">Search for airlines to add to your comparison</p>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            {selectedAirlineObjects.length > 0 ? (
              <div className="space-y-2">
                {selectedAirlineObjects.map(airline => (
                  <div key={airline.id} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gray-200 rounded-full overflow-hidden">
                        <img src={airline.logo} alt={airline.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-sm">{airline.name}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeAirline(airline.id)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500 mb-2">No airlines selected yet</p>
                <Button variant="outline" size="sm" onClick={() => setDialogOpen(true)}>
                  <Plus className="h-3.5 w-3.5 mr-1.5" /> Select Airlines
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Check Button */}
        <Button 
          onClick={checkBaggageSize}
          disabled={selectedAirlines.length === 0}
          className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 text-lg disabled:cursor-not-allowed"
        >
          {selectedAirlines.length === 0 ? 'Select Airlines First' : `Check ${selectedAirlines.length} Airline${selectedAirlines.length !== 1 ? 's' : ''}`}
        </Button>
      </div>
    </Card>
  );
};
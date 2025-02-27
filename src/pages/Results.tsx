
import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { AirlineSearch } from '@/components/AirlineSearch';
import { LuggageInput } from '@/components/LuggageInput';
import { Heart, ArrowLeft, ExternalLink, PlaneTakeoff, Luggage, Check, X, Weight, Info, Package, MapPin, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import airlineService from '@/utils/airlineData';
import { Airline, LuggageDimensions } from '@/utils/types';

const Results = () => {
  const { airlineId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get('search') || '';
  
  const [airline, setAirline] = useState<Airline | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [luggageDimensions, setLuggageDimensions] = useState<LuggageDimensions | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Try to load luggage dimensions from session storage
      try {
        const storedDimensions = sessionStorage.getItem('luggage-dimensions');
        if (storedDimensions) {
          setLuggageDimensions(JSON.parse(storedDimensions));
        }
      } catch (error) {
        console.error('Failed to load luggage dimensions:', error);
      }
      
      // If we have an airline ID, get the airline details
      if (airlineId) {
        try {
          const airlineDetails = await airlineService.getAirlineById(airlineId);
          if (airlineDetails) {
            setAirline(airlineDetails);
            setIsFavorite(airlineService.isFavorite(airlineId));
          }
        } catch (error) {
          console.error('Failed to load airline details:', error);
        }
      }
      
      setLoading(false);
    };
    
    loadData();
  }, [airlineId]);
  
  const toggleFavorite = () => {
    if (airline) {
      const newFavoriteStatus = airlineService.toggleFavorite(airline.id);
      setIsFavorite(newFavoriteStatus);
    }
  };
  
  const handleLuggageSubmit = (dimensions: LuggageDimensions) => {
    // Store dimensions and compare with current airline
    sessionStorage.setItem('luggage-dimensions', JSON.stringify(dimensions));
    setLuggageDimensions(dimensions);
  };
  
  // If we don't have an airline ID, show the search page
  if (!airlineId) {
    return (
      <Layout>
        <div className="py-10 layout-container">
          <h1 className="text-3xl font-bold mb-8">Airline Search</h1>
          <AirlineSearch initialSearch={searchQuery} />
        </div>
      </Layout>
    );
  }
  
  // Show loading state
  if (loading) {
    return (
      <Layout>
        <div className="py-10 layout-container">
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin h-10 w-10 border-4 border-coral border-t-transparent rounded-full"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  // If airline not found
  if (!airline) {
    return (
      <Layout>
        <div className="py-10 layout-container">
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">Airline Not Found</h2>
            <p className="text-gray-500 mb-6">The airline you're looking for doesn't seem to exist in our database.</p>
            <Button onClick={() => navigate('/results')}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Search
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Check if luggage fits
  const luggageFits = luggageDimensions && 
    luggageDimensions.width <= airline.carryOn.maxWidth &&
    luggageDimensions.height <= airline.carryOn.maxHeight &&
    luggageDimensions.depth <= airline.carryOn.maxDepth &&
    luggageDimensions.weight <= airline.carryOn.maxWeight;
  
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
        
        {/* Airline Header */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src={airline.logo} 
                  alt={airline.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=120&auto=format&fit=crop";
                  }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{airline.name}</h1>
                <div className="flex flex-wrap items-center gap-3 text-gray-500">
                  <span className="flex items-center gap-1">
                    <Plane className="h-4 w-4" />
                    {airline.code}
                  </span>
                  {airline.country && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {airline.country}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFavorite}
                className={isFavorite ? "text-coral" : ""}
              >
                <Heart className="h-4 w-4 mr-2" fill={isFavorite ? "currentColor" : "none"} />
                {isFavorite ? "Favorited" : "Add to Favorites"}
              </Button>
              
              <a href={airline.website} target="_blank" rel="noopener noreferrer">
                <Button variant="default" size="sm" className="bg-coral hover:bg-coral-dark">
                  Visit Website <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Luggage Input Side */}
          <div className="lg:col-span-1">
            <LuggageInput 
              onSubmit={handleLuggageSubmit} 
              initialDimensions={luggageDimensions || undefined}
            />
            
            {/* Comparison Result (if dimensions provided) */}
            {luggageDimensions && (
              <div className={`mt-6 p-5 rounded-xl border ${
                luggageFits 
                  ? "bg-green-50 border-green-100" 
                  : "bg-red-50 border-red-100"
              } animate-fade-in`}>
                <div className="flex items-center gap-3 mb-3">
                  {luggageFits ? (
                    <>
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-green-800">Your luggage fits!</h3>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <X className="h-5 w-5 text-red-600" />
                      </div>
                      <h3 className="font-semibold text-red-800">Exceeds limits</h3>
                    </>
                  )}
                </div>
                
                <p className={`text-sm ${luggageFits ? "text-green-700" : "text-red-700"} mb-3`}>
                  {luggageFits 
                    ? "Your luggage meets the carry-on requirements for this airline."
                    : "Your luggage does not meet the carry-on requirements for this airline."}
                </p>
                
                {!luggageFits && (
                  <div className="space-y-2 text-sm text-red-700">
                    {luggageDimensions.width > airline.carryOn.maxWidth && (
                      <p>Width exceeds by {luggageDimensions.width - airline.carryOn.maxWidth}cm</p>
                    )}
                    {luggageDimensions.height > airline.carryOn.maxHeight && (
                      <p>Height exceeds by {luggageDimensions.height - airline.carryOn.maxHeight}cm</p>
                    )}
                    {luggageDimensions.depth > airline.carryOn.maxDepth && (
                      <p>Depth exceeds by {luggageDimensions.depth - airline.carryOn.maxDepth}cm</p>
                    )}
                    {luggageDimensions.weight > airline.carryOn.maxWeight && (
                      <p>Weight exceeds by {luggageDimensions.weight - airline.carryOn.maxWeight}kg</p>
                    )}
                  </div>
                )}
                
                {!luggageFits && (
                  <div className="mt-4">
                    <a href={airline.website} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="w-full bg-coral hover:bg-coral-dark text-sm">
                        Check Baggage Options
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Airline Details Side */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="carry-on" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="carry-on" className="flex items-center gap-2">
                  <PlaneTakeoff className="h-4 w-4" /> Carry-On
                </TabsTrigger>
                <TabsTrigger value="checked" className="flex items-center gap-2">
                  <Luggage className="h-4 w-4" /> Checked Baggage
                </TabsTrigger>
              </TabsList>
              
              {/* Carry-On Tab */}
              <TabsContent value="carry-on" className="animate-fade-in">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold mb-4">Carry-On Baggage Policy</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="h-4 w-4 text-seafoam" />
                        <h3 className="font-medium text-sm">Maximum Dimensions</h3>
                      </div>
                      <p className="text-xl font-semibold">
                        {airline.carryOn.maxWidth} × {airline.carryOn.maxHeight} × {airline.carryOn.maxDepth} cm
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Weight className="h-4 w-4 text-coral" />
                        <h3 className="font-medium text-sm">Maximum Weight</h3>
                      </div>
                      <p className="text-xl font-semibold">{airline.carryOn.maxWeight} kg</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="h-4 w-4 text-lavender" />
                        <h3 className="font-medium text-sm">Additional Info</h3>
                      </div>
                      <p className="text-sm">{airline.carryOn.notes || "No additional information provided."}</p>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Popular Routes</h3>
                    <div className="flex flex-wrap gap-2">
                      {airline.popularRoutes.map((route, index) => (
                        <div key={index} className="px-3 py-1 bg-gray-50 rounded-full text-sm">
                          {route}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-sunshine/10 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Travel Tips</h3>
                    <ul className="text-sm space-y-2 list-disc list-inside text-gray-700">
                      <li>Measure your bag before traveling to ensure it meets size requirements.</li>
                      <li>Remember that some items may be restricted in carry-on luggage.</li>
                      <li>Consider checking in online to save time at the airport.</li>
                      <li>Pack liquids in containers of 100ml or less in a clear plastic bag.</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              {/* Checked Baggage Tab */}
              <TabsContent value="checked" className="animate-fade-in">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold mb-4">Checked Baggage Policy</h2>
                  
                  {airline.checkedBaggage.length > 0 ? (
                    <div className="space-y-6">
                      {airline.checkedBaggage.map((bag, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-medium mb-3">Option {index + 1}</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-500 mb-1">Maximum Dimensions</p>
                              <p className="font-semibold">
                                {bag.maxWidth} × {bag.maxHeight} × {bag.maxDepth} cm
                              </p>
                            </div>
                            
                            <div>
                              <p className="text-sm text-gray-500 mb-1">Maximum Weight</p>
                              <p className="font-semibold">{bag.maxWeight} kg</p>
                            </div>
                          </div>
                          
                          {bag.price && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-500 mb-1">Price</p>
                              <p className="font-semibold text-coral">{bag.price}</p>
                            </div>
                          )}
                          
                          {bag.notes && (
                            <div className="mt-3 text-sm text-gray-600">
                              <p>{bag.notes}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">Checked baggage information not available.</p>
                    </div>
                  )}
                  
                  <div className="mt-6 p-4 bg-seafoam/10 rounded-lg">
                    <h3 className="font-medium mb-2">Important Notes</h3>
                    <ul className="text-sm space-y-2 list-disc list-inside text-gray-700">
                      <li>Baggage fees and policies may vary by route and class of travel.</li>
                      <li>Special items may require additional fees or handling.</li>
                      <li>Pre-booking checked baggage online is usually cheaper than at the airport.</li>
                      <li>Always check the airline's website for the most up-to-date information.</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Results;

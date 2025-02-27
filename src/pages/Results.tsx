
import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { AirlineSearch } from '@/components/AirlineSearch';
import { LuggageInput } from '@/components/LuggageInput';
import { AirlineHeader } from '@/components/AirlineHeader';
import { LuggageComparisonResult } from '@/components/LuggageComparisonResult';
import { AirlineDetails } from '@/components/AirlineDetails';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
        <AirlineHeader 
          airline={airline} 
          isFavorite={isFavorite} 
          onToggleFavorite={toggleFavorite} 
        />
        
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
              <LuggageComparisonResult 
                airline={airline} 
                luggageDimensions={luggageDimensions} 
              />
            )}
          </div>
          
          {/* Airline Details Side */}
          <div className="lg:col-span-2">
            <AirlineDetails airline={airline} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Results;

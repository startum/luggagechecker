
import { Hero } from '@/components/Hero';
import { Layout } from '@/components/Layout';
import { AirlineSearch } from '@/components/AirlineSearch';
import { LuggageInput } from '@/components/LuggageInput';
import { useNavigate } from 'react-router-dom';
import { LuggageDimensions } from '@/utils/types';
import { FavoritesSection } from '@/components/FavoritesSection';
import airlineService from '@/utils/airlineData';
import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [hasFavorites, setHasFavorites] = useState(false);
  const [currentDimensions, setCurrentDimensions] = useState<LuggageDimensions>({
    width: 40,
    height: 55,
    depth: 20,
    weight: 10
  });
  const [filterCriteria, setFilterCriteria] = useState({
    search: '',
    restrictive: false
  });
  
  useEffect(() => {
    // Check if user has any favorites
    const checkFavorites = async () => {
      const favorites = await airlineService.getFavorites();
      setHasFavorites(favorites.length > 0);
    };
    
    checkFavorites();
    
    // Try to load luggage dimensions from session storage
    try {
      const storedDimensions = sessionStorage.getItem('luggage-dimensions');
      if (storedDimensions) {
        setCurrentDimensions(JSON.parse(storedDimensions));
      }
    } catch (error) {
      console.error('Failed to load luggage dimensions:', error);
    }
  }, []);
  
  const handleLuggageSubmit = (dimensions: LuggageDimensions) => {
    // Store dimensions in session storage and update state
    sessionStorage.setItem('luggage-dimensions', JSON.stringify(dimensions));
    setCurrentDimensions(dimensions);
    
    // Navigate to comparison page
    navigate('/compare');
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <Hero />
      
      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Luggage Input Side */}
            <div className="lg:col-span-1">
              <LuggageInput 
                onSubmit={handleLuggageSubmit}
                initialDimensions={currentDimensions}
              />
            </div>
            
            {/* Search Results Side */}
            <div className="lg:col-span-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h2 className="text-3xl font-semibold">Popular Airlines</h2>
                <div className="text-base text-gray-500">
                  Showing airlines that fit your luggage: 
                  {currentDimensions.width} × {currentDimensions.height} × {currentDimensions.depth} cm, 
                  {currentDimensions.weight} kg
                </div>
              </div>
              <AirlineSearch 
                initialSearch={filterCriteria.search}
                filterByDimensions={true}
                luggageDimensions={currentDimensions}
                limit={6}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Favorites Section (if the user has favorites) */}
      {hasFavorites && (
        <section className="py-20 bg-gray-50">
          <div className="layout-container">
            <FavoritesSection />
          </div>
        </section>
      )}
      
      {/* Info Section with Image */}
      <section className="py-20">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1499591934245-40b55745b905?q=80&w=1470&auto=format&fit=crop" 
                alt="Traveler with luggage" 
                className="rounded-xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Check Before You Fly?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Airlines are constantly changing their baggage policies, and exceeding size or weight limits can lead to unexpected fees at the airport. Stay ahead by checking your luggage against the latest airline requirements.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">100+ Airlines Covered</h3>
                    <p className="text-gray-600">
                      Our database includes comprehensive information from all major airlines worldwide.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Real-Time Updates</h3>
                    <p className="text-gray-600">
                      We keep our baggage policy information current with the latest airline changes.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Easy Comparisons</h3>
                    <p className="text-gray-600">
                      Compare your luggage across multiple airlines with our intuitive tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Travel Confidently</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1470&auto=format&fit=crop" 
                  alt="Save Money" 
                  className="w-full h-48 object-cover rounded-lg mb-5"
                />
                <h3 className="text-xl font-semibold mb-3">Save Money</h3>
                <p className="text-gray-600">
                  Avoid expensive last-minute baggage fees by ensuring your luggage meets the airline's requirements before you get to the airport.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1435527173128-983b87201f4d?q=80&w=1470&auto=format&fit=crop" 
                  alt="Save Time" 
                  className="w-full h-48 object-cover rounded-lg mb-5"
                />
                <h3 className="text-xl font-semibold mb-3">Save Time</h3>
                <p className="text-gray-600">
                  Skip the stress of repacking at check-in by knowing exactly what size and weight restrictions apply to your journey.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1470&auto=format&fit=crop" 
                  alt="Travel Confidently" 
                  className="w-full h-48 object-cover rounded-lg mb-5"
                />
                <h3 className="text-xl font-semibold mb-3">Travel Confidently</h3>
                <p className="text-gray-600">
                  Enjoy peace of mind knowing your baggage will be accepted without issues, letting you focus on your travel experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

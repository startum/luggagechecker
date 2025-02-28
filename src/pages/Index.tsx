
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
  const [searchTerm, setSearchTerm] = useState('');
  
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
      <section className="py-10 sm:py-15 md:py-20 bg-white">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {/* Luggage Input Side */}
            <div className="lg:col-span-1">
              <LuggageInput 
                onSubmit={handleLuggageSubmit}
                initialDimensions={currentDimensions}
              />
            </div>
            
            {/* Search Results Side */}
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-semibold">Popular Airlines</h2>
                <div className="text-sm sm:text-base text-gray-500">
                  <span className="hidden sm:inline">Showing airlines that fit your luggage: </span>
                  <span className="sm:hidden">Luggage size: </span>
                  {currentDimensions.width} × {currentDimensions.height} × {currentDimensions.depth} cm, 
                  {currentDimensions.weight} kg
                </div>
              </div>
              <AirlineSearch 
                initialSearch={searchTerm}
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
        <section className="py-10 sm:py-15 md:py-20 bg-gray-50">
          <div className="layout-container">
            <FavoritesSection />
          </div>
        </section>
      )}
      
      {/* Info Section with Image */}
      <section className="py-10 sm:py-15 md:py-20">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
            <div>
              <img 
                src="/lovable-uploads/a9eba0a3-7cf7-4bca-bf98-513603e6f8bf.png" 
                alt="Airport terminal view with airplane and seating area" 
                className="rounded-xl shadow-lg w-full object-cover h-full"
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Why Check Before You Fly?</h2>
              <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8">
                Airlines are constantly changing their baggage policies, and exceeding size or weight limits can lead to unexpected fees at the airport. Stay ahead by checking your luggage against the latest airline requirements.
              </p>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">100+ Airlines Covered</h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Our database includes comprehensive information from all major airlines worldwide.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Real-Time Updates</h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      We keep our baggage policy information current with the latest airline changes.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Easy Comparisons</h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Compare your luggage across multiple airlines with our intuitive tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Travel Confidently</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-left">
              <div className="bg-white p-5 sm:p-8 rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.1)] border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <img 
                  src="/lovable-uploads/630eedf4-e53d-4ef4-9417-a537b4fdf05e.png" 
                  alt="Person sitting with luggage at airport" 
                  className="w-full h-36 sm:h-48 object-cover rounded-lg mb-4 sm:mb-5"
                />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Save Money</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Avoid expensive last-minute baggage fees by ensuring your luggage meets the airline's requirements before you get to the airport.
                </p>
              </div>
              
              <div className="bg-white p-5 sm:p-8 rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.1)] border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <img 
                  src="/lovable-uploads/b829ab14-a7e8-4e32-9eb6-b2607ad53970.png" 
                  alt="Airplanes on runway" 
                  className="w-full h-36 sm:h-48 object-cover rounded-lg mb-4 sm:mb-5"
                />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Save Time</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Skip the stress of repacking at check-in by knowing exactly what size and weight restrictions apply to your journey.
                </p>
              </div>
              
              <div className="bg-white p-5 sm:p-8 rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.1)] border border-gray-100 hover:shadow-lg transition-shadow duration-300 sm:col-span-2 md:col-span-1 sm:max-w-md md:max-w-full mx-auto sm:mx-auto md:mx-0 w-full">
                <img 
                  src="/lovable-uploads/784f93a6-8163-4976-a298-e7d87944eb53.png" 
                  alt="Airplane cabin interior with seats" 
                  className="w-full h-36 sm:h-48 object-cover rounded-lg mb-4 sm:mb-5"
                />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Travel Confidently</h3>
                <p className="text-sm sm:text-base text-gray-600">
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

import { Hero } from '@/components/Hero';
import { Layout } from '@/components/Layout';
import { AirlineSearch } from '@/components/AirlineSearch';
import { LuggageInput } from '@/components/LuggageInput';
import { useNavigate } from 'react-router-dom';
import { LuggageDimensions } from '@/utils/types';
import { FavoritesSection } from '@/components/FavoritesSection';
import airlineService from '@/utils/airlineData';
import { useEffect, useState } from 'react';
import MeasurementGuide from '@/components/MeasurementGuide';
import InfoSection from '@/components/InfoSection';
import TravelConfidentlySection from '@/components/TravelConfidentlySection';
import BlogSection from '@/components/BlogSection';
import FAQSection from '@/components/FAQSection';
import ScoutBadgeSection from '@/components/ScoutBadgeSection';
import TransferSection from '@/components/TransferSection';

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
      
      {/* How to Measure Your Luggage Section */}
      <MeasurementGuide />
      
      {/* Airport Transfer Section */}
      <TransferSection />
      
      {/* Info Section with Image */}
      <InfoSection />
      
      <TravelConfidentlySection />
      
      {/* Tips & Tricks Blog Section */}
      <BlogSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Scout Forge Badge Section */}
      <ScoutBadgeSection />
    </Layout>
  );
};

export default Index;

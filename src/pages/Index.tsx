
import { Hero } from '@/components/Hero';
import { Layout } from '@/components/Layout';
import { AirlineSearch } from '@/components/AirlineSearch';
import { LuggageInput } from '@/components/LuggageInput';
import { useNavigate } from 'react-router-dom';
import { LuggageDimensions } from '@/utils/types';
import { FavoritesSection } from '@/components/FavoritesSection';
import airlineService from '@/utils/airlineData';
import { useEffect, useState } from 'react';

const Index = () => {
  const navigate = useNavigate();
  const [hasFavorites, setHasFavorites] = useState(false);
  
  useEffect(() => {
    // Check if user has any favorites
    const favorites = airlineService.getFavorites();
    setHasFavorites(favorites.length > 0);
  }, []);
  
  const handleLuggageSubmit = (dimensions: LuggageDimensions) => {
    // Store dimensions in session storage for comparison page
    sessionStorage.setItem('luggage-dimensions', JSON.stringify(dimensions));
    // Navigate to comparison page
    navigate('/compare');
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <Hero />
      
      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Luggage Input Side */}
            <div className="lg:col-span-1">
              <LuggageInput onSubmit={handleLuggageSubmit} />
            </div>
            
            {/* Search Results Side */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold mb-6">Popular Airlines</h2>
              <AirlineSearch />
            </div>
          </div>
        </div>
      </section>
      
      {/* Favorites Section (if the user has favorites) */}
      {hasFavorites && (
        <section className="py-16 bg-gray-50">
          <div className="layout-container">
            <FavoritesSection />
          </div>
        </section>
      )}
      
      {/* Info Section */}
      <section className="py-16">
        <div className="layout-container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Why Check Before You Fly?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Airlines are constantly changing their baggage policies, and exceeding size or weight limits can lead to unexpected fees at the airport. Stay ahead by checking your luggage against the latest airline requirements.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div>
                <h3 className="text-xl font-semibold mb-3">Save Money</h3>
                <p className="text-gray-600">
                  Avoid expensive last-minute baggage fees by ensuring your luggage meets the airline's requirements before you get to the airport.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Save Time</h3>
                <p className="text-gray-600">
                  Skip the stress of repacking at check-in by knowing exactly what size and weight restrictions apply to your journey.
                </p>
              </div>
              
              <div>
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

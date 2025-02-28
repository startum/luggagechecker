
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { AirlineSearch } from '@/components/AirlineSearch';
import { AirlineHeader } from '@/components/AirlineHeader';
import { FavoritesSection } from '@/components/FavoritesSection';
import airlineService from '@/utils/airlineData';

const Results = () => {
  const { airlineId } = useParams();
  const [airline, setAirline] = useState(null);
  const [loading, setLoading] = useState(!!airlineId);
  
  const location = useLocation();
  console.log("📍 Current location:", location.pathname);
  
  // Get search term from URL if available
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || '';
  
  // Check if we're on the favorites route
  const isFavoritesRoute = location.pathname === '/favorites';
  console.log("🌟 Is favorites route:", isFavoritesRoute);
  
  useEffect(() => {
    const loadAirline = async () => {
      if (airlineId) {
        console.log("🔍 Loading airline details for ID:", airlineId);
        setLoading(true);
        try {
          const airlineData = await airlineService.getAirlineById(airlineId);
          console.log("✅ Loaded airline details:", airlineData?.name);
          setAirline(airlineData);
        } catch (error) {
          console.error('❌ Error loading airline details:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadAirline();
  }, [airlineId]);
  
  return (
    <Layout>
      <div className="py-8 layout-container">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin h-10 w-10 border-4 border-coral border-t-transparent rounded-full"></div>
          </div>
        ) : airlineId && airline ? (
          <AirlineHeader airline={airline} />
        ) : isFavoritesRoute ? (
          <>
            <h1 className="text-3xl font-bold mb-6">Your Favorite Airlines</h1>
            <p className="text-gray-600 mb-8">
              Here are the airlines you've saved for quick access. You can add or remove airlines from your favorites at any time.
            </p>
            <FavoritesSection />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6">Find Your Airline</h1>
            <p className="text-gray-600 mb-8">
              Browse or search for airlines to view their baggage policies, including carry-on and checked baggage dimensions and weight limits.
            </p>
            <AirlineSearch initialSearch={initialSearch} />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Results;

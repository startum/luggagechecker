import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { AirlineSearch } from '@/components/AirlineSearch';
import { AirlineHeader } from '@/components/AirlineHeader';
import { FavoritesSection } from '@/components/FavoritesSection';
import airlineService from '@/utils/airlineData';
const Results = () => {
  const {
    airlineId
  } = useParams();
  const [airline, setAirline] = useState(null);
  const [loading, setLoading] = useState(!!airlineId);
  const [isFavorite, setIsFavorite] = useState(false);
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

          // Check if this airline is in favorites
          if (airlineData) {
            const favoriteStatus = airlineService.isFavorite(airlineData.id);
            setIsFavorite(favoriteStatus);
            console.log("🌟 Is airline favorite:", favoriteStatus);
          }
        } catch (error) {
          console.error('❌ Error loading airline details:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadAirline();
  }, [airlineId]);
  const handleToggleFavorite = () => {
    if (airline) {
      const newFavoriteStatus = airlineService.toggleFavorite(airline.id);
      setIsFavorite(newFavoriteStatus);
      console.log("🔄 Toggled favorite status to:", newFavoriteStatus);
    }
  };
  return <Layout>
      {/* Dynamic SEO Meta Tags */}
      {airlineId && airline && (
        <Helmet>
          <title>{airline.name} Bag Size Checker – Cabin and Checked Luggage Dimensions</title>
          <meta 
            name="description" 
            content={`Check if your bag fits ${airline.name}'s baggage rules instantly. Enter your dimensions and compare with official airline limits.`} 
          />
          <link rel="canonical" href={`https://sizemybag.com/results/${airline.id}`} />
          <meta property="og:title" content={`${airline.name} Bag Size Checker – Cabin and Checked Luggage Dimensions`} />
          <meta 
            property="og:description" 
            content={`Check if your bag fits ${airline.name}'s baggage rules instantly. Enter your dimensions and compare with official airline limits.`} 
          />
          <meta property="og:url" content={`https://sizemybag.com/results/${airline.id}`} />
        </Helmet>
      )}
      
      {isFavoritesRoute && (
        <Helmet>
          <title>Your Favorite Airlines - Quick Access | SizeMyBag</title>
          <meta 
            name="description" 
            content="Access your saved favorite airlines for quick luggage size checking. Compare baggage policies and dimensions." 
          />
          <link rel="canonical" href="https://sizemybag.com/favorites" />
          <meta property="og:title" content="Your Favorite Airlines - Quick Access | SizeMyBag" />
          <meta 
            property="og:description" 
            content="Access your saved favorite airlines for quick luggage size checking. Compare baggage policies and dimensions." 
          />
          <meta property="og:url" content="https://sizemybag.com/favorites" />
        </Helmet>
      )}
      
      {!airlineId && !isFavoritesRoute && (
        <Helmet>
          <title>Find Your Airline - Luggage Size Checker | SizeMyBag</title>
          <meta 
            name="description" 
            content="Browse or search for airlines to view their luggage sizes, including carry-on and checked baggage dimensions, plus weight limits." 
          />
          <link rel="canonical" href="https://sizemybag.com/results" />
          <meta property="og:title" content="Find Your Airline - Luggage Size Checker | SizeMyBag" />
          <meta 
            property="og:description" 
            content="Browse or search for airlines to view their luggage sizes, including carry-on and checked baggage dimensions, plus weight limits." 
          />
          <meta property="og:url" content="https://sizemybag.com/results" />
        </Helmet>
      )}

      <div className="py-8 layout-container">
        {loading ? <div className="flex justify-center items-center py-20">
            <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
          </div> : airlineId && airline ? <>
            {/* Dynamic intro text */}
            <div className="mb-8 text-center">
              <p className="text-lg text-muted-foreground leading-relaxed">
                This page lets you check your luggage against {airline.name} cabin and checked bag size rules. 
                Enter your bag dimensions below to instantly see if it fits within {airline.name} baggage allowances and avoid extra fees at the airport.
              </p>
            </div>
            <AirlineHeader airline={airline} isFavorite={isFavorite} onToggleFavorite={handleToggleFavorite} />
          </> : isFavoritesRoute ? <>
            <h1 className="text-3xl font-bold mb-6">Your Favorite Airlines</h1>
            <p className="text-gray-600 mb-8">
              Here are the airlines you've saved for quick access. You can add or remove airlines from your favorites at any time.
            </p>
            <FavoritesSection />
          </> : <>
            <h1 className="text-3xl font-bold mb-6">Find Your Airline</h1>
            <p className="text-gray-600 mb-8">Browse or search for airlines to view their luggage sizes, including carry-on and checked baggage dimensions, plus weight limits.</p>
            <AirlineSearch initialSearch={initialSearch} limit={40} />
          </>}
      </div>
    </Layout>;
};
export default Results;
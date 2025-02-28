
import { useState, useEffect } from 'react';
import { AirlineCard } from './AirlineCard';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import airlineService from '@/utils/airlineData';
import { Airline } from '@/utils/types';

export const FavoritesSection = () => {
  const [favorites, setFavorites] = useState<Airline[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Function to refresh favorites
  const refreshFavorites = async () => {
    console.log("🔍 Refreshing favorites");
    setLoading(true);
    try {
      const favoritedAirlines = await airlineService.getFavorites();
      console.log("📋 Favorites loaded:", favoritedAirlines.length, "airlines");
      console.log("🔢 Favorite IDs:", favoritedAirlines.map(a => a.id));
      setFavorites(favoritedAirlines);
    } catch (error) {
      console.error('❌ Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    console.log("🔄 FavoritesSection mounted");
    refreshFavorites();
    
    // Listen for favorites changes and update
    const handleFavoritesChanged = () => {
      console.log("🔔 favoritesChanged event received");
      refreshFavorites();
    };
    
    window.addEventListener('favoritesChanged', handleFavoritesChanged);
    console.log("👂 Event listener for favoritesChanged added");
    
    // Cleanup
    return () => {
      console.log("♻️ Cleaning up FavoritesSection");
      window.removeEventListener('favoritesChanged', handleFavoritesChanged);
    };
  }, []);
  
  console.log("🖼️ Rendering FavoritesSection. Loading:", loading, "Favorites count:", favorites.length);
  
  if (loading) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100 animate-fade-in">
        <div className="animate-spin h-10 w-10 border-4 border-coral border-t-transparent rounded-full mx-auto"></div>
      </div>
    );
  }
  
  if (favorites.length === 0) {
    console.log("😢 No favorites to display");
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100 animate-fade-in">
        <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Favorites Yet</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Add airlines to your favorites to quickly access them later.
        </p>
        <Button onClick={() => navigate('/results')}>
          Browse Airlines
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 gap-4">
        {favorites.map(airline => (
          <AirlineCard 
            key={airline.id} 
            airline={airline} 
            compact={true}
          />
        ))}
      </div>
      
      <div className="text-center">
        <Button variant="outline" onClick={() => navigate('/results')} className="w-full">
          Browse All Airlines
        </Button>
      </div>
    </div>
  );
};

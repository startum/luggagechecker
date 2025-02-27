
import { useState, useEffect } from 'react';
import { Heart, Luggage } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AirlineCard } from './AirlineCard';
import airlineService from '@/utils/airlineData';
import { Airline } from '@/utils/types';
import { useNavigate } from 'react-router-dom';

export const FavoritesSection = () => {
  const [favorites, setFavorites] = useState<Airline[]>([]);
  const navigate = useNavigate();
  
  // Function to refresh favorites
  const refreshFavorites = () => {
    const favoritedAirlines = airlineService.getFavorites();
    setFavorites(favoritedAirlines);
  };
  
  useEffect(() => {
    // Get favorites from service
    refreshFavorites();
    
    // Listen for storage events to update favorites when they change
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'airline-favorites') {
        refreshFavorites();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for when favorites change within the app
    const handleFavoritesChange = () => {
      refreshFavorites();
    };
    
    window.addEventListener('favoritesChanged', handleFavoritesChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favoritesChanged', handleFavoritesChange);
    };
  }, []);
  
  if (favorites.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100 animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
          <Heart className="h-6 w-6 text-gray-300" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Favorite Airlines Yet</h3>
        <p className="text-gray-500 mb-4 max-w-sm mx-auto">
          Add airlines to your favorites for quick access to baggage policies.
        </p>
        <Button variant="outline" onClick={() => navigate('/results')}>
          <Luggage className="mr-2 h-4 w-4" /> Explore Airlines
        </Button>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Your Favorite Airlines</h2>
        <Button variant="outline" size="sm" onClick={() => navigate('/favorites')}>
          View All Favorites
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((airline, index) => (
          <AirlineCard 
            key={airline.id} 
            airline={airline} 
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};


import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AirlineCard } from './AirlineCard';
import airlineService from '@/utils/airlineData';
import { Airline } from '@/utils/types';

export const FavoritesSection = () => {
  const [favorites, setFavorites] = useState<Airline[]>([]);
  
  useEffect(() => {
    // Get favorites from service
    const favoritedAirlines = airlineService.getFavorites();
    setFavorites(favoritedAirlines);
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
        <Button variant="outline">Explore Airlines</Button>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Your Favorite Airlines</h2>
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

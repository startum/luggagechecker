
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, MapPin, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Airline } from '@/utils/types';
import airlineService from '@/utils/airlineData';
import { useState } from 'react';

interface AirlineCardProps {
  airline: Airline;
  delay?: number;
  compact?: boolean;
}

export const AirlineCard = ({ airline, delay = 0, compact = false }: AirlineCardProps) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(airlineService.isFavorite(airline.id));
  
  const handleViewDetails = () => {
    navigate(`/results/${airline.id}`);
  };
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavoriteStatus = airlineService.toggleFavorite(airline.id);
    setIsFavorite(newFavoriteStatus);
  };
  
  if (compact) {
    return (
      <div 
        className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between"
        onClick={handleViewDetails}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
            <img 
              src={airline.logo} 
              alt={airline.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=120&auto=format&fit=crop";
              }}
            />
          </div>
          <div>
            <h3 className="font-medium text-base">{airline.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Plane className="h-3 w-3" />
                {airline.code}
              </span>
              {airline.country && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {airline.country}
                </span>
              )}
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleFavorite} className={isFavorite ? "text-coral" : ""}>
          <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
        </Button>
      </div>
    );
  }
  
  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden animate-fade-in cursor-pointer"
      style={{ animationDelay: `${delay}s` }}
      onClick={handleViewDetails}
    >
      <div className="relative">
        <div className="w-full h-16 bg-gradient-to-r from-teal/20 to-navy/10"></div>
        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="icon" onClick={toggleFavorite} className={isFavorite ? "text-coral" : ""}>
            <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4 flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-100 rounded-full overflow-hidden flex-shrink-0 border border-gray-200 p-1">
            <img 
              src={airline.logo} 
              alt={airline.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=120&auto=format&fit=crop";
              }}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{airline.name}</h3>
            <div className="flex flex-wrap items-center gap-2 text-base text-gray-500">
              <span className="flex items-center gap-1">
                <Plane className="h-4 w-4" />
                {airline.code}
              </span>
              {airline.country && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {airline.country}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Carry-on max size</p>
            <p className="text-base font-medium">
              {airline.carryOn.maxWidth} × {airline.carryOn.maxHeight} × {airline.carryOn.maxDepth} cm
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Carry-on max weight</p>
            <p className="text-base font-medium">{airline.carryOn.maxWeight} kg</p>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" className="w-full group text-base">
          View Details <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

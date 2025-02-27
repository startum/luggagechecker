
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
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
        className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between"
        onClick={handleViewDetails}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
            <img 
              src={airline.logo} 
              alt={airline.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-sm">{airline.name}</h3>
            <p className="text-xs text-gray-500">{airline.code}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleFavorite} className={isFavorite ? "text-coral" : ""}>
          <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
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
        <div className="w-full h-12 bg-seafoam/10"></div>
        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="icon" onClick={toggleFavorite} className={isFavorite ? "text-coral" : ""}>
            <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
            <img 
              src={airline.logo} 
              alt={airline.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold">{airline.name}</h3>
            <p className="text-sm text-gray-500">{airline.code}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Carry-on max size</p>
            <p className="text-sm font-medium">
              {airline.carryOn.maxWidth} × {airline.carryOn.maxHeight} × {airline.carryOn.maxDepth} cm
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Carry-on max weight</p>
            <p className="text-sm font-medium">{airline.carryOn.maxWeight} kg</p>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" className="w-full group">
          View Details <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

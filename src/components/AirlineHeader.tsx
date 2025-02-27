
import { Heart, ExternalLink, MapPin, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Airline } from '@/utils/types';

interface AirlineHeaderProps {
  airline: Airline;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const AirlineHeader = ({ airline, isFavorite, onToggleFavorite }: AirlineHeaderProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
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
            <h1 className="text-2xl font-bold">{airline.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-gray-500">
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
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFavorite}
            className={isFavorite ? "text-coral" : ""}
          >
            <Heart className="h-4 w-4 mr-2" fill={isFavorite ? "currentColor" : "none"} />
            {isFavorite ? "Favorited" : "Add to Favorites"}
          </Button>
          
          <a href={airline.website} target="_blank" rel="noopener noreferrer">
            <Button variant="default" size="sm" className="bg-coral hover:bg-coral-dark">
              Visit Website <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

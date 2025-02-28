
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
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
            <img 
              src={airline.logo} 
              alt={airline.name}
              className="max-w-full max-h-full object-contain"
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
            className={isFavorite ? "text-purple-500" : ""}
          >
            <Heart className="h-4 w-4 mr-2" fill={isFavorite ? "currentColor" : "none"} />
            {isFavorite ? "Favorited" : "Add to Favorites"}
          </Button>
          
          <a href={airline.website} target="_blank" rel="noopener noreferrer">
            <Button variant="default" size="sm">
              Visit Website <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

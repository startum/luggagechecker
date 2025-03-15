
import { Heart, ExternalLink, MapPin, Plane, Package, Luggage, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Airline } from '@/utils/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckedBaggageDetails } from './CheckedBaggageDetails';
import { useUnit } from '@/contexts/UnitContext';

interface AirlineHeaderProps {
  airline: Airline;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const AirlineHeader = ({ airline, isFavorite, onToggleFavorite }: AirlineHeaderProps) => {
  const { formatValue } = useUnit();
  
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
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
      
      {/* Luggage Policy Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Tabs defaultValue="carry-on" className="w-full">
          <TabsList className="w-full border-b grid grid-cols-2">
            <TabsTrigger value="carry-on" className="rounded-none py-3">
              <Package className="h-4 w-4 mr-2" />
              Carry-on Baggage
            </TabsTrigger>
            <TabsTrigger value="checked" className="rounded-none py-3">
              <Luggage className="h-4 w-4 mr-2" />
              Checked Baggage
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="carry-on" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Carry-on Dimensions</h3>
                <div className="bg-gray-50 p-5 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-500">Max Width:</span>
                    <span className="font-bold">{formatValue(airline.carryOn.maxWidth, 'length')}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-500">Max Height:</span>
                    <span className="font-bold">{formatValue(airline.carryOn.maxHeight, 'length')}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-500">Max Depth:</span>
                    <span className="font-bold">{formatValue(airline.carryOn.maxDepth, 'length')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Total dimensions:</span>
                    <span className="font-bold">
                      {formatValue(airline.carryOn.maxWidth + airline.carryOn.maxHeight + airline.carryOn.maxDepth, 'length')}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Carry-on Weight</h3>
                <div className="bg-gray-50 p-5 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Scale className="h-10 w-10 text-primary mr-3" />
                    <span className="text-2xl font-bold">{formatValue(airline.carryOn.maxWeight, 'weight')}</span>
                  </div>
                  
                  {airline.carryOn.notes && (
                    <div className="mt-4 text-gray-600">
                      <p>{airline.carryOn.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="checked" className="p-6">
            <CheckedBaggageDetails baggageOptions={airline.checkedBaggage} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

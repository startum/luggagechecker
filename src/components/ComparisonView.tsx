
import { useState, useEffect } from 'react';
import { Check, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LuggageDimensions, ComparisonResult } from '@/utils/types';
import airlineService from '@/utils/airlineData';

interface ComparisonViewProps {
  luggageDimensions: LuggageDimensions;
  airlineIds: string[];
}

export const ComparisonView = ({ luggageDimensions, airlineIds }: ComparisonViewProps) => {
  const [results, setResults] = useState<ComparisonResult[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadComparison = async () => {
      setLoading(true);
      try {
        const comparisonResults = await airlineService.compareLuggage(luggageDimensions, airlineIds);
        setResults(comparisonResults);
      } catch (error) {
        console.error('Error comparing luggage:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadComparison();
  }, [luggageDimensions, airlineIds]);
  
  if (loading) {
    return (
      <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="animate-spin h-10 w-10 border-4 border-coral border-t-transparent rounded-full mx-auto"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold mb-2">Comparison Results</h3>
        <p className="text-sm text-gray-500">
          Your luggage dimensions: {luggageDimensions.width} × {luggageDimensions.height} × {luggageDimensions.depth} cm, {luggageDimensions.weight} kg
        </p>
      </div>
      
      <div className="divide-y divide-gray-100">
        {results.map((result) => (
          <div key={result.airline.id} className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-400/50 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={result.airline.logo} 
                    alt={result.airline.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=120&auto=format&fit=crop";
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{result.airline.name}</h4>
                  <p className="text-sm text-gray-500">{result.airline.code}</p>
                </div>
              </div>
              
              <div className={`flex items-center px-3 py-1.5 rounded-full ${
                result.fits 
                  ? "bg-green-50 text-green-600" 
                  : "bg-red-50 text-red-600"
              }`}>
                {result.fits ? (
                  <Check className="h-4 w-4 mr-1.5" />
                ) : (
                  <X className="h-4 w-4 mr-1.5" />
                )}
                <span className="text-sm font-medium">
                  {result.fits ? "Your luggage fits!" : "Exceeds limits"}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-amber-400/30 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Carry-on max size</p>
                <p className="text-sm font-medium">
                  {result.airline.carryOn.maxWidth} × {result.airline.carryOn.maxHeight} × {result.airline.carryOn.maxDepth} cm
                </p>
              </div>
              <div className="bg-amber-400/30 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Carry-on max weight</p>
                <p className="text-sm font-medium">{result.airline.carryOn.maxWeight} kg</p>
              </div>
            </div>
            
            {!result.fits && (
              <div className="bg-coral/5 border border-coral/10 rounded-lg p-4 mb-4">
                <h5 className="text-sm font-medium text-coral-dark mb-2">Size Issue Details</h5>
                <p className="text-sm text-gray-600">{result.details}</p>
              </div>
            )}
            
            <div className="flex justify-end">
              <a href={result.airline.website} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="text-xs">
                  Visit {result.airline.name} <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

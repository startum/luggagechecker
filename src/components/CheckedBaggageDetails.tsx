
import { LuggagePolicy } from '@/utils/types';
import { Scale } from 'lucide-react';
import { useUnit } from '@/contexts/UnitContext';

interface CheckedBaggageDetailsProps {
  baggageOptions: LuggagePolicy[];
}

export const CheckedBaggageDetails = ({ baggageOptions }: CheckedBaggageDetailsProps) => {
  const { formatValue } = useUnit();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Checked Baggage Dimensions</h3>
        <div className="bg-gray-50 p-5 rounded-lg">
          {baggageOptions.length > 0 ? (
            baggageOptions.map((bag, index) => (
              <div key={index} className="mb-4 last:mb-0">
                {baggageOptions.length > 1 && (
                  <div className="text-sm text-gray-500 mb-2">Option {index + 1}</div>
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-500">Max Width:</span>
                  <span className="font-bold">{formatValue(bag.maxWidth, 'length')}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-500">Max Height:</span>
                  <span className="font-bold">{formatValue(bag.maxHeight, 'length')}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-500">Max Depth:</span>
                  <span className="font-bold">{formatValue(bag.maxDepth, 'length')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Total dimensions:</span>
                  <span className="font-bold">
                    {formatValue(bag.maxWidth + bag.maxHeight + bag.maxDepth, 'length')}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-3">
              <p className="text-gray-500">Dimension information not available.</p>
            </div>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Checked Baggage Weight</h3>
        <div className="bg-gray-50 p-5 rounded-lg">
          {baggageOptions.length > 0 ? (
            baggageOptions.map((bag, index) => (
              <div key={index} className="mb-4 last:mb-0">
                {baggageOptions.length > 1 && (
                  <div className="text-sm text-gray-500 mb-2">Option {index + 1}</div>
                )}
                <div className="flex items-center mb-4">
                  <Scale className="h-10 w-10 text-primary mr-3" />
                  <span className="text-2xl font-bold">{formatValue(bag.maxWeight, 'weight')}</span>
                </div>
                
                {bag.notes && (
                  <div className="text-gray-600">
                    <p>{bag.notes}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-3">
              <p className="text-gray-500">Weight information not available.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="md:col-span-2">
        <div className="mt-2 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-bold mb-2">Important Notes</h3>
          <ul className="text-sm space-y-2 list-disc list-inside text-gray-700">
            <li>Baggage fees and policies may vary by route and class of travel.</li>
            <li>Special items may require additional fees or handling.</li>
            <li>Pre-booking checked baggage online is usually cheaper than at the airport.</li>
            <li>Always check the airline's website for the most up-to-date information.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

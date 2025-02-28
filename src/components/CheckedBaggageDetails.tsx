
import { Airline } from '@/utils/types';

interface CheckedBaggageDetailsProps {
  airline: Airline;
}

export const CheckedBaggageDetails = ({ airline }: CheckedBaggageDetailsProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-4">Checked Baggage Policy</h2>
      
      {airline.checkedBaggage.length > 0 ? (
        <div className="space-y-6">
          {airline.checkedBaggage.map((bag, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-3">Option {index + 1}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Maximum Dimensions</p>
                  <p className="font-semibold">
                    {bag.maxWidth} × {bag.maxHeight} × {bag.maxDepth} cm
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Maximum Weight</p>
                  <p className="font-semibold">{bag.maxWeight} kg</p>
                </div>
              </div>
              
              {bag.notes && (
                <div className="mt-3 text-sm text-gray-600">
                  <p>{bag.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Checked baggage information not available.</p>
        </div>
      )}
      
      <div className="mt-6 p-4 bg-teal/10 rounded-lg">
        <h3 className="font-medium mb-2">Important Notes</h3>
        <ul className="text-sm space-y-2 list-disc list-inside text-gray-700">
          <li>Baggage fees and policies may vary by route and class of travel.</li>
          <li>Special items may require additional fees or handling.</li>
          <li>Pre-booking checked baggage online is usually cheaper than at the airport.</li>
          <li>Always check the airline's website for the most up-to-date information.</li>
        </ul>
      </div>
    </div>
  );
};

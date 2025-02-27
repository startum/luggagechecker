
import { Package, Weight, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Airline } from '@/utils/types';

interface CarryOnDetailsProps {
  airline: Airline;
}

export const CarryOnDetails = ({ airline }: CarryOnDetailsProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-4">Carry-On Baggage Policy</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Package className="h-4 w-4 text-seafoam" />
            <h3 className="font-medium text-sm">Maximum Dimensions</h3>
          </div>
          <p className="text-xl font-semibold">
            {airline.carryOn.maxWidth} × {airline.carryOn.maxHeight} × {airline.carryOn.maxDepth} cm
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Weight className="h-4 w-4 text-coral" />
            <h3 className="font-medium text-sm">Maximum Weight</h3>
          </div>
          <p className="text-xl font-semibold">{airline.carryOn.maxWeight} kg</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-4 w-4 text-lavender" />
            <h3 className="font-medium text-sm">Additional Info</h3>
          </div>
          <p className="text-sm">{airline.carryOn.notes || "No additional information provided."}</p>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <div className="mb-6">
        <h3 className="font-medium mb-3">Popular Routes</h3>
        <div className="flex flex-wrap gap-2">
          {airline.popularRoutes.map((route, index) => (
            <div key={index} className="px-3 py-1 bg-gray-50 rounded-full text-sm">
              {route}
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-sunshine/10 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Travel Tips</h3>
        <ul className="text-sm space-y-2 list-disc list-inside text-gray-700">
          <li>Measure your bag before traveling to ensure it meets size requirements.</li>
          <li>Remember that some items may be restricted in carry-on luggage.</li>
          <li>Consider checking in online to save time at the airport.</li>
          <li>Pack liquids in containers of 100ml or less in a clear plastic bag.</li>
        </ul>
      </div>
    </div>
  );
};

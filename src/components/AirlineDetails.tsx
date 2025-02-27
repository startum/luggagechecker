
import { PlaneTakeoff, Luggage } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CarryOnDetails } from './CarryOnDetails';
import { CheckedBaggageDetails } from './CheckedBaggageDetails';
import { Airline } from '@/utils/types';

interface AirlineDetailsProps {
  airline: Airline;
}

export const AirlineDetails = ({ airline }: AirlineDetailsProps) => {
  return (
    <Tabs defaultValue="carry-on" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="carry-on" className="flex items-center gap-2">
          <PlaneTakeoff className="h-4 w-4" /> Carry-On
        </TabsTrigger>
        <TabsTrigger value="checked" className="flex items-center gap-2">
          <Luggage className="h-4 w-4" /> Checked Baggage
        </TabsTrigger>
      </TabsList>
      
      {/* Carry-On Tab */}
      <TabsContent value="carry-on" className="animate-fade-in">
        <CarryOnDetails airline={airline} />
      </TabsContent>
      
      {/* Checked Baggage Tab */}
      <TabsContent value="checked" className="animate-fade-in">
        <CheckedBaggageDetails airline={airline} />
      </TabsContent>
    </Tabs>
  );
};

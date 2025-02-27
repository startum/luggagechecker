
import { supabase } from "@/integrations/supabase/client";
import { Airline } from "./types";
import { toast } from "sonner";

// Fetch airlines from Supabase
export const fetchAirlinesFromDatabase = async (): Promise<Airline[]> => {
  try {
    const { data, error } = await supabase
      .from('airlines_data')
      .select('*');

    if (error) {
      console.error('Error fetching airlines:', error);
      toast.error('Failed to load airlines data');
      return [];
    }

    if (!data || data.length === 0) {
      console.warn('No airlines found in database');
      return [];
    }

    // Map the database records to our Airline type
    return data.map(record => ({
      id: record.iata_code?.toLowerCase() || `airline-${record.id}`,
      name: record.airline_name || 'Unknown Airline',
      code: record.iata_code || '',
      logo: record.logo_url || "https://images.unsplash.com/photo-1583810111145-069345044bf5?q=80&w=120&auto=format&fit=crop",
      website: record.website_url || '#',
      country: record.country_name || 'Unknown',
      carryOn: {
        maxWidth: 40,
        maxHeight: 55,
        maxDepth: 20,
        maxWeight: 10,
        notes: "Standard carry-on allowance"
      },
      checkedBaggage: [
        {
          maxWidth: 75,
          maxHeight: 81,
          maxDepth: 119,
          maxWeight: 20,
          price: "From €20.99"
        }
      ],
      popularRoutes: ["Major routes information not available"]
    }));
  } catch (error) {
    console.error('Unexpected error fetching airlines:', error);
    toast.error('Failed to load airlines data');
    return [];
  }
};

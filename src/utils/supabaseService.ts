
import { supabase } from "@/integrations/supabase/client";
import { Airline } from "./types";
import { toast } from "sonner";

// Parse dimension string (e.g. "55x40x20") into separate width, height, depth values
const parseDimensions = (dimensionStr: string | null): { width: number, height: number, depth: number } => {
  if (!dimensionStr) {
    return { width: 55, height: 40, depth: 20 }; // Default values
  }
  
  try {
    const dimensions = dimensionStr.split('x').map(d => parseInt(d.trim()));
    if (dimensions.length === 3) {
      return {
        width: dimensions[0] || 55,
        height: dimensions[1] || 40,
        depth: dimensions[2] || 20
      };
    }
  } catch (error) {
    console.error('Failed to parse dimensions:', dimensionStr, error);
  }
  
  return { width: 55, height: 40, depth: 20 }; // Fallback to defaults
};

// Parse weight string (e.g. "10kg") into numeric value
const parseWeight = (weightStr: string | null): number => {
  if (!weightStr) return 10; // Default value
  
  try {
    const match = weightStr.match(/(\d+)/);
    if (match && match[1]) {
      return parseInt(match[1]);
    }
  } catch (error) {
    console.error('Failed to parse weight:', weightStr, error);
  }
  
  return 10; // Fallback to default
};

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
    return data.map(record => {
      // Parse carry-on dimensions
      const carryOnDimensions = parseDimensions(record.carry_on_size);
      const carryOnWeight = parseWeight(record.carry_on_weight);
      
      // Parse checked baggage dimensions
      const checkedDimensions = parseDimensions(record.checked_bag_size);
      const checkedWeight = parseWeight(record.checked_bag_weight);
      
      return {
        id: record.iata_code?.toLowerCase() || `airline-${record.id}`,
        name: record.airline_name || 'Unknown Airline',
        code: record.iata_code || '',
        logo: record.logo_url || "https://images.unsplash.com/photo-1583810111145-069345044bf5?q=80&w=120&auto=format&fit=crop",
        website: record.website_url || '#',
        country: record.country_name || 'Unknown',
        carryOn: {
          maxWidth: carryOnDimensions.width,
          maxHeight: carryOnDimensions.height,
          maxDepth: carryOnDimensions.depth,
          maxWeight: carryOnWeight,
          notes: "Standard carry-on allowance"
        },
        checkedBaggage: [
          {
            maxWidth: checkedDimensions.width,
            maxHeight: checkedDimensions.height,
            maxDepth: checkedDimensions.depth,
            maxWeight: checkedWeight,
            price: "From €20.99"
          }
        ],
        popularRoutes: ["Major routes information not available"]
      };
    });
  } catch (error) {
    console.error('Unexpected error fetching airlines:', error);
    toast.error('Failed to load airlines data');
    return [];
  }
};

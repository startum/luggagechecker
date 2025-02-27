
import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero';
import { AirlineSearch } from '@/components/AirlineSearch';
import { FavoritesSection } from '@/components/FavoritesSection';
import airlineService from '@/utils/airlineData';
import { Airline } from '@/utils/types';

const Index = () => {
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAirlines = async () => {
      setLoading(true);
      try {
        const allAirlines = await airlineService.getAllAirlines();
        setAirlines(allAirlines);
      } catch (error) {
        console.error('Error loading airlines:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAirlines();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <Hero />
      
      {/* Main Content */}
      <div className="layout-container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Airline Search (2/3 width) */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Find Airline Baggage Policies</h2>
            <AirlineSearch />
          </div>
          
          {/* Favorites Section (1/3 width) */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-6">Your Favorites</h2>
            <FavoritesSection />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;

import { Layout } from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane } from 'lucide-react';

const BookFlights = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create and load the flight booking script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://tpemd.com/content?currency=usd&trs=448606&shmarker=664168&locale=en&stops=any&powered_by=true&limit=4&primary_color=00AE98&results_background_color=FFFFFF&form_background_color=FFFFFF&campaign_id=111&promo_id=3411';
    script.charset = 'utf-8';

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    // Cleanup function to remove script when component unmounts
    return () => {
      if (containerRef.current && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Book Flights - Find the Best Flight Deals | Size My Bag</title>
        <meta name="description" content="Compare and book flights with confidence. Find the best deals while ensuring your luggage meets airline requirements." />
      </Helmet>
      
      <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 py-24">
        <div className="layout-container">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
                Book Your Perfect Flight
              </h1>
              <p className="text-xl text-zinc-600 mb-8">
                Find the best flight deals while ensuring your luggage meets requirements
              </p>
            </div>

            {/* Flight Booking Widget */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5" />
                  Book Your Flight
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div ref={containerRef} className="min-h-[400px]" />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default BookFlights;
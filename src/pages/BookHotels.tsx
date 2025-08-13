import { Layout } from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

const BookHotels = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create and load the hotel booking script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://tpemd.com/content?trs=448606&shmarker=664168&locale=en&sustainable=false&deals=false&border_radius=5&plain=true&powered_by=true&promo_id=2693&campaign_id=84';
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
        <title>Book Hotels - Find the Best Hotel Deals | Size My Bag</title>
        <meta name="description" content="Find and book the perfect hotel for your next trip. Compare prices and amenities while ensuring your luggage meets airline requirements." />
      </Helmet>
      
      <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 py-24">
        <div className="layout-container">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
                Book Your Perfect Hotel
              </h1>
              <p className="text-xl text-zinc-600 mb-8">
                Find the best hotel deals for your next trip
              </p>
            </div>

            {/* Hotel Booking Widget */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Book Your Hotel
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  This search is powered by Booking.com. As an affiliate, we may earn a commission from bookings made through this page at no extra cost to you.
                </p>
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

export default BookHotels;
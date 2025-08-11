import { Layout } from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, Calendar, MapPin, Users } from 'lucide-react';

const BookFlights = () => {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: '1'
  });

  const handleSearch = () => {
    const query = new URLSearchParams({
      from: searchParams.from,
      to: searchParams.to,
      depart: searchParams.departDate,
      return: searchParams.returnDate,
      passengers: searchParams.passengers
    });
    
    // Open Kayak with search parameters
    window.open(`https://www.kayak.com/flights/${searchParams.from}-${searchParams.to}/${searchParams.departDate}/${searchParams.returnDate}?sort=bestflight_a&fs=stops=0`, '_blank');
  };

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
                <div id="tpemd-booking-widget" className="min-h-[400px]">
                  <script 
                    async 
                    src="https://tpemd.com/content?currency=usd&trs=448606&shmarker=664168&locale=en&stops=any&show_hotels=true&powered_by=true&border_radius=0&plain=true&color_button=%2300A991&color_button_text=%23ffffff&promo_id=3414&campaign_id=111" 
                    charSet="utf-8"
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Alternative Booking Options */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">More Flight Search Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a 
                  href="https://www.expedia.com/Flights" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition-colors"
                >
                  Search on Expedia
                </a>
                <a 
                  href="https://www.kayak.com/flights" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition-colors"
                >
                  Search on Kayak
                </a>
                <a 
                  href="https://www.skyscanner.com/flights" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition-colors"
                >
                  Search on Skyscanner
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default BookFlights;
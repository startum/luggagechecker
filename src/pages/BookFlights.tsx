import { Layout } from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, Calendar, MapPin, Users } from 'lucide-react';

const BookFlights = () => {
  return (
    <Layout>
      <Helmet>
        <title>Book Flights - Find the Best Flight Deals | Size My Bag</title>
        <meta name="description" content="Compare and book flights with confidence. Find the best deals while ensuring your luggage meets airline requirements." />
        <script async src="https://tpemd.com/content?currency=usd&trs=448606&shmarker=664168&locale=en&powered_by=true&limit=4&primary_color=00AE98&results_background_color=FFFFFF&form_background_color=FFFFFF&campaign_id=111&promo_id=3411" charSet="utf-8"></script>
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

            {/* Flight Search Partners */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plane className="w-5 h-5 text-sky-600" />
                    Expedia
                  </CardTitle>
                  <CardDescription>
                    Compare flights from hundreds of airlines
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" asChild>
                    <a href="https://www.expedia.com/Flights" target="_blank" rel="noopener noreferrer">
                      Search Flights
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-sky-600" />
                    Kayak
                  </CardTitle>
                  <CardDescription>
                    Find flexible dates and best prices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" asChild>
                    <a href="https://www.kayak.com/flights" target="_blank" rel="noopener noreferrer">
                      Search Flights
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-sky-600" />
                    Skyscanner
                  </CardTitle>
                  <CardDescription>
                    Discover destinations and deals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" asChild>
                    <a href="https://www.skyscanner.com/" target="_blank" rel="noopener noreferrer">
                      Search Flights
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Travel Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-sky-600" />
                  Smart Travel Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-zinc-900 mb-2">Before You Book</h3>
                    <ul className="space-y-1 text-zinc-600">
                      <li>• Check luggage size limits for your chosen airline</li>
                      <li>• Compare baggage fees across different carriers</li>
                      <li>• Consider booking directly with airlines for flexibility</li>
                      <li>• Use our luggage comparison tool before purchasing</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 mb-2">Save Money</h3>
                    <ul className="space-y-1 text-zinc-600">
                      <li>• Book flights 6-8 weeks in advance</li>
                      <li>• Be flexible with travel dates</li>
                      <li>• Clear browser cookies between searches</li>
                      <li>• Consider nearby airports</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default BookFlights;
import { Layout } from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';

const BookFlights = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    // Remove existing script if any
    const existingScript = document.querySelector('script[src*="tpemd.com"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Create and load the script dynamically
    const script = document.createElement('script');
    script.src = 'https://tpemd.com/content?currency=usd&trs=448606&shmarker=664168&locale=en&powered_by=true&limit=4&primary_color=00AE98&results_background_color=FFFFFF&form_background_color=FFFFFF&campaign_id=111&promo_id=3411';
    script.async = true;
    script.charset = 'utf-8';
    
    script.onload = () => {
      setIsScriptLoaded(true);
      setScriptError(false);
    };
    
    script.onerror = () => {
      setScriptError(true);
      setIsScriptLoaded(false);
    };

    // Append script to document body
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      if (script.parentNode) {
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

            {/* Flight Widget Container */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div id="flight-widget-container" className="min-h-[400px]">
                {!isScriptLoaded && !scriptError && (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto mb-4"></div>
                      <p className="text-zinc-600">Loading flight search...</p>
                    </div>
                  </div>
                )}
                
                {scriptError && (
                  <div className="text-center py-8">
                    <p className="text-zinc-600 mb-4">Unable to load flight search widget.</p>
                    <div className="space-y-2">
                      <a 
                        href="https://www.expedia.com/Flights" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors mr-4"
                      >
                        Search on Expedia
                      </a>
                      <a 
                        href="https://www.kayak.com/flights" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors"
                      >
                        Search on Kayak
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default BookFlights;
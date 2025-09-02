import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { LuggageSizeChecker } from '@/components/LuggageSizeChecker';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plane, 
  Luggage, 
  Backpack, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Users,
  Clock,
  Shield
} from 'lucide-react';

const LuggageSizeCheckerPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Luggage Size Checker - Check Suitcase Size Online | SizeMyBag</title>
        <meta name="description" content="Free luggage size checker to verify carry-on and checked baggage dimensions instantly. Check suitcase size online for all major airlines before you travel." />
        <meta name="keywords" content="luggage size checker, check suitcase size online, carry on size checker, baggage dimensions, airline luggage rules" />
        <link rel="canonical" href="https://sizemybag.com/luggage-size-checker" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sizemybag.com/luggage-size-checker" />
        <meta property="og:title" content="Luggage Size Checker - Check Suitcase Size Online | SizeMyBag" />
        <meta property="og:description" content="Free luggage size checker to verify carry-on and checked baggage dimensions instantly. Check suitcase size online for all major airlines before you travel." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://sizemybag.com/luggage-size-checker" />
        <meta property="twitter:title" content="Luggage Size Checker - Check Suitcase Size Online | SizeMyBag" />
        <meta property="twitter:description" content="Free luggage size checker to verify carry-on and checked baggage dimensions instantly. Check suitcase size online for all major airlines before you travel." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Luggage Size Checker",
            "description": "Check your luggage dimensions against airline restrictions instantly",
            "url": "https://sizemybag.com/luggage-size-checker",
            "applicationCategory": "Travel",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Hero Section */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Luggage Size Checker
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Check your suitcase size online instantly and avoid costly surprises at the airport. 
              Our free carry-on size checker ensures your luggage meets airline requirements.
            </p>
            
            {/* Key Benefits */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                Instant Results
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Shield className="w-4 h-4 mr-2" />
                All Airlines Covered
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                Save Time & Fees
              </Badge>
            </div>
          </header>

          {/* Luggage Size Checker Tool */}
          <section className="mb-16">
            <LuggageSizeChecker />
          </section>

          {/* Why Check Luggage Size Section */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Why Airlines Have Different Luggage Rules
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Each airline sets its own baggage restrictions based on aircraft type, 
                    business model, and operational efficiency. Low-cost carriers often have 
                    stricter size limits to maximize revenue and streamline boarding.
                  </p>
                  <p>
                    Overhead compartment sizes vary between aircraft models, and airlines 
                    must ensure all passengers' bags fit safely. Weight restrictions help 
                    manage fuel costs and aircraft balance.
                  </p>
                  <p>
                    Using our luggage size checker before you travel helps you avoid 
                    unexpected fees and delays at check-in.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center">
                  <Plane className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-semibold mb-1">Aircraft Limits</h3>
                  <p className="text-sm text-gray-600">Overhead space varies by plane model</p>
                </Card>
                <Card className="p-4 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <h3 className="font-semibold mb-1">Passenger Safety</h3>
                  <p className="text-sm text-gray-600">Weight limits ensure safe operations</p>
                </Card>
                <Card className="p-4 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                  <h3 className="font-semibold mb-1">Boarding Speed</h3>
                  <p className="text-sm text-gray-600">Standard sizes speed up the process</p>
                </Card>
                <Card className="p-4 text-center">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                  <h3 className="font-semibold mb-1">Business Model</h3>
                  <p className="text-sm text-gray-600">Fees help keep base fares low</p>
                </Card>
              </div>
            </div>
          </section>

          {/* Luggage Types Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Different Types of Luggage
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <Luggage className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-xl font-semibold mb-3">Hard Shell Suitcases</h3>
                <p className="text-gray-600 mb-4">
                  Durable protection with fixed dimensions. Easy to measure but no flexibility 
                  for tight spaces.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Best protection for fragile items</li>
                  <li>• Consistent size measurements</li>
                  <li>• Popular for checked luggage</li>
                </ul>
              </Card>
              <Card className="p-6 text-center">
                <Backpack className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-xl font-semibold mb-3">Soft Backpacks</h3>
                <p className="text-gray-600 mb-4">
                  Flexible materials that can compress slightly. Great for carry-on due to 
                  adaptability.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Can compress when needed</li>
                  <li>• Lightweight options available</li>
                  <li>• Easy to store in overhead bins</li>
                </ul>
              </Card>
              <Card className="p-6 text-center">
                <Luggage className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                <h3 className="text-xl font-semibold mb-3">Rolling Duffel Bags</h3>
                <p className="text-gray-600 mb-4">
                  Hybrid design combining wheels with soft-sided flexibility. Versatile 
                  for various trip lengths.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Easy to maneuver</li>
                  <li>• Expandable compartments</li>
                  <li>• Good for longer trips</li>
                </ul>
              </Card>
            </div>
          </section>

          {/* Airline Comparison Table */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Popular Airlines Luggage Limits
            </h2>
            <Card className="p-6 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold">Airline</th>
                    <th className="text-left py-3 px-4 font-semibold">Carry-On Size (cm)</th>
                    <th className="text-left py-3 px-4 font-semibold">Weight Limit</th>
                    <th className="text-left py-3 px-4 font-semibold">Personal Item</th>
                    <th className="text-center py-3 px-4 font-semibold">Strictness</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium">Ryanair</td>
                    <td className="py-4 px-4">55 × 40 × 20</td>
                    <td className="py-4 px-4">10 kg</td>
                    <td className="py-4 px-4">40 × 20 × 25</td>
                    <td className="py-4 px-4 text-center">
                      <Badge variant="destructive">Very Strict</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium">EasyJet</td>
                    <td className="py-4 px-4">56 × 45 × 25</td>
                    <td className="py-4 px-4">No limit</td>
                    <td className="py-4 px-4">45 × 36 × 20</td>
                    <td className="py-4 px-4 text-center">
                      <Badge variant="secondary">Moderate</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium">Wizz Air</td>
                    <td className="py-4 px-4">55 × 40 × 23</td>
                    <td className="py-4 px-4">10 kg</td>
                    <td className="py-4 px-4">40 × 30 × 18</td>
                    <td className="py-4 px-4 text-center">
                      <Badge variant="destructive">Strict</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium">British Airways</td>
                    <td className="py-4 px-4">56 × 45 × 25</td>
                    <td className="py-4 px-4">23 kg</td>
                    <td className="py-4 px-4">40 × 30 × 15</td>
                    <td className="py-4 px-4 text-center">
                      <Badge className="bg-green-100 text-green-800">Lenient</Badge>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium">Lufthansa</td>
                    <td className="py-4 px-4">55 × 40 × 23</td>
                    <td className="py-4 px-4">8 kg</td>
                    <td className="py-4 px-4">40 × 30 × 10</td>
                    <td className="py-4 px-4 text-center">
                      <Badge variant="secondary">Moderate</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>
            <p className="text-center text-sm text-gray-500 mt-4">
              * Restrictions may vary by route and ticket type. Always check with your airline before traveling.
            </p>
          </section>

          {/* How to Use Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              How to Use Our Carry-On Size Checker
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Measure Your Luggage</h3>
                <p className="text-gray-600">
                  Use a measuring tape to get exact dimensions of your suitcase including 
                  handles, wheels, and any protrusions.
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-teal-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Enter Dimensions</h3>
                <p className="text-gray-600">
                  Input your luggage measurements into our size checker tool above. 
                  Switch between metric and imperial units as needed.
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-green-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Get Results</h3>
                <p className="text-gray-600">
                  Instantly see which airlines accept your luggage size and avoid 
                  unexpected fees at the airport.
                </p>
              </Card>
            </div>
          </section>

          {/* Tips Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Pro Tips for Checking Suitcase Size Online
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">What to Include</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• All handles and straps</li>
                  <li>• Wheels and feet</li>
                  <li>• External pockets when packed</li>
                  <li>• Any expandable sections</li>
                </ul>
              </Card>
              <Card className="p-6">
                <AlertTriangle className="w-8 h-8 text-amber-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Common Mistakes</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Measuring empty bags only</li>
                  <li>• Forgetting about wheels</li>
                  <li>• Using wrong measurement units</li>
                  <li>• Not checking weight limits</li>
                </ul>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-teal-600 to-blue-600 text-white py-12 px-6 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Check Your Luggage Size?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Use our free luggage size checker above to ensure your bags meet airline requirements 
              and travel with confidence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                ✓ Free to Use
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                ✓ All Major Airlines
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                ✓ Instant Results
              </Badge>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default LuggageSizeCheckerPage;
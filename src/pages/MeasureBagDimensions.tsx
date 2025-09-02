import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Ruler, Scale, CheckCircle, ArrowRight, Lightbulb, AlertTriangle } from 'lucide-react';
import measurementDiagram from '@/assets/luggage-measurement-diagram.jpg';
import measuringSteps from '@/assets/measuring-luggage-steps.jpg';

const MeasureBagDimensions = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>How to Measure Bag Dimensions: Complete Guide for Accurate Luggage Measurements</title>
        <meta 
          name="description" 
          content="Learn how to measure bag dimensions accurately at home. Step-by-step guide to measure suitcase length, width, height, and weight for airline carry-on compliance." 
        />
        <meta 
          name="keywords" 
          content="how to measure bag dimensions, measure suitcase size at home, measure carry on luggage, luggage dimensions guide, suitcase measurement, bag size calculator, airline baggage dimensions" 
        />
        <link rel="canonical" href="https://sizemybag.com/measure-bag-dimensions" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://sizemybag.com/measure-bag-dimensions" />
        <meta property="og:title" content="How to Measure Bag Dimensions: Complete Guide for Accurate Measurements" />
        <meta property="og:description" content="Step-by-step guide to measure your luggage dimensions at home. Ensure your bag meets airline requirements with our detailed measuring instructions." />
        <meta property="og:image" content="https://sizemybag.com/og-measure-guide.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://sizemybag.com/measure-bag-dimensions" />
        <meta property="twitter:title" content="How to Measure Bag Dimensions: Complete Guide" />
        <meta property="twitter:description" content="Learn to measure your luggage dimensions accurately at home with our step-by-step guide." />
        <meta property="twitter:image" content="https://sizemybag.com/og-measure-guide.jpg" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Measure Bag Dimensions",
            "description": "Complete guide on how to measure luggage dimensions accurately at home",
            "image": "https://sizemybag.com/og-measure-guide.jpg",
            "totalTime": "PT10M",
            "supply": [
              {"@type": "HowToSupply", "name": "Measuring tape or ruler"},
              {"@type": "HowToSupply", "name": "Bathroom scale"},
              {"@type": "HowToSupply", "name": "Luggage to measure"}
            ],
            "tool": [
              {"@type": "HowToTool", "name": "Measuring tape"},
              {"@type": "HowToTool", "name": "Digital scale"}
            ],
            "step": [
              {
                "@type": "HowToStep",
                "name": "Measure Length",
                "text": "Place your luggage on a flat surface and measure the longest side using a measuring tape"
              },
              {
                "@type": "HowToStep", 
                "name": "Measure Width",
                "text": "Measure the widest point of your luggage from side to side"
              },
              {
                "@type": "HowToStep",
                "name": "Measure Height/Depth", 
                "text": "Measure from the bottom to the top of your luggage including wheels and handles"
              },
              {
                "@type": "HowToStep",
                "name": "Weigh Your Bag",
                "text": "Use a bathroom scale to weigh your empty luggage, then add items and weigh again"
              }
            ]
          })}
        </script>
      </Helmet>

      <Layout>
        <div className="py-8 layout-container">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <header className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                How to Measure Bag Dimensions: Complete Guide
              </h1>
              <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
                Learn how to measure your luggage dimensions accurately at home. Follow our step-by-step guide to ensure your bag meets airline carry-on requirements and avoid unexpected fees.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                <Badge variant="secondary" className="text-sm">
                  <Ruler className="w-4 h-4 mr-1" />
                  Accurate Measurements
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Airline Compliant
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  <Scale className="w-4 h-4 mr-1" />
                  Weight & Dimensions
                </Badge>
              </div>
            </header>

            {/* What You'll Need */}
            <Card className="p-6 mb-8 bg-blue-50 border-blue-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2 text-blue-600" />
                What You'll Need
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Ruler className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Measuring Tape</h3>
                    <p className="text-sm text-gray-600">Or rigid ruler</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Scale className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Digital Scale</h3>
                    <p className="text-sm text-gray-600">Bathroom scale works</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Flat Surface</h3>
                    <p className="text-sm text-gray-600">For accurate measurement</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Visual Guide */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Visual Measurement Guide</h2>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card className="p-6">
                  <img 
                    src={measurementDiagram} 
                    alt="Luggage measurement diagram showing length, width, and height dimensions" 
                    className="w-full h-auto rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2">Understanding Dimensions</h3>
                  <p className="text-gray-600">
                    Length (L) is the longest side, Width (W) is from side to side, and Height (H) includes wheels and handles.
                  </p>
                </Card>
                <Card className="p-6">
                  <img 
                    src={measuringSteps} 
                    alt="Step-by-step process of measuring luggage with measuring tape" 
                    className="w-full h-auto rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2">Proper Technique</h3>
                  <p className="text-gray-600">
                    Use a measuring tape against each side, ensuring it's straight and measuring at the widest points.
                  </p>
                </Card>
              </div>
            </section>

            {/* Step-by-Step Guide */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Step-by-Step Measurement Guide</h2>
              
              <div className="space-y-8">
                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-700 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Measure Length (Longest Side)</h3>
                      <p className="text-gray-700 mb-4">
                        Place your suitcase on a flat surface. Identify the longest side of your luggage and measure from end to end using your measuring tape. This is typically the side where the luggage opens.
                      </p>
                      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                        <div className="flex items-center">
                          <AlertTriangle className="w-5 h-5 text-amber-600 mr-2" />
                          <p className="text-amber-800 text-sm">
                            <strong>Pro Tip:</strong> Always measure at the widest point, including any protruding parts like wheels or external pockets.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-700 font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Measure Width</h3>
                      <p className="text-gray-700 mb-4">
                        Turn your luggage to face you and measure from one side to the other at the widest point. Include any side pockets, zippers, or external features in your measurement.
                      </p>
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                        <p className="text-blue-800 text-sm">
                          <strong>Remember:</strong> Soft-sided luggage can expand, so measure when it's at its fullest capacity.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-700 font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Measure Height (Depth)</h3>
                      <p className="text-gray-700 mb-4">
                        Measure from the bottom (including wheels) to the top (including the handle when fully extended). This is the most critical measurement as it often determines if your bag fits in overhead compartments.
                      </p>
                      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                        <div className="flex items-center">
                          <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                          <p className="text-red-800 text-sm">
                            <strong>Important:</strong> Include wheels and fully extended handles in your height measurement - airlines measure the total external dimensions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-700 font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Weigh Your Luggage</h3>
                      <p className="text-gray-700 mb-4">
                        First, weigh yourself on a bathroom scale, then weigh yourself holding the luggage. Subtract your weight from the combined weight to get your luggage weight. For more accuracy, use a luggage scale if available.
                      </p>
                      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                        <p className="text-green-800 text-sm">
                          <strong>Tip:</strong> Weigh your empty luggage first to know how much packing space you have for items.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* Common Mistakes */}
            <Card className="p-6 mb-8 bg-red-50 border-red-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2 text-red-600" />
                Common Measurement Mistakes to Avoid
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-red-700 mb-2">❌ Don't Forget:</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Wheels and handles in height measurement</li>
                    <li>• External pockets and zippers</li>
                    <li>• Measuring at the widest/longest points</li>
                    <li>• Accounting for luggage expansion when packed</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-green-700 mb-2">✅ Always Remember:</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Use a flat, level surface</li>
                    <li>• Measure in centimeters for international travel</li>
                    <li>• Round up to the nearest centimeter</li>
                    <li>• Check measurements twice for accuracy</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* CTA Section */}
            <Card className="p-8 bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Test Your Measurements Against Airlines
              </h2>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Now that you know how to measure your bag dimensions, use our free tool to check if your luggage meets the requirements of over 200 airlines worldwide.
              </p>
              <Link to="/luggage-size-checker">
                <Button size="lg" className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-3">
                  Check My Bag Size <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </Card>

            {/* FAQ Section */}
            <section className="mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    What units should I use to measure my luggage?
                  </h3>
                  <p className="text-gray-700">
                    Most international airlines use centimeters (cm) and kilograms (kg). US airlines may use inches and pounds. Our tool supports both metric and imperial units for easy conversion.
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Do I include wheels and handles in my measurements?
                  </h3>
                  <p className="text-gray-700">
                    Yes, always include wheels, handles (when extended), and any external pockets in your measurements. Airlines measure the total external dimensions of your luggage.
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How accurate do my measurements need to be?
                  </h3>
                  <p className="text-gray-700">
                    Be as accurate as possible and round up to the nearest centimeter. Airlines are strict about size limits, and being even 1cm over can result in additional fees or having to check your bag.
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    What if my soft-sided luggage can expand?
                  </h3>
                  <p className="text-gray-700">
                    Measure your soft-sided luggage when it's fully packed to its maximum capacity. The expandable zippers and flexible sides can add significant dimensions when packed full.
                  </p>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </Layout>
    </HelmetProvider>
  );
};

export default MeasureBagDimensions;
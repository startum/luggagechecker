import { Hero } from '@/components/Hero';
import { Layout } from '@/components/Layout';
import { AirlineSearch } from '@/components/AirlineSearch';
import { LuggageInput } from '@/components/LuggageInput';
import { useNavigate } from 'react-router-dom';
import { LuggageDimensions } from '@/utils/types';
import { FavoritesSection } from '@/components/FavoritesSection';
import airlineService from '@/utils/airlineData';
import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Index = () => {
  const navigate = useNavigate();
  const [hasFavorites, setHasFavorites] = useState(false);
  const [currentDimensions, setCurrentDimensions] = useState<LuggageDimensions>({
    width: 40,
    height: 55,
    depth: 20,
    weight: 10
  });
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // Check if user has any favorites
    const checkFavorites = async () => {
      const favorites = await airlineService.getFavorites();
      setHasFavorites(favorites.length > 0);
    };
    
    checkFavorites();
    
    // Try to load luggage dimensions from session storage
    try {
      const storedDimensions = sessionStorage.getItem('luggage-dimensions');
      if (storedDimensions) {
        setCurrentDimensions(JSON.parse(storedDimensions));
      }
    } catch (error) {
      console.error('Failed to load luggage dimensions:', error);
    }
  }, []);
  
  const handleLuggageSubmit = (dimensions: LuggageDimensions) => {
    // Store dimensions in session storage and update state
    sessionStorage.setItem('luggage-dimensions', JSON.stringify(dimensions));
    setCurrentDimensions(dimensions);
    
    // Navigate to comparison page
    navigate('/compare');
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <Hero />
      
      {/* Main Content */}
      <section className="py-10 sm:py-15 md:py-20 bg-white">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {/* Luggage Input Side */}
            <div className="lg:col-span-1">
              <LuggageInput 
                onSubmit={handleLuggageSubmit}
                initialDimensions={currentDimensions}
              />
            </div>
            
            {/* Search Results Side */}
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-semibold">Popular Airlines</h2>
                <div className="text-sm sm:text-base text-gray-500">
                  <span className="hidden sm:inline">Showing airlines that fit your luggage: </span> 
                  <span className="sm:hidden">Luggage size: </span>
                  {currentDimensions.width} × {currentDimensions.height} × {currentDimensions.depth} cm, 
                  {currentDimensions.weight} kg
                </div>
              </div>
              <AirlineSearch 
                initialSearch={searchTerm}
                filterByDimensions={true}
                luggageDimensions={currentDimensions}
                limit={6}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Favorites Section (if the user has favorites) */}
      {hasFavorites && (
        <section className="py-10 sm:py-15 md:py-20 bg-gray-50">
          <div className="layout-container">
            <FavoritesSection />
          </div>
        </section>
      )}
      
      {/* How to Measure Your Luggage Section */}
      <section className="py-10 sm:py-15 md:py-20 bg-white">
        <div className="layout-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">✈️ How to Measure Your Luggage</h2>
            <p className="text-lg leading-relaxed mb-6 text-center text-gray-600">
              Follow these 5 simple steps to check if your luggage will fit airline rules:
            </p>
            
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-teal text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                  1
                </div>
                <p className="text-lg">Place your luggage upright on a flat surface.</p>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-teal text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                  2
                </div>
                <p className="text-lg">Use a tape measure to measure from the ground to the top handle (height).</p>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-teal text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                  3
                </div>
                <p className="text-lg">Measure the width from side to side.</p>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-teal text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                  4
                </div>
                <p className="text-lg">Measure the depth from front to back, including wheels and handles.</p>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-teal text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                  5
                </div>
                <p className="text-lg">Record these dimensions in inches or centimeters.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Info Section with Image */}
      <section className="py-10 sm:py-15 md:py-20">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
            <div>
              <img 
                src="/lovable-uploads/a9eba0a3-7cf7-4bca-bf98-513603e6f8bf.png" 
                alt="Airport terminal view with airplane and seating area" 
                className="rounded-xl shadow-lg w-full object-cover h-full"
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Why Check Before You Fly?</h2>
              <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8">
                Airlines are constantly changing their baggage policies, and exceeding size or weight limits can lead to unexpected fees at the airport. Stay ahead by checking your luggage against the latest airline requirements.
              </p>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">100+ Airlines Covered</h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Our database includes comprehensive information from all major airlines worldwide.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Real-Time Updates</h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      We keep our baggage policy information current with the latest airline changes.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Easy Comparisons</h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Compare your luggage across multiple airlines with our intuitive tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Travel Confidently</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-left">
              <div className="bg-white p-5 sm:p-8 rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.1)] border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <img 
                  src="/lovable-uploads/630eedf4-e53d-4ef4-9417-a537b4fdf05e.png" 
                  alt="Person sitting with luggage at airport" 
                  className="w-full h-36 sm:h-48 object-cover rounded-lg mb-4 sm:mb-5"
                />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Save Money</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Avoid expensive last-minute baggage fees by ensuring your luggage meets the airline's requirements before you get to the airport.
                </p>
              </div>
              
              <div className="bg-white p-5 sm:p-8 rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.1)] border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <img 
                  src="/lovable-uploads/b829ab14-a7e8-4e32-9eb6-b2607ad53970.png" 
                  alt="Airplanes on runway" 
                  className="w-full h-36 sm:h-48 object-cover rounded-lg mb-4 sm:mb-5"
                />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Save Time</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Skip the stress of repacking at check-in by knowing exactly what size and weight restrictions apply to your journey.
                </p>
              </div>
              
              <div className="bg-white p-5 sm:p-8 rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.1)] border border-gray-100 hover:shadow-lg transition-shadow duration-300 sm:col-span-2 md:col-span-1 sm:max-w-md md:max-w-full mx-auto sm:mx-auto md:mx-0 w-full">
                <img 
                  src="/lovable-uploads/784f93a6-8163-4976-a298-e7d87944eb53.png" 
                  alt="Airplane cabin interior with seats" 
                  className="w-full h-36 sm:h-48 object-cover rounded-lg mb-4 sm:mb-5"
                />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Travel Confidently</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Enjoy peace of mind knowing your baggage will be accepted without issues, letting you focus on your travel experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tips & Tricks Blog Section */}
      <section className="py-10 sm:py-15 md:py-20 bg-gray-50">
        <div className="layout-container">
          <article className="prose prose-zinc lg:prose-lg max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Understanding Luggage Size Requirements</h1>
            
            <img src="/lovable-uploads/ce753aea-3456-4e73-83ea-5ca2237f05e9.png" alt="Luggage Size Guide" className="w-full rounded-xl mb-8" />

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">Why Luggage Size Matters When Traveling</h2>
              <p className="text-lg leading-relaxed">
                Air travel can be stressful, and one of the most frustrating experiences for passengers is arriving at the airport only to find out their bag exceeds airline size limits. Each airline has specific baggage policies, and failing to meet them could mean extra fees, last-minute baggage check-ins, or even having to leave items behind.
              </p>
              <p className="text-lg leading-relaxed">
                To avoid these hassles, it's essential to measure your luggage properly and use a luggage size checker before heading to the airport.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Common Airline Requirements for Luggage Sizes</h2>
              <p className="text-lg leading-relaxed">
                While there are no universal luggage size rules, most airlines follow standard dimensions for carry-on and checked baggage. Here's a general guide:
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Carry-On Luggage Size Restrictions</h3>
              <p className="text-lg leading-relaxed">
                Most major airlines adhere to similar carry-on size limits, typically:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>22 x 14 x 9 inches (56 x 36 x 23 cm) including wheels and handles.</li>
              </ul>
              <p className="text-lg leading-relaxed">
                However, budget airlines like Ryanair, Spirit Airlines, and Wizz Air tend to have stricter rules, often allowing smaller carry-on bags to encourage passengers to pay for checked luggage.
              </p>
              <p className="text-lg leading-relaxed">
                It is always best to check your airline's official baggage policy before flying. You can find this information on their websites, such as:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>American Airlines Baggage Policy</li>
                <li>Ryanair Cabin Bags Guide</li>
                <li>Emirates Baggage Allowance</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Checked Baggage Size & Weight Limits</h3>
              <p className="text-lg leading-relaxed">
                For checked luggage, airlines typically allow standard suitcase dimensions of:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>62 linear inches (158 cm) (total of height + width + depth).</li>
                <li>Weight limit: 50 lbs (23 kg) for economy class, or up to 70 lbs (32 kg) for business/first class.</li>
              </ul>
              <p className="text-lg leading-relaxed">
                Some airlines charge overweight baggage fees, which can range from $50 to $200 per bag, depending on weight.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">How to Measure Your Luggage Correctly</h2>
              <p className="text-lg leading-relaxed">
                Using a luggage size checker is the best way to ensure your bag meets airline regulations. Here's how to measure your suitcase properly:
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Include Wheels and Handles</h3>
              <p className="text-lg leading-relaxed">
                Many travelers make the mistake of measuring only the main compartment of their suitcase. Always measure from the top of the handle to the bottom of the wheels.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Measure the Widest Points</h3>
              <p className="text-lg leading-relaxed">
                Instead of measuring from edge to edge, place a tape measure across the widest part of your bag.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Use a Digital Luggage Scale</h3>
              <p className="text-lg leading-relaxed">
                To avoid overweight baggage fees, use a portable luggage scale to weigh your suitcase before arriving at the airport.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Consider Soft-Sided vs. Hard-Sided Bags</h3>
              <p className="text-lg leading-relaxed">
                Soft suitcases can expand when packed full, potentially pushing them over the size limit. Hard-shell suitcases are less flexible but maintain their dimensions better.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Luggage Size Checker: A Must-Have Travel Tool</h2>
              <p className="text-lg leading-relaxed">
                Instead of guessing whether your suitcase will fit airline requirements, use an online luggage size checker like SizeMyBag to quickly verify dimensions. These tools allow you to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Compare baggage size limits across multiple airlines.</li>
                <li>Check both carry-on and checked bag allowances.</li>
                <li>Get direct links to airline baggage policies.</li>
              </ul>
              <p className="text-lg leading-relaxed">
                Some airports now offer baggage sizers near check-in areas, but it's always better to check before leaving home.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Avoid Extra Fees & Travel Stress</h2>
              <p className="text-lg leading-relaxed">
                Not following airline baggage policies can result in unexpected expenses and last-minute headaches. To avoid problems:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Measure your bag before leaving home.</li>
                <li>Use a luggage size checker for airline-specific rules.</li>
                <li>Weigh your suitcase to prevent overweight baggage fees.</li>
                <li>Check your airline's official website for the latest updates.</li>
              </ul>
              <p className="text-lg leading-relaxed">
                By preparing ahead, you can save money, avoid stress, and travel with confidence knowing your luggage meets all size requirements.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Final Thoughts</h2>
              <p className="text-lg leading-relaxed">
                Packing for a trip doesn't have to be a guessing game. With a luggage size checker, you can easily confirm whether your bags meet airline standards and avoid unnecessary fees at the airport. Whether you're flying on a budget airline or a premium carrier, checking your luggage dimensions in advance is a simple but essential step to smooth travels.
              </p>
              <p className="text-lg leading-relaxed">
                For a fast and accurate luggage size checker, visit SizeMyBag and compare baggage policies today.
              </p>
            </div>

            <div className="mt-12 flex justify-center">
              <Button asChild>
                <Link to="/compare" className="inline-flex items-center gap-2">
                  Check Your Luggage Size Now
                </Link>
              </Button>
            </div>
          </article>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 sm:py-15 md:py-20 bg-white">
        <div className="layout-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">🧳 Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>❓ Do wheels count in luggage measurements?</AccordionTrigger>
                <AccordionContent>
                  Yes, most airlines include wheels and handles in your total baggage dimensions.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>❓ What's the standard carry-on size for airlines?</AccordionTrigger>
                <AccordionContent>
                  Typically 22 x 14 x 9 inches (56 x 36 x 23 cm), but it varies—always check your airline's website.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>❓ What happens if my bag is too big?</AccordionTrigger>
                <AccordionContent>
                  You may be charged an oversized baggage fee or be required to check your bag at the gate.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>❓ Is carry-on size the same for international flights?</AccordionTrigger>
                <AccordionContent>
                  No. International flights, especially on budget airlines, often have stricter carry-on size limits.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Scout Forge Badge Section */}
      <section className="py-10 sm:py-15 md:py-20 bg-gray-50 flex justify-center items-center">
        <div className="layout-container text-center">
          <a 
            href="https://scoutforge.net/reviews/sizemybag/" 
            title="Trusted and reviewed by Scout Forge"
            className="inline-block"
          >
            <img 
              src="https://scoutforge.net/wp-content/themes/wp-theme/assets/img/badges/badge-light.webp" 
              style={{ maxWidth: '300px' }} 
              alt="Trusted and Reviewed by Scout Forge" 
              className="mx-auto"
            />
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

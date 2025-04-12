
import React from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link, useParams, useNavigate } from 'react-router-dom';

// This would typically come from a database or API
const articles = {
  "1": {
    id: 1,
    title: "Understanding Luggage Size Requirements",
    image: "/lovable-uploads/ce753aea-3456-4e73-83ea-5ca2237f05e9.png",
    content: `
      <h2 class="text-2xl font-semibold mt-8 mb-4">Why Luggage Size Matters When Traveling</h2>
      <p class="text-lg leading-relaxed">
        Air travel can be stressful, and one of the most frustrating experiences for passengers is arriving at the airport only to find out their bag exceeds airline size limits. Each airline has specific baggage policies, and failing to meet them could mean extra fees, last-minute baggage check-ins, or even having to leave items behind.
      </p>
      <p class="text-lg leading-relaxed">
        To avoid these hassles, it's essential to measure your luggage properly and use a luggage size checker before heading to the airport.
      </p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">Common Airline Requirements for Luggage Sizes</h2>
      <p class="text-lg leading-relaxed">
        While there are no universal luggage size rules, most airlines follow standard dimensions for carry-on and checked baggage. Here's a general guide:
      </p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Carry-On Luggage Size Restrictions</h3>
      <p class="text-lg leading-relaxed">
        Most major airlines adhere to similar carry-on size limits, typically:
      </p>
      <ul class="list-disc pl-6 space-y-2">
        <li>22 x 14 x 9 inches (56 x 36 x 23 cm) including wheels and handles.</li>
      </ul>
      <p class="text-lg leading-relaxed">
        However, budget airlines like Ryanair, Spirit Airlines, and Wizz Air tend to have stricter rules, often allowing smaller carry-on bags to encourage passengers to pay for checked luggage.
      </p>
      <p class="text-lg leading-relaxed">
        It is always best to check your airline's official baggage policy before flying. You can find this information on their websites, such as:
      </p>
      <ul class="list-disc pl-6 space-y-2">
        <li>American Airlines Baggage Policy</li>
        <li>Ryanair Cabin Bags Guide</li>
        <li>Emirates Baggage Allowance</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">Checked Baggage Size & Weight Limits</h3>
      <p class="text-lg leading-relaxed">
        For checked luggage, airlines typically allow standard suitcase dimensions of:
      </p>
      <ul class="list-disc pl-6 space-y-2">
        <li>62 linear inches (158 cm) (total of height + width + depth).</li>
        <li>Weight limit: 50 lbs (23 kg) for economy class, or up to 70 lbs (32 kg) for business/first class.</li>
      </ul>
      <p class="text-lg leading-relaxed">
        Some airlines charge overweight baggage fees, which can range from $50 to $200 per bag, depending on weight.
      </p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">How to Measure Your Luggage Correctly</h2>
      <p class="text-lg leading-relaxed">
        Using a luggage size checker is the best way to ensure your bag meets airline regulations. Here's how to measure your suitcase properly:
      </p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Include Wheels and Handles</h3>
      <p class="text-lg leading-relaxed">
        Many travelers make the mistake of measuring only the main compartment of their suitcase. Always measure from the top of the handle to the bottom of the wheels.
      </p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Measure the Widest Points</h3>
      <p class="text-lg leading-relaxed">
        Instead of measuring from edge to edge, place a tape measure across the widest part of your bag.
      </p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Use a Digital Luggage Scale</h3>
      <p class="text-lg leading-relaxed">
        To avoid overweight baggage fees, use a portable luggage scale to weigh your suitcase before arriving at the airport.
      </p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Consider Soft-Sided vs. Hard-Sided Bags</h3>
      <p class="text-lg leading-relaxed">
        Soft suitcases can expand when packed full, potentially pushing them over the size limit. Hard-shell suitcases are less flexible but maintain their dimensions better.
      </p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">Luggage Size Checker: A Must-Have Travel Tool</h2>
      <p class="text-lg leading-relaxed">
        Instead of guessing whether your suitcase will fit airline requirements, use an online luggage size checker like SizeMyBag to quickly verify dimensions. These tools allow you to:
      </p>
      <ul class="list-disc pl-6 space-y-2">
        <li>Compare baggage size limits across multiple airlines.</li>
        <li>Check both carry-on and checked bag allowances.</li>
        <li>Get direct links to airline baggage policies.</li>
      </ul>
      <p class="text-lg leading-relaxed">
        Some airports now offer baggage sizers near check-in areas, but it's always better to check before leaving home.
      </p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">Avoid Extra Fees & Travel Stress</h2>
      <p class="text-lg leading-relaxed">
        Not following airline baggage policies can result in unexpected expenses and last-minute headaches. To avoid problems:
      </p>
      <ul class="list-disc pl-6 space-y-2">
        <li>Measure your bag before leaving home.</li>
        <li>Use a luggage size checker for airline-specific rules.</li>
        <li>Weigh your suitcase to prevent overweight baggage fees.</li>
        <li>Check your airline's official website for the latest updates.</li>
      </ul>
      <p class="text-lg leading-relaxed">
        By preparing ahead, you can save money, avoid stress, and travel with confidence knowing your luggage meets all size requirements.
      </p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">Final Thoughts</h2>
      <p class="text-lg leading-relaxed">
        Packing for a trip doesn't have to be a guessing game. With a luggage size checker, you can easily confirm whether your bags meet airline standards and avoid unnecessary fees at the airport. Whether you're flying on a budget airline or a premium carrier, checking your luggage dimensions in advance is a simple but essential step to smooth travels.
      </p>
      <p class="text-lg leading-relaxed">
        For a fast and accurate luggage size checker, visit SizeMyBag and compare baggage policies today.
      </p>
    `
  },
  "2": {
    id: 2,
    title: "Budget Airlines: Navigating Strict Baggage Policies",
    image: "/lovable-uploads/784f93a6-8163-4976-a298-e7d87944eb53.png",
    content: `
      <h2 class="text-2xl font-semibold mt-8 mb-4">Understanding Budget Airline Baggage Policies</h2>
      <p class="text-lg leading-relaxed">
        Budget airlines offer incredibly competitive fares, but they make up for these low prices with stricter baggage allowances and additional fees. Understanding these policies before you book can save you from unexpected costs at the airport.
      </p>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">Common Budget Airline Restrictions</h2>
      <p class="text-lg leading-relaxed">
        Most budget carriers have significantly smaller size and weight allowances than traditional airlines. For example, while a standard carry-on might be 22 x 14 x 9 inches, budget airlines might limit you to 17 x 13 x 8 inches or even smaller.
      </p>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">Tips for Flying with Budget Airlines</h2>
      <ul class="list-disc pl-6 space-y-2">
        <li>Purchase baggage allowance in advance - it's always cheaper than paying at the airport</li>
        <li>Use compression bags to maximize your limited space</li>
        <li>Wear your bulkiest items on the plane</li>
        <li>Consider shipping items to your destination if staying for an extended period</li>
      </ul>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">The True Cost of Budget Travel</h2>
      <p class="text-lg leading-relaxed">
        When comparing flights, always factor in baggage fees to understand the true cost. Sometimes, a slightly more expensive traditional airline ticket with generous baggage allowance might actually be cheaper than a budget fare plus hefty baggage charges.
      </p>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">Final Thoughts</h2>
      <p class="text-lg leading-relaxed">
        Budget airlines can offer great value, but only if you play by their rules. Use our luggage size checker to ensure your bags comply with their restrictions before heading to the airport.
      </p>
    `
  },
  "3": {
    id: 3,
    title: "International Travel: Luggage Requirements By Region",
    image: "/lovable-uploads/b829ab14-a7e8-4e32-9eb6-b2607ad53970.png",
    content: `
      <h2 class="text-2xl font-semibold mt-8 mb-4">Regional Variations in Luggage Requirements</h2>
      <p class="text-lg leading-relaxed">
        When traveling internationally, luggage requirements can vary not just by airline but also by region. Understanding these differences can help you prepare properly for multi-leg journeys.
      </p>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">North America</h2>
      <p class="text-lg leading-relaxed">
        North American carriers typically allow carry-on bags up to 22 x 14 x 9 inches (56 x 36 x 23 cm), with weight limits around 15-22 lbs (7-10 kg). Checked baggage allowances are generally more generous than in other regions.
      </p>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">Europe</h2>
      <p class="text-lg leading-relaxed">
        European airlines, especially budget carriers, often have stricter size limitations. Many European airlines enforce weight limits for carry-on luggage, typically between 15-22 lbs (7-10 kg), even if the bag fits the size requirements.
      </p>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">Asia</h2>
      <p class="text-lg leading-relaxed">
        Asian carriers vary widely, with some offering very generous allowances (like Singapore Airlines) while others have stricter policies. Weight is often more important than dimensions in this region.
      </p>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">Oceania</h2>
      <p class="text-lg leading-relaxed">
        Australian and New Zealand airlines typically have a 7 kg (15 lbs) weight limit for carry-on bags, which is strictly enforced, even if the bag meets size requirements.
      </p>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">Planning Multi-Region Travel</h2>
      <p class="text-lg leading-relaxed">
        When traveling across multiple regions, always pack according to the strictest requirements on your itinerary. This will help you avoid unexpected fees or having to repack at the airport.
      </p>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">Conclusion</h2>
      <p class="text-lg leading-relaxed">
        Always research the specific baggage policies for each airline you'll be flying with on international trips. Use our luggage size checker to compare your bag against various regional requirements.
      </p>
    `
  }
};

const SingleArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Get the current article based on the ID from the URL
  const article = id && articles[id as keyof typeof articles];
  
  // If no article is found, redirect to the articles page
  if (!article) {
    React.useEffect(() => {
      navigate('/article');
    }, [navigate]);
    
    return null;
  }
  
  return (
    <Layout>
      <div className="layout-container py-8 sm:py-12">
        <article className="prose prose-zinc lg:prose-lg max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => navigate('/article')} 
            className="mb-6"
          >
            ← Back to All Articles
          </Button>
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">{article.title}</h1>
          
          <img src={article.image} alt={article.title} className="w-full rounded-xl mb-8" />

          <div className="space-y-6" dangerouslySetInnerHTML={{ __html: article.content }} />

          <div className="mt-12 flex justify-center">
            <Button asChild>
              <Link to="/" className="inline-flex items-center gap-2">
                Check Your Luggage Size Now
              </Link>
            </Button>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default SingleArticle;

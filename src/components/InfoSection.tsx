import { Check } from 'lucide-react';

const InfoSection = () => {
  return (
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
      </div>
    </section>
  );
};

export default InfoSection;
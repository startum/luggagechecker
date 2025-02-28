
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plane, Luggage, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/results?search=${searchTerm}`);
  };
  
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-40 left-0 w-64 h-64 bg-navy-light rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-floating"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-navy/30 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-floating" style={{ animationDelay: '1s' }}></div>
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2070&auto=format&fit=crop"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="layout-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center max-w-6xl mx-auto">
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-1/2 mb-12 lg:mb-0">
            <span className="inline-block px-4 py-1.5 rounded-full bg-navy/10 text-navy-dark text-base font-medium mb-6 animate-fade-in">
              Compare Luggage Policies Across Airlines
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-gordita font-bold tracking-tight mb-6 animate-slide-up">
              Will Your Bag <span className="text-gradient">Fly</span> With You?
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl animate-slide-up font-roboto" style={{ animationDelay: '0.1s' }}>
              Instantly check if your luggage meets size and weight requirements for over 100 airlines worldwide. No more baggage surprises at the airport.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <form onSubmit={handleSearch} className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Search airlines (e.g., Ryanair, EasyJet)" 
                  className="pl-10 h-14 w-full text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
              <Button onClick={handleSearch} className="h-14 bg-navy hover:bg-navy-dark shadow-sm text-white text-base px-6">
                Find Airlines <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Right Column: Image - UPDATED WITH NEW IMAGE */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end animate-fade-in">
            <div className="relative w-full max-w-md">
              <img 
                src="/public/lovable-uploads/ce753aea-3456-4e73-83ea-5ca2237f05e9.png"
                alt="Boarding pass and passport at airport"
                className="rounded-xl shadow-xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-md border border-gray-100">
                <div className="flex items-center gap-2">
                  <Check className="text-navy h-5 w-5" />
                  <span className="text-base font-medium">Verified for 100+ airlines</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 w-full">
          <div 
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in cursor-pointer hover:shadow-md transition-shadow"
            style={{ animationDelay: '0.3s' }}
            onClick={() => {
              const element = document.querySelector('.LuggageInput');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <div className="w-16 h-16 bg-navy/10 rounded-lg flex items-center justify-center mb-5">
              <Luggage className="h-8 w-8 text-navy-dark" />
            </div>
            <h3 className="text-xl font-gordita font-semibold mb-3">Measure Your Luggage</h3>
            <p className="text-gray-600 font-roboto">Enter your bag's dimensions and weight to check against airline limits.</p>
          </div>
          
          <div 
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in cursor-pointer hover:shadow-md transition-shadow" 
            style={{ animationDelay: '0.4s' }}
            onClick={() => navigate('/compare')}
          >
            <div className="w-16 h-16 bg-navy/10 rounded-lg flex items-center justify-center mb-5">
              <Plane className="h-8 w-8 text-navy-dark" />
            </div>
            <h3 className="text-xl font-gordita font-semibold mb-3">Luggage Sizes</h3>
            <p className="text-gray-600 font-roboto">Side-by-side comparison of baggage policies across multiple airlines.</p>
          </div>
          
          <div 
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in cursor-pointer hover:shadow-md transition-shadow" 
            style={{ animationDelay: '0.5s' }}
            onClick={() => navigate('/results')}
          >
            <div className="w-16 h-16 bg-navy/10 rounded-lg flex items-center justify-center mb-5">
              <Search className="h-8 w-8 text-navy-dark" />
            </div>
            <h3 className="text-xl font-gordita font-semibold mb-3">Get Detailed Results</h3>
            <p className="text-gray-600 font-roboto">View comprehensive information about carry-on and checked baggage policies.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

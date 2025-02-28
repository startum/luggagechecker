
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plane, Luggage, ArrowRight, Check, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log(`Navigating to results with search term: ${searchTerm}`);
      navigate(`/results?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      console.log("Empty search term, navigating to results page without search parameter");
      navigate('/results');
    }
  };
  
  return (
    <section className="relative py-20 overflow-hidden bg-white">
      {/* Gradient Top */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-teal/10 to-white"></div>
      
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-yellow/30 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-floating"></div>
      <div className="absolute -bottom-10 right-10 w-72 h-72 bg-teal/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-floating" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-salmon/20 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-floating" style={{ animationDelay: '0.8s' }}></div>
      
      <div className="layout-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center max-w-6xl mx-auto">
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-1/2 mb-12 lg:mb-0">
            <span className="inline-block px-5 py-2 rounded-full bg-salmon/10 text-salmon font-medium mb-8 animate-fade-in">
              <div className="flex items-center gap-2">
                <Luggage className="h-5 w-5" />
                <span>Check Your Luggage Sizes</span>
              </div>
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-gordita font-bold tracking-tight mb-8 animate-slide-up">
              Will Your Bag <span className="text-salmon">Fly</span> With You?
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl animate-slide-up font-roboto" style={{ animationDelay: '0.1s' }}>
              Instantly check if your luggage meets size and weight requirements for airlines worldwide. 
              <span className="font-bold text-salmon"> No more baggage surprises!</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <form onSubmit={handleSearch} className="relative flex-grow w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Search airlines (e.g., Ryanair, EasyJet)" 
                  className="pl-10 h-14 w-full text-base rounded-xl focus:ring-salmon"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="h-14 text-base px-6 font-semibold mt-2 sm:mt-0 sm:absolute sm:right-0 sm:top-0 sm:rounded-l-none"
                >
                  Find Airlines <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
          
          {/* Right Column: Image */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end animate-fade-in">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-yellow rounded-full flex items-center justify-center z-10 animate-pulse-soft">
                <Sun className="h-7 w-7 text-white" />
              </div>
              <img 
                src="/lovable-uploads/ce753aea-3456-4e73-83ea-5ca2237f05e9.png"
                alt="Boarding pass and passport at airport"
                className="rounded-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg gradient-salmon-yellow shadow-lg">
                <div className="flex items-center gap-2">
                  <Check className="text-teal h-5 w-5" />
                  <span className="text-base font-bold">Verified for 40+ airlines!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 w-full">
          <div 
            className="bg-white p-8 rounded-xl animate-fade-in cursor-pointer hover:-translate-y-1 transition-all duration-300 border border-[#F1F0FB] shadow-[2px_2px_10px_rgba(0,0,0,0.05)]"
            style={{ animationDelay: '0.3s' }}
            onClick={() => {
              const element = document.querySelector('.LuggageInput');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <div className="w-16 h-16 bg-salmon/20 rounded-lg flex items-center justify-center mb-5">
              <Luggage className="h-8 w-8 text-salmon" />
            </div>
            <h3 className="text-xl font-gordita font-semibold mb-3">Measure Your Luggage</h3>
            <p className="text-gray-600 font-roboto">Enter your bag's dimensions and weight to check against airline limits.</p>
          </div>
          
          <div 
            className="bg-white p-8 rounded-xl animate-fade-in cursor-pointer hover:-translate-y-1 transition-all duration-300 border border-[#F1F0FB] shadow-[2px_2px_10px_rgba(0,0,0,0.05)]" 
            style={{ animationDelay: '0.4s' }}
            onClick={() => navigate('/compare')}
          >
            <div className="w-16 h-16 bg-teal/20 rounded-lg flex items-center justify-center mb-5">
              <Plane className="h-8 w-8 text-teal" />
            </div>
            <h3 className="text-xl font-gordita font-semibold mb-3">Compare Sizes</h3>
            <p className="text-gray-600 font-roboto">Side-by-side comparison of baggage policies across multiple airlines.</p>
          </div>
          
          <div 
            className="bg-white p-8 rounded-xl animate-fade-in cursor-pointer hover:-translate-y-1 transition-all duration-300 border border-[#F1F0FB] shadow-[2px_2px_10px_rgba(0,0,0,0.05)]" 
            style={{ animationDelay: '0.5s' }}
            onClick={() => navigate('/results')}
          >
            <div className="w-16 h-16 bg-salmon/20 rounded-lg flex items-center justify-center mb-5">
              <Search className="h-8 w-8 text-salmon" />
            </div>
            <h3 className="text-xl font-gordita font-semibold mb-3">Find Your Airline</h3>
            <p className="text-gray-600 font-roboto">View comprehensive information about carry-on and checked baggage policies.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

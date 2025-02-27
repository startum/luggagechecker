
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plane, Luggage, ArrowRight } from 'lucide-react';
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
    <section className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-40 left-0 w-64 h-64 bg-lavender-light rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-floating"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-coral-light rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-floating" style={{ animationDelay: '1s' }}></div>
      
      <div className="layout-container">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-seafoam/10 text-seafoam-dark text-sm font-medium mb-6 animate-fade-in">
            Compare Luggage Policies Across Airlines
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-up">
            Will Your Bag <span className="text-gradient">Fly</span> With You?
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Instantly check if your luggage meets size and weight requirements for over 100 airlines worldwide. No more baggage surprises at the airport.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleSearch} className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search airlines (e.g., Ryanair, EasyJet)" 
                className="pl-10 h-12 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
            <Button onClick={handleSearch} className="h-12 bg-coral hover:bg-coral-dark shadow-sm">
              Find Airlines <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 w-full">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-12 h-12 bg-seafoam/10 rounded-lg flex items-center justify-center mb-4">
                <Luggage className="h-6 w-6 text-seafoam-dark" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Measure Your Luggage</h3>
              <p className="text-gray-600 text-sm">Enter your bag's dimensions and weight to check against airline limits.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-12 h-12 bg-coral/10 rounded-lg flex items-center justify-center mb-4">
                <Plane className="h-6 w-6 text-coral-dark" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Compare Airlines</h3>
              <p className="text-gray-600 text-sm">Side-by-side comparison of baggage policies across multiple airlines.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="w-12 h-12 bg-lavender/10 rounded-lg flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-lavender-dark" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Get Detailed Results</h3>
              <p className="text-gray-600 text-sm">View comprehensive information about carry-on and checked baggage policies.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plane, Luggage, ArrowRight, Check, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import airlineService from '@/utils/airlineData';
import { Airline } from '@/utils/types';

export const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Airline[]>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const performLiveSearch = async () => {
      if (searchTerm.trim().length >= 2) {
        try {
          const results = await airlineService.searchAirlines({
            search: searchTerm
          });
          setSearchResults(results);
          setShowResults(true);
        } catch (error) {
          console.error('Error searching airlines:', error);
          setSearchResults([]);
        }
      } else {
        setShowResults(false);
      }
    };

    const timeoutId = setTimeout(performLiveSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

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

  const handleSelectAirline = (airline: Airline) => {
    setSearchTerm(airline.name);
    setShowResults(false);
    navigate(`/results?search=${encodeURIComponent(airline.name)}`);
  };

  useEffect(() => {
    const handleClickOutside = () => setShowResults(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return <section className="relative py-20 overflow-hidden bg-gradient-to-b from-amber-50 to-white">
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-teal-100/30 to-transparent"></div>
      
      <div className="absolute top-20 left-20 w-64 h-64 bg-amber-200/30 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-floating"></div>
      <div className="absolute -bottom-10 right-10 w-72 h-72 bg-teal-200/30 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-floating" style={{
      animationDelay: '1.5s'
    }}></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-coral-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-floating" style={{
      animationDelay: '0.8s'
    }}></div>
      
      <div className="layout-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center max-w-6xl mx-auto">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-1/2 mb-12 lg:mb-0">
            <span className="inline-block px-5 py-2 rounded-full bg-teal-500/10 font-medium mb-8 animate-fade-in text-teal-600">
              <div className="flex items-center gap-2">
                <Luggage className="h-5 w-5" />
                <span>Online Baggage Sizes</span>
              </div>
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-gordita font-bold tracking-tight mb-8 animate-slide-up text-zinc-900">Luggage Size Checker</h1>
            
            <p className="text-xl text-zinc-600 mb-10 max-w-2xl animate-slide-up font-roboto" style={{
            animationDelay: '0.1s'
          }}>
              Check if your luggage dimensions meet size and weight requirements for popular airlines. 
              <span className="font-bold text-teal-600"> Avoid excess baggage fees!</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md animate-slide-up" style={{
            animationDelay: '0.2s'
          }}>
              <form onSubmit={handleSearch} className="relative flex-grow w-full">
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                    <Input type="text" placeholder="Search airlines for luggage requirements" className="pl-10 h-14 w-full text-base rounded-xl border-zinc-200 focus:border-teal-500 focus:ring-teal-500" value={searchTerm} onChange={e => {
                    setSearchTerm(e.target.value);
                    e.stopPropagation();
                  }} onClick={e => e.stopPropagation()} aria-label="Search airlines for luggage size requirements" />
                  </div>
                  <Button type="submit" size="lg" className="h-14 text-base px-6 font-semibold bg-amber-400 hover:bg-amber-500 text-zinc-900">
                    <Search className="mr-2 h-5 w-5" />
                    <span>Check</span>
                  </Button>
                </div>
                
                {showResults && searchResults.length > 0 && <div className="absolute left-0 right-0 top-full mt-1 bg-white shadow-lg rounded-lg z-50 max-h-60 overflow-y-auto" onClick={e => e.stopPropagation()}>
                    {searchResults.map(airline => <div key={airline.id} className="flex items-center px-4 py-3 hover:bg-zinc-50 cursor-pointer border-b border-zinc-100 last:border-b-0" onClick={() => handleSelectAirline(airline)}>
                        <div className="w-8 h-8 rounded overflow-hidden mr-3 flex-shrink-0">
                          <img src={airline.logo || "/placeholder.svg"} alt={`${airline.name} logo`} className="w-full h-full object-contain" onError={e => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }} />
                        </div>
                        <div>
                          <div className="font-medium">{airline.name}</div>
                          <div className="text-xs text-zinc-500">{airline.code} • {airline.country}</div>
                        </div>
                      </div>)}
                  </div>}
              </form>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center lg:justify-end animate-fade-in">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center z-10 animate-pulse-soft">
                <Sun className="h-7 w-7 text-white" />
              </div>
              <img src="/lovable-uploads/ce753aea-3456-4e73-83ea-5ca2237f05e9.png" alt="Luggage size checker tool with boarding pass and passport" className="rounded-2xl" />
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center gap-2">
                  <Check className="text-teal-500 h-5 w-5" />
                  <span className="text-base font-bold">Verified for 40+ airlines!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 w-full">
          <div className="bg-white p-8 rounded-xl animate-fade-in cursor-pointer hover:-translate-y-1 transition-all duration-300 border border-zinc-100 shadow-sm" style={{
          animationDelay: '0.3s'
        }} onClick={() => {
          const element = document.querySelector('.LuggageInput');
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }}>
            <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center mb-5">
              <Luggage className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-gordita font-semibold mb-3 text-zinc-900">Luggage Size Checker</h3>
            <p className="text-zinc-600 font-roboto">Online tool to check if your bag dimensions and weight meet airline requirements.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl animate-fade-in cursor-pointer hover:-translate-y-1 transition-all duration-300 border border-zinc-100 shadow-sm" style={{
          animationDelay: '0.4s'
        }} onClick={() => navigate('/compare')}>
            <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center mb-5">
              <Plane className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-gordita font-semibold mb-3 text-zinc-900">Compare Luggage Sizes</h3>
            <p className="text-zinc-600 font-roboto">Side-by-side comparison of baggage size policies across multiple airlines.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl animate-fade-in cursor-pointer hover:-translate-y-1 transition-all duration-300 border border-zinc-100 shadow-sm" style={{
          animationDelay: '0.5s'
        }} onClick={() => navigate('/results')}>
            <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-5">
              <Search className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-gordita font-semibold mb-3 text-zinc-900">Airline Luggage Sizes</h3>
            <p className="text-zinc-600 font-roboto">View comprehensive information about carry-on and checked baggage dimensions.</p>
          </div>
        </div>
      </div>
    </section>;
};

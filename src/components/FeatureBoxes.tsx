import { useNavigate } from 'react-router-dom';
import { Luggage, ArrowRight, CreditCard } from 'lucide-react';

export const FeatureBoxes = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-zinc-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-xl animate-fade-in cursor-pointer hover:-translate-y-1 transition-all duration-300 border border-zinc-100 shadow-sm" style={{
          animationDelay: '0.1s'
        }} onClick={() => {
          const element = document.getElementById('luggage-checker');
          element?.scrollIntoView({ behavior: 'smooth' });
        }}>
            <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center mb-5">
              <Luggage className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-gordita font-semibold mb-3 text-zinc-900">Luggage Size Checker</h3>
            <p className="text-zinc-600 font-roboto">Check if your luggage meets airline requirements and avoid excess fees.</p>
          </div>

          <div className="bg-white p-8 rounded-xl animate-fade-in cursor-pointer hover:-translate-y-1 transition-all duration-300 border border-zinc-100 shadow-sm" style={{
          animationDelay: '0.2s'
        }} onClick={() => navigate('/compare')}>
            <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center mb-5">
              <ArrowRight className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-gordita font-semibold mb-3 text-zinc-900">Compare Luggage Sizes</h3>
            <p className="text-zinc-600 font-roboto">Compare luggage dimensions across multiple airlines to find the best option.</p>
          </div>

          <div className="bg-white p-8 rounded-xl animate-fade-in cursor-pointer hover:-translate-y-1 transition-all duration-300 border border-zinc-100 shadow-sm" style={{
          animationDelay: '0.3s'
        }} onClick={() => navigate('/airlines')}>
            <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-5">
              <Luggage className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-gordita font-semibold mb-3 text-zinc-900">Airline Directory</h3>
            <p className="text-zinc-600 font-roboto">Browse all supported airlines and their complete baggage policies and size limits.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl animate-fade-in cursor-pointer hover:-translate-y-1 transition-all duration-300 border border-zinc-100 shadow-sm" style={{
          animationDelay: '0.4s'
        }} onClick={() => navigate('/book-flights')}>
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-5">
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-gordita font-semibold mb-3 text-zinc-900">Book Your Flights</h3>
            <p className="text-zinc-600 font-roboto">Find and book flights with the best deals and convenient booking options.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
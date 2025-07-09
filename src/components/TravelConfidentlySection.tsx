const TravelConfidentlySection = () => {
  return (
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
  );
};

export default TravelConfidentlySection;
const MeasurementGuide = () => {
  return (
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
  );
};

export default MeasurementGuide;
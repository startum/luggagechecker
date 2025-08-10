import { useEffect, useRef } from 'react';

const TransferSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create and load the transfer booking script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://tpemd.com/content?trs=448606&shmarker=664168&locale=en&color_scheme=orange&view=detail&h=Transfer%20bookings&powered_by=true&promo_id=1586&campaign_id=22';
    script.charset = 'utf-8';

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    // Cleanup function to remove script when component unmounts
    return () => {
      if (containerRef.current && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="py-10 sm:py-15 md:py-20 bg-gray-50">
      <div className="layout-container">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Need an airport transfer? Compare transfers in 175+ countries now.
          </h2>
        </div>
        <div ref={containerRef} className="flex justify-center" />
      </div>
    </section>
  );
};

export default TransferSection;
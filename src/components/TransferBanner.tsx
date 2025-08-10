import { useEffect, useRef } from 'react';

const TransferBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create and load the transfer script
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
    <section className="py-10 sm:py-15 md:py-20 bg-white">
      <div className="layout-container">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
            Need an airport transfer?
          </h2>
          <div ref={containerRef} />
        </div>
      </div>
    </section>
  );
};

export default TransferBanner;
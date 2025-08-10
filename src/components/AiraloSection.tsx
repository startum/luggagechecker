import { useEffect, useRef } from 'react';

const AiraloSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create and load the Airalo script
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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">
        Travelling abroad? Save up to 90% on roaming - get an eSIM in 2 minutes with Airalo.
      </h3>
      <div ref={containerRef} />
    </div>
  );
};

export default AiraloSection;
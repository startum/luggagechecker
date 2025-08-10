import { useEffect, useRef } from 'react';

const AiraloSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create and load the Airalo script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://tpemd.com/content?trs=448606&shmarker=664168.airalo-affiliate&locale=en&powered_by=true&color_button=%23f2685f&color_focused=%23f2685f&secondary=%23FFFFFF&dark=%2311100f&light=%23FFFFFF&special=%23FFFFFf&border_radius=5&plain=false&no_labels=true&promo_id=8588&campaign_id=541';
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
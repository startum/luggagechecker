
import { useEffect } from 'react';

/**
 * Hook to preload critical assets for better performance
 */
export function useCriticalAssets() {
  useEffect(() => {
    // Preload critical images that might be needed soon
    const criticalImages = [
      '/lovable-uploads/865cd358-f080-4e87-9b8b-71210a0bd24f.png', // Logo
      '/lovable-uploads/ce753aea-3456-4e73-83ea-5ca2237f05e9.png', // OG image
      '/lovable-uploads/b792be04-2c20-425b-b87b-cc01cc6b3ad3.png'  // Footer logo
    ];
    
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);
}

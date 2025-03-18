
import { useEffect } from 'react';

/**
 * Hook to preload critical assets for better performance
 */
export function useCriticalAssets() {
  useEffect(() => {
    // Preload critical images with proper priorities
    const criticalImages = [
      {
        src: '/lovable-uploads/865cd358-f080-4e87-9b8b-71210a0bd24f.png', // Logo
        importance: 'high'
      },
      {
        src: '/lovable-uploads/ce753aea-3456-4e73-83ea-5ca2237f05e9.png', // OG image
        importance: 'low'
      },
      {
        src: '/lovable-uploads/b792be04-2c20-425b-b87b-cc01cc6b3ad3.png', // Footer logo
        importance: 'low'
      }
    ];
    
    // Use requestIdleCallback for non-critical preloading
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => {
        criticalImages.forEach(image => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = image.src;
          link.fetchPriority = image.importance;
          document.head.appendChild(link);
        });
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        criticalImages.forEach(image => {
          const img = new Image();
          img.src = image.src;
          img.fetchPriority = image.importance;
        });
      }, 0);
    }
  }, []);
}

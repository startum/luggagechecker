
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Use a more efficient way to hydrate the app
const rootElement = document.getElementById("root");

if (rootElement) {
  // Create root outside of any asynchronous context
  const root = createRoot(rootElement);
  
  // Use requestIdleCallback for non-critical rendering when browser is idle
  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => {
      root.render(<App />);
    });
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    root.render(<App />);
  }
}

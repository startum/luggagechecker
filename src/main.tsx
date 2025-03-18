
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Use a more efficient way to hydrate the app
const rootElement = document.getElementById("root");

if (rootElement) {
  // Create root outside of any asynchronous context
  const root = createRoot(rootElement);
  
  // Check if the browser supports the Navigation API
  if ('connection' in navigator && (navigator.connection as any).saveData) {
    // For users on data-saving mode, delay non-critical rendering
    setTimeout(() => {
      root.render(<App />);
    }, 0);
  } else {
    // For normal connections, render immediately
    root.render(<App />);
  }
}

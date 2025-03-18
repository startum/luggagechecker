
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Use a more efficient way to hydrate the app
const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}

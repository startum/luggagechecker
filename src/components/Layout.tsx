
import React from 'react';
import { Navbar } from './Navbar';
import { Toaster } from "sonner";
import { Link } from 'react-router-dom';
import { UnitProvider } from '@/contexts/UnitContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  return (
    <UnitProvider>
      <div className="min-h-screen flex flex-col bg-zinc-50 font-roboto">
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <footer className="py-6 sm:py-8 px-4 bg-white border-t border-zinc-200">
          <div className="layout-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Column 1: Logo + Copyright */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <img 
                  alt="Size My Bag" 
                  className="h-12 sm:h-16 mb-2" 
                  src="/lovable-uploads/b792be04-2c20-425b-b87b-cc01cc6b3ad3.png"
                  loading="lazy"
                  decoding="async"
                />
                <div className="text-xs sm:text-sm text-zinc-500">
                  © {new Date().getFullYear()} Size My Bag. All rights reserved.
                </div>
              </div>
              
              {/* Column 2: Helpful Resources */}
              <div className="text-center md:text-left">
                <h3 className="text-sm font-semibold text-zinc-700 mb-3">Helpful Resources</h3>
                <div className="flex flex-col">
                  <Link to="/bag-sizer" className="text-xs sm:text-sm font-medium text-zinc-600 hover:text-teal-600 transition-colors mb-2">
                    Bag Sizer
                  </Link>
                </div>
              </div>
              
              {/* Column 3: Navigation Links */}
              <div className="text-center md:text-left">
                <h3 className="text-sm font-semibold text-zinc-700 mb-3">Links</h3>
                <div className="flex flex-col gap-2">
                  <Link to="/about" className="text-xs sm:text-sm font-medium text-zinc-600 hover:text-teal-600 transition-colors">About</Link>
                  <Link to="/privacy-policy" className="text-xs sm:text-sm font-medium text-zinc-600 hover:text-teal-600 transition-colors">Privacy Policy</Link>
                  <Link to="/terms" className="text-xs sm:text-sm font-medium text-zinc-600 hover:text-salmon transition-colors">Terms of Service</Link>
                  <a href="mailto:deb@startumproject.com" className="text-xs sm:text-sm font-medium text-zinc-600 hover:text-amber-500 transition-colors">Contact</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <Toaster position="top-center" toastOptions={{
        style: {
          borderRadius: '0.75rem',
          background: 'linear-gradient(to right, rgba(255, 113, 91, 0.1), rgba(255, 209, 102, 0.1))'
        }
      }} />
      </div>
    </UnitProvider>
  );
};

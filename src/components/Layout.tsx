import React from 'react';
import { Navbar } from './Navbar';
import { Toaster } from "sonner";
interface LayoutProps {
  children: React.ReactNode;
}
export const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  return <div className="min-h-screen flex flex-col bg-white font-roboto">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <footer className="py-6 sm:py-8 px-4 bg-white border-t border-teal">
        <div className="layout-container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="flex items-center flex-col md:flex-row text-center md:text-left">
              <img alt="Luggage Checker" className="h-12 sm:h-16 mr-0 md:mr-2 mb-2 md:mb-0" src="/lovable-uploads/b792be04-2c20-425b-b87b-cc01cc6b3ad3.png" />
              <div className="text-xs sm:text-sm text-gray-500">
                © {new Date().getFullYear()} Luggage Checker. All rights reserved.
              </div>
            </div>
            <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
              <a href="#" className="text-xs sm:text-sm font-medium text-gray-600 hover:text-teal transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs sm:text-sm font-medium text-gray-600 hover:text-salmon transition-colors">Terms of Service</a>
              <a href="#" className="text-xs sm:text-sm font-medium text-gray-600 hover:text-yellow transition-colors">Contact</a>
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
    </div>;
};
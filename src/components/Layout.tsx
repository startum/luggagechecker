
import React from 'react';
import { Navbar } from './Navbar';
import { Toaster } from "sonner";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-teal/5 font-roboto">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="py-8 px-4 bg-white border-t-2 border-yellow/50">
        <div className="layout-container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/41cd0ddc-72b6-46a3-92fa-508eafadbd5a.png" 
                alt="Luggage Checker" 
                className="h-12 -rotate-2 mr-2"
              />
              <div className="text-sm text-gray-500">
                © {new Date().getFullYear()} Luggage Checker. All rights reserved.
              </div>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-teal transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-salmon transition-colors">Terms of Service</a>
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-purple transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
      <Toaster position="top-center" toastOptions={{
        style: {
          borderRadius: '0.75rem',
          border: '2px solid rgba(255, 209, 102, 0.5)',
          boxShadow: '3px 3px 0px 0px rgba(6, 188, 193, 0.4)'
        }
      }} />
    </div>
  );
};

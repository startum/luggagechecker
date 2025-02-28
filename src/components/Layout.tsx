
import React from 'react';
import { Navbar } from './Navbar';
import { Toaster } from "sonner";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-teal-light font-roboto">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="py-6 px-4 bg-white border-t border-gray-100">
        <div className="layout-container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Flight Bag Checker. All rights reserved.
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
      <Toaster position="top-center" />
    </div>
  );
};

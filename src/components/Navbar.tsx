
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Luggage, Search, Heart, Home, PlaneTakeoff, Lightbulb, Plane, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [{
    name: 'Home',
    path: '/',
    icon: <Home className="w-4 h-4 mr-2" />,
    iconOnly: false
  }, {
    name: 'Size Checker',
    path: '/luggage-size-checker',
    icon: <Luggage className="w-4 h-4 mr-2" />,
    iconOnly: false
  }, {
    name: 'Airlines',
    path: '/airlines',
    icon: <PlaneTakeoff className="w-4 h-4 mr-2" />,
    iconOnly: false
  }, {
    name: 'Luggage Sizes',
    path: '/compare',
    icon: <Search className="w-4 h-4 mr-2" />,
    iconOnly: false
  }, {
    name: 'Favorites',
    path: '/favorites',
    icon: <Heart className="w-4 h-4" />,
    iconOnly: true
  }, {
    name: 'Tips & Tricks',
    path: '/article',
    icon: <Lightbulb className="w-4 h-4" />,
    iconOnly: true
  }];
  
  return <header className="fixed top-0 z-40 w-full bg-white border-b border-zinc-200">
      <div className="layout-container">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/865cd358-f080-4e87-9b8b-71210a0bd24f.png" 
                alt="Size My Bag" 
                className="h-14 object-contain"
                loading="eager"
                decoding="async"
              />
              <span className="ml-2 text-xl font-bold text-zinc-900">Size My Bag</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => <Link 
                key={link.path} 
                to={link.path} 
                className={cn("flex items-center text-base font-medium transition-colors hover:text-teal-600 px-3 py-2 rounded-lg", isActive(link.path) ? "text-teal-600 bg-teal-50" : "text-zinc-700")}
                aria-label={link.iconOnly ? link.name : undefined}
              >
                {link.icon}
                {!link.iconOnly && link.name}
              </Link>)}
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu" className="text-zinc-700">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden animate-fade-in">
          <nav className="flex flex-col gap-2 p-4 bg-white border-t border-zinc-100">
            {navLinks.map(link => <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setIsMenuOpen(false)} 
                className={cn("flex items-center px-4 py-2 rounded-lg text-base font-medium transition-colors", isActive(link.path) ? "bg-teal-50 text-teal-600" : "hover:bg-zinc-50 hover:text-teal-600")}
                aria-label={link.iconOnly ? link.name : undefined}
              >
                {link.iconOnly ? React.cloneElement(link.icon, { className: "w-4 h-4 mr-2" }) : link.icon}
                {!link.iconOnly ? link.name : link.name}
              </Link>)}
          </nav>
        </div>}
    </header>;
};

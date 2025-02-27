
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Luggage, Search, Heart, Home, PlaneTakeoff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4 mr-2" /> },
    { name: 'Airlines', path: '/results', icon: <PlaneTakeoff className="w-4 h-4 mr-2" /> },
    { name: 'Luggage Sizes', path: '/compare', icon: <Search className="w-4 h-4 mr-2" /> },
    { name: 'Favorites', path: '/favorites', icon: <Heart className="w-4 h-4 mr-2" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-sm bg-white/70 border-b border-gray-100">
      <div className="layout-container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 font-semibold text-xl">
              <span className="text-coral">Flight</span>
              <span className="text-lavender">Bag</span>
              <span className="text-seafoam">Checker</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-coral",
                  isActive(link.path) 
                    ? "text-coral"
                    : "text-foreground/80"
                )}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <nav className="flex flex-col gap-2 p-4 bg-white border-t border-gray-100">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(link.path) 
                    ? "bg-muted text-coral"
                    : "hover:bg-muted"
                )}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

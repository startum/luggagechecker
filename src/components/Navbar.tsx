import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Luggage, Search, Heart, Home, PlaneTakeoff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const navLinks = [{
    name: 'Home',
    path: '/',
    icon: <Home className="w-4 h-4 mr-2" />
  }, {
    name: 'Airlines',
    path: '/results',
    icon: <PlaneTakeoff className="w-4 h-4 mr-2" />
  }, {
    name: 'Luggage Sizes',
    path: '/compare',
    icon: <Search className="w-4 h-4 mr-2" />
  }, {
    name: 'Favorites',
    path: '/favorites',
    icon: <Heart className="w-4 h-4 mr-2" />
  }];
  return <header className="sticky top-0 z-40 w-full bg-white border-b border-teal">
      <div className="layout-container">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center">
              <img alt="Luggage Checker" className="h-28 object-contain" src="/lovable-uploads/e689e6ff-e862-4f2a-9ba8-b40e294263e2.png" />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => <Link key={link.path} to={link.path} className={cn("flex items-center text-base font-medium transition-colors hover:text-salmon px-3 py-2 rounded-lg", isActive(link.path) ? "text-salmon bg-salmon/10" : "text-foreground/80")}>
                {link.icon}
                {link.name}
              </Link>)}
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu" className="text-salmon">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden animate-fade-in">
          <nav className="flex flex-col gap-2 p-4 bg-white border-t border-yellow/50">
            {navLinks.map(link => <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)} className={cn("flex items-center px-4 py-2 rounded-lg text-base font-medium transition-colors", isActive(link.path) ? "bg-salmon/10 text-salmon" : "hover:bg-purple/10 hover:text-purple")}>
                {link.icon}
                {link.name}
              </Link>)}
          </nav>
        </div>}
    </header>;
};
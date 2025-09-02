import React, { useState, useEffect, useMemo } from 'react';
import { Layout } from '@/components/Layout';
import { AirlineCard } from '@/components/AirlineCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, MapPin, Plane, Users } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import airlineService from '@/utils/airlineData';
import { Airline } from '@/utils/types';

const Airlines = () => {
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [filteredAirlines, setFilteredAirlines] = useState<Airline[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'restrictive'>('name');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAirlines = async () => {
      try {
        const allAirlines = await airlineService.getAllAirlines();
        setAirlines(allAirlines);
        setFilteredAirlines(allAirlines);
      } catch (error) {
        console.error('Failed to load airlines:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAirlines();
  }, []);

  // Get unique regions from airlines
  const regions = useMemo(() => {
    const regionSet = new Set(airlines.map(airline => airline.country).filter(Boolean));
    return Array.from(regionSet).sort();
  }, [airlines]);

  // Filter and sort airlines
  useEffect(() => {
    let filtered = [...airlines];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(airline => 
        airline.name.toLowerCase().includes(term) ||
        airline.code.toLowerCase().includes(term) ||
        (airline.country && airline.country.toLowerCase().includes(term))
      );
    }

    // Filter by region
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(airline => airline.country === selectedRegion);
    }

    // Sort airlines
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'restrictive') {
      filtered.sort((a, b) => {
        const volumeA = a.carryOn.maxWidth * a.carryOn.maxHeight * a.carryOn.maxDepth;
        const volumeB = b.carryOn.maxWidth * b.carryOn.maxHeight * b.carryOn.maxDepth;
        return volumeA - volumeB; // Most restrictive first
      });
    }

    setFilteredAirlines(filtered);
  }, [airlines, searchTerm, selectedRegion, sortBy]);

  const stats = useMemo(() => {
    if (airlines.length === 0) return { total: 0, mostRestrictive: null, leastRestrictive: null };

    const sorted = [...airlines].sort((a, b) => {
      const volumeA = a.carryOn.maxWidth * a.carryOn.maxHeight * a.carryOn.maxDepth;
      const volumeB = b.carryOn.maxWidth * b.carryOn.maxHeight * b.carryOn.maxDepth;
      return volumeA - volumeB;
    });

    return {
      total: airlines.length,
      mostRestrictive: sorted[0],
      leastRestrictive: sorted[sorted.length - 1]
    };
  }, [airlines]);

  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedRegion('all');
    setSortBy('name');
  };

  return (
    <Layout>
      <Helmet>
        <title>Complete Airline Baggage Policies & Luggage Size Limits - Size My Bag</title>
        <meta 
          name="description" 
          content="Complete guide to airline baggage policies, carry-on size limits, and checked luggage dimensions for 100+ airlines worldwide. Check your bag size instantly." 
        />
        <meta name="keywords" content="airline baggage policies, carry-on size limits, checked luggage dimensions, airline luggage rules, baggage allowance" />
        <link rel="canonical" href={`${window.location.origin}/airlines`} />
        <meta property="og:title" content="Complete Airline Baggage Policies & Luggage Size Limits" />
        <meta property="og:description" content="Complete guide to airline baggage policies, carry-on size limits, and checked luggage dimensions for 100+ airlines worldwide." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/airlines`} />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-8 pb-12 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="layout-container">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Airline Baggage Policies & Size Limits
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Complete directory of airline carry-on and checked baggage policies. Find size limits, weight restrictions, 
              and baggage fees for airlines worldwide. Check your luggage dimensions against any airline's requirements.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="flex items-center p-4">
                <Plane className="h-8 w-8 text-primary mr-3" />
                <div>
                  <div className="text-2xl font-bold">{stats.total}+</div>
                  <div className="text-sm text-muted-foreground">Airlines Covered</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center p-4">
                <Users className="h-8 w-8 text-secondary mr-3" />
                <div>
                  <div className="text-2xl font-bold">{regions.length}+</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center p-4">
                <MapPin className="h-8 w-8 text-accent mr-3" />
                <div>
                  <div className="text-sm font-medium">Most Restrictive</div>
                  <div className="text-sm text-muted-foreground">
                    {stats.mostRestrictive ? stats.mostRestrictive.name : 'Loading...'}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter Controls */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search airlines by name, code, or country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md text-sm"
                >
                  <option value="all">All Countries</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'restrictive')}
                  className="px-3 py-2 border border-input rounded-md text-sm"
                >
                  <option value="name">Sort by Name</option>
                  <option value="restrictive">Most Restrictive First</option>
                </select>
                {(searchTerm || selectedRegion !== 'all' || sortBy !== 'name') && (
                  <Button variant="outline" size="sm" onClick={handleClearSearch}>
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
            
            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <Badge variant="secondary">
                  Search: "{searchTerm}"
                </Badge>
              )}
              {selectedRegion !== 'all' && (
                <Badge variant="secondary">
                  Country: {selectedRegion}
                </Badge>
              )}
              {sortBy !== 'name' && (
                <Badge variant="secondary">
                  Sort: {sortBy === 'restrictive' ? 'Most Restrictive' : 'Name'}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Airlines Grid */}
      <section className="py-12">
        <div className="layout-container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {filteredAirlines.length === airlines.length 
                ? `All Airlines (${filteredAirlines.length})` 
                : `${filteredAirlines.length} of ${airlines.length} Airlines`}
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white border rounded-lg p-6 animate-pulse">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredAirlines.length === 0 ? (
            <div className="text-center py-12">
              <Filter className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No airlines found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or clearing the filters.
              </p>
              <Button onClick={handleClearSearch}>Clear All Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAirlines.map((airline, index) => (
                <AirlineCard
                  key={airline.id}
                  airline={airline}
                  delay={index * 50}
                  compact={false}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-12 bg-muted/50">
        <div className="layout-container">
          <div className="max-w-4xl mx-auto prose prose-gray">
            <h2 className="text-2xl font-bold mb-6">Understanding Airline Baggage Policies</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Carry-on Baggage Rules</h3>
                <p className="text-muted-foreground">
                  Most airlines allow one piece of carry-on luggage plus a personal item. Dimensions typically range 
                  from 50x40x20cm to 56x45x25cm, with weight limits between 7-10kg. Always check your specific 
                  airline's requirements before traveling.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Checked Baggage Policies</h3>
                <p className="text-muted-foreground">
                  Checked baggage allowances vary significantly by airline, route, and ticket type. Standard dimensions 
                  are usually around 158cm (length + width + height), with weight limits ranging from 20-32kg per bag.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-3">Tips for Avoiding Baggage Fees</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Measure your luggage at home using our luggage size checker</li>
                <li>• Pack light and consider luggage weight restrictions</li>
                <li>• Check if your credit card or airline status provides free baggage</li>
                <li>• Consider shipping items to your destination for longer trips</li>
                <li>• Pack essential items in your carry-on in case of delays</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Airlines;
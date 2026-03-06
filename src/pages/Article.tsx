
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { slugify } from '@/utils/slugify';

// Sample posts data (in a real app, this would come from a database)
const posts = [
  {
    id: 1,
    title: "Understanding Luggage Size Requirements",
    slug: "understanding-luggage-size-requirements",
    excerpt: "Air travel can be stressful, and one of the most frustrating experiences for passengers is arriving at the airport only to find out their bag exceeds airline size limits.",
    image: "/lovable-uploads/ce753aea-3456-4e73-83ea-5ca2237f05e9.png",
    date: "April 10, 2025",
    metaDescription: "Learn about airline luggage size requirements, how to measure your baggage correctly, and avoid extra fees at the airport with our comprehensive guide."
  },
  {
    id: 2,
    title: "Budget Airlines: Navigating Strict Baggage Policies",
    slug: "budget-airlines-navigating-strict-baggage-policies",
    excerpt: "Budget airlines often have stricter baggage policies than traditional carriers. Learn how to avoid extra fees and travel light.",
    image: "/lovable-uploads/784f93a6-8163-4976-a298-e7d87944eb53.png",
    date: "April 5, 2025",
    metaDescription: "Navigate strict baggage policies of budget airlines with our expert tips. Learn how to pack efficiently and avoid unexpected fees on your next trip."
  },
  {
    id: 3,
    title: "International Travel: Luggage Requirements By Region",
    slug: "international-travel-luggage-requirements-by-region",
    excerpt: "Different regions around the world may have varying luggage requirements. Discover the specifics before your next international trip.",
    image: "/lovable-uploads/b829ab14-a7e8-4e32-9eb6-b2607ad53970.png",
    date: "March 28, 2025",
    metaDescription: "Explore luggage requirements for different regions around the world. Get prepared for your international travel with our comprehensive region-by-region guide."
  }
];

const Article = () => {
  return (
    <Layout>
      <Helmet>
        <title>Travel Tips & Luggage Guides – Size My Bag</title>
        <meta name="description" content="Expert travel tips and guides on airline luggage policies, packing strategies, and how to avoid baggage fees. Stay informed for stress-free travel." />
        <link rel="canonical" href="https://sizemybag.com/article" />
        <meta property="og:title" content="Travel Tips & Luggage Guides – Size My Bag" />
        <meta property="og:description" content="Expert travel tips and guides on airline luggage policies, packing strategies, and how to avoid baggage fees." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sizemybag.com/article" />
        <meta property="og:image" content="https://sizemybag.com/og-image.png" />
      </Helmet>
      <div className="layout-container py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">Travel Tips & Guides</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <Link to={`/article/${post.slug}`} className="block">
                  <div className="aspect-w-16 aspect-h-9">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{post.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Read More</Button>
                  </CardFooter>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Article;

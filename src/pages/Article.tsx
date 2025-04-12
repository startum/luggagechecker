
import React from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Sample posts data (in a real app, this would come from a database)
const posts = [
  {
    id: 1,
    title: "Understanding Luggage Size Requirements",
    excerpt: "Air travel can be stressful, and one of the most frustrating experiences for passengers is arriving at the airport only to find out their bag exceeds airline size limits.",
    image: "/lovable-uploads/ce753aea-3456-4e73-83ea-5ca2237f05e9.png",
    date: "April 10, 2025"
  },
  {
    id: 2,
    title: "Budget Airlines: Navigating Strict Baggage Policies",
    excerpt: "Budget airlines often have stricter baggage policies than traditional carriers. Learn how to avoid extra fees and travel light.",
    image: "/lovable-uploads/784f93a6-8163-4976-a298-e7d87944eb53.png",
    date: "April 5, 2025"
  },
  {
    id: 3,
    title: "International Travel: Luggage Requirements By Region",
    excerpt: "Different regions around the world may have varying luggage requirements. Discover the specifics before your next international trip.",
    image: "/lovable-uploads/b829ab14-a7e8-4e32-9eb6-b2607ad53970.png",
    date: "March 28, 2025"
  }
];

const Article = () => {
  return (
    <Layout>
      <div className="layout-container py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">Travel Tips & Guides</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <Link to={`/article/${post.id}`} className="block">
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

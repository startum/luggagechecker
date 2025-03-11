
import React from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Article = () => {
  return (
    <Layout>
      <div className="layout-container py-8 sm:py-12">
        <article className="prose prose-zinc lg:prose-lg max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">Understanding Luggage Size Requirements</h1>
          
          <div className="mb-4 text-zinc-500">
            Published on {new Date().toLocaleDateString()}
          </div>

          <img 
            src="/lovable-uploads/ce753aea-3456-4e73-83ea-5ca2237f05e9.png"
            alt="Luggage Size Guide"
            className="w-full rounded-xl mb-8"
          />

          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              When it comes to air travel, one of the most important things to consider is your luggage size. Airlines have specific requirements for both carry-on and checked baggage, and exceeding these limits can result in additional fees or having to check your bag at the gate.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Common Airline Requirements</h2>
            <p className="text-lg leading-relaxed">
              Most airlines have similar size restrictions for carry-on luggage, typically around 22 x 14 x 9 inches (56 x 36 x 23 cm). However, specific requirements can vary by airline and route.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Tips for Measuring Your Luggage</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>Always include wheels and handles in your measurements</li>
              <li>Measure at the widest points of your bag</li>
              <li>Consider using a luggage size checker tool</li>
              <li>Remember that soft-sided bags may expand when packed</li>
            </ul>
          </div>

          <div className="mt-12 flex justify-center">
            <Button asChild>
              <Link to="/" className="inline-flex items-center gap-2">
                Check Your Luggage Size Now
              </Link>
            </Button>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default Article;

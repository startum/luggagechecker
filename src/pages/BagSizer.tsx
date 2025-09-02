import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, X, AlertTriangle, Ruler, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

const BagSizer = () => {
  return (
    <>
      <Helmet>
        <title>Airport Bag Sizer Guide - Check Your Carry-On Size Online | SizeMyBag</title>
        <meta name="description" content="Learn about airport bag sizers, why airlines use them, and how to avoid last-minute check-in fees. Use our online bag sizer tool to check carry-on dimensions before you fly." />
        <meta name="keywords" content="bag sizer, airport bag sizer, carry on bag sizer, luggage sizer, airline bag checker, carry-on dimensions" />
        <link rel="canonical" href="https://sizemybag.com/bag-sizer" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Airport Bag Sizer Guide - Check Your Carry-On Size Online" />
        <meta property="og:description" content="Learn about airport bag sizers and use our online tool to check carry-on dimensions before you fly." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://sizemybag.com/bag-sizer" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Airport Bag Sizer Guide - Check Your Carry-On Size Online" />
        <meta name="twitter:description" content="Learn about airport bag sizers and use our online tool to check carry-on dimensions before you fly." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container mx-auto px-4 pt-24 pb-8 max-w-4xl">
          {/* Hero Section */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Airport Bag Sizer: Your Complete Guide
            </h1>
            <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
              Discover what airport bag sizers are, why airlines use them, and how to avoid unexpected check-in fees with our online carry-on bag sizer tool.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/">Check Your Bag Size Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/results">Browse Airlines</Link>
              </Button>
            </div>
          </header>

          {/* What is a Bag Sizer Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">What is an Airport Bag Sizer?</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  An airport bag sizer is a metal or plastic frame device used by airlines at check-in counters and boarding gates to verify that carry-on luggage meets the airline's size requirements. These standardized measuring tools ensure that passenger bags will fit in aircraft overhead compartments.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  The bag sizer acts as a physical template - if your luggage fits completely within the frame without forcing, it meets the airline's carry-on size restrictions. If it doesn't fit, you'll typically be required to check the bag for an additional fee.
                </p>
              </div>
              <div className="bg-muted/50 p-8 rounded-lg">
                <img 
                  src="/lovable-uploads/630eedf4-e53d-4ef4-9417-a537b4fdf05e.png" 
                  alt="Airport bag sizer frame showing carry-on luggage size limits"
                  className="w-full h-auto rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          {/* Why Airlines Use Bag Sizers */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Why Do Airlines Use Bag Sizers?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <Shield className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Safety Compliance</h3>
                <p className="text-muted-foreground">
                  Oversized bags can pose safety risks if they don't fit properly in overhead compartments, potentially falling during turbulence.
                </p>
              </Card>
              <Card className="p-6">
                <Ruler className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Space Management</h3>
                <p className="text-muted-foreground">
                  Aircraft overhead bins have limited space. Standardized bag sizes ensure fair allocation for all passengers.
                </p>
              </Card>
              <Card className="p-6">
                <Clock className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Boarding Efficiency</h3>
                <p className="text-muted-foreground">
                  Properly sized bags load faster, reducing boarding delays and improving on-time performance.
                </p>
              </Card>
            </div>
          </section>

          {/* Common Pitfalls */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Common Bag Sizer Pitfalls Travelers Face</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                <AlertTriangle className="h-6 w-6 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Last-Minute Surprises</h3>
                  <p className="text-muted-foreground">
                    Many travelers discover their "carry-on" bag is too large only when they reach the airport, resulting in unexpected check-in fees ranging from $50-$200.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                <AlertTriangle className="h-6 w-6 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Different Airlines, Different Rules</h3>
                  <p className="text-muted-foreground">
                    Budget airlines often have stricter size limits than full-service carriers. A bag that works for one airline might be rejected by another.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                <AlertTriangle className="h-6 w-6 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Bulging and Expandable Bags</h3>
                  <p className="text-muted-foreground">
                    Overpacking can cause bags to bulge beyond their stated dimensions, making them fail the bag sizer test even if they're technically the right size.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How SizeMyBag Works */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">How SizeMyBag Works as Your Online Bag Sizer</h2>
            <div className="bg-primary/5 p-8 rounded-xl border border-primary/10 mb-8">
              <p className="text-lg text-foreground mb-4 font-medium">
                Skip the airport surprises! Our online bag sizer tool lets you check your carry-on dimensions against any airline's requirements from the comfort of your home.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Step-by-Step Guide</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-semibold">Measure Your Bag</h4>
                      <p className="text-muted-foreground text-sm">Use a tape measure to get the length, width, and height of your luggage in inches or centimeters.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-semibold">Enter Your Dimensions</h4>
                      <p className="text-muted-foreground text-sm">Input your bag's measurements into our online bag sizer tool.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-semibold">Select Your Airline</h4>
                      <p className="text-muted-foreground text-sm">Choose from our database of 100+ airlines to check specific size requirements.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                    <div>
                      <h4 className="font-semibold">Get Instant Results</h4>
                      <p className="text-muted-foreground text-sm">See immediately if your bag meets the requirements or if you need to repack.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <Card className="p-6 bg-green-50 border-green-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <Check className="h-6 w-6 text-green-600" />
                    <h4 className="font-semibold text-green-800">Benefits of Using SizeMyBag</h4>
                  </div>
                  <ul className="space-y-2 text-green-700 text-sm">
                    <li>• Avoid surprise check-in fees</li>
                    <li>• Compare multiple airlines at once</li>
                    <li>• Real-time size verification</li>
                    <li>• Works with any device</li>
                    <li>• Free to use</li>
                  </ul>
                </Card>
                
                <Button asChild size="lg" className="w-full">
                  <Link to="/">Try Our Online Bag Sizer Now</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Frequently Asked Questions About Bag Sizers</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What size should my carry-on bag be?</AccordionTrigger>
                <AccordionContent>
                  Most airlines allow carry-on bags with maximum dimensions of 22" x 14" x 9" (56 x 36 x 23 cm), but this varies by airline. Budget carriers often have smaller limits like 20" x 16" x 8". Always check your specific airline's requirements before traveling.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Do all airlines use bag sizers?</AccordionTrigger>
                <AccordionContent>
                  Most airlines use bag sizers at check-in counters and boarding gates, especially budget carriers. Some airlines are stricter than others about enforcing size limits. It's always better to be prepared and check your bag dimensions beforehand.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>What happens if my bag doesn't fit in the bag sizer?</AccordionTrigger>
                <AccordionContent>
                  If your bag doesn't fit in the airline's bag sizer, you'll typically be required to check it as luggage for an additional fee. These fees can range from $50 to $200 depending on the airline and route. Some airlines may allow you to remove items to make it fit.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Are bag sizer measurements the same for all airlines?</AccordionTrigger>
                <AccordionContent>
                  No, bag sizer dimensions vary between airlines. Full-service carriers typically allow larger carry-ons than budget airlines. International and domestic flights may also have different size limits. Always verify the specific requirements for your airline and route.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>Can I use SizeMyBag instead of the airport bag sizer?</AccordionTrigger>
                <AccordionContent>
                  SizeMyBag helps you verify your bag dimensions before you get to the airport, reducing the risk of surprises at check-in. While the final decision is made by airline staff using their physical bag sizer, our tool uses the same official dimensions to give you accurate predictions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Don't Let Bag Size Surprises Ruin Your Trip
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Use our free online bag sizer tool to check your carry-on dimensions against any airline's requirements. 
              Save money, time, and stress by verifying your luggage size before you leave home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/">Check My Bag Size</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/compare">Compare Airlines</Link>
              </Button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default BagSizer;
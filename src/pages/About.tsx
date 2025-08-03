import { Layout } from '@/components/Layout';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <Layout>
      <Helmet>
        <title>About SizeMyBag - Never Guess Your Bag Size Again</title>
        <meta name="description" content="Learn about SizeMyBag.com - the web's most practical tool for travelers who want peace of mind before flying. Check bag sizes, compare airlines, and travel smarter." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
        <div className="layout-container py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                About SizeMyBag
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                Never Guess Your Bag Size Again.
              </p>
            </div>

            <div className="space-y-12">
              <section className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  At SizeMyBag.com, we take the guesswork out of packing. Whether you're flying budget or premium, every airline has its own quirky rules about baggage sizes—and surprise fees can quickly turn a cheap flight into an expensive mistake. Our mission is simple: help you check if your bag fits before you even get to the airport.
                </p>
              </section>

              <section className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
                <h2 className="text-2xl font-bold text-foreground mb-6">What We Do</h2>
                <p className="text-muted-foreground mb-6">
                  SizeMyBag is the web's most practical tool for travelers who want peace of mind before flying. We offer:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></span>
                    Bag size checkers by airline (carry-on, personal item, and checked baggage dimensions)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></span>
                    Side-by-side airline baggage comparisons
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></span>
                    Airline-specific baggage policies and restrictions
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></span>
                    Visual tools to compare your bag to the airline's limits
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></span>
                    User-generated insights from real travelers
                  </li>
                </ul>
                <p className="text-muted-foreground mt-6">
                  No app downloads, no fluff—just the info you need in seconds.
                </p>
              </section>

              <section className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
                <h2 className="text-2xl font-bold text-foreground mb-6">Why It Matters</h2>
                <p className="text-lg font-medium text-foreground mb-4">
                  Inconsistent rules. Surprise fees. Stressed-out check-ins.
                </p>
                <p className="text-muted-foreground">
                  Millions of travelers get caught off guard every year because airlines don't follow a single standard. SizeMyBag.com helps you travel smarter by making sure your backpack, roller, or duffel won't get flagged at the gate.
                </p>
              </section>

              <section className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
                <h2 className="text-2xl font-bold text-foreground mb-6">How We're Different</h2>
                <p className="text-muted-foreground mb-4">
                  Unlike static airline FAQ pages, our platform is built with SEO in mind and fueled by automation. We keep baggage info up to date and searchable by airline, bag type, and region. Plus, we're growing a crowdsourced knowledge base of real-world traveler experiences.
                </p>
                <p className="text-lg font-medium text-primary">
                  Our goal? Become the go-to destination for baggage size clarity worldwide.
                </p>
              </section>

              <section className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
                <h2 className="text-2xl font-bold text-foreground mb-6">Who's Behind It</h2>
                <p className="text-muted-foreground">
                  SizeMyBag is an independent, traveler-first project created by a small team obsessed with making travel less frustrating and more efficient. No corporate spin—just clean, honest tools.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
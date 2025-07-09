import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQSection = () => {
  return (
    <section className="py-10 sm:py-15 md:py-20 bg-white">
      <div className="layout-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">🧳 Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>❓ Do wheels count in luggage measurements?</AccordionTrigger>
              <AccordionContent>
                Yes, most airlines include wheels and handles in your total baggage dimensions.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>❓ What's the standard carry-on size for airlines?</AccordionTrigger>
              <AccordionContent>
                Typically 22 x 14 x 9 inches (56 x 36 x 23 cm), but it varies—always check your airline's website.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>❓ What happens if my bag is too big?</AccordionTrigger>
              <AccordionContent>
                You may be charged an oversized baggage fee or be required to check your bag at the gate.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>❓ Is carry-on size the same for international flights?</AccordionTrigger>
              <AccordionContent>
                No. International flights, especially on budget airlines, often have stricter carry-on size limits.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
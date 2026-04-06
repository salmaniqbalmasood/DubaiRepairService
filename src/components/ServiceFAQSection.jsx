
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ServiceFAQSection = ({ faqs }) => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">Everything you need to know about our repair services.</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full bg-card rounded-2xl border border-white/5 p-2 shadow-xl">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className={index === faqs.length - 1 ? "border-none px-4" : "border-white/5 px-4"}>
              <AccordionTrigger className="text-left font-semibold text-white hover:text-primary text-lg py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default ServiceFAQSection;

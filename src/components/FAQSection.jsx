
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import pb from '@/lib/pocketbaseClient';

const FAQSection = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const records = await pb.collection('faqs').getList(1, 10, {
          sort: 'order',
          $autoCancel: false
        });
        if (records.items.length > 0) {
          setFaqs(records.items);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };
    fetchFaqs();
  }, []);

  const defaultFaqs = [
    { id: 1, question: 'How fast can you repair my appliance?', answer: 'We offer same-day service across Dubai. In most cases, our technicians can reach your location within a few hours of your call.' },
    { id: 2, question: 'Do you use genuine replacement parts?', answer: 'Yes, we strictly use 100% genuine and original parts sourced directly from manufacturers to ensure the longevity of your appliance.' },
    { id: 3, question: 'Is there a warranty on your repairs?', answer: 'Absolutely. We provide a comprehensive 6 to 12-month warranty on all our repair services and replaced parts.' },
    { id: 4, question: 'Which appliance brands do you cover?', answer: 'Our certified technicians are trained to repair all major brands including Samsung, LG, Bosch, Siemens, Whirlpool, Panasonic, and more.' },
    { id: 5, question: 'Which areas in Dubai do you serve?', answer: 'We serve all neighborhoods in Dubai, including Marina, Downtown, Al Quoz, JBR, Palm Jumeirah, Deira, Bur Dubai, and Arabian Ranches.' },
    { id: 6, question: 'How much do you charge for a diagnosis?', answer: 'We offer transparent pricing. The diagnosis fee is often waived if you proceed with the repair service with us.' },
    { id: 7, question: 'Do you repair appliances on-site?', answer: 'Yes, 95% of our repairs are completed on-site at your home or office during the first visit.' },
    { id: 8, question: 'What happens if the appliance breaks down again?', answer: 'If the same issue occurs within the warranty period, we will fix it completely free of charge.' },
    { id: 9, question: 'Do you offer emergency repair services?', answer: 'Yes, we have a dedicated team for emergency repairs available 24/7 for critical appliances like refrigerators.' },
    { id: 10, question: 'How can I book an appointment?', answer: 'You can book instantly by calling us, sending a WhatsApp message, or filling out the contact form on our website.' },
  ];

  const displayData = faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Got Questions?</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Frequently Asked <span className="text-gradient-orange">Questions</span></h3>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our appliance repair services in Dubai.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {displayData.map((faq) => (
              <AccordionItem key={faq.id} value={`item-${faq.id}`} className="bg-card border border-border rounded-xl px-6 overflow-hidden data-[state=open]:border-primary/50 transition-colors">
                <AccordionTrigger className="text-left text-white hover:text-primary font-semibold text-lg py-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

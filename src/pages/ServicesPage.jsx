
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingContactButtons from '@/components/FloatingContactButtons.jsx';
import AnnouncementBanner from '@/components/AnnouncementBanner.jsx';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

const IMAGE_MAP = {
  'Washing Machine Repair': 'https://images.unsplash.com/photo-1699457062599-da2e073c78ee',
  'Refrigerator Repair': 'https://images.unsplash.com/photo-1676210132787-7ed33de174d6',
  'Air Conditioner Repair': 'https://images.unsplash.com/photo-1535116759413-75a497be0db4',
  'Electric/Gas Oven Repair': 'https://images.unsplash.com/photo-1580386993298-b6049447a428',
  'Washer/Dryer Repair': 'https://images.unsplash.com/photo-1676210132787-7ed33de174d6',
  'Water Heater Repair & Installation': 'https://images.unsplash.com/photo-1676210134188-4c05dd172f89',
  'Paint Work & Renovation': 'https://images.unsplash.com/photo-1675191862482-f0008e67b41b'
};

const ServicesPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const records = await pb.collection('services').getFullList({ sort: 'order', $autoCancel: false });
        setServices(records);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <>
      <Helmet>
        <title>Expert Appliance Repair Services in Dubai | Same-Day Fix</title>
        <meta name="description" content="Professional appliance repair services in Dubai. We fix washing machines, refrigerators, ovens, ACs, and water heaters. Call +971 52 541 9624." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <AnnouncementBanner />
        <Header />

        <main className="flex-1">
          <section className="py-16 md:py-24 border-b border-white/5 bg-gradient-to-b from-background to-card/30">
            <div className="container mx-auto px-4 text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white tracking-tight">
                  Expert Repairs, <span className="text-primary">Guaranteed Results</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Don't let broken appliances disrupt your life. Our certified technicians provide fast, reliable solutions with genuine parts across Dubai.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-24 max-w-6xl mx-auto">
                {services.map((service, index) => {
                  const imageUrl = IMAGE_MAP[service.name] || (service.image ? pb.files.getUrl(service, service.image) : 'https://images.unsplash.com/photo-1581092160562-40aa08e78837');
                  const isEven = index % 2 === 0;

                  return (
                    <div key={service.id} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
                      <div className="w-full md:w-1/2">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] border border-white/10 hover-glow-orange">
                          <img src={imageUrl} alt={service.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 space-y-6">
                        <h2 className="text-3xl font-bold text-white">{service.name}</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">{service.description}</p>

                        {service.benefits && service.benefits.length > 0 && (
                          <ul className="space-y-3">
                            {service.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />
                                <span className="text-foreground/90">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        <div className="pt-4">
                          <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold px-8 shadow-lg shadow-primary/20">
                            <Link to="/contact">Fix My {service.name.split(' ')[0]} Today</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-20 bg-card/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                <p className="text-muted-foreground">Clear answers to help you make the right choice.</p>
              </div>
              <Accordion type="single" collapsible className="w-full bg-card rounded-2xl border border-white/5 p-2 shadow-xl">
                <AccordionItem value="item-1" className="border-white/5 px-4">
                  <AccordionTrigger className="text-left font-semibold text-white hover:text-primary">Do you offer same-day service in Dubai?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">Yes! We prioritize urgent repairs and offer same-day service across all areas of Dubai to get your life back to normal quickly.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-white/5 px-4">
                  <AccordionTrigger className="text-left font-semibold text-white hover:text-primary">Are your parts genuine?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">Absolutely. We strictly use genuine OEM parts to ensure the longevity, safety, and optimal performance of your appliances.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-none px-4">
                  <AccordionTrigger className="text-left font-semibold text-white hover:text-primary">Do you provide a warranty?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">Yes, we stand by our work. All our repairs come with a comprehensive warranty on both parts and labor for your peace of mind.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
        </main>

        <Footer />
        <FloatingContactButtons />
      </div>
    </>
  );
};

export default ServicesPage;

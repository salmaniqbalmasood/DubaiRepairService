
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, ArrowRight, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient';

const SpecialOffersSection = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const records = await pb.collection('special_offers').getList(1, 4, {
          filter: 'is_active = true',
          $autoCancel: false
        });
        if (records.items.length > 0) {
          setOffers(records.items);
        }
      } catch (error) {
        console.error("Error fetching special offers:", error);
      }
    };
    fetchOffers();
  }, []);

  const defaultOffers = [
    { id: 1, title: '20% Off First Service', description: 'New customers get an exclusive 20% discount on labor charges for their first appliance repair.', discount_percentage: 20 },
    { id: 2, title: 'Free Diagnosis', description: 'Diagnosis fee completely waived when you proceed with the recommended repair service.', discount_percentage: 100 },
    { id: 3, title: 'Bundle Discount', description: 'Need multiple appliances fixed? Get 15% off the total bill when repairing 2 or more items.', discount_percentage: 15 },
  ];

  const displayData = offers.length > 0 ? offers : defaultOffers;

  return (
    <section className="py-24 bg-[hsl(var(--brand-orange-light))] border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Limited Time</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-[hsl(var(--brand-navy))] mb-6">Special <span className="text-primary">Offers</span></h3>
          <p className="text-lg text-[hsl(var(--brand-charcoal))] font-medium">
            Take advantage of our current promotions and save on your next appliance repair service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayData.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card border-2 border-primary/20 hover:border-primary shadow-xl h-full flex flex-col relative overflow-hidden group transition-all duration-300 hover:-translate-y-1">
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-xl font-bold text-sm flex items-center gap-1 shadow-md">
                  <Clock className="h-3 w-3" /> Limited Time
                </div>
                <CardContent className="p-8 flex flex-col flex-1">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                    <Tag className="h-7 w-7" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">{offer.title}</h4>
                  <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
                    {offer.description}
                  </p>
                  <Button asChild className="w-full bg-primary text-white hover:bg-[#e55a2b] shadow-md rounded-xl group-hover:shadow-lg transition-all">
                    <Link to="/contact">
                      Claim Offer <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffersSection;

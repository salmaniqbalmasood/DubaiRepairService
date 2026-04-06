
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Clock, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import pb from '@/lib/pocketbaseClient';

const TrustIndicatorsSection = () => {
  const [indicators, setIndicators] = useState([]);

  useEffect(() => {
    const fetchIndicators = async () => {
      try {
        const records = await pb.collection('trust_indicators').getList(1, 4, {
          sort: 'order',
          $autoCancel: false
        });
        if (records.items.length > 0) {
          setIndicators(records.items);
        }
      } catch (error) {
        console.error("Error fetching trust indicators:", error);
      }
    };
    fetchIndicators();
  }, []);

  const defaultIndicators = [
    { id: 1, label: 'Serving Dubai', number: '12+ Years', icon: Award },
    { id: 2, label: 'Happy Customers', number: '10,000+', icon: Users },
    { id: 3, label: 'Available', number: 'Same-Day Service', icon: Clock },
    { id: 4, label: 'Guarantee', number: '100% Genuine Parts', icon: ShieldCheck },
  ];

  const displayData = indicators.length > 0 ? indicators : defaultIndicators;

  return (
    <section className="py-16 bg-secondary border-y border-border relative z-20 -mt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayData.map((item, index) => {
            const Icon = item.icon || Award; // Fallback icon if from DB without file
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-card border-border hover-glow-orange h-full">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="h-14 w-14 rounded-xl bg-background flex items-center justify-center shrink-0 border border-border">
                      {item.icon_file ? (
                        <img src={pb.files.getUrl(item, item.icon_file)} alt={item.label} className="h-7 w-7 object-contain" />
                      ) : (
                        <Icon className="h-7 w-7 text-primary" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white leading-tight">{item.number}</h4>
                      <p className="text-sm text-muted-foreground font-medium">{item.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicatorsSection;

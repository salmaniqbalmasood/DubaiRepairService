
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import pb from '@/lib/pocketbaseClient';

const ServiceAreasSection = () => {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const records = await pb.collection('service_areas').getList(1, 20, {
          filter: 'is_active = true',
          $autoCancel: false
        });
        if (records.items.length > 0) {
          setAreas(records.items);
        }
      } catch (error) {
        console.error("Error fetching service areas:", error);
      }
    };
    fetchAreas();
  }, []);

  const defaultAreas = [
    { id: 1, area_name: 'Al Quoz' },
    { id: 2, area_name: 'Downtown Dubai' },
    { id: 3, area_name: 'Dubai Marina' },
    { id: 4, area_name: 'Jumeirah Beach Residence (JBR)' },
    { id: 5, area_name: 'Deira' },
    { id: 6, area_name: 'Bur Dubai' },
    { id: 7, area_name: 'Palm Jumeirah' },
    { id: 8, area_name: 'Arabian Ranches' },
    { id: 9, area_name: 'Business Bay' },
    { id: 10, area_name: 'Jumeirah Lake Towers (JLT)' },
    { id: 11, area_name: 'Dubai Silicon Oasis' },
    { id: 12, area_name: 'Motor City' },
  ];

  const displayData = areas.length > 0 ? areas : defaultAreas;

  return (
    <section className="py-24 bg-secondary border-t border-border relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 text-primary/5 pointer-events-none">
        <MapPin className="h-96 w-96" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/3 text-center lg:text-left">
            <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Coverage</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">We Serve All <span className="text-gradient-orange">Dubai Areas</span></h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our mobile technician units are strategically stationed across the city to ensure rapid response times. Same-day service is available everywhere in Dubai.
            </p>
            <div className="inline-flex items-center gap-3 bg-card border border-border px-6 py-4 rounded-2xl shadow-md">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              <span className="text-white font-semibold">No extra travel charges</span>
            </div>
          </div>

          <div className="lg:w-2/3 w-full">
            <Card className="bg-card border-border shadow-xl">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {displayData.map((area, index) => (
                    <motion.div
                      key={area.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-background transition-colors border border-transparent hover:border-border"
                    >
                      <MapPin className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-white font-medium">{area.area_name}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasSection;

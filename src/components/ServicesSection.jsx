
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import pb from '@/lib/pocketbaseClient';

const IMAGE_MAP = {
  'Washing Machine Repair': 'https://images.unsplash.com/photo-1699457062599-da2e073c78ee',
  'Refrigerator Repair': 'https://images.unsplash.com/photo-1676210132787-7ed33de174d6',
  'Air Conditioner Repair': 'https://images.unsplash.com/photo-1593673840431-f73577938445',
  'Electric/Gas Oven Repair': 'https://images.unsplash.com/photo-1550120065-84016062ac05',
  'Washer/Dryer Repair': 'https://images.unsplash.com/photo-1492356349725-52e3ffc1130d',
  'Water Heater Repair & Installation': 'https://images.unsplash.com/photo-1666725059684-12edf238dc34',
  'Paint Work & Renovation': 'https://images.unsplash.com/photo-1629195352955-850830e4d6c9'
};

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const records = await pb.collection('services').getList(1, 6, { 
          sort: 'order', 
          $autoCancel: false 
        });
        setServices(records.items);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Our Expertise</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Professional <span className="text-gradient-orange">Appliance Repair</span></h3>
          <p className="text-lg text-muted-foreground">
            From washing machines to refrigerators, our certified technicians handle all major home appliances with precision and care.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex flex-col space-y-4">
                <Skeleton className="h-56 w-full rounded-3xl bg-card" />
                <Skeleton className="h-8 w-3/4 bg-card" />
                <Skeleton className="h-4 w-full bg-card" />
                <Skeleton className="h-4 w-5/6 bg-card" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-destructive p-8 bg-destructive/10 rounded-2xl border border-destructive/20">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const imageUrl = IMAGE_MAP[service.name] || (service.image ? pb.files.getUrl(service, service.image) : null);
              
              return (
                <motion.div 
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex flex-col bg-card rounded-3xl overflow-hidden border border-border shadow-lg hover-glow-orange hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden bg-tertiary-bg">
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={service.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-primary">
                        <Wrench className="h-16 w-16 opacity-50 drop-shadow-[0_0_10px_rgba(255,107,53,0.5)]" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90"></div>
                    <div className="absolute bottom-4 left-6 right-6">
                      <h4 className="text-2xl font-bold text-white drop-shadow-md group-hover:text-primary transition-colors duration-300">{service.name}</h4>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-muted-foreground mb-6 line-clamp-3 flex-1 leading-relaxed">
                      {service.description}
                    </p>
                    <Button asChild variant="outline" className="w-full mt-auto border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded-xl bg-transparent">
                      <Link to="/services">
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;

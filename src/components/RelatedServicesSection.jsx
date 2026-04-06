
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const RelatedServicesSection = ({ services }) => {
  return (
    <section className="py-20 bg-background border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Other Services We Offer</h2>
            <p className="text-muted-foreground">Comprehensive repair solutions for all your household appliances.</p>
          </div>
          <Link to="/services" className="text-primary hover:text-primary/80 font-semibold flex items-center gap-2 transition-colors">
            View All Services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link key={index} to={service.path}>
              <Card className="bg-card border-white/5 hover:border-primary/50 transition-all hover:-translate-y-1 group h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedServicesSection;

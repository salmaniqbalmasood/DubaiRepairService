
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck, Award, BadgeDollarSign, Shield, MapPin, ThumbsUp, Headphones } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const WhyChooseUsSection = () => {
  const benefits = [
    {
      icon: Clock,
      title: 'Same-Day Service',
      description: 'Quick turnaround for urgent repairs to get your appliances running.'
    },
    {
      icon: ShieldCheck,
      title: 'Genuine Parts Guarantee',
      description: 'Only authentic, original parts used for all replacements.'
    },
    {
      icon: Award,
      title: 'Certified Experts',
      description: 'Trained and certified professionals for all major brands.'
    },
    {
      icon: BadgeDollarSign,
      title: 'Transparent Pricing',
      description: 'No hidden charges, upfront quotes provided before work begins.'
    },
    {
      icon: Shield,
      title: 'Warranty on All Repairs',
      description: 'Comprehensive 6-12 month warranty on our repair services.'
    },
    {
      icon: MapPin,
      title: 'Serving All Dubai',
      description: 'Easy access and rapid response available throughout Dubai.'
    },
    {
      icon: ThumbsUp,
      title: '12+ Years Experience',
      description: 'Trusted by thousands of satisfied Dubai customers.'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Our dedicated support team is always available to help you.'
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Why Choose Us</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            The DubaiRepairService <span className="text-gradient-orange">Advantage</span>
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We combine technical expertise with exceptional customer service to deliver the best appliance repair experience in Dubai.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border border-border border-l-[5px] border-l-primary shadow-lg hover:-translate-y-1 hover-glow-orange transition-all duration-300 group">
                  <CardContent className="p-6 md:p-8 flex flex-col items-center text-center">
                    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-16 w-16 md:h-20 md:w-20 text-primary drop-shadow-[0_0_10px_rgba(255,107,53,0.3)]" strokeWidth={1.5} />
                    </div>
                    <h4 className="text-[18px] md:text-[20px] font-bold text-white mb-3">{benefit.title}</h4>
                    <p className="text-muted-foreground leading-relaxed text-[14px] md:text-[16px]">
                      {benefit.description}
                    </p>
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

export default WhyChooseUsSection;

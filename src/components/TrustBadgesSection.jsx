
import React from 'react';
import { ShieldCheck, Award, Clock, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustBadgesSection = () => {
  const badges = [
    { icon: ShieldCheck, title: 'Dubai Municipality Registered' },
    { icon: Award, title: 'UAE Consumer Protection Certified' },
    { icon: Clock, title: '12+ Years Experience' },
    { icon: Settings, title: '100% Genuine Parts' },
  ];

  return (
    <div className="w-full py-6 md:py-8 bg-primary text-primary-foreground relative z-20 border-y border-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="trust-badges-responsive">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 md:p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex-1 min-w-[240px] max-w-[300px]"
              >
                <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <Icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <span className="font-semibold text-sm md:text-base leading-tight">{badge.title}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrustBadgesSection;

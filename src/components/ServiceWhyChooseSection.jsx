
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Wrench, ThumbsUp } from 'lucide-react';

const ServiceWhyChooseSection = () => {
  const reasons = [
    { icon: Clock, title: "Same-Day Service", desc: "We value your time. Get your appliance fixed the very same day you call." },
    { icon: Shield, title: "Warranty Included", desc: "Peace of mind with our comprehensive warranty on parts and labor." },
    { icon: Wrench, title: "Genuine Parts", desc: "We only use OEM parts to ensure longevity and optimal performance." },
    { icon: ThumbsUp, title: "Certified Techs", desc: "Our team consists of highly trained, background-checked professionals." }
  ];

  return (
    <section className="py-20 bg-card/40 border-y border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Why Choose Us?</h2>
          <p className="text-lg text-muted-foreground">Dubai's most trusted appliance repair service for over a decade.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-background p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors"
              >
                <Icon className="h-10 w-10 text-primary mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{reason.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceWhyChooseSection;


import React from 'react';
import { motion } from 'framer-motion';

const ServiceProcessSection = ({ steps }) => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Our Repair Process</h2>
          <p className="text-lg text-muted-foreground">A streamlined, transparent approach to getting your appliance back in working order.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-white/10 z-0"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="h-24 w-24 rounded-2xl bg-card border border-white/10 flex items-center justify-center mb-6 shadow-xl relative group hover:border-primary/50 transition-colors">
                  <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm shadow-lg">
                    {index + 1}
                  </div>
                  <Icon className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceProcessSection;

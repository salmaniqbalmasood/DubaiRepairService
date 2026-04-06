
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const ServiceSolutionSection = ({ title, description, benefits, image }) => {
  return (
    <section className="py-20 bg-card/30 border-y border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">{title}</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{description}</p>
            
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold text-lg">{benefit.title}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{benefit.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/20 rounded-[2.5rem] blur-2xl opacity-50"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-square lg:aspect-[4/5]">
              <img src={image} alt="Solution" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSolutionSection;

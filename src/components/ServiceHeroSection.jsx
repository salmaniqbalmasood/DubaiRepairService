
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ServiceHeroSection = ({ headline, description, image }) => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center overflow-hidden bg-background border-b border-white/5 pb-12 md:pb-16 pt-24">
      <div className="absolute inset-0 z-0">
        <img 
          src={image} 
          alt={headline} 
          className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-8">
            {["Same-Day Service", "Certified Experts", "Genuine Parts"].map((text) => (
              <span key={text} className="py-1.5 px-3 md:px-4 rounded-full bg-card border border-white/5 text-muted-foreground text-[10px] md:text-xs font-bold tracking-widest uppercase">
                {text}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 md:mb-8 tracking-tighter text-balance">
            {headline}
          </h1>
          
          <p className="text-lg md:text-2xl text-muted-foreground mb-8 md:mb-12 leading-relaxed max-w-3xl mx-auto font-light">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="text-base md:text-lg px-8 md:px-10 py-6 md:py-8 w-full sm:w-auto bg-primary text-white hover-glow-orange rounded-2xl active:scale-[0.98]">
              <Link to="/contact">Book Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base md:text-lg px-8 md:px-10 py-6 md:py-8 w-full sm:w-auto bg-transparent text-white border-white/10 hover:bg-white/5 rounded-2xl transition-all">
              <a href="tel:+971525419624">Call: +971 52 541 9624</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceHeroSection;

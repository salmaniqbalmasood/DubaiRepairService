
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ServiceCTASection = () => {
  return (
    <section className="py-20 md:py-24 bg-primary text-white text-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092160562-40aa08e78837')] opacity-10 bg-cover bg-center mix-blend-luminosity"></div>
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-white">Ready to Fix Your Appliance?</h2>
        <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed">
          Our certified technicians are on standby. Get your appliance running like new with our same-day service guarantee.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-10 md:px-12 py-6 md:py-8 rounded-2xl shadow-xl">
            <Link to="/contact">Book a Technician Now</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 text-lg px-10 md:px-12 py-6 md:py-8 rounded-2xl">
            <a href="tel:+971525419624">Call +971 52 541 9624</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceCTASection;

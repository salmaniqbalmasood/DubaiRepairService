
import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Phone, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Team', path: '/team' },
    { name: 'Contact', path: '/contact' },
  ];

  const services = [
    'Washing Machine Repair',
    'Refrigerator Repair',
    'Air Conditioner Repair',
    'Oven & Cooktop Repair',
    'Water Heater Repair',
  ];

  return (
    <footer className="bg-background text-white pt-16 pb-8 border-t-4 border-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-[0_0_15px_rgba(255,107,53,0.3)]">
                <Wrench className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                DubaiRepair<span className="text-primary">Service</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Professional appliance repair services across Dubai. Same-day service, genuine parts, and certified technicians.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <span className="text-lg font-semibold mb-6 block text-white">Quick Links</span>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <span className="text-lg font-semibold mb-6 block text-white">Our Services</span>
            <ul className="space-y-3">
              {services.map((service, idx) => (
                <li key={idx}>
                  <Link to="/services" className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <span className="text-lg font-semibold mb-6 block text-white">Contact Us</span>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm leading-relaxed">
                  Al Quoz, Dubai<br />Serving all of Dubai
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a href="tel:+971525419624" className="text-muted-foreground text-sm hover:text-white transition-colors duration-200">
                  +971 52 541 9624
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground text-sm">
                  9 AM - 6 PM, 7 Days a Week
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="mb-8 bg-border" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} DubaiRepairService. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

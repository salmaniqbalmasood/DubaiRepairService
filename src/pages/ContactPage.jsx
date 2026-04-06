
import React from 'react';
import { Helmet } from 'react-helmet';
import { Phone, Mail, MapPin, Clock, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ContactForm from '@/components/ContactForm.jsx';
import FloatingContactButtons from '@/components/FloatingContactButtons.jsx';
import AnnouncementBanner from '@/components/AnnouncementBanner.jsx';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const ContactPage = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Emergency Hotline',
      value: '+971 52 541 9624',
      link: 'tel:+971525419624',
    },
    {
      icon: Mail,
      title: 'Email Support',
      value: 'info@dubairepairservice.ae',
      link: 'mailto:info@dubairepairservice.ae',
    },
    {
      icon: MapPin,
      title: 'Service Center',
      value: 'Al Quoz Industrial Area, Dubai, UAE',
      link: null,
    },
    {
      icon: Clock,
      title: 'Rapid Response Hours',
      value: 'Sat-Thu: 8AM-8PM, Fri: 10AM-6PM',
      link: null,
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      value: 'Cash, Credit Card, Bank Transfer',
      link: null,
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact DubaiRepairService - Fast Appliance Repair in Dubai</title>
        <meta name="description" content="Need urgent appliance repair? Contact DubaiRepairService today. Fast response, expert technicians. Call +971 52 541 9624." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <AnnouncementBanner />
        <Header />

        <main className="flex-1">
          <section className="py-12 md:py-16 border-b border-white/5 bg-gradient-to-b from-background to-card/40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-white/20" />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-primary font-semibold">Contact Us</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl"
              >
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white tracking-tight">
                  We're Ready to <span className="text-primary">Help Now</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Don't wait days for a repair. Reach out to our expert team and we'll dispatch a certified technician to your door immediately.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                
                <div className="lg:col-span-1 space-y-4">
                  <h2 className="text-2xl font-bold text-white mb-8">Direct Contact</h2>
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-white/5 hover:border-primary/30 transition-all group"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary transition-colors">
                          <Icon className="h-6 w-6 text-primary group-hover:text-white" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-1">{item.title}</h3>
                          {item.link ? (
                            <a href={item.link} className="text-white text-lg font-medium hover:text-primary transition-colors">
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-white text-lg font-medium">{item.value}</p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="rounded-[2rem] shadow-2xl border-white/5 overflow-hidden bg-card">
                      <div className="bg-gradient-to-r from-primary to-brand-orange-dark p-8 md:p-10 text-white">
                        <h2 className="text-3xl font-bold mb-2">Skip the Wait. Book Now.</h2>
                        <p className="text-white/90 font-light">Fill out the form below and our dispatch team will contact you within 15 minutes.</p>
                      </div>
                      <CardContent className="p-8 md:p-10">
                        <ContactForm />
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

              </div>
            </div>
          </section>
        </main>

        <Footer />
        <FloatingContactButtons />
      </div>
    </>
  );
};

export default ContactPage;

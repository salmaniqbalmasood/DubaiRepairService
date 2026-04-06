import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingContactButtons from '@/components/FloatingContactButtons.jsx';
import AnnouncementBanner from '@/components/AnnouncementBanner.jsx';

const TrustIndicatorsSection = lazy(() => import('@/components/TrustIndicatorsSection.jsx'));
const WhyChooseUsSection = lazy(() => import('@/components/WhyChooseUsSection.jsx'));
const ServicesSection = lazy(() => import('@/components/ServicesSection.jsx'));
const HowItWorksSection = lazy(() => import('@/components/HowItWorksSection.jsx'));
const TeamMembersCarousel = lazy(() => import('@/components/TeamMembersCarousel.jsx'));
const TestimonialsCarousel = lazy(() => import('@/components/TestimonialsCarousel.jsx'));
const CertificationsCarousel = lazy(() => import('@/components/CertificationsCarousel.jsx'));
const FAQSection = lazy(() => import('@/components/FAQSection.jsx'));
const SpecialOffersSection = lazy(() => import('@/components/SpecialOffersSection.jsx'));
const ServiceAreasSection = lazy(() => import('@/components/ServiceAreasSection.jsx'));

const SectionLoader = () => <div className="h-40 w-full bg-background/50 animate-pulse border-y border-white/5" />;

const HomePage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "DubaiRepairService",
    "image": "https://dubairepairservice.com/logo.png",
    "telephone": "+971525419624",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Al Quoz",
      "addressLocality": "Dubai",
      "addressCountry": "AE"
    },
    "areaServed": { "@type": "City", "name": "Dubai" }
  };

  return (
    <>
      <Helmet>
        <title>Professional Appliance Repair Services in Dubai | Same-Day Service</title>
        <meta name="description" content="Expert appliance repair services across Dubai. Same-day service, genuine parts, certified technicians. Call +971 52 541 9624." />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background selection:bg-primary/30">
        <Header />
        <AnnouncementBanner />

        <main>
          {/* Hero Section: Rendered Immediately (Critical Path) */}
          <section className="relative hero-responsive-height flex flex-col justify-center overflow-hidden bg-background border-b border-white/5 pb-12 md:pb-16">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1638180940769-bc94c1ffc9cd?auto=format&fit=crop&q=60&w=1200" 
                alt="Dubai cityscape" 
                className="w-full h-full object-cover opacity-10 mix-blend-luminosity"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 text-center">
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl mx-auto"
              >
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-8">
                  {["Certified Technicians", "Genuine Parts", "24/7 Support"].map((text) => (
                    <span key={text} className="py-1.5 px-3 md:px-4 rounded-full bg-card border border-white/5 text-muted-foreground text-[10px] md:text-xs font-bold tracking-widest uppercase">
                      {text}
                    </span>
                  ))}
                </div>
                
                <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold text-white leading-tight mb-6 md:mb-8 tracking-tighter text-balance">
                  Don't Let a Broken Appliance <span className="text-gradient-orange">Ruin Your Day</span>
                </h1>
                
                <p className="text-lg md:text-2xl text-muted-foreground mb-8 md:mb-12 leading-relaxed max-w-3xl mx-auto font-light">
                  Fast, reliable, and guaranteed appliance repair across Dubai. <span className="text-white font-medium">Book now and get it fixed today.</span>
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="lg" className="text-base md:text-lg px-8 md:px-10 py-6 md:py-8 w-full sm:w-auto bg-primary text-white hover-glow-orange rounded-2xl active:scale-[0.98]">
                    <a href="tel:+971525419624">Book Repair Now</a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-base md:text-lg px-8 md:px-10 py-6 md:py-8 w-full sm:w-auto bg-transparent text-white border-white/10 hover:bg-white/5 rounded-2xl transition-all">
                    <Link to="/contact">Schedule Service</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          <Suspense fallback={<SectionLoader />}>
            <TrustIndicatorsSection />
            <WhyChooseUsSection />
            <ServicesSection />
            <HowItWorksSection />
            <TeamMembersCarousel />
            <TestimonialsCarousel />
            <CertificationsCarousel />
            <FAQSection />
            <SpecialOffersSection />
            <ServiceAreasSection />

            {/* Contact CTA Section */}
            <section className="py-20 md:py-24 bg-card text-white text-center px-4 relative overflow-hidden border-t border-white/5">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092160562-40aa08e78837')] opacity-5 bg-cover bg-center mix-blend-luminosity"></div>
              <div className="max-w-4xl mx-auto relative z-10">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-white">Stop Stressing Over Broken Appliances</h2>
                <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
                  Our certified technicians are on standby. Get your appliance running like new with our same-day service guarantee.
                </p>
                <Button asChild size="lg" className="bg-primary text-white hover-glow-orange text-lg px-10 md:px-12 py-6 md:py-8 rounded-2xl">
                  <Link to="/contact">Claim Your Same-Day Slot</Link>
                </Button>
              </div>
            </section>
          </Suspense>
        </main>

        <Footer />
        <FloatingContactButtons />
      </div>
    </>
  );
};

export default HomePage;
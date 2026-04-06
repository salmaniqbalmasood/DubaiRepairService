
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import pb from '@/lib/pocketbaseClient';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingContactButtons from '@/components/FloatingContactButtons.jsx';
import AnnouncementBanner from '@/components/AnnouncementBanner.jsx';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const AboutPage = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const settingsData = await pb.collection('company_settings').getFullList({ $autoCancel: false });
        if (settingsData.length > 0) setSettings(settingsData[0]);
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>About DubaiRepairService - Dubai's Trusted Appliance Repair Shop</title>
        <meta name="description" content="DubaiRepairService - Dubai's most trusted appliance repair shop with 12+ years of experience serving all Dubai areas. Call +971 52 541 9624." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <AnnouncementBanner />
        <Header />

        <main className="flex-1">
          <section className="py-12 md:py-20 border-b border-white/5 bg-gradient-to-b from-background to-card/50">
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
                      <BreadcrumbPage className="text-primary font-semibold tracking-wide">About Us</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }} 
                className="max-w-4xl"
              >
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white tracking-tight leading-tight">
                  Restoring Comfort to <span className="text-primary">Dubai Homes</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl">
                  {settings?.tagline || "We don't just fix appliances; we restore your peace of mind with fast, transparent, and guaranteed service."}
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-20 bg-background overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
                
                <motion.div 
                  initial={{ opacity: 0, x: -30 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-widest uppercase">
                    Trusted Since 2014
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white tracking-tight">
                    12+ Years of Unmatched Reliability
                  </h2>
                  <div className="space-y-6 text-lg">
                    <p className="leading-relaxed text-foreground font-semibold border-l-4 border-primary pl-6">
                      {settings?.mission_statement || "Our mission is simple: provide Dubai residents with the most reliable, transparent, and high-quality appliance repair service available."}
                    </p>
                    <p className="leading-relaxed text-muted-foreground whitespace-pre-wrap">
                      {settings?.description || "A broken appliance in Dubai's fast-paced environment is more than an inconvenience—it's a disruption to your life. That's why we've spent over a decade perfecting our rapid-response repair process.\n\nWe invest heavily in continuous training for our technicians and stock only genuine OEM parts. When you choose us, you're choosing a team that gets it right the first time, saving you time, money, and stress."}
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  whileInView={{ opacity: 1, scale: 1 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.6 }} 
                  className="relative group"
                >
                  <div className="absolute -inset-4 bg-primary/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/5] lg:aspect-square">
                    <img 
                      src="https://images.unsplash.com/photo-1581092160562-40aa08e78837" 
                      alt="Technician repairing an appliance" 
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute bottom-6 right-6 bg-card/90 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
                      <p className="text-4xl font-black text-primary leading-none">12+</p>
                      <p className="text-xs font-bold text-white uppercase tracking-tighter mt-1">Years of Trust</p>
                    </div>
                  </div>
                </motion.div>

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

export default AboutPage;

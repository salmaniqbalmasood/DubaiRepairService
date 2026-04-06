
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingContactButtons from '@/components/FloatingContactButtons.jsx';
import AnnouncementBanner from '@/components/AnnouncementBanner.jsx';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const records = await pb.collection('team_members').getFullList({ sort: '-created', $autoCancel: false });
        setTeamMembers(records);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };
    fetchTeam();
  }, []);

  return (
    <>
      <Helmet>
        <title>Expert Appliance Repair Technicians in Dubai | DubaiRepairService</title>
        <meta name="description" content="Meet our expert appliance repair technicians in Dubai with years of experience and professional certifications. Call +971 52 541 9624." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <AnnouncementBanner />
        <Header />

        <main className="flex-1">
          <section className="py-12 md:py-20 border-b border-white/5 bg-gradient-to-b from-background to-card/40">
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
                      <BreadcrumbPage className="text-primary font-semibold">Our Team</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white tracking-tight">
                  The Experts Behind <span className="text-primary">The Fix</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  We don't send just anyone to your home. Our certified, background-checked professionals bring decades of combined experience to solve your appliance issues fast.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full overflow-hidden bg-card border-white/5 shadow-2xl hover:border-primary/30 hover:-translate-y-2 transition-all duration-500 flex flex-col group">
                      <div className="relative h-80 overflow-hidden shrink-0">
                        <img
                          src={member.photo ? pb.files.getUrl(member, member.photo) : 'https://images.unsplash.com/photo-1598223181630-8a5814045768'}
                          alt={member.name}
                          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                        
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-primary text-white hover:bg-primary border-none font-bold py-1 px-3 shadow-lg">
                            {member.years_of_experience} Years Exp.
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-6 flex flex-col flex-1 relative z-10">
                        <h4 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                          {member.name}
                        </h4>
                        <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">
                          {member.job_title}
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed mt-auto italic">
                          "{member.specialization || member.bio || 'Dedicated to providing top-tier appliance repair solutions.'}"
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {teamMembers.length === 0 && (
                  <div className="col-span-full text-center py-20">
                    <div className="animate-pulse flex flex-col items-center gap-4">
                      <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                      <p className="text-muted-foreground font-medium tracking-widest uppercase text-sm">
                        Loading our expert roster...
                      </p>
                    </div>
                  </div>
                )}
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

export default TeamPage;

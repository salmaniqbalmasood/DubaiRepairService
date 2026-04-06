
import React from 'react';
import { Helmet } from 'react-helmet';
import { Wind, Droplets, Settings, AlertTriangle, Search, Wrench, CheckCircle, ThumbsUp } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingContactButtons from '@/components/FloatingContactButtons.jsx';
import AnnouncementBanner from '@/components/AnnouncementBanner.jsx';
import ServiceHeroSection from '@/components/ServiceHeroSection.jsx';
import ServiceProblemSection from '@/components/ServiceProblemSection.jsx';
import ServiceSolutionSection from '@/components/ServiceSolutionSection.jsx';
import ServiceProcessSection from '@/components/ServiceProcessSection.jsx';
import ServiceWhyChooseSection from '@/components/ServiceWhyChooseSection.jsx';
import ServiceFAQSection from '@/components/ServiceFAQSection.jsx';
import ServiceTestimonialsSection from '@/components/ServiceTestimonialsSection.jsx';
import ServiceCTASection from '@/components/ServiceCTASection.jsx';
import RelatedServicesSection from '@/components/RelatedServicesSection.jsx';

const WasherDryerRepairPage = () => {
  const problems = [
    { icon: Wind, title: "Not Drying", description: "Clothes come out damp or take multiple cycles to dry completely." },
    { icon: Settings, title: "Not Spinning", description: "Drum won't turn, leaving clothes soaking wet at the end of the cycle." },
    { icon: AlertTriangle, title: "Overheating", description: "Dryer gets dangerously hot or shuts off mid-cycle due to thermal overload." },
    { icon: Droplets, title: "Drainage Issues", description: "Water pooling inside the drum or leaking onto the floor." }
  ];

  const solutions = [
    { title: "Combo Unit Experts", description: "Specialized knowledge in complex washer-dryer combination units." },
    { title: "Vent & Airflow Clearing", description: "Removing lint blockages to restore drying efficiency and prevent fires." },
    { title: "Genuine Parts", description: "High-quality belts, heating elements, and pumps for lasting repairs." },
    { title: "Same-Day Service", description: "Get your laundry routine back on track immediately." }
  ];

  const steps = [
    { icon: Search, title: "1. Assessment", description: "Testing heating elements, thermostats, and motor function." },
    { icon: Wrench, title: "2. Repair", description: "Replacing worn belts, clearing vents, or fixing control boards." },
    { icon: CheckCircle, title: "3. Testing", description: "Running a test cycle to ensure proper heating and spinning." },
    { icon: ThumbsUp, title: "4. Handover", description: "Providing tips on load sizes and lint filter maintenance." }
  ];

  const faqs = [
    { question: "Why is my dryer taking so long to dry clothes?", answer: "This is usually caused by a clogged lint filter, a blocked exhaust vent, or a failing heating element. We can clear blockages and test the heating components." },
    { question: "Do you repair washer-dryer combo units?", answer: "Yes, combo units are complex, but our technicians are fully trained to diagnose and repair both the washing and drying mechanisms in these appliances." },
    { question: "Why is my dryer making a squeaking noise?", answer: "Squeaking or grinding noises typically indicate worn drum rollers, a damaged drive belt, or worn idler pulleys. We carry replacement parts to fix this." },
    { question: "Is it dangerous if my dryer gets too hot?", answer: "Yes, an overheating dryer is a fire hazard. It usually means the cycling thermostat is broken or the vent is severely clogged. Turn it off and call us immediately." },
    { question: "How often should dryer vents be cleaned?", answer: "For safety and efficiency, dryer exhaust vents should be professionally cleaned at least once a year." }
  ];

  const testimonials = [
    { name: "Chloe M.", location: "Dubai Marina", review: "My washer-dryer combo stopped drying completely. The technician found a massive lint blockage inside the machine, cleared it, and it works like new." },
    { name: "Zayed R.", location: "Al Barsha", review: "Replaced the snapped belt on my dryer in under 45 minutes. Very transparent pricing and excellent service." },
    { name: "Linda K.", location: "Jumeirah Golf Estates", review: "They fixed the loud squealing noise my dryer was making. The technician was polite and explained exactly what was wrong." }
  ];

  const relatedServices = [
    { title: "Washing Machine Repair", description: "Expert repair for standalone washers.", path: "/services/washing-machine-repair" },
    { title: "Air Conditioner Repair", description: "Keep your home cool with expert AC repairs.", path: "/services/air-conditioner-repair" },
    { title: "Water Heater Repair", description: "Ensure consistent hot water supply.", path: "/services/water-heater-repair" }
  ];

  return (
    <>
      <Helmet>
        <title>Washer & Dryer Repair in Dubai | Fast & Reliable</title>
        <meta name="description" content="Expert washer and dryer repair in Dubai. We fix heating issues, spin problems, and combo units. Same-day service available. Call +971 52 541 9624." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <AnnouncementBanner />
        <Header />

        <main className="flex-1">
          <ServiceHeroSection 
            headline="Washer & Dryer Repair in Dubai"
            description="Don't let laundry day become a hassle. We provide expert, same-day repair services for standalone dryers and complex washer-dryer combo units."
            image="https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=1920"
          />
          
          <ServiceProblemSection title="Common Dryer Problems We Fix" problems={problems} />
          
          <ServiceSolutionSection 
            title="Efficient Drying Restored" 
            description="A malfunctioning dryer isn't just inconvenient; it can be a fire hazard and a drain on your electricity bill. Our technicians ensure your appliance operates safely, efficiently, and quietly."
            benefits={solutions}
            image="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&q=80&w=800"
          />
          
          <ServiceProcessSection steps={steps} />
          <ServiceWhyChooseSection />
          <ServiceFAQSection faqs={faqs} />
          <ServiceTestimonialsSection testimonials={testimonials} />
          <ServiceCTASection />
          <RelatedServicesSection services={relatedServices} />
        </main>

        <Footer />
        <FloatingContactButtons />
      </div>
    </>
  );
};

export default WasherDryerRepairPage;

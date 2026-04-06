
import React from 'react';
import { Helmet } from 'react-helmet';
import { Wind, Droplets, Volume2, ThermometerSun, Search, Wrench, CheckCircle, ThumbsUp } from 'lucide-react';
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

const AirConditionerRepairPage = () => {
  const problems = [
    { icon: ThermometerSun, title: "Not Cooling", description: "AC is blowing warm air or struggling to reach the set temperature." },
    { icon: Wind, title: "Weak Airflow", description: "Barely any air coming from the vents, indicating blockages or fan issues." },
    { icon: Droplets, title: "Water Leaks", description: "Water dripping from the indoor unit, risking damage to your walls." },
    { icon: Volume2, title: "Loud Noises", description: "Rattling, buzzing, or whistling sounds during operation." }
  ];

  const solutions = [
    { title: "24/7 Emergency Service", description: "Because AC breakdowns in Dubai can't wait." },
    { title: "Comprehensive Maintenance", description: "Deep cleaning and servicing to improve air quality and efficiency." },
    { title: "All AC Types", description: "Split, window, ducted, and central air conditioning systems." },
    { title: "Energy Efficiency", description: "Repairs that lower your DEWA bills by restoring optimal performance." }
  ];

  const steps = [
    { icon: Search, title: "1. Assessment", description: "Checking gas levels, filters, and electrical components." },
    { icon: Wrench, title: "2. Repair", description: "Fixing leaks, replacing capacitors, or deep cleaning coils." },
    { icon: CheckCircle, title: "3. Testing", description: "Measuring airflow and temperature drop to ensure perfect cooling." },
    { icon: ThumbsUp, title: "4. Follow-up", description: "Providing advice on optimal thermostat settings and maintenance." }
  ];

  const faqs = [
    { question: "Why is my AC blowing warm air?", answer: "This is typically caused by low refrigerant gas, a dirty condenser coil, or a failing compressor. Our technicians can diagnose and resolve this quickly." },
    { question: "How often should I service my AC in Dubai?", answer: "Due to the dusty environment and heavy usage, we highly recommend servicing your AC every 3 to 4 months to maintain efficiency and air quality." },
    { question: "Why is water leaking from my indoor AC unit?", answer: "Water leaks are usually caused by a clogged drain pipe or a frozen evaporator coil. We can clear the blockage and fix the underlying issue." },
    { question: "Do you repair central AC systems?", answer: "Yes, we have specialized technicians for all types of AC systems, including central, ducted, split, and window units." },
    { question: "Can regular maintenance lower my electricity bill?", answer: "Absolutely. A clean, well-maintained AC runs more efficiently, cooling your home faster and using significantly less electricity." }
  ];

  const testimonials = [
    { name: "Omar S.", location: "Arabian Ranches", review: "Our AC broke down in the middle of July. They arrived within 45 minutes and had it blowing ice-cold air shortly after. Lifesavers!" },
    { name: "Jessica W.", location: "Palm Jumeirah", review: "Signed up for their annual maintenance contract. The technicians are always punctual, polite, and do a thorough job." },
    { name: "Tariq M.", location: "Dubai Silicon Oasis", review: "Fixed a persistent leak that was ruining my ceiling. Very professional and clean work." }
  ];

  const relatedServices = [
    { title: "Refrigerator Repair", description: "Keep your food fresh with expert fridge repairs.", path: "/services/refrigerator-repair" },
    { title: "Water Heater Repair", description: "Ensure consistent hot water supply.", path: "/services/water-heater-repair" },
    { title: "Washing Machine Repair", description: "Fast fixes for all laundry appliances.", path: "/services/washing-machine-repair" }
  ];

  return (
    <>
      <Helmet>
        <title>AC Repair & Maintenance in Dubai | 24/7 Emergency Service</title>
        <meta name="description" content="Expert AC repair and maintenance in Dubai. We fix cooling issues, leaks, and provide deep cleaning for all AC types. Call +971 52 541 9624." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <AnnouncementBanner />
        <Header />

        <main className="flex-1">
          <ServiceHeroSection 
            headline="AC Repair & Maintenance in Dubai"
            description="Beat the Dubai heat. Fast, reliable, and professional air conditioning repair and maintenance services to keep your home perfectly chilled."
            image="https://images.unsplash.com/photo-1535116759413-75a497be0db4?auto=format&fit=crop&q=80&w=1920"
          />
          
          <ServiceProblemSection title="Common AC Problems We Fix" problems={problems} />
          
          <ServiceSolutionSection 
            title="Breathe Easy, Stay Cool" 
            description="A broken AC in Dubai is an emergency. Our certified HVAC technicians provide rapid diagnostics and lasting repairs, ensuring your system runs efficiently and your indoor air quality remains pristine."
            benefits={solutions}
            image="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800"
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

export default AirConditionerRepairPage;

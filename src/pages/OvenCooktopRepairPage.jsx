
import React from 'react';
import { Helmet } from 'react-helmet';
import { Flame, Zap, AlertTriangle, Settings, Search, Wrench, CheckCircle, ThumbsUp } from 'lucide-react';
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

const OvenCooktopRepairPage = () => {
  const problems = [
    { icon: Flame, title: "Burner Issues", description: "Gas burners won't light, or electric coils aren't heating up." },
    { icon: Zap, title: "Induction Faults", description: "Induction cooktop not recognizing pots or flashing error codes." },
    { icon: AlertTriangle, title: "Control Problems", description: "Knobs are stuck, or touch controls are unresponsive." },
    { icon: Settings, title: "Sparking/Clicking", description: "Continuous clicking sound even when the burner is off." }
  ];

  const solutions = [
    { title: "All Cooktop Types", description: "Expert repair for gas, electric radiant, and induction cooktops." },
    { title: "Modern Diagnostics", description: "Advanced tools to troubleshoot complex electronic control boards." },
    { title: "Safety Inspections", description: "Thorough checks for gas leaks or electrical shorts." },
    { title: "Quality Restoration", description: "Replacing cracked glass tops or faulty burner valves." }
  ];

  const steps = [
    { icon: Search, title: "1. Inspection", description: "Testing surface elements, igniters, and control switches." },
    { icon: Wrench, title: "2. Diagnosis", description: "Identifying the exact faulty component causing the issue." },
    { icon: CheckCircle, title: "3. Repair", description: "Replacing parts and ensuring secure, safe connections." },
    { icon: ThumbsUp, title: "4. Quality Check", description: "Testing all burners simultaneously for consistent performance." }
  ];

  const faqs = [
    { question: "Can a cracked glass cooktop be repaired?", answer: "A cracked glass surface cannot be 'repaired' or glued; the entire glass top assembly must be replaced for safety reasons. We can source and install the replacement glass for most brands." },
    { question: "Why is my gas burner clicking continuously?", answer: "This is usually caused by moisture around the igniter after cleaning, or a faulty spark module. We can clean, dry, or replace the ignition components." },
    { question: "Do you repair induction cooktops?", answer: "Yes, induction cooktops require specialized knowledge of electromagnetic components and control boards, which our technicians possess." },
    { question: "One of my electric burners only heats on high. Why?", answer: "This is a classic symptom of a faulty infinite switch (the control knob mechanism). Replacing the switch will restore full temperature control." },
    { question: "Is it safe to use a cooktop with a broken knob?", answer: "It can be dangerous if you cannot accurately control or turn off the heat. We recommend replacing broken knobs or valve stems immediately." }
  ];

  const testimonials = [
    { name: "Nadia K.", location: "Emirates Hills", review: "They fixed my induction cooktop that was showing an error code. The technician knew exactly what the code meant and had the part ready." },
    { name: "Raj P.", location: "Al Karama", review: "Fast and efficient repair of our gas stove. The continuous clicking was driving us crazy, but they fixed it in 20 minutes." },
    { name: "Emma S.", location: "JLT", review: "Replaced a faulty burner switch on my electric range. Very polite and left the kitchen spotless." }
  ];

  const relatedServices = [
    { title: "Electric/Gas Oven Repair", description: "Expert repair for all oven types.", path: "/services/oven-repair" },
    { title: "Refrigerator Repair", description: "Keep your ingredients fresh.", path: "/services/refrigerator-repair" },
    { title: "Washing Machine Repair", description: "Fast fixes for all laundry appliances.", path: "/services/washing-machine-repair" }
  ];

  return (
    <>
      <Helmet>
        <title>Oven & Cooktop Repair Services in Dubai | Fast Fixes</title>
        <meta name="description" content="Expert cooktop and stove repair in Dubai. We fix gas, electric, and induction cooktops safely and efficiently. Call +971 52 541 9624." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <AnnouncementBanner />
        <Header />

        <main className="flex-1">
          <ServiceHeroSection 
            headline="Oven & Cooktop Repair Services in Dubai"
            description="Get your kitchen firing on all cylinders. We provide expert repair services for gas, electric, and induction cooktops across Dubai."
            image="https://images.unsplash.com/photo-1565007573790-f34269703b0a?auto=format&fit=crop&q=80&w=1920"
          />
          
          <ServiceProblemSection title="Common Cooktop Problems We Fix" problems={problems} />
          
          <ServiceSolutionSection 
            title="Precision Heat Restored" 
            description="Cooking requires precision. Whether it's a clogged gas burner, a faulty induction board, or a broken electric coil, our technicians restore your cooktop's performance so you can cook safely and efficiently."
            benefits={solutions}
            image="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800"
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

export default OvenCooktopRepairPage;

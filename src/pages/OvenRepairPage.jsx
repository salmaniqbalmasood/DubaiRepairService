
import React from 'react';
import { Helmet } from 'react-helmet';
import { Flame, Thermometer, AlertTriangle, PowerOff, Search, Wrench, CheckCircle, ThumbsUp } from 'lucide-react';
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

const OvenRepairPage = () => {
  const problems = [
    { icon: Thermometer, title: "Not Heating", description: "Oven fails to reach the set temperature or doesn't heat up at all." },
    { icon: Flame, title: "Uneven Cooking", description: "Food burns on one side and remains raw on the other." },
    { icon: AlertTriangle, title: "Ignition Issues", description: "Gas oven won't light or clicks continuously without igniting." },
    { icon: PowerOff, title: "Door/Seal Issues", description: "Heat escaping due to broken hinges or worn-out door gaskets." }
  ];

  const solutions = [
    { title: "Safety-First Approach", description: "Strict adherence to safety protocols, especially for gas appliances." },
    { title: "Certified Technicians", description: "Experts trained specifically in electric and gas oven systems." },
    { title: "Genuine Heating Elements", description: "We use high-quality replacement parts for consistent temperatures." },
    { title: "Same-Day Service", description: "Get your kitchen back in action before dinner time." }
  ];

  const steps = [
    { icon: Search, title: "1. Safety Check", description: "Initial inspection of gas lines or electrical connections." },
    { icon: Wrench, title: "2. Diagnosis", description: "Testing elements, thermostats, and control boards." },
    { icon: CheckCircle, title: "3. Repair", description: "Replacing faulty components with genuine OEM parts." },
    { icon: ThumbsUp, title: "4. Calibration", description: "Testing temperature accuracy to ensure perfect baking." }
  ];

  const faqs = [
    { question: "Is it safe to repair a gas oven?", answer: "Yes, but it must be done by a certified professional. Our technicians are fully trained in gas appliance safety and leak detection." },
    { question: "Why is my electric oven not heating up?", answer: "The most common cause is a burned-out bake or broil element. It could also be a faulty thermostat or control board. We carry spare elements for most major brands." },
    { question: "My oven door won't close properly. Can you fix it?", answer: "Yes, we can replace worn-out door hinges, springs, or the rubber gasket seal to ensure heat stays inside the oven where it belongs." },
    { question: "Do you repair built-in ovens?", answer: "Absolutely. We service all types of ovens including built-in wall ovens, freestanding ranges, and commercial-style residential ovens." },
    { question: "How long does an oven repair usually take?", answer: "Most oven repairs, such as replacing a heating element or igniter, can be completed in under an hour once the technician is on-site." }
  ];

  const testimonials = [
    { name: "Maria G.", location: "The Springs", review: "My oven stopped heating right before a dinner party. They came out immediately and replaced the element. Saved the night!" },
    { name: "Hassan B.", location: "Mirdif", review: "Very professional handling of our gas oven. The technician was meticulous about checking for leaks after the repair." },
    { name: "Sophie L.", location: "Dubai Hills", review: "Fixed the thermostat on my built-in Siemens oven. It bakes perfectly evenly again." }
  ];

  const relatedServices = [
    { title: "Oven & Cooktop Repair", description: "Comprehensive repair for all cooking surfaces.", path: "/services/oven-cooktop-repair" },
    { title: "Refrigerator Repair", description: "Keep your ingredients fresh.", path: "/services/refrigerator-repair" },
    { title: "Washing Machine Repair", description: "Fast fixes for all laundry appliances.", path: "/services/washing-machine-repair" }
  ];

  return (
    <>
      <Helmet>
        <title>Electric & Gas Oven Repair in Dubai | Safe & Fast Service</title>
        <meta name="description" content="Expert electric and gas oven repair in Dubai. We fix heating issues, igniters, and thermostats safely and quickly. Call +971 52 541 9624." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <AnnouncementBanner />
        <Header />

        <main className="flex-1">
          <ServiceHeroSection 
            headline="Electric & Gas Oven Repair in Dubai"
            description="Don't let a broken oven ruin your meals. Our certified technicians provide safe, fast, and reliable repairs for all electric and gas ovens."
            image="https://images.unsplash.com/photo-1580386993298-b6049447a428?auto=format&fit=crop&q=80&w=1920"
          />
          
          <ServiceProblemSection title="Common Oven Problems We Fix" problems={problems} />
          
          <ServiceSolutionSection 
            title="Safe, Reliable Cooking Restored" 
            description="Whether it's a faulty heating element or a complex gas ignition issue, our experts have the tools and knowledge to fix it safely. We ensure your oven heats accurately so you can bake and roast with confidence."
            benefits={solutions}
            image="https://images.unsplash.com/photo-1556910110-a5a63dfd393c?auto=format&fit=crop&q=80&w=800"
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

export default OvenRepairPage;

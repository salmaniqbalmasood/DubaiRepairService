
import React from 'react';
import { Helmet } from 'react-helmet';
import { ThermometerSnowflake, Droplets, Volume2, PowerOff, Search, Wrench, CheckCircle, ThumbsUp } from 'lucide-react';
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

const RefrigeratorRepairPage = () => {
  const problems = [
    { icon: ThermometerSnowflake, title: "Not Cooling", description: "Food spoiling quickly because the fridge or freezer isn't reaching the right temperature." },
    { icon: Droplets, title: "Water Leaks", description: "Puddles forming inside or underneath the refrigerator." },
    { icon: Volume2, title: "Strange Noises", description: "Loud humming, buzzing, or clicking sounds coming from the compressor." },
    { icon: PowerOff, title: "Power Issues", description: "Fridge keeps tripping the breaker or won't turn on at all." }
  ];

  const solutions = [
    { title: "Emergency Response", description: "We prioritize fridge repairs to save your groceries from spoiling." },
    { title: "Expert Diagnostics", description: "Advanced tools to pinpoint compressor, thermostat, or freon issues." },
    { title: "All Styles Serviced", description: "French door, side-by-side, bottom freezer, and built-in models." },
    { title: "Guaranteed Work", description: "Comprehensive warranty on all refrigerator parts and labor." }
  ];

  const steps = [
    { icon: Search, title: "1. Inspection", description: "Checking temperature, seals, and compressor function." },
    { icon: Wrench, title: "2. Repair", description: "Fixing leaks, replacing parts, or regassing as needed." },
    { icon: CheckCircle, title: "3. Testing", description: "Verifying optimal cooling cycles and temperature stability." },
    { icon: ThumbsUp, title: "4. Handover", description: "Providing maintenance tips to prevent future issues." }
  ];

  const faqs = [
    { question: "Why is my refrigerator not cooling?", answer: "Common causes include dirty condenser coils, a faulty thermostat, a broken evaporator fan, or low refrigerant levels. Our technicians can diagnose the exact cause quickly." },
    { question: "Do you offer emergency refrigerator repair?", answer: "Yes, we understand that a broken fridge is an emergency. We offer priority same-day service to prevent your food from spoiling." },
    { question: "Can you fix a noisy refrigerator?", answer: "Absolutely. Strange noises usually indicate an issue with the condenser fan, evaporator fan, or the compressor itself. We can replace the faulty components." },
    { question: "Do you service smart refrigerators?", answer: "Yes, our technicians are trained to repair modern smart refrigerators with digital displays and advanced cooling systems." },
    { question: "How often should a refrigerator be serviced?", answer: "We recommend a professional maintenance check once a year to clean coils, check seals, and ensure the compressor is running efficiently." }
  ];

  const testimonials = [
    { name: "David L.", location: "Downtown Dubai", review: "My fridge stopped cooling on a Friday evening. They arrived within an hour and saved all my groceries. Incredible service!" },
    { name: "Fatima A.", location: "JVC", review: "Fixed a persistent leak that two other companies couldn't figure out. Very knowledgeable technicians." },
    { name: "Michael T.", location: "Business Bay", review: "Replaced the compressor on my LG fridge. The price was fair and the work was done cleanly and professionally." }
  ];

  const relatedServices = [
    { title: "Air Conditioner Repair", description: "Keep your home cool with expert AC repairs.", path: "/services/air-conditioner-repair" },
    { title: "Washing Machine Repair", description: "Fast fixes for all laundry appliances.", path: "/services/washing-machine-repair" },
    { title: "Oven Repair", description: "Safe and reliable electric and gas oven repairs.", path: "/services/oven-repair" }
  ];

  return (
    <>
      <Helmet>
        <title>Professional Refrigerator Repair in Dubai | Emergency Service</title>
        <meta name="description" content="Expert refrigerator repair in Dubai. We fix cooling issues, leaks, and compressor problems fast to save your food. Call +971 52 541 9624." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <AnnouncementBanner />
        <Header />

        <main className="flex-1">
          <ServiceHeroSection 
            headline="Professional Refrigerator Repair in Dubai"
            description="Don't let your food spoil. Get fast, reliable, and expert refrigerator repair services anywhere in Dubai. We fix all major brands and models."
            image="https://images.unsplash.com/photo-1676210132787-7ed33de174d6?auto=format&fit=crop&q=80&w=1920"
          />
          
          <ServiceProblemSection title="Common Refrigerator Issues We Solve" problems={problems} />
          
          <ServiceSolutionSection 
            title="Reliable Cooling Restored" 
            description="A malfunctioning refrigerator is a race against time. Our expert technicians arrive fully equipped to diagnose and repair your fridge on the first visit, ensuring your perishables stay fresh."
            benefits={solutions}
            image="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"
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

export default RefrigeratorRepairPage;

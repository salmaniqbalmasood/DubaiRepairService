
import React from 'react';
import { Helmet } from 'react-helmet';
import { Droplets, Thermometer, AlertTriangle, Volume2, Search, Wrench, CheckCircle, ThumbsUp } from 'lucide-react';
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

const WaterHeaterRepairPage = () => {
  const problems = [
    { icon: Thermometer, title: "No Hot Water", description: "Water remains cold despite the heater being turned on for hours." },
    { icon: Droplets, title: "Tank Leaks", description: "Water pooling around the base of the heater, indicating a tank or valve leak." },
    { icon: AlertTriangle, title: "Low Pressure", description: "Hot water flows out with significantly less pressure than cold water." },
    { icon: Volume2, title: "Strange Noises", description: "Popping, rumbling, or banging sounds coming from inside the tank." }
  ];

  const solutions = [
    { title: "Expert Installation", description: "Safe, code-compliant installation of new water heating units." },
    { title: "Quality Repairs", description: "Replacing faulty thermostats, heating elements, and pressure valves." },
    { title: "Energy Efficiency", description: "Optimizing your heater to reduce electricity consumption." },
    { title: "Emergency Service", description: "Rapid response for severe leaks or complete breakdowns." }
  ];

  const steps = [
    { icon: Search, title: "1. Inspection", description: "Checking electrical connections, thermostats, and tank integrity." },
    { icon: Wrench, title: "2. Repair/Install", description: "Replacing faulty parts or installing a brand new, efficient unit." },
    { icon: CheckCircle, title: "3. Testing", description: "Ensuring proper heating cycles and checking for any leaks." },
    { icon: ThumbsUp, title: "4. Handover", description: "Adjusting the temperature to safe, optimal levels for your home." }
  ];

  const faqs = [
    { question: "Why is my water heater not producing hot water?", answer: "This is usually caused by a tripped circuit breaker, a faulty thermostat, or a burned-out heating element. We can quickly diagnose and replace the defective part." },
    { question: "Is a leaking water heater dangerous?", answer: "Yes, a leaking water heater can cause severe water damage to your property and poses an electrical hazard. Turn off the power and water supply, and call us immediately." },
    { question: "Do you repair both tank and tankless water heaters?", answer: "Yes, our technicians are experienced in repairing traditional storage tank heaters as well as modern tankless (on-demand) water heating systems." },
    { question: "Why is my water heater making a popping noise?", answer: "Popping or rumbling noises are usually caused by sediment buildup at the bottom of the tank. The heating element boils the water trapped under the sediment. We can flush the tank to resolve this." },
    { question: "How long does a water heater typically last?", answer: "A standard tank water heater lasts about 8-12 years, while tankless models can last up to 20 years with proper maintenance." }
  ];

  const testimonials = [
    { name: "Mark D.", location: "Arabian Ranches", review: "Woke up to a freezing shower. Called them at 8 AM, and by 11 AM they had replaced the heating element. Fantastic service." },
    { name: "Aisha M.", location: "Jumeirah", review: "Our old water heater started leaking badly. They helped us choose a new, energy-efficient model and installed it the same day." },
    { name: "John S.", location: "Motor City", review: "Fixed the thermostat on our water heater. The technician was very knowledgeable and explained how to maintain it properly." }
  ];

  const relatedServices = [
    { title: "Air Conditioner Repair", description: "Keep your home cool with expert AC repairs.", path: "/services/air-conditioner-repair" },
    { title: "Washing Machine Repair", description: "Fast fixes for all laundry appliances.", path: "/services/washing-machine-repair" },
    { title: "Paint Work & Renovation", description: "Professional painting and home upgrades.", path: "/services/paint-renovation" }
  ];

  return (
    <>
      <Helmet>
        <title>Water Heater Installation & Repair in Dubai | Fast Service</title>
        <meta name="description" content="Expert water heater repair and installation in Dubai. We fix leaks, no hot water issues, and replace heating elements. Call +971 52 541 9624." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <AnnouncementBanner />
        <Header />

        <main className="flex-1">
          <ServiceHeroSection 
            headline="Water Heater Installation & Repair in Dubai"
            description="Never endure a cold shower again. We provide rapid, safe, and reliable water heater repairs and new installations across Dubai."
            image="https://images.unsplash.com/photo-1608806667067-66ebd8b169e8?auto=format&fit=crop&q=80&w=1920"
          />
          
          <ServiceProblemSection title="Common Water Heater Issues" problems={problems} />
          
          <ServiceSolutionSection 
            title="Consistent Hot Water, Guaranteed" 
            description="Water heaters require professional handling due to the combination of water and high-voltage electricity. Our certified technicians ensure your system is repaired or installed safely, providing you with reliable hot water and peace of mind."
            benefits={solutions}
            image="https://images.unsplash.com/photo-1585058179948-1e111211b110?auto=format&fit=crop&q=80&w=800"
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

export default WaterHeaterRepairPage;


import React from 'react';
import { Helmet } from 'react-helmet';
import { Droplets, Settings, AlertTriangle, PowerOff, Search, Wrench, CheckCircle, ThumbsUp } from 'lucide-react';
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

const WashingMachineRepairPage = () => {
  const problems = [
    { icon: Droplets, title: "Water Leaks", description: "Puddles forming around your machine during or after a cycle." },
    { icon: Settings, title: "Spin Issues", description: "Clothes coming out soaking wet or drum not spinning at all." },
    { icon: AlertTriangle, title: "Loud Noises", description: "Unusual banging, grinding, or squealing sounds during operation." },
    { icon: PowerOff, title: "Won't Start", description: "Machine is completely unresponsive or stops mid-cycle." }
  ];

  const solutions = [
    { title: "Fast, Same-Day Repair", description: "We arrive quickly to diagnose and fix the issue on the spot." },
    { title: "Genuine OEM Parts", description: "We use only manufacturer-approved parts for lasting reliability." },
    { title: "All Major Brands", description: "Samsung, LG, Bosch, Siemens, Whirlpool, and more." },
    { title: "Comprehensive Warranty", description: "Guaranteed peace of mind with our parts and labor warranty." }
  ];

  const steps = [
    { icon: Search, title: "1. Diagnosis", description: "Thorough inspection to identify the root cause of the problem." },
    { icon: Wrench, title: "2. Repair", description: "Expert repair using specialized tools and genuine parts." },
    { icon: CheckCircle, title: "3. Testing", description: "Rigorous testing to ensure the machine operates perfectly." },
    { icon: ThumbsUp, title: "4. Handover", description: "Clean up and final walkthrough of the completed repair." }
  ];

  const faqs = [
    { question: "How quickly can you repair my washing machine?", answer: "We offer same-day service across Dubai. In most cases, we can dispatch a technician within a few hours of your call." },
    { question: "Do you repair front-load and top-load machines?", answer: "Yes, our certified technicians are experienced in repairing all types of washing machines, including front-load, top-load, and washer-dryer combos." },
    { question: "Is it worth repairing an old washing machine?", answer: "It depends on the issue. Our technicians will provide an honest assessment. If the repair cost is less than 50% of a new machine and it extends the life by years, it's usually worth it." },
    { question: "Do you provide a warranty on the repair?", answer: "Absolutely. We provide a comprehensive warranty on both the parts we install and the labor performed." },
    { question: "What brands do you service?", answer: "We service all major brands including LG, Samsung, Bosch, Siemens, Whirlpool, Daewoo, Panasonic, and more." }
  ];

  const testimonials = [
    { name: "Sarah M.", location: "Dubai Marina", review: "My washing machine stopped spinning right before a trip. They came within 2 hours and fixed it perfectly. Highly recommended!" },
    { name: "Ahmed K.", location: "Al Barsha", review: "Very professional service. The technician explained the issue clearly and the price was exactly as quoted. No hidden fees." },
    { name: "Elena R.", location: "Jumeirah", review: "Fixed a terrible leak in my Bosch washer. They had the spare part in their van and finished the job in under an hour." }
  ];

  const relatedServices = [
    { title: "Washer/Dryer Repair", description: "Expert repair for combo units and standalone dryers.", path: "/services/washer-dryer-repair" },
    { title: "Refrigerator Repair", description: "Fast fixes for cooling issues and leaks.", path: "/services/refrigerator-repair" },
    { title: "Oven Repair", description: "Safe and reliable electric and gas oven repairs.", path: "/services/oven-repair" }
  ];

  return (
    <>
      <Helmet>
        <title>Expert Washing Machine Repair in Dubai | Same-Day Service</title>
        <meta name="description" content="Professional washing machine repair in Dubai. We fix leaks, spin issues, and more for all major brands. Same-day service guaranteed. Call +971 52 541 9624." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <AnnouncementBanner />
        <Header />

        <main className="flex-1">
          <ServiceHeroSection 
            headline="Expert Washing Machine Repair in Dubai"
            description="Don't let laundry pile up. Our certified technicians provide fast, reliable, and guaranteed washing machine repairs across all Dubai neighborhoods."
            image="https://images.unsplash.com/photo-1699457062599-da2e073c78ee?auto=format&fit=crop&q=80&w=1920"
          />
          
          <ServiceProblemSection title="Common Washing Machine Problems We Fix" problems={problems} />
          
          <ServiceSolutionSection 
            title="The Ultimate Repair Solution" 
            description="We don't just apply a quick fix; we restore your washing machine to peak performance. Our comprehensive repair service ensures your appliance runs efficiently for years to come."
            benefits={solutions}
            image="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800"
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

export default WashingMachineRepairPage;

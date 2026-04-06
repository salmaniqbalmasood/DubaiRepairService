
import React from 'react';
import { Helmet } from 'react-helmet';
import { Paintbrush, Home, LayoutGrid, Clock, Search, Wrench, CheckCircle, ThumbsUp } from 'lucide-react';
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

const PaintRenovationPage = () => {
  const problems = [
    { icon: Paintbrush, title: "Worn Out Paint", description: "Fading, peeling, or chipped paint making your home look aged." },
    { icon: Home, title: "Outdated Interiors", description: "Rooms that feel dark, small, or stuck in a previous decade." },
    { icon: LayoutGrid, title: "Wall Damage", description: "Cracks, holes, or water damage marks on your walls and ceilings." },
    { icon: Clock, title: "Move-in/Move-out", description: "Need a fresh coat of paint quickly to secure a deposit or welcome new tenants." }
  ];

  const solutions = [
    { title: "Professional Painters", description: "Skilled craftsmen who deliver flawless, streak-free finishes." },
    { title: "Premium Materials", description: "We use high-quality, low-VOC paints from trusted brands like Jotun and Jotashield." },
    { title: "Surface Preparation", description: "Thorough sanding, filling, and priming for a long-lasting result." },
    { title: "Clean & Tidy", description: "We protect your furniture and floors, leaving your home spotless." }
  ];

  const steps = [
    { icon: Search, title: "1. Consultation", description: "Discussing colors, finishes, and assessing the scope of work." },
    { icon: Wrench, title: "2. Preparation", description: "Covering furniture, repairing wall damage, and applying primer." },
    { icon: CheckCircle, title: "3. Painting", description: "Applying premium paint with precision for a perfect finish." },
    { icon: ThumbsUp, title: "4. Final Walkthrough", description: "Cleaning up and ensuring you are 100% satisfied with the result." }
  ];

  const faqs = [
    { question: "Do you provide the paint, or do I need to buy it?", answer: "We provide a full turnkey service, including supplying premium paints from top brands. However, if you have already purchased your own paint, we are happy to provide a labor-only quote." },
    { question: "How long does it take to paint a standard apartment?", answer: "A standard 1-bedroom apartment typically takes 1-2 days, while a 3-bedroom villa might take 3-5 days, depending on the condition of the walls and the number of coats required." },
    { question: "Do you move and protect the furniture?", answer: "Yes, our team will carefully move heavy furniture to the center of the room and cover everything, including floors, with heavy-duty plastic drop cloths before any work begins." },
    { question: "Can you fix cracks and holes in the wall before painting?", answer: "Absolutely. Proper surface preparation is key to a good paint job. We fill all cracks, nail holes, and smooth out imperfections before applying primer and paint." },
    { question: "Do you offer exterior painting services?", answer: "Yes, we provide both interior and exterior painting services for villas, townhouses, and commercial properties across Dubai." }
  ];

  const testimonials = [
    { name: "Sarah W.", location: "Dubai Hills Estate", review: "They transformed our villa completely. The painters were meticulous, clean, and finished a day ahead of schedule. The walls look flawless." },
    { name: "Karim A.", location: "Downtown Dubai", review: "Hired them for a move-out paint job. They matched the original color perfectly and helped me get my full deposit back from the landlord." },
    { name: "Priya M.", location: "Jumeirah Park", review: "Excellent attention to detail. They spent a whole day just prepping and fixing cracks before they even opened a paint can. Highly recommended." }
  ];

  const relatedServices = [
    { title: "Air Conditioner Repair", description: "Keep your newly renovated home cool.", path: "/services/air-conditioner-repair" },
    { title: "Water Heater Repair", description: "Ensure consistent hot water supply.", path: "/services/water-heater-repair" },
    { title: "Washing Machine Repair", description: "Fast fixes for all laundry appliances.", path: "/services/washing-machine-repair" }
  ];

  return (
    <>
      <Helmet>
        <title>Professional Paint Work & Renovation in Dubai | Expert Painters</title>
        <meta name="description" content="Transform your home with expert painting and renovation services in Dubai. Premium paints, flawless finish, and clean execution. Call +971 52 541 9624." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <AnnouncementBanner />
        <Header />

        <main className="flex-1">
          <ServiceHeroSection 
            headline="Professional Paint Work & Renovation in Dubai"
            description="Breathe new life into your space. Our expert painters deliver flawless finishes, meticulous preparation, and a hassle-free experience for your home or office."
            image="https://images.unsplash.com/photo-1629195352955-850830e4d6c9?auto=format&fit=crop&q=80&w=1920"
          />
          
          <ServiceProblemSection title="Signs It's Time for a Fresh Coat" problems={problems} />
          
          <ServiceSolutionSection 
            title="A Flawless Finish, Every Time" 
            description="Painting is more than just applying color; it's about preparation and precision. Our professional team handles everything from repairing wall damage to protecting your furniture, ensuring a stunning, long-lasting result."
            benefits={solutions}
            image="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800"
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

export default PaintRenovationPage;

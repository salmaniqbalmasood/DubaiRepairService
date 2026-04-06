import React, { useEffect, useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';

const FloatingContactButtons = () => {
  const [businessPhone, setBusinessPhone] = useState('+971525419624');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await pb.collection('company_settings').getFullList({ $autoCancel: false });
        if (settings.length > 0 && settings[0].business_phone) {
          setBusinessPhone(settings[0].business_phone);
        }
      } catch (error) {
        console.error("Error fetching phone for floating buttons:", error);
      }
    };
    fetchSettings();
  }, []);

  const whatsappMessage = encodeURIComponent('Hi, I need appliance repair services in Dubai.');
  const whatsappUrl = `https://wa.me/971525419624?text=${whatsappMessage}`;
  const callUrl = `tel:${businessPhone}`;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        className="group relative flex h-[60px] w-[60px] sm:h-[70px] sm:w-[70px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 animate-pulse-subtle"
      >
        <MessageCircle className="h-8 w-8 sm:h-9 sm:w-9" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-card border border-border px-3 py-1.5 text-sm font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none shadow-md">
          WhatsApp
        </span>
      </a>
      
      <a
        href={callUrl}
        title="Call Us"
        className="group relative flex h-[60px] w-[60px] sm:h-[70px] sm:w-[70px] items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 animate-pulse-subtle"
        style={{ animationDelay: '1.75s' }}
      >
        <Phone className="h-8 w-8 sm:h-9 sm:w-9" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-card border border-border px-3 py-1.5 text-sm font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none shadow-md">
          Call Now
        </span>
      </a>
    </div>
  );
};

export default FloatingContactButtons;
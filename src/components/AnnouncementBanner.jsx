import React from 'react';

const AnnouncementBanner = () => {
  const text = "🔧 Same-Day Service Available | 💰 50 AED Visting Charges Applicable";
  const duration = 25;

  return (
    <div 
      className="w-full h-[45px] sm:h-[50px] flex items-center overflow-hidden relative z-40 bg-background border-b border-border"
    >
      <div 
        className="whitespace-nowrap flex items-center animate-marquee"
        style={{ 
          '--duration': `${duration}s`,
        }}
      >
        <span className="text-sm sm:text-base font-semibold tracking-wide px-4 text-primary">
          {text}
        </span>
        <span className="text-sm sm:text-base font-semibold tracking-wide px-4 text-primary" aria-hidden="true">
          {text}
        </span>
        <span className="text-sm sm:text-base font-semibold tracking-wide px-4 text-primary" aria-hidden="true">
          {text}
        </span>
        <span className="text-sm sm:text-base font-semibold tracking-wide px-4 text-primary" aria-hidden="true">
          {text}
        </span>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
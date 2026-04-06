
import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import pb from '@/lib/pocketbaseClient';

const CertificationsCarousel = () => {
  const [certifications, setCertifications] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const records = await pb.collection('certifications').getList(1, 10, { sort: '-created', $autoCancel: false });
        setCertifications(records.items);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      }
    };
    fetchCertifications();
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5500);
    return () => clearInterval(interval);
  }, [emblaApi]);

  if (certifications.length === 0) return null;

  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Our Credentials</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Certified & <span className="text-gradient-orange">Authorized</span></h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We maintain the highest industry standards with certifications from leading appliance manufacturers and regulatory bodies in Dubai.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-6">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-6">
                  <Card className="h-full bg-card border border-border shadow-lg hover-glow-orange hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-8 flex flex-col items-center text-center h-full">
                      <div className="h-20 w-20 rounded-full bg-tertiary-bg flex items-center justify-center mb-6 border border-primary/30 shadow-[0_0_15px_rgba(255,107,53,0.2)]">
                        {cert.icon_image ? (
                          <img 
                            src={pb.files.getUrl(cert, cert.icon_image)} 
                            alt={cert.name} 
                            className="h-12 w-12 object-contain drop-shadow-md"
                          />
                        ) : (
                          <Award className="h-10 w-10 text-primary drop-shadow-[0_0_8px_rgba(255,107,53,0.5)]" />
                        )}
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">{cert.name}</h4>
                      {cert.issuer && (
                        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                          {cert.issuer}
                        </p>
                      )}
                      <p className="text-muted-foreground text-sm leading-relaxed mt-auto">
                        {cert.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mt-10">
            <Button variant="outline" size="icon" onClick={scrollPrev} aria-label="Previous certification" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white bg-transparent">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollNext} aria-label="Next certification" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white bg-transparent">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsCarousel;


import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import pb from '@/lib/pocketbaseClient';

const TestimonialsCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const records = await pb.collection('testimonials').getList(1, 10, { sort: '-created', $autoCancel: false });
        setTestimonials(records.items);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
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
    }, 6500);
    return () => clearInterval(interval);
  }, [emblaApi]);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Testimonials</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold mb-4 text-white tracking-tight">Trusted Across <span className="text-gradient-orange">Dubai</span></h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Read what our customers from Marina, Downtown, Al Quoz, and other areas have to say.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-6">
                  <Card className="h-full border border-border shadow-lg bg-card relative overflow-hidden group hover:-translate-y-1 hover-glow-orange transition-all duration-300">
                    <div className="absolute top-6 right-6 text-tertiary-bg group-hover:text-primary/10 transition-colors duration-300">
                      <Quote className="h-16 w-16 rotate-180" />
                    </div>
                    <CardContent className="p-8 flex flex-col h-full relative z-10">
                      <div className="flex items-center gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < testimonial.rating ? 'fill-primary text-primary drop-shadow-[0_0_5px_rgba(255,107,53,0.5)]' : 'fill-tertiary-bg text-tertiary-bg'}`}
                          />
                        ))}
                      </div>
                      <blockquote className="text-lg text-white leading-relaxed mb-8 flex-1 font-medium">
                        "{testimonial.review_text}"
                      </blockquote>
                      <div className="flex items-center justify-between mt-auto pt-6 border-t border-border">
                        <div>
                          <p className="font-bold text-white">{testimonial.customer_name}</p>
                          <p className="text-sm text-muted-foreground">Dubai Resident</p>
                        </div>
                        {testimonial.service_type && (
                          <Badge variant="outline" className="bg-tertiary-bg text-primary border-primary/30 font-medium">
                            {testimonial.service_type}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mt-10">
            <Button variant="outline" size="icon" onClick={scrollPrev} aria-label="Previous testimonial" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white bg-transparent">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollNext} aria-label="Next testimonial" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white bg-transparent">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;

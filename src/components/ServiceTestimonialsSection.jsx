
import React from 'react';
import { Star } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const ServiceTestimonialsSection = ({ testimonials }) => {
  return (
    <section className="py-20 bg-card/30 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">What Our Customers Say</h2>
          <p className="text-lg text-muted-foreground">Real reviews from satisfied customers across Dubai.</p>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="bg-background border-white/5 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow italic">
                      "{testimonial.review}"
                    </p>
                    <div>
                      <p className="text-white font-bold">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="bg-card border-white/10 text-white hover:bg-primary hover:text-white" />
            <CarouselNext className="bg-card border-white/10 text-white hover:bg-primary hover:text-white" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default ServiceTestimonialsSection;

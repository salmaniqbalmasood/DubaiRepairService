
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const TestimonialCard = ({ name, rating = 5, review, serviceType, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="h-full border border-border/50 shadow-md bg-card relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
        <div className="absolute top-6 right-6 text-primary/5 group-hover:text-primary/10 transition-colors duration-300">
          <Quote className="h-16 w-16 rotate-180" />
        </div>
        <CardContent className="p-8 flex flex-col h-full relative z-10">
          <div className="flex items-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < rating ? 'fill-secondary text-secondary' : 'fill-muted text-muted'}`}
              />
            ))}
          </div>
          <blockquote className="text-lg text-foreground leading-relaxed mb-8 flex-1 font-medium">
            "{review}"
          </blockquote>
          <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
            <div>
              <p className="font-bold text-foreground">{name}</p>
              <p className="text-sm text-muted-foreground">Dubai Resident</p>
            </div>
            {serviceType && (
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-medium">
                {serviceType}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;

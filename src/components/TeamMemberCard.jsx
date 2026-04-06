
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const TeamMemberCard = ({ image, name, role, experience, specialization, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group bg-card h-full flex flex-col">
        <div className="relative h-72 overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300 z-10 mix-blend-multiply" />
          <img
            src={image}
            alt={`Portrait of ${name}, ${role}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-4 right-4 z-20">
            <Badge variant="secondary" className="bg-white/95 text-primary hover:bg-white backdrop-blur-sm font-bold shadow-sm px-3 py-1">
              {experience} Years Exp.
            </Badge>
          </div>
        </div>
        <CardContent className="p-6 text-center flex flex-col flex-1">
          <h3 className="text-xl font-bold text-foreground mb-1">{name}</h3>
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-4">{role}</p>
          {specialization && (
            <p className="text-muted-foreground text-sm mt-auto leading-relaxed">
              {specialization}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TeamMemberCard;

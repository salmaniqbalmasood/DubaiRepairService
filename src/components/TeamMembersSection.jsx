
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TeamMembersSection = () => {
  const teamMembers = [
    {
      name: 'Ahmed Al-Mansouri',
      title: 'Lead Washing Machine Technician',
      experience: '14 years',
      image: 'https://images.unsplash.com/photo-1614277135791-21f3a32fd9c2',
      description: 'Specializes in complex drum and motor repairs for all major washing machine brands.'
    },
    {
      name: 'Fatima Al-Zahra',
      title: 'Senior Washing Machine Technician',
      experience: '10 years',
      image: 'https://images.unsplash.com/photo-1680120885180-47ce7aa85f82',
      description: 'Expert in electronic control board diagnostics and water leakage solutions.'
    },
    {
      name: 'Mohammed Al-Qasimi',
      title: 'Lead Refrigerator Technician',
      experience: '12 years',
      image: 'https://images.unsplash.com/photo-1652693534401-1ee129305fff',
      description: 'Master technician for compressor replacements and advanced cooling system repairs.'
    },
    {
      name: 'Layla Al-Maktoum',
      title: 'Senior Refrigerator Technician',
      experience: '9 years',
      image: 'https://images.unsplash.com/photo-1565155239796-9b61eff5ce0d',
      description: 'Specialized in smart refrigerator diagnostics and sealed system repairs.'
    },
    {
      name: 'Hassan Al-Mansoori',
      title: 'Lead AC & Oven Technician',
      experience: '13 years',
      image: 'https://images.unsplash.com/photo-1609664843043-a66fbe0684bc',
      description: 'Certified expert for central AC systems and commercial-grade oven repairs.'
    },
    {
      name: 'Noor Al-Qasimi',
      title: 'Senior AC Technician',
      experience: '8 years',
      image: 'https://images.unsplash.com/photo-1684262855344-b9da453a7934',
      description: 'Focuses on split AC maintenance, refrigerant handling, and efficiency optimization.'
    }
  ];

  return (
    <section className="py-20 md:py-24 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">Our Experts</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">Meet Our Expert Team</h3>
            <p className="text-lg text-secondary leading-relaxed">
              Our certified technicians bring decades of combined experience to ensure your appliances are repaired to the highest standards.
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to="/team">
              View Full Team <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden bg-card border-border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                <div className="relative h-64 overflow-hidden shrink-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-accent text-accent-foreground hover:bg-accent font-semibold shadow-sm">
                      {member.experience} Exp.
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <h4 className="text-xl font-bold text-primary mb-1">{member.name}</h4>
                  <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">{member.title}</p>
                  <p className="text-secondary text-sm leading-relaxed mt-auto">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembersSection;

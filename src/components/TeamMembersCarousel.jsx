
import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import pb from '@/lib/pocketbaseClient';

const TeamMembersCarousel = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const records = await pb.collection('team_members').getList(1, 10, { sort: '-created', $autoCancel: false });
        setTeamMembers(records.items);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };
    fetchTeam();
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

  if (teamMembers.length === 0) return null;

  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Our Experts</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Meet Our <span className="text-gradient-orange">Expert Team</span></h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our certified technicians bring decades of combined experience to ensure your appliances are repaired to the highest standards.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="icon" onClick={scrollPrev} aria-label="Previous team member" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white bg-transparent">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollNext} aria-label="Next team member" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white bg-transparent">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4">
                <Card className="h-full overflow-hidden bg-card border border-border shadow-lg hover-glow-orange hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                  <div className="relative h-72 overflow-hidden shrink-0 bg-tertiary-bg">
                    <img
                      src={member.photo ? pb.files.getUrl(member, member.photo) : 'https://images.unsplash.com/photo-1598223181630-8a5814045768'}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-white hover:bg-primary-dark font-semibold shadow-[0_0_10px_rgba(255,107,53,0.4)] border-none">
                        {member.years_of_experience} Years Exp.
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">{member.job_title}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed mt-auto">
                      {member.specialization || member.bio || 'Expert appliance repair technician serving Dubai.'}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamMembersCarousel;

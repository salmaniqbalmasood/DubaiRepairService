
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Search, Wrench, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import pb from '@/lib/pocketbaseClient';

const HowItWorksSection = () => {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const records = await pb.collection('how_it_works').getList(1, 4, {
          sort: 'step_number',
          $autoCancel: false
        });
        if (records.items.length > 0) {
          setSteps(records.items);
        }
      } catch (error) {
        console.error("Error fetching how it works steps:", error);
      }
    };
    fetchSteps();
  }, []);

  const defaultSteps = [
    { id: 1, step_number: 1, title: 'Call or WhatsApp Us', description: 'Reach out to our team 24/7 to schedule a convenient appointment time.', icon: PhoneCall },
    { id: 2, step_number: 2, title: 'Expert Diagnosis', description: 'Our certified technician arrives on time to inspect and diagnose the issue.', icon: Search },
    { id: 3, step_number: 3, title: 'Professional Repair', description: 'We fix the appliance on the spot using 100% genuine replacement parts.', icon: Wrench },
    { id: 4, step_number: 4, title: 'Warranty & Support', description: 'Enjoy peace of mind with our comprehensive repair warranty and ongoing support.', icon: ShieldCheck },
  ];

  const displayData = steps.length > 0 ? steps : defaultSteps;

  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Simple Process</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">How It <span className="text-gradient-orange">Works</span></h3>
          <p className="text-lg text-muted-foreground">
            Getting your appliances fixed is easy. Follow our simple 4-step process for a hassle-free repair experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-border z-0"></div>

          {displayData.map((step, index) => {
            const Icon = step.icon || PhoneCall;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative z-10"
              >
                <Card className="bg-card border-border h-full hover-glow-orange text-center pt-8">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold border-4 border-background shadow-lg">
                    {step.step_number}
                  </div>
                  <CardContent className="p-6 pt-8 flex flex-col items-center">
                    <div className="h-20 w-20 rounded-2xl bg-background flex items-center justify-center mb-6 border border-border">
                      {step.icon_file ? (
                        <img src={pb.files.getUrl(step, step.icon_file)} alt={step.title} className="h-10 w-10 object-contain" />
                      ) : (
                        <Icon className="h-10 w-10 text-primary" />
                      )}
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

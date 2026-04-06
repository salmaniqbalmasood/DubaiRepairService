
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import pb from '@/lib/pocketbaseClient';

const CertificationsSection = () => {
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const records = await pb.collection('certifications').getList(1, 8, {
          sort: '-created',
          $autoCancel: false
        });
        setCertifications(records.items);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      }
    };
    fetchCertifications();
  }, []);

  if (certifications.length === 0) return null;

  return (
    <section className="py-20 md:py-24 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">Our Credentials</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-primary mb-6">Certified & Authorized</h3>
          <p className="text-lg text-secondary leading-relaxed">
            We maintain the highest industry standards with certifications from leading appliance manufacturers and regulatory bodies in Dubai.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card border-primary/20 shadow-sm hover:shadow-md hover:border-accent/50 transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-5 border border-border">
                    {cert.icon_image ? (
                      <img 
                        src={pb.files.getUrl(cert, cert.icon_image)} 
                        alt={cert.name} 
                        className="h-10 w-10 object-contain"
                      />
                    ) : (
                      <Award className="h-8 w-8 text-accent" />
                    )}
                  </div>
                  <h4 className="text-lg font-bold text-primary mb-2">{cert.name}</h4>
                  {cert.issuer && (
                    <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">
                      {cert.issuer}
                    </p>
                  )}
                  <p className="text-secondary text-sm leading-relaxed mt-auto">
                    {cert.description}
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

export default CertificationsSection;

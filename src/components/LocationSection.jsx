import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, ExternalLink, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import pb from '@/lib/pocketbaseClient';

const LocationSection = () => {
  const [settings, setSettings] = useState({
    phone: '+971-XXXX-XXXX',
    email: 'info@dubairepairservice.com',
    address: 'Dubai Marina, Dubai, United Arab Emirates',
    business_hours: 'Mon-Sat: 8AM - 8PM'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const records = await pb.collection('company_settings').getFullList({ $autoCancel: false });
        if (records.length > 0) {
          const record = records[0];
          setSettings(prev => ({
            ...prev,
            phone: record.phone || prev.phone,
            email: record.email || prev.email,
            business_hours: record.business_hours || prev.business_hours,
            // Address is not in the schema, so we use the default Dubai Marina address
          }));
        }
      } catch (error) {
        console.error("Error fetching company settings:", error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <section className="py-24 bg-muted/30 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-foreground tracking-tight">
            Visit Our Service Center
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Conveniently located in the heart of Dubai. Drop by or contact us for immediate assistance with your appliances.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
          {/* Map Embed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl overflow-hidden shadow-lg h-[300px] md:h-[400px] border border-border/50 bg-card relative group"
          >
            <div className="absolute inset-0 bg-primary/5 pointer-events-none group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-multiply" />
            <iframe
              title="DubaiRepairService Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57789.35110828624!2d55.16600083099842!3d25.141287416411107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6964885557e3%3A0xa70149067c1c3458!2sAl%20Quoz%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1775158979486!5m2!1sen!2sus"
              className="relative z-0"
            ></iframe>
          </motion.div>

          {/* Contact Details Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-xl bg-card h-full rounded-3xl overflow-hidden">
              <CardContent className="p-8 md:p-10 flex flex-col h-full justify-center space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Contact Details</h3>
                  <p className="text-muted-foreground">Reach out to us for any inquiries or to schedule a repair.</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-5 group">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-sm">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Address</p>
                      <p className="text-muted-foreground mt-1 leading-relaxed">{settings.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-sm">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Phone</p>
                      <a href={`tel:${settings.phone}`} className="text-muted-foreground mt-1 hover:text-primary transition-colors block">
                        {settings.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-sm">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <a href={`mailto:${settings.email}`} className="text-muted-foreground mt-1 hover:text-primary transition-colors block">
                        {settings.email}
                      </a>
                    </div>
                  </div>

                  {settings.business_hours && (
                    <div className="flex items-start gap-5 group">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-sm">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Business Hours</p>
                        <p className="text-muted-foreground mt-1">{settings.business_hours}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-border/50 mt-auto">
                  <Button asChild className="w-full h-14 text-base shadow-md hover:shadow-lg transition-all rounded-xl">
                    <a href="https://maps.google.com/?q=Al+Quoz+,Dubai,UAE" target="_blank" rel="noopener noreferrer">
                      Get Directions
                      <ExternalLink className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
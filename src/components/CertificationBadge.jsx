
import React from 'react';
import { motion } from 'framer-motion';
import pb from '@/lib/pocketbaseClient';
import { ShieldCheck } from 'lucide-react';

const CertificationBadge = ({ certification, index = 0 }) => {
  const imageUrl = certification.icon_image 
    ? pb.files.getUrl(certification, certification.icon_image) 
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex flex-col items-center text-center p-4 bg-card rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow"
    >
      <div className="h-16 w-16 mb-3 flex items-center justify-center bg-muted rounded-full">
        {imageUrl ? (
          <img src={imageUrl} alt={certification.name} className="h-10 w-10 object-contain" />
        ) : (
          <ShieldCheck className="h-8 w-8 text-primary" />
        )}
      </div>
      <h4 className="font-semibold text-sm text-foreground mb-1">{certification.name}</h4>
      {certification.issuer && (
        <p className="text-xs text-muted-foreground">{certification.issuer}</p>
      )}
    </motion.div>
  );
};

export default CertificationBadge;


import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion, useInView } from 'framer-motion';

const StatisticCard = ({ icon: Icon, value, label, suffix = '+', index = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.replace(/,/g, ''), 10);
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="border-0 shadow-none bg-primary/5 hover:bg-primary/10 transition-colors duration-300 text-center h-full">
        <CardContent className="p-8 flex flex-col items-center justify-center h-full">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground mb-6 shadow-md">
            <Icon className="h-8 w-8" />
          </div>
          <div className="text-5xl font-extrabold text-foreground mb-2 tracking-tight flex items-center justify-center" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {count.toLocaleString()}{suffix}
          </div>
          <p className="text-muted-foreground font-medium text-lg">{label}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatisticCard;

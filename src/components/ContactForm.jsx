
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceTypes = [
    'Washing Machine Repair',
    'Refrigerator Repair',
    'Air Conditioner Repair',
    'Electric/Gas Oven Repair',
    'Washer/Dryer Repair',
    'Water Heater Repair',
    'Other Appliance Repair'
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.serviceType) newErrors.serviceType = 'Please select an appliance type';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors in the form to proceed.');
      return;
    }
    setIsSubmitting(true);
    try {
      await pb.collection('contact_inquiries').create({
        customer_name: formData.name,
        email: formData.email,
        message: `Phone: ${formData.phone}\nAppliance: ${formData.serviceType}\n\nMessage: ${formData.message}`,
        is_read: false
      }, { $autoCancel: false });

      setFormData({ name: '', email: '', phone: '', serviceType: '', message: '' });
      setErrors({});
      toast.success('Request received! Our expert will contact you within 15 minutes to confirm your appointment.');
    } catch (error) {
      toast.error('Failed to submit request. Please try again or call us directly at +971 52 541 9624.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const inputClasses = "bg-background border-white/10 text-white placeholder:text-muted-foreground/50 focus:ring-primary focus:border-primary";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-white/90">Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="e.g. John Doe"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className={`${inputClasses} ${errors.name ? 'border-destructive' : ''}`}
        />
        {errors.name && <p className="text-sm text-destructive font-medium">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/90">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="For booking confirmation"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`${inputClasses} ${errors.email ? 'border-destructive' : ''}`}
          />
          {errors.email && <p className="text-sm text-destructive font-medium">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-white/90">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="For immediate contact"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={`${inputClasses} ${errors.phone ? 'border-destructive' : ''}`}
          />
          {errors.phone && <p className="text-sm text-destructive font-medium">{errors.phone}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="serviceType" className="text-white/90">Which appliance needs fixing?</Label>
        <Select value={formData.serviceType} onValueChange={(value) => handleChange('serviceType', value)}>
          <SelectTrigger id="serviceType" className={`${inputClasses} ${errors.serviceType ? 'border-destructive' : ''}`}>
            <SelectValue placeholder="Select the appliance type" />
          </SelectTrigger>
          <SelectContent className="bg-card border-white/10 text-white">
            {serviceTypes.map((service) => (
              <SelectItem key={service} value={service} className="focus:bg-primary focus:text-white cursor-pointer">
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.serviceType && <p className="text-sm text-destructive font-medium">{errors.serviceType}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-white/90">Describe the problem</Label>
        <Textarea
          id="message"
          placeholder="E.g., My washing machine is making a loud noise and won't spin..."
          rows={5}
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          className={`${inputClasses} ${errors.message ? 'border-destructive' : ''}`}
        />
        {errors.message && <p className="text-sm text-destructive font-medium">{errors.message}</p>}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full text-lg font-bold bg-primary hover:bg-primary/90 text-white transition-all duration-200 active:scale-[0.98] shadow-lg shadow-primary/20"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Securing Your Appointment...' : 'Book Fast Repair Now'}
      </Button>
      <p className="text-center text-xs text-muted-foreground mt-4">
        No hidden fees. You only pay after the diagnosis and your approval.
      </p>
    </form>
  );
};

export default ContactForm;

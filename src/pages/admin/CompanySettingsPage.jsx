
import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const CompanySettingsPage = () => {
  const [settingsId, setSettingsId] = useState(null);
  const [formData, setFormData] = useState({
    company_name: '',
    tagline: '',
    mission_statement: '',
    description: '',
    phone: '',
    email: '',
    business_hours: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const records = await pb.collection('company_settings').getFullList({ $autoCancel: false });
        if (records.length > 0) {
          const record = records[0];
          setSettingsId(record.id);
          setFormData({
            company_name: record.company_name || '',
            tagline: record.tagline || '',
            mission_statement: record.mission_statement || '',
            description: record.description || '',
            phone: record.phone || '',
            email: record.email || '',
            business_hours: record.business_hours || '',
          });
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        toast.error("Failed to load company settings");
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (settingsId) {
        await pb.collection('company_settings').update(settingsId, formData, { $autoCancel: false });
      } else {
        const record = await pb.collection('company_settings').create(formData, { $autoCancel: false });
        setSettingsId(record.id);
      }
      toast.success("Company settings updated successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Company Settings</h2>
        <p className="text-slate-500">Manage your public company information.</p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="company_name">Company Name</Label>
                <Input id="company_name" name="company_name" value={formData.company_name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input id="tagline" name="tagline" value={formData.tagline} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="business_hours">Business Hours</Label>
                <Input id="business_hours" name="business_hours" value={formData.business_hours} onChange={handleChange} placeholder="e.g., Mon-Sat: 8AM - 8PM" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="mission_statement">Mission Statement</Label>
                <Textarea id="mission_statement" name="mission_statement" value={formData.mission_statement} onChange={handleChange} rows={3} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Company Description / History</Label>
                <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={5} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Settings'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanySettingsPage;

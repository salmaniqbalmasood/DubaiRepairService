
import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const StatisticsPage = () => {
  const [statsId, setStatsId] = useState(null);
  const [formData, setFormData] = useState({
    years_in_business: 0,
    customers_served: 0,
    projects_completed: 0,
    team_members_count: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const records = await pb.collection('statistics').getFullList({ $autoCancel: false });
        if (records.length > 0) {
          const record = records[0];
          setStatsId(record.id);
          setFormData({
            years_in_business: record.years_in_business || 0,
            customers_served: record.customers_served || 0,
            projects_completed: record.projects_completed || 0,
            team_members_count: record.team_members_count || 0
          });
        }
      } catch (error) {
        toast.error("Failed to load statistics");
      }
    };
    fetchStats();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (statsId) {
        await pb.collection('statistics').update(statsId, formData, { $autoCancel: false });
      } else {
        const record = await pb.collection('statistics').create(formData, { $autoCancel: false });
        setStatsId(record.id);
      }
      toast.success("Statistics updated successfully");
    } catch (error) {
      toast.error("Failed to save statistics");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Statistics</h2>
        <p className="text-slate-500">Update the key metrics shown on the homepage.</p>
      </div>

      <Card className="border-0 shadow-sm max-w-2xl">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="years_in_business">Years in Business</Label>
                <Input id="years_in_business" name="years_in_business" type="number" value={formData.years_in_business} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customers_served">Customers Served</Label>
                <Input id="customers_served" name="customers_served" type="number" value={formData.customers_served} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projects_completed">Projects Completed</Label>
                <Input id="projects_completed" name="projects_completed" type="number" value={formData.projects_completed} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team_members_count">Team Members Count</Label>
                <Input id="team_members_count" name="team_members_count" type="number" value={formData.team_members_count} onChange={handleChange} required />
              </div>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Statistics'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsPage;

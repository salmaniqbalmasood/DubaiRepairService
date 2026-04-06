
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Save, RotateCcw, Megaphone } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const AnnouncementSettingsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [recordId, setRecordId] = useState(null);
  
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      text: '🔧 Same-Day Service Available | 📞 Call Now | 📱 WhatsApp +971 50 XXX XXXX',
      is_active: true,
      text_speed: 5,
      background_color: '#fff3e0'
    }
  });

  const watchAllFields = watch();

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  const fetchAnnouncement = async () => {
    try {
      setIsLoading(true);
      const records = await pb.collection('announcements').getList(1, 1, { $autoCancel: false });
      
      if (records.items.length > 0) {
        const record = records.items[0];
        setRecordId(record.id);
        reset({
          text: record.text || '',
          is_active: record.is_active,
          text_speed: record.text_speed || 5,
          background_color: record.background_color || '#fff3e0'
        });
      }
    } catch (error) {
      console.error("Error fetching announcement:", error);
      toast.error("Failed to load announcement settings");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSaving(true);
      
      if (recordId) {
        await pb.collection('announcements').update(recordId, data, { $autoCancel: false });
      } else {
        const newRecord = await pb.collection('announcements').create(data, { $autoCancel: false });
        setRecordId(newRecord.id);
      }
      
      toast.success("Announcement settings saved successfully");
    } catch (error) {
      console.error("Error saving announcement:", error);
      toast.error("Failed to save announcement settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    reset({
      text: '🔧 Same-Day Service Available | 📞 Call Now | 📱 WhatsApp +971 50 XXX XXXX',
      is_active: true,
      text_speed: 5,
      background_color: '#fff3e0'
    });
    toast.info("Settings reset to default. Don't forget to save.");
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading settings...</div>;
  }

  // Map speed for preview
  const speedMap = {
    1: 40, 2: 35, 3: 30, 4: 25, 5: 20, 6: 18, 7: 15, 8: 12, 9: 10, 10: 8
  };
  const previewDuration = speedMap[watchAllFields.text_speed] || 20;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Announcement Banner</h1>
          <p className="text-slate-500">Manage the scrolling announcement banner displayed at the top of the website.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Banner Settings</CardTitle>
              <CardDescription>Configure the content and appearance of the announcement banner.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="space-y-0.5">
                    <Label className="text-base font-semibold">Enable Banner</Label>
                    <p className="text-sm text-slate-500">Toggle whether the banner is visible on the public website.</p>
                  </div>
                  <Switch 
                    checked={watchAllFields.is_active} 
                    onCheckedChange={(checked) => setValue('is_active', checked)} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="text">Announcement Text</Label>
                  <Input 
                    id="text" 
                    {...register('text', { required: 'Text is required' })} 
                    placeholder="Enter announcement text..."
                  />
                  <p className="text-xs text-slate-500">Use emojis and clear, concise messaging.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Scroll Speed</Label>
                    <Select 
                      value={watchAllFields.text_speed?.toString()} 
                      onValueChange={(val) => setValue('text_speed', parseInt(val))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select speed" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">Slow (30s)</SelectItem>
                        <SelectItem value="5">Medium (20s)</SelectItem>
                        <SelectItem value="8">Fast (12s)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="background_color">Background Color</Label>
                    <div className="flex gap-3">
                      <Input 
                        type="color" 
                        id="background_color_picker" 
                        value={watchAllFields.background_color} 
                        onChange={(e) => setValue('background_color', e.target.value)}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input 
                        type="text" 
                        id="background_color" 
                        {...register('background_color')} 
                        placeholder="#fff3e0"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <Button type="submit" disabled={isSaving} className="gap-2">
                    <Save className="h-4 w-4" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleReset} className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Reset Defaults
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-primary" />
                Live Preview
              </CardTitle>
              <CardDescription>This is how the banner will appear on the website.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
                {/* Mock Browser Header */}
                <div className="bg-slate-100 border-b px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                
                {/* Banner Preview */}
                {watchAllFields.is_active ? (
                  <div 
                    className="w-full h-10 flex items-center overflow-hidden relative border-b border-black/5"
                    style={{ backgroundColor: watchAllFields.background_color }}
                  >
                    <div 
                      className="whitespace-nowrap flex items-center animate-marquee"
                      style={{ 
                        '--duration': `${previewDuration}s`,
                        color: '#2d3e50'
                      }}
                    >
                      <span className="text-sm font-semibold tracking-wide px-4">
                        {watchAllFields.text}
                      </span>
                      <span className="text-sm font-semibold tracking-wide px-4" aria-hidden="true">
                        {watchAllFields.text}
                      </span>
                      <span className="text-sm font-semibold tracking-wide px-4" aria-hidden="true">
                        {watchAllFields.text}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-10 bg-slate-50 flex items-center justify-center border-b border-slate-200">
                    <span className="text-xs text-slate-400 italic">Banner is disabled</span>
                  </div>
                )}
                
                {/* Mock Content */}
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                  <div className="h-20 bg-slate-100 rounded w-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementSettingsPage;

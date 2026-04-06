
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const AdminThemeSettingsPage = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'blue', name: 'Professional Blue', primary: '#0066CC', secondary: '#003366', accent: '#00CCFF' },
    { id: 'green', name: 'Modern Green', primary: '#10B981', secondary: '#047857', accent: '#34D399' },
    { id: 'red', name: 'Professional Red', primary: '#DC2626', secondary: '#991B1B', accent: '#FCA5A5' },
    { id: 'navy', name: 'Dark Navy', primary: '#1E3A8A', secondary: '#0F172A', accent: '#3B82F6' },
  ];

  const handleThemeChange = async (themeId) => {
    await setTheme(themeId);
    toast.success(`Theme changed to ${themes.find(t => t.id === themeId).name}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Theme Settings</h2>
        <p className="text-slate-500">Choose the color scheme for your website.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {themes.map((t) => (
          <Card 
            key={t.id} 
            className={`cursor-pointer transition-all border-2 ${theme === t.id ? 'border-primary shadow-md' : 'border-transparent hover:border-slate-200'}`}
            onClick={() => handleThemeChange(t.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{t.name}</CardTitle>
                {theme === t.id && <CheckCircle2 className="h-5 w-5 text-primary" />}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="flex-1 space-y-1">
                  <div className="h-12 rounded-md w-full" style={{ backgroundColor: t.primary }}></div>
                  <p className="text-xs text-center text-slate-500">Primary</p>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="h-12 rounded-md w-full" style={{ backgroundColor: t.secondary }}></div>
                  <p className="text-xs text-center text-slate-500">Secondary</p>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="h-12 rounded-md w-full" style={{ backgroundColor: t.accent }}></div>
                  <p className="text-xs text-center text-slate-500">Accent</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border space-y-3">
                <p className="text-sm font-medium" style={{ color: t.secondary }}>Preview Text</p>
                <Button className="w-full" style={{ backgroundColor: t.primary, color: 'white' }}>Sample Button</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminThemeSettingsPage;

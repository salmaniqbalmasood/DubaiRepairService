
import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Edit, Search } from 'lucide-react';

const AdminLanguageTranslationsPage = () => {
  const [translations, setTranslations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ arabic_text: '' });

  const fetchTranslations = async () => {
    try {
      const records = await pb.collection('translations').getFullList({ sort: 'key', $autoCancel: false });
      setTranslations(records);
    } catch (error) {
      toast.error("Failed to load translations");
    }
  };

  useEffect(() => {
    fetchTranslations();
  }, []);

  const filteredTranslations = translations.filter(t => 
    t.key.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.english_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.arabic_text && t.arabic_text.includes(searchTerm))
  );

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ arabic_text: item.arabic_text || '' });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await pb.collection('translations').update(editingItem.id, { arabic_text: formData.arabic_text }, { $autoCancel: false });
      toast.success("Translation updated");
      setIsModalOpen(false);
      fetchTranslations();
    } catch (error) {
      toast.error("Failed to update translation");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Translations</h2>
          <p className="text-slate-500">Manage Arabic translations for the website.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input 
            placeholder="Search translations..." 
            className="pl-9" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 font-medium border-b">
                <tr>
                  <th className="px-6 py-4">Key</th>
                  <th className="px-6 py-4">English</th>
                  <th className="px-6 py-4">Arabic</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTranslations.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{t.key}</td>
                    <td className="px-6 py-4">{t.english_text}</td>
                    <td className="px-6 py-4 font-arabic" dir="rtl">{t.arabic_text || <span className="text-slate-400 italic">Missing</span>}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(t)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Translation</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label>Key</Label>
                <Input value={editingItem.key} disabled className="bg-slate-50" />
              </div>
              <div className="space-y-2">
                <Label>English Text</Label>
                <Input value={editingItem.english_text} disabled className="bg-slate-50" />
              </div>
              <div className="space-y-2">
                <Label>Arabic Text</Label>
                <Input 
                  value={formData.arabic_text} 
                  onChange={(e) => setFormData({ arabic_text: e.target.value })} 
                  dir="rtl"
                  className="font-arabic"
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full">Save Translation</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLanguageTranslationsPage;

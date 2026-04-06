
import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Edit } from 'lucide-react';

const AdminSEOSettingsPage = () => {
  const [pages, setPages] = useState([]);
  const [seoSettings, setSeoSettings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [formData, setFormData] = useState({ meta_title: '', meta_description: '', keywords: '' });

  const fetchData = async () => {
    try {
      const [pagesData, seoData] = await Promise.all([
        pb.collection('pages').getFullList({ sort: 'order', $autoCancel: false }),
        pb.collection('seo_settings').getFullList({ $autoCancel: false })
      ]);
      setPages(pagesData);
      setSeoSettings(seoData);
    } catch (error) {
      toast.error("Failed to load SEO data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getSeoForPage = (pageId) => seoSettings.find(s => s.page_id === pageId) || {};

  const handleEdit = (page) => {
    const seo = getSeoForPage(page.id);
    setEditingPage(page);
    setFormData({
      meta_title: seo.meta_title || page.title,
      meta_description: seo.meta_description || '',
      keywords: seo.keywords || ''
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const existingSeo = getSeoForPage(editingPage.id);
      const data = { ...formData, page_id: editingPage.id };
      
      if (existingSeo.id) {
        await pb.collection('seo_settings').update(existingSeo.id, data, { $autoCancel: false });
      } else {
        await pb.collection('seo_settings').create(data, { $autoCancel: false });
      }
      
      toast.success("SEO settings saved");
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error("Failed to save SEO settings");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">SEO Settings</h2>
        <p className="text-slate-500">Manage meta tags and search engine visibility for your pages.</p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 font-medium border-b">
                <tr>
                  <th className="px-6 py-4">Page</th>
                  <th className="px-6 py-4">Meta Title</th>
                  <th className="px-6 py-4">Description Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pages.map((page) => {
                  const seo = getSeoForPage(page.id);
                  const hasDesc = !!seo.meta_description;
                  return (
                    <tr key={page.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium">{page.title}</td>
                      <td className="px-6 py-4 text-slate-500 truncate max-w-[200px]">{seo.meta_title || 'Not set'}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${hasDesc ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {hasDesc ? 'Configured' : 'Missing'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(page)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit SEO: {editingPage?.title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label>Meta Title</Label>
              <Input 
                value={formData.meta_title} 
                onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })} 
                placeholder="e.g., Home - DubaiRepairService"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Meta Description</Label>
                <span className={`text-xs ${formData.meta_description.length > 160 ? 'text-destructive' : 'text-slate-500'}`}>
                  {formData.meta_description.length}/160
                </span>
              </div>
              <Textarea 
                value={formData.meta_description} 
                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })} 
                rows={3}
                placeholder="Brief description of the page content for search engines..."
              />
            </div>
            <div className="space-y-2">
              <Label>Keywords (comma separated)</Label>
              <Input 
                value={formData.keywords} 
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })} 
                placeholder="repair, ac, dubai, service"
              />
            </div>
            <Button type="submit" className="w-full">Save SEO Settings</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSEOSettingsPage;

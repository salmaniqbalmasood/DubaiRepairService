
import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Edit, Plus, Trash2 } from 'lucide-react';

const AdminPagesManagementPage = () => {
  const [pages, setPages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [formData, setFormData] = useState({ title: '', slug: '', description: '', is_published: true });

  const fetchPages = async () => {
    try {
      const records = await pb.collection('pages').getFullList({ sort: 'order', $autoCancel: false });
      setPages(records);
    } catch (error) {
      toast.error("Failed to load pages");
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleOpenModal = (page = null) => {
    if (page) {
      setEditingPage(page);
      setFormData({
        title: page.title,
        slug: page.slug,
        description: page.description || '',
        is_published: page.is_published
      });
    } else {
      setEditingPage(null);
      setFormData({ title: '', slug: '', description: '', is_published: true });
    }
    setIsModalOpen(true);
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: !editingPage ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : prev.slug
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingPage) {
        await pb.collection('pages').update(editingPage.id, formData, { $autoCancel: false });
        toast.success("Page updated");
      } else {
        await pb.collection('pages').create({ ...formData, order: pages.length }, { $autoCancel: false });
        toast.success("Page created");
      }
      setIsModalOpen(false);
      fetchPages();
    } catch (error) {
      toast.error("Failed to save page");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this page?")) {
      try {
        await pb.collection('pages').delete(id, { $autoCancel: false });
        toast.success("Page deleted");
        fetchPages();
      } catch (error) {
        toast.error("Failed to delete page");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Pages</h2>
          <p className="text-slate-500">Manage website pages and their status.</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="mr-2 h-4 w-4" /> Add Page
        </Button>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 font-medium border-b">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Slug</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pages.map((page) => (
                  <tr key={page.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium">{page.title}</td>
                    <td className="px-6 py-4 text-slate-500">/{page.slug}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${page.is_published ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                        {page.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleOpenModal(page)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDelete(page.id)} disabled={page.slug === '' || page.slug === 'home'}>
                        <Trash2 className="h-4 w-4" />
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
            <DialogTitle>{editingPage ? 'Edit Page' : 'Create Page'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label>Page Title</Label>
              <Input value={formData.title} onChange={handleTitleChange} required />
            </div>
            <div className="space-y-2">
              <Label>Slug (URL path)</Label>
              <Input value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} required disabled={editingPage?.slug === ''} />
            </div>
            <div className="space-y-2">
              <Label>Description (Internal)</Label>
              <Input value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </div>
            <div className="flex items-center justify-between pt-2">
              <Label>Published Status</Label>
              <Switch checked={formData.is_published} onCheckedChange={(checked) => setFormData({...formData, is_published: checked})} />
            </div>
            <Button type="submit" className="w-full mt-4">Save Page</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPagesManagementPage;

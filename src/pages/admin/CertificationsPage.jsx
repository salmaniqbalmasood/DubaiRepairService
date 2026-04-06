
import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';

const CertificationsPage = () => {
  const [certifications, setCertifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon_image: null
  });

  const fetchCertifications = async () => {
    try {
      const records = await pb.collection('certifications').getFullList({ sort: '-created', $autoCancel: false });
      setCertifications(records);
    } catch (error) {
      toast.error("Failed to load certifications");
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const handleOpenModal = (cert = null) => {
    if (cert) {
      setEditingId(cert.id);
      setFormData({
        name: cert.name,
        description: cert.description,
        icon_image: null
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', description: '', icon_image: null });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      if (formData.icon_image) {
        data.append('icon_image', formData.icon_image);
      }

      if (editingId) {
        await pb.collection('certifications').update(editingId, data, { $autoCancel: false });
        toast.success("Certification updated");
      } else {
        await pb.collection('certifications').create(data, { $autoCancel: false });
        toast.success("Certification added");
      }
      setIsModalOpen(false);
      fetchCertifications();
    } catch (error) {
      toast.error("Failed to save certification");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this certification?")) {
      try {
        await pb.collection('certifications').delete(id, { $autoCancel: false });
        toast.success("Certification deleted");
        fetchCertifications();
      } catch (error) {
        toast.error("Failed to delete certification");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Certifications</h2>
          <p className="text-slate-500">Manage trust badges and certifications.</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="mr-2 h-4 w-4" /> Add Certification
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {certifications.map((cert) => (
          <Card key={cert.id} className="border-0 shadow-sm text-center">
            <CardContent className="p-6">
              <div className="h-16 w-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden">
                {cert.icon_image ? (
                  <img src={pb.files.getUrl(cert, cert.icon_image)} alt={cert.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-slate-400">No Icon</span>
                )}
              </div>
              <h3 className="font-bold text-sm mb-4">{cert.name}</h3>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" size="sm" onClick={() => handleOpenModal(cert)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(cert.id)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Certification' : 'Add Certification'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Icon Image</Label>
              <Input type="file" accept="image/*" onChange={e => setFormData({...formData, icon_image: e.target.files[0]})} />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CertificationsPage;

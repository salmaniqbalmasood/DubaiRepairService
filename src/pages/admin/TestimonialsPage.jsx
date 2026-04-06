
import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Star } from 'lucide-react';

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    rating: 5,
    review_text: '',
    service_type: ''
  });

  const fetchTestimonials = async () => {
    try {
      const records = await pb.collection('testimonials').getFullList({ sort: '-created', $autoCancel: false });
      setTestimonials(records);
    } catch (error) {
      toast.error("Failed to load testimonials");
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        customer_name: item.customer_name,
        rating: item.rating,
        review_text: item.review_text,
        service_type: item.service_type
      });
    } else {
      setEditingId(null);
      setFormData({ customer_name: '', rating: 5, review_text: '', service_type: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingId) {
        await pb.collection('testimonials').update(editingId, formData, { $autoCancel: false });
        toast.success("Testimonial updated");
      } else {
        await pb.collection('testimonials').create(formData, { $autoCancel: false });
        toast.success("Testimonial added");
      }
      setIsModalOpen(false);
      fetchTestimonials();
    } catch (error) {
      toast.error("Failed to save testimonial");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await pb.collection('testimonials').delete(id, { $autoCancel: false });
        toast.success("Testimonial deleted");
        fetchTestimonials();
      } catch (error) {
        toast.error("Failed to delete testimonial");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Testimonials</h2>
          <p className="text-slate-500">Manage customer reviews.</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="mr-2 h-4 w-4" /> Add Testimonial
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <Card key={item.id} className="border-0 shadow-sm">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                ))}
              </div>
              <p className="text-slate-700 italic mb-4 flex-1">"{item.review_text}"</p>
              <div className="mt-auto pt-4 border-t border-slate-100">
                <p className="font-bold text-sm">{item.customer_name}</p>
                <p className="text-xs text-slate-500">{item.service_type}</p>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => handleOpenModal(item)}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Customer Name</Label>
              <Input value={formData.customer_name} onChange={e => setFormData({...formData, customer_name: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label>Rating (1-5)</Label>
              <Input type="number" min="1" max="5" value={formData.rating} onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})} required />
            </div>
            <div className="space-y-2">
              <Label>Service Type</Label>
              <Input value={formData.service_type} onChange={e => setFormData({...formData, service_type: e.target.value})} placeholder="e.g., AC Repair" required />
            </div>
            <div className="space-y-2">
              <Label>Review Text</Label>
              <Textarea value={formData.review_text} onChange={e => setFormData({...formData, review_text: e.target.value})} rows={4} required />
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

export default TestimonialsPage;

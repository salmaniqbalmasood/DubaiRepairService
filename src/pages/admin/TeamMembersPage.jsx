
import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';

const TeamMembersPage = () => {
  const [members, setMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    job_title: '',
    specialization: '',
    years_of_experience: '',
    photo: null
  });

  const fetchMembers = async () => {
    try {
      const records = await pb.collection('team_members').getFullList({ sort: '-created', $autoCancel: false });
      setMembers(records);
    } catch (error) {
      toast.error("Failed to load team members");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleOpenModal = (member = null) => {
    if (member) {
      setEditingId(member.id);
      setFormData({
        name: member.name,
        job_title: member.job_title,
        specialization: member.specialization,
        years_of_experience: member.years_of_experience,
        photo: null
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', job_title: '', specialization: '', years_of_experience: '', photo: null });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('job_title', formData.job_title);
      data.append('specialization', formData.specialization);
      data.append('years_of_experience', formData.years_of_experience);
      if (formData.photo) {
        data.append('photo', formData.photo);
      }

      if (editingId) {
        await pb.collection('team_members').update(editingId, data, { $autoCancel: false });
        toast.success("Team member updated");
      } else {
        await pb.collection('team_members').create(data, { $autoCancel: false });
        toast.success("Team member added");
      }
      setIsModalOpen(false);
      fetchMembers();
    } catch (error) {
      toast.error("Failed to save team member");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      try {
        await pb.collection('team_members').delete(id, { $autoCancel: false });
        toast.success("Team member deleted");
        fetchMembers();
      } catch (error) {
        toast.error("Failed to delete team member");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Team Members</h2>
          <p className="text-slate-500">Manage your staff profiles.</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <Card key={member.id} className="overflow-hidden border-0 shadow-sm">
            <div className="h-48 bg-slate-100 relative">
              {member.photo ? (
                <img src={pb.files.getUrl(member, member.photo)} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">No Photo</div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-sm text-primary font-medium">{member.job_title}</p>
              <p className="text-sm text-slate-500 mt-1">{member.years_of_experience} Years Exp. • {member.specialization}</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleOpenModal(member)}>
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(member.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input value={formData.job_title} onChange={e => setFormData({...formData, job_title: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label>Specialization</Label>
              <Input value={formData.specialization} onChange={e => setFormData({...formData, specialization: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Years of Experience</Label>
              <Input type="number" value={formData.years_of_experience} onChange={e => setFormData({...formData, years_of_experience: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label>Photo</Label>
              <Input type="file" accept="image/*" onChange={e => setFormData({...formData, photo: e.target.files[0]})} />
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

export default TeamMembersPage;

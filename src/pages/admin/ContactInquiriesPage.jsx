
import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Trash2, Eye, CheckCircle, Circle } from 'lucide-react';

const ContactInquiriesPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchInquiries = async () => {
    try {
      const records = await pb.collection('contact_inquiries').getFullList({ sort: '-created', $autoCancel: false });
      setInquiries(records);
    } catch (error) {
      toast.error("Failed to load inquiries");
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const toggleReadStatus = async (id, currentStatus) => {
    try {
      await pb.collection('contact_inquiries').update(id, { is_read: !currentStatus }, { $autoCancel: false });
      fetchInquiries();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await pb.collection('contact_inquiries').delete(id, { $autoCancel: false });
        toast.success("Inquiry deleted");
        fetchInquiries();
      } catch (error) {
        toast.error("Failed to delete inquiry");
      }
    }
  };

  const openInquiry = (inquiry) => {
    setSelectedInquiry(inquiry);
    setIsModalOpen(true);
    if (!inquiry.is_read) {
      toggleReadStatus(inquiry.id, false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Contact Inquiries</h2>
        <p className="text-slate-500">Manage messages from customers.</p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 font-medium border-b">
                <tr>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className={`hover:bg-slate-50 ${!inquiry.is_read ? 'bg-blue-50/50 font-medium' : ''}`}>
                    <td className="px-6 py-4">
                      <button onClick={() => toggleReadStatus(inquiry.id, inquiry.is_read)} className="text-slate-400 hover:text-primary">
                        {inquiry.is_read ? <CheckCircle className="h-5 w-5 text-emerald-500" /> : <Circle className="h-5 w-5 text-blue-500" />}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(inquiry.created).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{inquiry.customer_name}</td>
                    <td className="px-6 py-4">{inquiry.email}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openInquiry(inquiry)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(inquiry.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {inquiries.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500">No inquiries found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4 mt-4">
              <div>
                <p className="text-sm text-slate-500">From</p>
                <p className="font-medium">{selectedInquiry.customer_name} ({selectedInquiry.email})</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Date</p>
                <p className="font-medium">{new Date(selectedInquiry.created).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Message</p>
                <div className="mt-1 p-4 bg-slate-50 rounded-lg text-slate-700 whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactInquiriesPage;

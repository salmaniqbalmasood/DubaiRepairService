
import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Edit, Plus, Trash2, GripVertical } from 'lucide-react';

const AdminSectionsManagementPage = () => {
  const [pages, setPages] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState('');
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const records = await pb.collection('pages').getFullList({ sort: 'order', $autoCancel: false });
        setPages(records);
        if (records.length > 0) setSelectedPageId(records[0].id);
      } catch (error) {
        toast.error("Failed to load pages");
      }
    };
    fetchPages();
  }, []);

  useEffect(() => {
    if (!selectedPageId) return;
    const fetchSections = async () => {
      try {
        const records = await pb.collection('page_sections').getFullList({ 
          filter: `page_id="${selectedPageId}"`,
          sort: 'order', 
          $autoCancel: false 
        });
        setSections(records);
      } catch (error) {
        toast.error("Failed to load sections");
      }
    };
    fetchSections();
  }, [selectedPageId]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this section?")) {
      try {
        await pb.collection('page_sections').delete(id, { $autoCancel: false });
        setSections(sections.filter(s => s.id !== id));
        toast.success("Section deleted");
      } catch (error) {
        toast.error("Failed to delete section");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Page Sections</h2>
          <p className="text-slate-500">Manage content blocks for each page.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select value={selectedPageId} onValueChange={setSelectedPageId}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select page" />
            </SelectTrigger>
            <SelectContent>
              {pages.map(p => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={() => toast.info("Section builder coming soon")}>
            <Plus className="mr-2 h-4 w-4" /> Add Section
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {sections.map((section) => (
          <Card key={section.id} className="border border-slate-200 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <GripVertical className="h-5 w-5 text-slate-400 cursor-move" />
              <div className="flex-1">
                <h3 className="font-medium capitalize">{section.section_type} Section</h3>
                <p className="text-xs text-slate-500">Order: {section.order} • {section.is_visible ? 'Visible' : 'Hidden'}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => toast.info("Editor coming soon")}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(section.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {sections.length === 0 && selectedPageId && (
          <div className="text-center py-12 text-slate-500 border-2 border-dashed rounded-lg">
            No sections found for this page. Click "Add Section" to start building.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSectionsManagementPage;

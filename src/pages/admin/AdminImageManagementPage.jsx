import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Trash2, Upload, Image as ImageIcon } from 'lucide-react';

const AdminImageManagementPage = () => {
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [description, setDescription] = useState('');

  const fetchImages = async () => {
    try {
      const records = await pb.collection('images').getFullList({ sort: '-created', $autoCancel: false });
      setImages(records);
    } catch (error) {
      toast.error("Failed to load images");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const data = new FormData();
      data.append('image_file', file);
      data.append('filename', file.name);
      if (description) {
        data.append('description', description);
      }
      
      await pb.collection('images').create(data, { $autoCancel: false });
      toast.success("Image uploaded successfully");
      setDescription('');
      fetchImages();
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
      e.target.value = null;
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await pb.collection('images').delete(id, { $autoCancel: false });
        toast.success("Image deleted");
        fetchImages();
      } catch (error) {
        toast.error("Failed to delete image");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Image Management</h2>
          <p className="text-slate-500">Upload and manage images for your website.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto bg-white p-2 rounded-lg border shadow-sm">
          <Input 
            placeholder="Optional description (e.g., 'logo')" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-[200px] h-9"
            disabled={isUploading}
          />
          <Label htmlFor="image-upload" className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 whitespace-nowrap m-0">
            <Upload className="mr-2 h-4 w-4" /> {isUploading ? 'Uploading...' : 'Upload'}
          </Label>
          <Input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={isUploading} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <Card key={img.id} className="overflow-hidden border-0 shadow-sm flex flex-col">
            <div className="aspect-video bg-slate-100 relative group">
              {img.image_file ? (
                <img src={pb.files.getUrl(img, img.image_file)} alt={img.filename} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400"><ImageIcon className="h-8 w-8" /></div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="destructive" size="sm" onClick={() => handleDelete(img.id)}>
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
              </div>
            </div>
            <CardContent className="p-4 flex-1 flex flex-col gap-1">
              <p className="text-sm font-medium truncate" title={img.filename}>{img.filename}</p>
              {img.description && (
                <p className="text-xs text-slate-500 truncate" title={img.description}>{img.description}</p>
              )}
              <p className="text-xs text-slate-400 mt-auto pt-2">{new Date(img.created).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        ))}
        {images.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-500">No images uploaded yet.</div>
        )}
      </div>
    </div>
  );
};

export default AdminImageManagementPage;
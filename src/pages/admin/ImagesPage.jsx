
import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Trash2, Upload } from 'lucide-react';

const ImagesPage = () => {
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

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
      
      await pb.collection('images').create(data, { $autoCancel: false });
      toast.success("Image uploaded successfully");
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Image Gallery</h2>
          <p className="text-slate-500">Manage uploaded images.</p>
        </div>
        <div>
          <Label htmlFor="image-upload" className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            <Upload className="mr-2 h-4 w-4" /> {isUploading ? 'Uploading...' : 'Upload Image'}
          </Label>
          <Input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={isUploading} />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((img) => (
          <Card key={img.id} className="overflow-hidden border-0 shadow-sm group relative">
            <div className="aspect-square bg-slate-100">
              <img src={pb.files.getUrl(img, img.image_file)} alt={img.filename} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
              <p className="text-white text-xs text-center truncate w-full mb-4">{img.filename}</p>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(img.id)}>
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ImagesPage;

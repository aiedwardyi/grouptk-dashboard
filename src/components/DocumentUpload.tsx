import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { ProjectDocument } from '@/types/Project';
import { useLanguage } from '@/contexts/LanguageContext';

interface DocumentUploadProps {
  onAdd: (doc: ProjectDocument) => void;
}

export const DocumentUpload = ({ onAdd }: DocumentUploadProps) => {
  const { t } = useLanguage();
  const [isUploading, setIsUploading] = useState(false);
  const [docName, setDocName] = useState('');
  const [docUrl, setDocUrl] = useState('');
  const [docType, setDocType] = useState<'pdf' | 'image'>('pdf');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const isPdf = file.type === 'application/pdf';
    const isImage = file.type.startsWith('image/');
    
    if (!isPdf && !isImage) {
      toast.error('Please select a PDF or image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File must be less than 10MB');
      return;
    }

    setIsUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      // Upload to storage
      const { data, error } = await supabase.storage
        .from('project-documents')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('project-documents')
        .getPublicUrl(data.path);

      const publicUrl = urlData.publicUrl;
      const uploadedDocType = isPdf ? 'pdf' : 'image';
      
      // Auto-fill with file name if docName is empty
      const finalDocName = docName || file.name.replace(/\.[^/.]+$/, '');
      
      // Create and add the document
      const newDoc: ProjectDocument = {
        id: Date.now().toString(),
        name: finalDocName,
        url: publicUrl,
        type: uploadedDocType,
      };
      
      onAdd(newDoc);
      setDocName('');
      setDocUrl('');
      toast.success('Document uploaded successfully');
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddUrl = () => {
    if (!docName || !docUrl) {
      toast.error('Please enter both name and URL');
      return;
    }

    const newDoc: ProjectDocument = {
      id: Date.now().toString(),
      name: docName,
      url: docUrl,
      type: docType,
    };

    onAdd(newDoc);
    setDocName('');
    setDocUrl('');
    toast.success('Document added successfully');
  };

  return (
    <div className="space-y-3">
      {/* Upload File Option */}
      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,image/*"
          onChange={handleFileChange}
          className="hidden"
          id="document-upload"
        />
        <Input
          placeholder={t.admin.documentName}
          value={docName}
          onChange={(e) => setDocName(e.target.value)}
          className="bg-secondary/50 border-border/50 flex-1"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex-shrink-0"
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Upload className="h-4 w-4 mr-2" />
          )}
          {isUploading ? 'Uploading...' : 'Upload File'}
        </Button>
      </div>

      {/* Or Add by URL */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <div className="flex-1 h-px bg-border" />
        <span>or add by URL</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="flex gap-2">
        <Input
          placeholder={t.admin.documentUrl}
          value={docUrl}
          onChange={(e) => setDocUrl(e.target.value)}
          className="bg-secondary/50 border-border/50 flex-1"
        />
        <Select value={docType} onValueChange={(v) => setDocType(v as 'pdf' | 'image')}>
          <SelectTrigger className="bg-secondary/50 border-border/50 w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="image">Image</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          variant="secondary" 
          size="icon" 
          onClick={handleAddUrl}
          disabled={!docName || !docUrl}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

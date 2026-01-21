import { useState, useEffect } from 'react';
import { Project, CategoryColor, ProjectDocument } from '@/types/Project';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Trash2, FileText, Image } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { DocumentUpload } from './DocumentUpload';

interface AdminEditModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  onDelete?: (projectId: string) => void;
  isNew?: boolean;
}

const categoryColors: CategoryColor[] = ['green', 'purple', 'orange', 'blue', 'pink'];

export const AdminEditModal = ({ project, isOpen, onClose, onSave, onDelete, isNew }: AdminEditModalProps) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<Project | null>(null);

  useEffect(() => {
    if (project) {
      setFormData({ ...project });
    } else if (isNew) {
      setFormData({
        id: Date.now().toString(),
        title: '',
        titleKo: '',
        description: '',
        descriptionKo: '',
        websiteUrl: '',
        editorUrl: '',
        githubUrl: '',
        thumbnailUrl: '',
        category: 'Website',
        categoryKo: '웹사이트',
        categoryColor: 'green',
        completion: 0,
        documents: [],
      });
    }
  }, [project, isNew]);

  if (!formData) return null;

  const handleChange = (field: keyof Project, value: string | number | CategoryColor) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddDocument = (doc: ProjectDocument) => {
    setFormData({
      ...formData,
      documents: [...formData.documents, doc],
    });
  };

  const handleRemoveDocument = (docId: string) => {
    setFormData({
      ...formData,
      documents: formData.documents.filter((d) => d.id !== docId),
    });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-border/50 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-display text-foreground">
            {isNew ? t.projects.addProject : t.admin.editProject}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Title Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t.admin.title} (EN)</Label>
              <Input
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="bg-secondary/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label>{t.admin.title} (KO)</Label>
              <Input
                value={formData.titleKo}
                onChange={(e) => handleChange('titleKo', e.target.value)}
                className="bg-secondary/50 border-border/50"
              />
            </div>
          </div>

          {/* Description Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t.admin.description} (EN)</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="bg-secondary/50 border-border/50"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>{t.admin.description} (KO)</Label>
              <Textarea
                value={formData.descriptionKo}
                onChange={(e) => handleChange('descriptionKo', e.target.value)}
                className="bg-secondary/50 border-border/50"
                rows={3}
              />
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <Label>{t.admin.thumbnailUrl}</Label>
            <ImageUpload
              currentUrl={formData.thumbnailUrl}
              onUpload={(url) => handleChange('thumbnailUrl', url)}
            />
          </div>

          {/* URL Fields */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>{t.admin.websiteUrl}</Label>
              <Input
                value={formData.websiteUrl}
                onChange={(e) => handleChange('websiteUrl', e.target.value)}
                className="bg-secondary/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label>{t.admin.editorUrl}</Label>
              <Input
                value={formData.editorUrl}
                onChange={(e) => handleChange('editorUrl', e.target.value)}
                className="bg-secondary/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label>{t.admin.githubUrl}</Label>
              <Input
                value={formData.githubUrl}
                onChange={(e) => handleChange('githubUrl', e.target.value)}
                className="bg-secondary/50 border-border/50"
              />
            </div>
          </div>
          {/* Category and Color */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>{t.admin.category} (EN)</Label>
              <Input
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="bg-secondary/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label>{t.admin.category} (KO)</Label>
              <Input
                value={formData.categoryKo}
                onChange={(e) => handleChange('categoryKo', e.target.value)}
                className="bg-secondary/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label>{t.admin.categoryColor}</Label>
              <Select
                value={formData.categoryColor}
                onValueChange={(value) => handleChange('categoryColor', value as CategoryColor)}
              >
                <SelectTrigger className="bg-secondary/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categoryColors.map((color) => (
                    <SelectItem key={color} value={color}>
                      <span className="capitalize">{color}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Completion Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>{t.admin.completion}</Label>
              <span className="text-sm font-medium text-primary">{formData.completion}%</span>
            </div>
            <Slider
              value={[formData.completion]}
              onValueChange={(value) => handleChange('completion', value[0])}
              max={100}
              step={5}
              className="w-full"
            />
          </div>

          {/* Documents Section */}
          <div className="space-y-4">
            <Label>{t.admin.uploadDocument}</Label>
            
            {/* Existing Documents */}
            {formData.documents.length > 0 && (
              <div className="space-y-2">
                {formData.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/30"
                  >
                    <div className="flex items-center gap-2">
                      {doc.type === 'pdf' ? (
                        <FileText className="w-4 h-4 text-badge-orange" />
                      ) : (
                        <Image className="w-4 h-4 text-badge-blue" />
                      )}
                      <span className="text-sm">{doc.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveDocument(doc.id)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Document */}
            <DocumentUpload onAdd={handleAddDocument} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          {!isNew && onDelete && (
            <Button
              variant="destructive"
              onClick={() => {
                onDelete(formData.id);
                onClose();
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {t.admin.delete}
            </Button>
          )}
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" onClick={onClose}>
              {t.admin.cancel}
            </Button>
            <Button onClick={handleSubmit} className="bg-gradient-primary hover:opacity-90">
              {t.admin.save}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

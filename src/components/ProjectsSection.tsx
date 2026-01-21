import { useState } from 'react';
import { Project } from '@/types/Project';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProjectCard } from './ProjectCard';
import { AdminEditModal } from './AdminEditModal';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, TrendingUp } from 'lucide-react';
import { sampleProjects } from '@/data/sampleProjects';

export const ProjectsSection = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewProject, setIsNewProject] = useState(false);

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsNewProject(false);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setIsNewProject(true);
    setIsModalOpen(true);
  };

  const handleSave = (updatedProject: Project) => {
    if (isNewProject) {
      setProjects([...projects, updatedProject]);
    } else {
      setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
    }
  };

  const handleDelete = (projectId: string) => {
    setProjects(projects.filter((p) => p.id !== projectId));
  };

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground">
              {t.projects.sectionTitle}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Admin Toggle */}
            <div className="flex items-center gap-2">
              <Switch
                id="admin-mode"
                checked={isAdmin}
                onCheckedChange={setIsAdmin}
              />
              <Label htmlFor="admin-mode" className="text-sm text-muted-foreground cursor-pointer">
                {t.projects.adminMode}
              </Label>
            </div>

            {/* Add Project Button */}
            {isAdmin && (
              <Button onClick={handleAddNew} className="gap-2 bg-gradient-primary hover:opacity-90">
                <Plus className="w-4 h-4" />
                {t.projects.addProject}
              </Button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard
                project={project}
                onEdit={handleEdit}
                isAdmin={isAdmin}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <AdminEditModal
        project={editingProject}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
          setIsNewProject(false);
        }}
        onSave={handleSave}
        onDelete={handleDelete}
        isNew={isNewProject}
      />
    </section>
  );
};

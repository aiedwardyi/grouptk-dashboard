import { useState } from 'react';
import { Project } from '@/types/Project';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { ProjectCard } from './ProjectCard';
import { SortableProjectCard } from './SortableProjectCard';
import { AdminEditModal } from './AdminEditModal';
import { AdminLoginModal } from './AdminLoginModal';
import { Button } from '@/components/ui/button';
import { Plus, TrendingUp, ShieldCheck, LogOut, Loader2 } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { toast } from 'sonner';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

export const ProjectsSection = () => {
  const { t, language } = useLanguage();
  const { isAdmin, isLoading: authLoading, signOut } = useAuth();
  const { projects, isLoading: projectsLoading, addProject, updateProject, deleteProject, reorderProjects } = useProjects();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewProject, setIsNewProject] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const isLoading = authLoading || projectsLoading;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleSave = async (updatedProject: Project) => {
    let success: boolean;
    if (isNewProject) {
      success = await addProject(updatedProject);
      if (success) {
        toast.success(language === 'en' ? 'Project added successfully' : '프로젝트가 추가되었습니다');
      }
    } else {
      success = await updateProject(updatedProject);
      if (success) {
        toast.success(language === 'en' ? 'Project updated successfully' : '프로젝트가 업데이트되었습니다');
      }
    }
  };

  const handleDelete = async (projectId: string) => {
    const success = await deleteProject(projectId);
    if (success) {
      toast.success(language === 'en' ? 'Project deleted successfully' : '프로젝트가 삭제되었습니다');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success(language === 'en' ? 'Signed out successfully' : '로그아웃되었습니다');
  };

  const handleAdminClick = () => {
    if (isAdmin) {
      return;
    }
    setIsLoginModalOpen(true);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = projects.findIndex((p) => p.id === active.id);
      const newIndex = projects.findIndex((p) => p.id === over.id);

      const reorderedProjects = arrayMove(projects, oldIndex, newIndex).map((p, idx) => ({
        ...p,
        displayOrder: idx + 1,
      }));

      const success = await reorderProjects(reorderedProjects);
      if (success) {
        toast.success(language === 'en' ? 'Order saved' : '순서가 저장되었습니다');
      }
    }
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
            {/* Admin Authentication Controls */}
            {isLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            ) : isAdmin ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {t.projects.adminMode}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Sign Out' : '로그아웃'}
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={handleAdminClick}
                className="gap-2 border-primary/30 text-primary hover:bg-primary/10"
              >
                <ShieldCheck className="w-4 h-4" />
                {t.projects.adminMode}
              </Button>
            )}

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
        {isAdmin ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={projects.map((p) => p.id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <SortableProjectCard
                    key={project.id}
                    project={project}
                    onEdit={handleEdit}
                    isAdmin={isAdmin}
                    index={index}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
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
        )}
      </div>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

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

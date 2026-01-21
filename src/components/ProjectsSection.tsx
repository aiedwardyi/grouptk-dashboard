import { useState } from 'react';
import { Project } from '@/types/Project';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { ProjectCard } from './ProjectCard';
import { AdminEditModal } from './AdminEditModal';
import { AdminLoginModal } from './AdminLoginModal';
import { Button } from '@/components/ui/button';
import { Plus, TrendingUp, ShieldCheck, LogOut, Loader2 } from 'lucide-react';
import { sampleProjects } from '@/data/sampleProjects';
import { toast } from 'sonner';

export const ProjectsSection = () => {
  const { t, language } = useLanguage();
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewProject, setIsNewProject] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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

  const handleSignOut = async () => {
    await signOut();
    toast.success(language === 'en' ? 'Signed out successfully' : '로그아웃되었습니다');
  };

  const handleAdminClick = () => {
    if (isAdmin) {
      // Already admin, do nothing (they can use admin features)
      return;
    }
    setIsLoginModalOpen(true);
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

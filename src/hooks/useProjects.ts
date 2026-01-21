import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Project, ProjectDocument, CategoryColor } from '@/types/Project';
import { toast } from 'sonner';
import { Json } from '@/integrations/supabase/types';

interface DbProject {
  id: string;
  title: string;
  title_ko: string;
  description: string;
  description_ko: string;
  website_url: string;
  editor_url: string;
  github_url: string;
  thumbnail_url: string;
  category: string;
  category_ko: string;
  category_color: string;
  completion: number;
  documents: Json;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const mapDbToProject = (db: DbProject): Project => ({
  id: db.id,
  title: db.title,
  titleKo: db.title_ko,
  description: db.description,
  descriptionKo: db.description_ko,
  websiteUrl: db.website_url,
  editorUrl: db.editor_url,
  githubUrl: db.github_url,
  thumbnailUrl: db.thumbnail_url,
  category: db.category,
  categoryKo: db.category_ko,
  categoryColor: db.category_color as CategoryColor,
  completion: db.completion,
  documents: db.documents as unknown as ProjectDocument[],
  displayOrder: db.display_order,
});

const mapProjectToDb = (project: Project) => ({
  title: project.title,
  title_ko: project.titleKo,
  description: project.description,
  description_ko: project.descriptionKo,
  website_url: project.websiteUrl,
  editor_url: project.editorUrl,
  github_url: project.githubUrl,
  thumbnail_url: project.thumbnailUrl,
  category: project.category,
  category_ko: project.categoryKo,
  category_color: project.categoryColor,
  completion: project.completion,
  documents: project.documents as unknown as Json,
  display_order: project.displayOrder,
});

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true })
        .order('id', { ascending: true }); // Secondary sort for consistent ordering

      if (error) throw error;
      
      setProjects((data as DbProject[]).map(mapDbToProject));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch projects'));
      console.error('Error fetching projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addProject = async (project: Project): Promise<boolean> => {
    try {
      // Get max display_order and add 1
      const maxOrder = projects.reduce((max, p) => Math.max(max, p.displayOrder), 0);
      const dbProject = {
        ...mapProjectToDb(project),
        display_order: maxOrder + 1,
      };
      const { error } = await supabase
        .from('projects')
        .insert(dbProject);

      if (error) throw error;
      
      await fetchProjects();
      return true;
    } catch (err) {
      console.error('Error adding project:', err);
      toast.error('Failed to add project');
      return false;
    }
  };

  const updateProject = async (project: Project): Promise<boolean> => {
    try {
      const dbProject = mapProjectToDb(project);
      const { error } = await supabase
        .from('projects')
        .update(dbProject)
        .eq('id', project.id);

      if (error) throw error;
      
      await fetchProjects();
      return true;
    } catch (err) {
      console.error('Error updating project:', err);
      toast.error('Failed to update project');
      return false;
    }
  };

  const deleteProject = async (projectId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;
      
      await fetchProjects();
      return true;
    } catch (err) {
      console.error('Error deleting project:', err);
      toast.error('Failed to delete project');
      return false;
    }
  };

  const reorderProjects = async (reorderedProjects: Project[]): Promise<boolean> => {
    try {
      // Update local state immediately for smooth UX
      setProjects(reorderedProjects);

      // Batch update all display_order values
      const updates = reorderedProjects.map((project, index) => ({
        id: project.id,
        display_order: index + 1,
      }));

      // Update each project's display_order
      for (const update of updates) {
        const { error } = await supabase
          .from('projects')
          .update({ display_order: update.display_order })
          .eq('id', update.id);

        if (error) throw error;
      }

      return true;
    } catch (err) {
      console.error('Error reordering projects:', err);
      toast.error('Failed to save order');
      // Revert to original order on error
      await fetchProjects();
      return false;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    setProjects,
    isLoading,
    error,
    addProject,
    updateProject,
    deleteProject,
    reorderProjects,
    refetch: fetchProjects,
  };
};

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Project } from '@/types/Project';
import { ProjectCard } from './ProjectCard';
import { GripVertical } from 'lucide-react';

interface SortableProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  isAdmin: boolean;
  index: number;
}

export const SortableProjectCard = ({ project, onEdit, isAdmin, index }: SortableProjectCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    animationDelay: `${index * 0.1}s`,
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative ${isDragging ? 'opacity-50' : ''}`}
    >
      {isAdmin && (
        <div
          {...attributes}
          {...listeners}
          className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 cursor-grab active:cursor-grabbing p-2 rounded-lg bg-secondary/80 border border-border/50 opacity-0 hover:opacity-100 transition-opacity group-hover:opacity-100"
          style={{ opacity: isDragging ? 1 : undefined }}
        >
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
      <ProjectCard
        project={project}
        onEdit={onEdit}
        isAdmin={isAdmin}
      />
    </div>
  );
};

import { useState } from 'react';
import { Project } from '@/types/Project';
import { useLanguage } from '@/contexts/LanguageContext';
import { CategoryBadge } from './CategoryBadge';
import { ProgressStars } from './ProgressStars';
import { Button } from '@/components/ui/button';
import { Edit, Github, ChevronDown, ChevronUp, FileText, Image, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onEdit?: (project: Project) => void;
  isAdmin?: boolean;
}

export const ProjectCard = ({ project, onEdit, isAdmin }: ProjectCardProps) => {
  const { language, t } = useLanguage();
  const [showMore, setShowMore] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  const title = language === 'ko' ? project.titleKo : project.title;
  const description = language === 'ko' ? project.descriptionKo : project.description;
  const category = language === 'ko' ? project.categoryKo : project.category;

  const hasDocuments = project.documents.length > 0;

  return (
    <div className="glass-card glow-border overflow-hidden group hover:shadow-glow transition-all duration-500 animate-fade-in">
      {/* Thumbnail */}
      <a 
        href={project.websiteUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block relative overflow-hidden aspect-video"
      >
        <img
          src={project.thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/20">
          <ExternalLink className="w-8 h-8 text-foreground" />
        </div>
      </a>

      {/* Content */}
      <div className="p-5">
        {/* Title with Category Badge */}
        <div className="flex items-center gap-2 mb-2">
          <a 
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-0"
          >
            <h3 className="text-lg font-bold font-display text-foreground hover:text-primary transition-colors duration-300 truncate">
              {title}
            </h3>
          </a>
          <CategoryBadge category={category} color={project.categoryColor} />
        </div>

        {/* Description */}
        <div className="mb-4">
          <div 
            className={`overflow-hidden transition-all duration-300 ease-out ${
              descriptionExpanded ? 'max-h-96' : 'max-h-10'
            }`}
          >
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          </div>
          {description && description.length > 80 && (
            <button
              onClick={() => setDescriptionExpanded(!descriptionExpanded)}
              className="text-xs text-primary hover:text-primary/80 mt-1 transition-colors duration-200 flex items-center gap-1"
            >
              {descriptionExpanded ? t.projects.showLess : t.projects.showMore}
            </button>
          )}
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{t.projects.progress}</span>
            <ProgressStars completion={project.completion} />
          </div>
          <span className="text-xs font-medium text-primary">{project.completion}%</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mb-3">
          <a href={project.editorUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="outline" size="sm" className="w-full gap-2 border-border/50 hover:border-primary/50 hover:bg-primary/10">
              <Edit className="w-3.5 h-3.5" />
              {t.projects.edit}
            </Button>
          </a>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="outline" size="sm" className="w-full gap-2 border-border/50 hover:border-primary/50 hover:bg-primary/10">
              <Github className="w-3.5 h-3.5" />
              {t.projects.github}
            </Button>
          </a>
          {isAdmin && onEdit && (
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => onEdit(project)}
              className="gap-2"
            >
              <Edit className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>

        {/* Show More - Only if documents exist */}
        {hasDocuments && (
          <>
            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 w-full justify-center py-2"
            >
              {showMore ? t.projects.showLess : t.projects.showMore}
              {showMore ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showMore && (
              <div className="pt-3 border-t border-border/30 mt-2 animate-fade-in">
                <p className="text-xs text-muted-foreground mb-3">{t.projects.viewDocuments}</p>
                <div className="flex flex-wrap gap-2">
                  {project.documents.map((doc) => (
                    <a
                      key={doc.id}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300"
                    >
                      {doc.type === 'pdf' ? (
                        <FileText className="w-3.5 h-3.5 text-badge-orange" />
                      ) : (
                        <Image className="w-3.5 h-3.5 text-badge-blue" />
                      )}
                      {doc.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export type CategoryColor = 'green' | 'purple' | 'orange' | 'blue' | 'pink';

export interface ProjectDocument {
  id: string;
  name: string;
  url: string;
  type: 'pdf' | 'image';
}

export interface Project {
  id: string;
  title: string;
  titleKo: string;
  description: string;
  descriptionKo: string;
  websiteUrl: string;
  editorUrl: string;
  githubUrl: string;
  thumbnailUrl: string;
  category: string;
  categoryKo: string;
  categoryColor: CategoryColor;
  completion: number; // 0-100
  documents: ProjectDocument[];
  displayOrder: number;
}

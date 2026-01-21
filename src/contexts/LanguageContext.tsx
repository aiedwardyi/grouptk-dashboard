import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ko';

interface Translations {
  header: {
    title: string;
    subtitle: string;
    brochure: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  stats: {
    totalProjects: string;
    websites: string;
    dashboards: string;
    apps: string;
  };
  projects: {
    sectionTitle: string;
    edit: string;
    github: string;
    showMore: string;
    showLess: string;
    viewDocuments: string;
    progress: string;
    adminMode: string;
    addProject: string;
  };
  footer: {
    address: string;
    rights: string;
  };
  admin: {
    editProject: string;
    title: string;
    description: string;
    websiteUrl: string;
    editorUrl: string;
    githubUrl: string;
    thumbnailUrl: string;
    category: string;
    categoryColor: string;
    completion: string;
    save: string;
    cancel: string;
    delete: string;
    uploadDocument: string;
    documentName: string;
    documentUrl: string;
    addDocument: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    header: {
      title: 'Group TK',
      subtitle: 'World Enterprise',
      brochure: 'Company Brochure',
    },
    hero: {
      badge: 'IT Development Portfolio',
      title: 'Group TK',
      titleHighlight: 'World Enterprise',
      subtitle: 'A comprehensive overview of our companies developed and operated by our expert team.',
    },
    stats: {
      totalProjects: 'Total Projects',
      websites: 'Websites',
      dashboards: 'Dashboards',
      apps: 'Applications',
    },
    projects: {
      sectionTitle: 'Project Portfolio',
      edit: 'Edit',
      github: 'GitHub',
      showMore: 'Show more',
      showLess: 'Show less',
      viewDocuments: 'View Documents',
      progress: 'Progress',
      adminMode: 'Admin Mode',
      addProject: 'Add Project',
    },
    footer: {
      address: '4th Floor, Damin Building, 40 Godeok-ro, Gangdong-gu, Seoul, South Korea',
      rights: 'All rights reserved.',
    },
    admin: {
      editProject: 'Edit Project',
      title: 'Project Title',
      description: 'Description',
      websiteUrl: 'Website URL',
      editorUrl: 'Editor URL',
      githubUrl: 'GitHub URL',
      thumbnailUrl: 'Thumbnail URL',
      category: 'Category',
      categoryColor: 'Category Color',
      completion: 'Completion %',
      save: 'Save Changes',
      cancel: 'Cancel',
      delete: 'Delete Project',
      uploadDocument: 'Upload Document',
      documentName: 'Document Name',
      documentUrl: 'Document URL',
      addDocument: 'Add Document',
    },
  },
  ko: {
    header: {
      title: '그룹 TK',
      subtitle: '월드 엔터프라이즈',
      brochure: '회사 브로슈어',
    },
    hero: {
      badge: 'IT 개발 포트폴리오',
      title: 'Group TK',
      titleHighlight: 'World Enterprise',
      subtitle: '저희 전문 팀이 개발하고 운영하는 회사들에 대한 종합적인 개요입니다.',
    },
    stats: {
      totalProjects: '전체 프로젝트',
      websites: '웹사이트',
      dashboards: '대시보드',
      apps: '애플리케이션',
    },
    projects: {
      sectionTitle: '프로젝트 포트폴리오',
      edit: '편집',
      github: 'GitHub',
      showMore: '더 보기',
      showLess: '접기',
      viewDocuments: '문서 보기',
      progress: '진행률',
      adminMode: '관리자 모드',
      addProject: '프로젝트 추가',
    },
    footer: {
      address: '서울특별시 강동구 고덕로 40 다민빌딩 4층',
      rights: '모든 권리 보유.',
    },
    admin: {
      editProject: '프로젝트 편집',
      title: '프로젝트 제목',
      description: '설명',
      websiteUrl: '웹사이트 URL',
      editorUrl: '편집기 URL',
      githubUrl: 'GitHub URL',
      thumbnailUrl: '썸네일 URL',
      category: '카테고리',
      categoryColor: '카테고리 색상',
      completion: '완료율 %',
      save: '변경 사항 저장',
      cancel: '취소',
      delete: '프로젝트 삭제',
      uploadDocument: '문서 업로드',
      documentName: '문서 이름',
      documentUrl: '문서 URL',
      addDocument: '문서 추가',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

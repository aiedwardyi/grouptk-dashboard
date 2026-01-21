import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background relative">
        {/* Background Grid Pattern */}
        <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        
        {/* Ambient Glow Effects */}
        <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10">
          <Header />
          <main>
            <HeroSection />
            <ProjectsSection />
          </main>
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
};

export default Index;

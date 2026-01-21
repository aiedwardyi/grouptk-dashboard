import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen bg-background relative overflow-hidden">
          {/* Background Pattern - Grid for dark, animated gradient for light */}
          <div className="fixed inset-0 dark:bg-grid-pattern dark:opacity-20 pointer-events-none" />
          
          {/* Light mode animated gradient orbs */}
          <div className="fixed inset-0 dark:hidden pointer-events-none overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-blue-400/30 to-cyan-300/20 rounded-full blur-[100px] animate-float" />
            <div className="absolute top-[30%] right-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-sky-400/25 to-blue-500/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-2s' }} />
            <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-gradient-to-br from-indigo-300/20 to-blue-400/25 rounded-full blur-[130px] animate-float" style={{ animationDelay: '-4s' }} />
          </div>
          
          {/* Dark mode ambient glow */}
          <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none hidden dark:block" />
          <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none hidden dark:block" />
          
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
      </AuthProvider>
    </LanguageProvider>
  );
};

export default Index;

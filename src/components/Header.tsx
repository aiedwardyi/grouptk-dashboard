import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import grouptKLogo from '@/assets/grouptk-logo.png';

export const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={grouptKLogo} 
              alt="Group TK Logo" 
              className="w-10 h-10 rounded-lg object-contain"
            />
            <div>
              <h1 className="text-xl font-bold font-display text-foreground">{t.header.title}</h1>
              <p className="text-xs text-muted-foreground">{t.header.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LanguageToggle />
            <a href="/brochure.pdf" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2 border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">{t.header.brochure}</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

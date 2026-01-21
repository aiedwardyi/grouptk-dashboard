import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import grouptKLogo from '@/assets/grouptk-logo.png';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-12 border-t border-border/30 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Company Info */}
          <div className="flex items-center gap-4">
            <img 
              src={grouptKLogo} 
              alt="Group TK Logo" 
              className="w-12 h-12 rounded-xl object-contain"
            />
            <div>
              <h3 className="text-lg font-bold font-display text-foreground">{t.header.title}</h3>
              <p className="text-sm text-muted-foreground">{t.header.subtitle}</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground text-center md:text-right">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <span>{t.footer.address}</span>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="mt-8 pt-6 border-t border-border/20 flex justify-center">
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};

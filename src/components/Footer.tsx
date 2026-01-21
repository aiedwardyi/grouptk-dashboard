import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Building2 } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border/30 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Company Info */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-sm">
              <span className="text-lg font-bold font-display text-primary-foreground">TK</span>
            </div>
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

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border/20 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Group TK. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

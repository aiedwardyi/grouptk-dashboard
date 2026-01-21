import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center rounded-lg bg-secondary/50 p-1 border border-border/30">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 text-sm font-medium transition-all duration-300 ${
          language === 'en'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        EN
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage('ko')}
        className={`px-3 py-1.5 text-sm font-medium transition-all duration-300 ${
          language === 'ko'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        한국어
      </Button>
    </div>
  );
};

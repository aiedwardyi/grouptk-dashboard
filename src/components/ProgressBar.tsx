import { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProgressBarProps {
  completion: number; // 0-100
  showStatus?: boolean;
}

export const ProgressBar = ({ completion, showStatus = true }: ProgressBarProps) => {
  const { language } = useLanguage();
  
  const status = useMemo(() => {
    if (completion === 100) return language === 'ko' ? '완료' : 'Complete';
    if (completion >= 76) return language === 'ko' ? '마무리 중' : 'Finalizing';
    if (completion >= 51) return language === 'ko' ? '테스트' : 'Testing';
    if (completion >= 26) return language === 'ko' ? '개발 중' : 'Development';
    return language === 'ko' ? '기획' : 'Planning';
  }, [completion, language]);

  return (
    <div className="flex items-center gap-3 w-full">
      {showStatus && (
        <span className="text-xs font-medium text-muted-foreground min-w-[70px]">
          {status}
        </span>
      )}
      <div className="flex-1 h-2 bg-secondary/50 rounded-full overflow-hidden relative">
        <div 
          className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500 ease-out relative"
          style={{ width: `${completion}%` }}
        >
          {completion > 0 && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          )}
        </div>
      </div>
      <span className="text-xs font-semibold text-primary min-w-[32px] text-right">
        {completion}%
      </span>
    </div>
  );
};

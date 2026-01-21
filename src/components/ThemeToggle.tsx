import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="gap-2 border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-4 h-4" />
          <span className="hidden sm:inline">Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4" />
          <span className="hidden sm:inline">Dark Mode</span>
        </>
      )}
    </Button>
  );
};

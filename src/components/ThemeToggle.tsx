import { Droplets, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useColorScheme } from '@/contexts/ColorSchemeContext';

export const ThemeToggle = () => {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setColorScheme(colorScheme === 'cyan' ? 'purple' : 'cyan')}
      className="gap-2 border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
    >
      {colorScheme === 'cyan' ? (
        <>
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">Purple Theme</span>
        </>
      ) : (
        <>
          <Droplets className="w-4 h-4" />
          <span className="hidden sm:inline">Cyan Theme</span>
        </>
      )}
    </Button>
  );
};
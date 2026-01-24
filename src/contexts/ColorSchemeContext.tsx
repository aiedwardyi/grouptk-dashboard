import React, { createContext, useContext, useState, useEffect } from 'react';

type ColorScheme = 'cyan' | 'purple';

interface ColorSchemeContextType {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
}

const ColorSchemeContext = createContext<ColorSchemeContextType | undefined>(undefined);

export const ColorSchemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    const stored = localStorage.getItem('color-scheme');
    return (stored as ColorScheme) || 'cyan';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove both theme classes
    root.classList.remove('theme-cyan', 'theme-purple');
    
    // Add the current theme class
    root.classList.add(`theme-${colorScheme}`);
    
    // Store preference
    localStorage.setItem('color-scheme', colorScheme);
  }, [colorScheme]);

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
};

export const useColorScheme = () => {
  const context = useContext(ColorSchemeContext);
  if (context === undefined) {
    throw new Error('useColorScheme must be used within a ColorSchemeProvider');
  }
  return context;
};
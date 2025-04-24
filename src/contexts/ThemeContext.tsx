import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeType = 'light' | 'dark' | 'blue' | 'green' | 'purple';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>('light');

  useEffect(() => {
    // Apply theme to body element
    const prevThemes = document.body.className.split(' ')
      .filter(cls => !['light', 'dark', 'blue', 'green', 'purple'].includes(cls));
    
    document.body.className = [...prevThemes, theme].join(' ');
    
    // Store theme preference in localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Load theme from localStorage on initial render
    const savedTheme = localStorage.getItem('theme') as ThemeType | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

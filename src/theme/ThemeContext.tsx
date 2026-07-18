import React, { createContext, useContext, useMemo, useState } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';

export type AppThemeMode = 'light' | 'dark';

type ThemeContextValue = {
  mode: AppThemeMode;
  toggleMode: () => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
    border: string;
  };
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<AppThemeMode>((systemScheme as AppThemeMode) || 'light');

  const colors = useMemo(
    () =>
      mode === 'dark'
        ? {
            primary: '#2F80ED',
            secondary: '#0F172A',
            accent: '#27AE60',
            background: '#020617',
            surface: '#111827',
            text: '#F8FAFC',
            muted: '#94A3B8',
            border: '#334155',
          }
        : {
            primary: '#2F80ED',
            secondary: '#FFFFFF',
            accent: '#27AE60',
            background: '#F4F8FF',
            surface: '#FFFFFF',
            text: '#0F172A',
            muted: '#64748B',
            border: '#E2E8F0',
          },
    [mode],
  );

  const value = useMemo(
    () => ({
      mode,
      toggleMode: () => setMode((current) => (current === 'light' ? 'dark' : 'light')),
      colors,
    }),
    [mode, colors],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

import { FC, ReactNode, createContext, useContext, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles';

import { RootState } from '../store/store';
import { createAppTheme } from '../config/theme.config';
import { useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';

interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const themeMode = useSelector((state: RootState) => state.theme);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const value = useMemo(() => {
    const mode =
      themeMode === 'system' ? (prefersDarkMode ? 'dark' : 'light') : themeMode;
    const theme = createAppTheme(mode);

    return {
      theme,
      isDark: mode === 'dark',
    };
  }, [themeMode, prefersDarkMode]);

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={value.theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

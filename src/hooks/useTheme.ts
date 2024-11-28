import { RootState } from '../store/store';
import { createTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useTheme = () => {
  const themeMode = useSelector((state: RootState) => state.theme);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() => {
    const mode = themeMode === 'system' 
      ? (prefersDarkMode ? 'dark' : 'light') 
      : themeMode;

    return createTheme({
      palette: {
        mode,
        primary: {
          main: '#1976d2',
          light: '#42a5f5',
          dark: '#1565c0',
        },
        secondary: {
          main: '#9c27b0',
          light: '#ba68c8',
          dark: '#7b1fa2',
        },
        background: {
          default: mode === 'light' ? '#f5f5f5' : '#121212',
          paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
        },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              scrollbarColor: mode === 'dark' ? '#6b6b6b #2b2b2b' : '#959595 #f5f5f5',
              '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                width: 8,
                height: 8,
                backgroundColor: mode === 'dark' ? '#2b2b2b' : '#f5f5f5',
              },
              '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                borderRadius: 8,
                backgroundColor: mode === 'dark' ? '#6b6b6b' : '#959595',
                minHeight: 24,
              },
              '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                backgroundColor: mode === 'dark' ? '#959595' : '#6b6b6b',
              },
            },
          },
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundColor: mode === 'dark' ? '#1e1e1e' : '#ffffff',
            },
          },
        },
      },
    });
  }, [themeMode, prefersDarkMode]);

  return { theme };
};
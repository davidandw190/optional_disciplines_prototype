import '@fontsource/montserrat';
import '@fontsource/montserrat/700.css';

import { ThemeOptions, createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: {
      light: string;
      medium: string;
      heavy: string;
    };
  }
  interface ThemeOptions {
    customShadows?: {
      light?: string;
      medium?: string;
      heavy?: string;
    };
  }
}

const baseThemeSettings: Partial<ThemeOptions> = {
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 400,
      letterSpacing: '0.01em',
    },
    body2: {
      fontWeight: 400,
      letterSpacing: '0.01em',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none' as const,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: '8px',
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...baseThemeSettings,
  palette: {
    mode: 'light',
    primary: {
      main: '#003087', 
      light: '#1a4d9e',
      dark: '#002266',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#E91E63', 
      light: '#FF4081',
      dark: '#C2185B',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
    },
    action: {
      hover: 'rgba(0, 48, 135, 0.04)',
      selected: 'rgba(0, 48, 135, 0.08)',
      disabled: '#C2C2C2',
      disabledBackground: '#F5F5F5',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  customShadows: {
    light: '0px 2px 8px rgba(0, 48, 135, 0.08)',
    medium: '0px 4px 16px rgba(0, 48, 135, 0.12)',
    heavy: '0px 8px 24px rgba(0, 48, 135, 0.16)',
  },
} as ThemeOptions);

export const darkTheme = createTheme({
  ...baseThemeSettings,
  palette: {
    mode: 'dark',
    primary: {
      main: '#5B7AFC', 
      light: '#8499FF',
      dark: '#3D5CD7',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF4081', 
      light: '#FF79B0',
      dark: '#C60055',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#1A1A2E', 
      paper: '#2D2D44', 
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
    action: {
      hover: 'rgba(91, 122, 252, 0.08)',
      selected: 'rgba(91, 122, 252, 0.16)',
      disabled: '#666666',
      disabledBackground: '#363654',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  customShadows: {
    light: '0px 2px 8px rgba(91, 122, 252, 0.16)',
    medium: '0px 4px 16px rgba(91, 122, 252, 0.24)',
    heavy: '0px 8px 24px rgba(91, 122, 252, 0.32)',
  },
} as ThemeOptions);

export const lightScrollbar = {
  '*::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  '*::-webkit-scrollbar-track': {
    background: '#F5F7FA',
  },
  '*::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0, 48, 135, 0.3)',
    borderRadius: '10px',
    border: '2px solid transparent',
    backgroundClip: 'content-box',
  },
  '*::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'rgba(0, 48, 135, 0.5)',
  },
};

export const darkScrollbar = {
  '*::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  '*::-webkit-scrollbar-track': {
    background: '#1A1A2E',
  },
  '*::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(91, 122, 252, 0.3)',
    borderRadius: '10px',
    border: '2px solid transparent',
    backgroundClip: 'content-box',
  },
  '*::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'rgba(91, 122, 252, 0.5)',
  },
};
import { Theme, alpha, createTheme } from '@mui/material/styles';

const BRAND_COLORS = {
  uvtRed: '#e60155',
  uvtGold: '#d99a4f',
  uvtLight: '#fafafa',

  lightModePrimary: '#072665', 
  darkModePrimary: '#5B9FFF',
};

const createSemanticColors = (mode: 'light' | 'dark') => {
  const isLight = mode === 'light';

  const primaryMain = isLight
    ? BRAND_COLORS.lightModePrimary
    : BRAND_COLORS.darkModePrimary;

  const primaryLight = isLight
    ? alpha(primaryMain, 0.8)
    : alpha(primaryMain, 0.9);

  const primaryDark = isLight
    ? alpha(primaryMain, 1.2)
    : alpha(primaryMain, 0.7);

  return {
    primary: {
      main: primaryMain,
      light: primaryLight,
      dark: primaryDark,
      contrastText: '#ffffff',
    },
    secondary: {
      main: BRAND_COLORS.uvtGold,
      light: alpha(BRAND_COLORS.uvtGold, 0.9),
      dark: alpha(BRAND_COLORS.uvtGold, 0.7),
      contrastText: '#ffffff',
    },
    background: {
      default: isLight ? '#f8f9fa' : '#121214', 
      paper: isLight ? '#ffffff' : '#1E1E20', 
      subtle: isLight ? alpha('#f8f9fa', 0.8) : alpha('#1E1E20', 0.8),
    },
    text: {
      primary: isLight ? '#1a1a1a' : '#FFFFFF', 
      secondary: isLight ? '#424242' : '#E0E0E0',
      disabled: isLight ? '#757575' : '#A0A0A0', 
    },
    action: {
      active: alpha(primaryMain, isLight ? 0.7 : 0.9),
      hover: alpha(primaryMain, isLight ? 0.05 : 0.15),
      selected: alpha(primaryMain, isLight ? 0.1 : 0.2),
      disabled: isLight ? '#bdbdbd' : '#505050',
    },
    divider: isLight ? alpha('#000000', 0.12) : alpha('#ffffff', 0.15), // Slightly stronger divider in dark mode
  };
};

const createComponents = (theme: Theme) => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollbarColor:
          theme.palette.mode === 'light'
            ? '#c1c1c1 #f5f5f5'
            : '#404040 #1a1a1c',
        '&::-webkit-scrollbar': {
          width: 12,
          height: 12,
          backgroundColor: theme.palette.background.default,
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: 6,
          border: '3px solid transparent',
          backgroundClip: 'padding-box',
          backgroundColor:
            theme.palette.mode === 'light' ? '#c1c1c1' : '#404040',
          '&:hover': {
            backgroundColor:
              theme.palette.mode === 'light' ? '#a1a1a1' : '#505050',
          },
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(8px)',
        transition: theme.transitions.create(
          ['border-color', 'box-shadow', 'transform'],
          {
            duration: 200,
          }
        ),
        '&:hover': {
          transform: 'translateY(-2px)',
          borderColor: theme.palette.primary.main,
          boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
        },
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        backgroundColor: alpha(theme.palette.background.paper, 0.95),
        backdropFilter: 'blur(8px)',
        borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: alpha(theme.palette.background.paper, 0.95),
        backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        color: theme.palette.text.primary,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        textTransform: 'none',
        fontWeight: 600,
        padding: '8px 16px',
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
        },
      },
    },
  },
});

export const createAppTheme = (mode: 'light' | 'dark') => {
  const baseTheme = createTheme({
    palette: {
      mode,
      ...createSemanticColors(mode),
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        letterSpacing: '-0.01em',
        lineHeight: 1.3,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        letterSpacing: '-0.01em',
        lineHeight: 1.4,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.5,
      },
      subtitle1: {
        fontSize: '1rem',
        fontWeight: 500,
        letterSpacing: '0.01em',
        lineHeight: 1.5,
      },
      subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 500,
        letterSpacing: '0.01em',
        lineHeight: 1.57,
      },
      body1: {
        fontSize: '1rem',
        letterSpacing: '0.01em',
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        letterSpacing: '0.01em',
        lineHeight: 1.57,
      },
    },
    shape: {
      borderRadius: 8,
    },
    shadows: [
      'none', // 0 - Used for flat elements
      '0px 1px 2px rgba(0, 0, 0, 0.05)', // 1 - Subtle shadow for hover states
      '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)', // 2 - Cards at rest
      '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)', // 3 - Cards hover
      '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)', // 4 - Dropdowns
      '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)', // 5 - Modals
      '0px 25px 50px -12px rgba(0, 0, 0, 0.25)', // 6 - Large modals
      '0px 2px 4px rgba(0, 0, 0, 0.08)', // 7 - Navigation elements
      '0px 4px 8px rgba(0, 0, 0, 0.12)', // 8 - Floating action buttons
      '0px 8px 16px rgba(0, 0, 0, 0.16)', // 9 - Popovers
      '0px 12px 24px rgba(0, 0, 0, 0.20)', // 10 - Tooltips
      '0px 16px 32px rgba(0, 0, 0, 0.24)', // 11 - Large cards
      '0px 20px 40px rgba(0, 0, 0, 0.28)', // 12 - Feature sections
      '0px 24px 48px rgba(0, 0, 0, 0.32)', // 13 - Hero sections
      '0px 32px 64px rgba(0, 0, 0, 0.36)', // 14 - Overlays
      '0px 40px 80px rgba(0, 0, 0, 0.40)', // 15 - Full-screen modals
      '0px 2px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.08)', // 16 - Combined subtle shadow
      '0px 4px 8px rgba(0, 0, 0, 0.06), 0px 16px 32px rgba(0, 0, 0, 0.12)', // 17 - Combined medium shadow
      '0px 8px 16px rgba(0, 0, 0, 0.08), 0px 32px 64px rgba(0, 0, 0, 0.16)', // 18 - Combined large shadow
      '0px 12px 24px rgba(0, 0, 0, 0.10), 0px 48px 96px rgba(0, 0, 0, 0.20)', // 19 - Combined extra large shadow
      '0px 16px 32px rgba(0, 0, 0, 0.12), 0px 64px 128px rgba(0, 0, 0, 0.24)', // 20 - Combined mega shadow
      '0px 1px 3px rgba(0, 0, 0, 0.08), 0px 4px 8px rgba(0, 0, 0, 0.04)', // 21 - Subtle elevation
      '0px 2px 6px rgba(0, 0, 0, 0.12), 0px 8px 16px rgba(0, 0, 0, 0.06)', // 22 - Medium elevation
      '0px 4px 12px rgba(0, 0, 0, 0.16), 0px 16px 32px rgba(0, 0, 0, 0.08)', // 23 - High elevation
      '0px 8px 24px rgba(0, 0, 0, 0.20), 0px 32px 64px rgba(0, 0, 0, 0.12)', // 24 - Extreme elevation
    ],
  });

  return createTheme(baseTheme, {
    components: createComponents(baseTheme),
  });
};
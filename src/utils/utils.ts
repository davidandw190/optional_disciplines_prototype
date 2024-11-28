import {
  darkScrollbar,
  darkTheme,
  lightScrollbar,
  lightTheme,
} from '../lib/themes';

export const getTheme = (
  theme: 'dark' | 'light' | 'system',
  prefersDarkMode: boolean
) => {
  if (theme === 'dark') {
    return darkTheme;
  }
  if (theme === 'light') {
    return lightTheme;
  }

  if (prefersDarkMode) {
    return darkTheme;
  }
  return lightTheme;
};

export const getScrollbar = (
  theme: 'dark' | 'light' | 'system',
  prefersDarkMode: boolean
) => {
  if (theme === 'dark') {
    return darkScrollbar;
  }
  if (theme === 'light') {
    return lightScrollbar;
  }

  if (prefersDarkMode) {
    return darkScrollbar;
  }
  return lightScrollbar;
};

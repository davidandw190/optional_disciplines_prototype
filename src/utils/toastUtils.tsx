import { ToastOptions, toast } from 'react-toastify';

import { Theme } from '@mui/material';

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 2500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  pauseOnFocusLoss: false,
};

export const showToast = {
  success: (message: string, options?: ToastOptions) =>
    toast.success(message, { ...defaultOptions, ...options }),

  error: (message: string, options?: ToastOptions) =>
    toast.error(message, { ...defaultOptions, ...options }),

  info: (message: string, options?: ToastOptions) =>
    toast.info(message, { ...defaultOptions, ...options }),

  warning: (message: string, options?: ToastOptions) =>
    toast.warning(message, { ...defaultOptions, ...options }),
};

export const getToastThemeStyles = (theme: Theme): React.CSSProperties => {
  return {
    '--toastify-color-light': theme.palette.background.paper,
    '--toastify-color-dark':
      theme.palette.mode === 'dark' ? '#1e1e20' : '#1e1e20',
    '--toastify-color-info': theme.palette.primary.main,
    '--toastify-color-success': theme.palette.success.main,
    '--toastify-color-warning': theme.palette.warning.main,
    '--toastify-color-error': theme.palette.error.main,
    '--toastify-text-color-light': theme.palette.text.primary,
    '--toastify-text-color-dark':
      theme.palette.mode === 'dark' ? '#e0e0e0' : '#ffffff',
    '--toastify-font-family': theme.typography.fontFamily,
  } as React.CSSProperties;
};

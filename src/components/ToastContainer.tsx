import 'react-toastify/dist/ReactToastify.css';
import './toast.css';

import { FC } from 'react';
import { ToastContainer as ReactToastContainer } from 'react-toastify';
import { getToastThemeStyles } from '../utils/toastUtils';
import { useTheme } from '@mui/material';

export const ToastContainer: FC = () => {
  const theme = useTheme();
  const themeStyles = getToastThemeStyles(theme);

  return (
    <div style={themeStyles}>
      <ReactToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        pauseOnHover
        theme={theme.palette.mode}
        limit={3}
        style={{ 
          zIndex: theme.zIndex.tooltip + 100 
        }}
      />
    </div>
  );
};
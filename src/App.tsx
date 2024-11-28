import {
  Box,
  CircularProgress,
  CssBaseline,
  useMediaQuery,
} from '@mui/material';
import { FC, Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import DashboardPage from './features/dashboard/pages/DashboardPage';
import { MainLayout } from './layout/MainLayout';
// import { RootState } from '@reduxjs/toolkit/query';
import { RootState } from './store/store';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from './utils/utils';
import { useSelector } from 'react-redux';
import { useTheme } from './hooks/useTheme';

// const DashboardPage = lazy(() => import('./features/dashboard/pages/DashboardPage'));
// const OptionalDisciplinesPage = lazy(() => import('./pages/OptionalDisciplinesPage'));
// const ComplementaryDisciplinesPage = lazy(() => import('./pages/ComplementaryDisciplinesPage'));
// const EnrollmentsPage = lazy(() => import('./pages/EnrollmentsPage'));
// const ThesisPage = lazy(() => import('./pages/ThesisPage'));
// const ProfilePage = lazy(() => import('./pages/ProfilePage'));
// const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const App: FC = () => {
  // const isAuthenticated = useSelector((state: RootState) => state);
  const isAuthenticated = true;

  const theme = useSelector((state: RootState) => state.theme);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <ThemeProvider theme={getTheme(theme, prefersDarkMode)}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Suspense
          fallback={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
              }}
            >
              <CircularProgress />
            </Box>
          }
        >
          <Routes>
            {!isAuthenticated ? (
              <Route
                path="/login"
                element={
                  <p>This should redirect to current uvt login solution</p>
                }
              />
            ) : (
              <Route element={<MainLayout />}>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<DashboardPage />} />
                {/* <Route
                  path="/elective-disciplines"
                  element={<ElectiveDisciplinesPage />}
                /> */}
                {/* <Route
                  path="/complementary-disciplines"
                  element={<ComplementaryDisciplinesPage />}
                /> */}
                {/* <Route path="/my-enrollments" element={<EnrollmentsPage />} /> */}
                {/* <Route path="/thesis" element={<ThesisPage />} /> */}
                {/* <Route path="/profile" element={<ProfilePage />} /> */}
              </Route>
            )}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </Suspense>
      </Box>
    </ThemeProvider>
  );
};

export default App;

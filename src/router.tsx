import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import App from './App';
import { AuthPage } from './features/auth/pages/AuthPage';
import { AvailableThesisPage } from './features/thesis/pages/AvailableThesisPage';
import { ComplementaryDisciplinesPage } from './features/complementary-disciplines/pages/ComplementaryDisciplinesPage';
import DashboardPage from './features/dashboard/pages/DashboardPage';
import { ElectiveDisciplinesPage } from './features/elective-disciplines/pages/ElectiveDisciplinesPage';
import { MainLayout } from './layout/MainLayout';
import { MyEnrollmentsPage } from './features/enrollments/pages/MyEnrollmentsPage';
import ProtectedRoute from './layout/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route path="auth" element={<AuthPage />} />

      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />

          {/* Disciplines Routes */}
          <Route
            path="elective-disciplines/:periodId"
            element={<ElectiveDisciplinesPage />}
          />
          <Route
            path="complementary-disciplines"
            element={<ComplementaryDisciplinesPage />}
          />

          {/* Enrollments Routes */}
          <Route path="enrollments" element={<MyEnrollmentsPage />} />

          {/* Thesis Routes */}
          <Route path="thesis" element={<AvailableThesisPage />} />

          {/* Profile Routes */}
          <Route path="profile">
            <Route index element={<Navigate to="details" />} />
            {/* <Route path="details" element={<ProfilePage />} /> */}
            <Route path="*" element={<Navigate to="details" />} />
          </Route>
        </Route>
      </Route>

      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Route>
  )
);

export default router;

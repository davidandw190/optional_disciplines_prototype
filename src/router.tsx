import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import App from './App';
import { AvailableThesisPage } from './features/thesis/pages/AvailableThesisPage';
import { ComplementaryDisciplinesPage } from './features/complementary-disciplines/pages/ComplementaryDisciplinesPage';
import DashboardPage from './features/dashboard/pages/DashboardPage';
import { ElectiveDisciplinesPageContainer } from './features/elective-disciplines/pages/ElectiveDisciplinePageContainer';
import { FAQPage } from './features/faq/pages/FAQPage';
import { LoginPage } from './features/auth/pages/LoginPage';
import { MainLayout } from './layout/MainLayout';
import { MyEnrollmentsPage } from './features/enrollments/pages/MyEnrollmentsPage';
import { ProfilePage } from './features/profile/pages/ProfilePage';
import ProtectedRoute from './layout/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route path="login" element={<LoginPage />} />
      {/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {/* Dashboard */}
          <Route path="dashboard" element={<DashboardPage />} />

          {/* Enrollment Period Routes */}
          <Route path="enrollment-periods">
            <Route
              path=":periodId/elective-disciplines"
              element={<ElectiveDisciplinesPageContainer />}
            />
            <Route
              path=":periodId/complementary-disciplines"
              element={<ComplementaryDisciplinesPage />}
            />
            <Route
              path=":periodId/thesis-registration"
              element={<AvailableThesisPage />}
            />
          </Route>

          <Route path="faq" element={<FAQPage />} />

          {/* Enrollments Management */}
          <Route path="enrollments">
            <Route index element={<MyEnrollmentsPage />} />
          </Route>

          {/* Profile Routes */}
          <Route path="profile">
            <Route index element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/profile" />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Route>

      {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
    </Route>
  )
);

export default router;

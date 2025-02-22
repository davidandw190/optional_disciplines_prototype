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
import { ElectiveDisciplinesPageContainer } from './features/elective-disciplines/pages/ElectiveDisciplinePageContainer';
import { FAQPage } from './features/faq/pages/FAQPage';
import { MainLayout } from './layout/MainLayout';
import { MyEnrollmentsPage } from './features/enrollments/pages/MyEnrollmentsPage';
import ProtectedRoute from './layout/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route path="auth" element={<AuthPage />} />
      <Route path="/" element={<Navigate to="/dashboard" />} />

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
            <Route index element={<Navigate to="details" />} />
            {/* <Route path="details" element={<ProfilePage />} /> */}
            <Route path="*" element={<Navigate to="details" />} />
          </Route>

          {/* Catch any unmatched routes under protected area */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Route>
  )
);

export default router;
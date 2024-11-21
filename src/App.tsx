import { Navigate, Route, Routes } from 'react-router-dom';

import { DashboardPage } from './features/dashboard/pages/DashboardPage';
import { DisciplineDetailsPage } from './features/disciplines/pages/DisciplineDetailsPage';
import { ErrorBoundary } from './features/common/components/ErrorBoundary';
import { FC } from 'react';
import { MainLayout } from './layout/MainLayout';
import { OptionalDisciplinesPage } from './features/disciplines/pages/OptionalDisciplinesPage';

const App: FC = () => {
  return (
    <ErrorBoundary>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route 
            path="/disciplines/year-:year" 
            element={<OptionalDisciplinesPage />} 
          />
          <Route 
            path="/disciplines/:id" 
            element={<DisciplineDetailsPage />} 
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </MainLayout>
    </ErrorBoundary>
  );
};

export default App;
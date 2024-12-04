import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { FC } from 'react';

const ProtectedRoute: FC = () => {
  const isAuthenticated = true; // TODO: Change this later to use UVT Auth  
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const CustomerRoute = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export const StaffRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user || user.role !== 'staff') {
    return <Navigate to="/signin" replace />;
  }

  return children;
}; 
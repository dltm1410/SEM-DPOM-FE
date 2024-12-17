import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotFound from './NotFound';

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/signin" />;
  }
  
  return children;
};

export const StaffRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) {
    return <Navigate to="/signin" />;
  }
  
  if (user.role !== 'staff') {
    return <NotFound />;
  }
  
  return children;
};

export const CustomerRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) {
    return <Navigate to="/signin" />;
  }
  
  if (user.role !== 'customer') {
    return <NotFound />;
  }
  
  return children;
}; 
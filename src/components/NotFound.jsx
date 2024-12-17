import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NotFound = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Check if user is trying to access wrong role's route
  const isStaffTryingCustomerRoute = user?.role === 'staff' && !location.pathname.startsWith('/staff');
  const isCustomerTryingStaffRoute = user?.role === 'customer' && location.pathname.startsWith('/staff');

  const getMessage = () => {
    if (isStaffTryingCustomerRoute) {
      return "This page is for customers only. Please return to the staff dashboard.";
    }
    if (isCustomerTryingStaffRoute) {
      return "This page is for staff only. Please return to the customer area.";
    }
    return "Sorry, we couldn't find the page you're looking for.";
  };

  const getButtonText = () => {
    if (isStaffTryingCustomerRoute) {
      return "Back to Staff Dashboard";
    }
    if (isCustomerTryingStaffRoute) {
      return "Back to Home";
    }
    return user?.role === 'staff' ? 'Back to Dashboard' : 'Back to Home';
  };

  const getRedirectPath = () => {
    if (isStaffTryingCustomerRoute) {
      return '/staff';
    }
    if (isCustomerTryingStaffRoute) {
      return '/';
    }
    return user?.role === 'staff' ? '/staff' : '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-500">404</h1>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Page Not Found
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {getMessage()}
          </p>
        </div>
        <div className="mt-8">
          <Link
            to={getRedirectPath()}
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {getButtonText()}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 
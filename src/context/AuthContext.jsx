import { createContext, useContext, useState, useEffect } from 'react';
import { axiosInstance } from '../api/axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      console.log('Checking auth with token:', token);
      
      if (token) {
        try {
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axiosInstance.get('/auth/me');
          console.log('Auth check response:', response.data);
          
          if (response.data) {
            setUser(response.data);
            // Only redirect if we're on the signin or signup page
            const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';
            if (isAuthPage) {
              if (response.data.role === 'staff') {
                navigate('/staff');
              } else {
                navigate('/');
              }
            }
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('accessToken');
          delete axiosInstance.defaults.headers.common['Authorization'];
          setUser(null);
          // Only redirect to signin if we're not already there
          if (location.pathname !== '/signin') {
            navigate('/signin');
          }
        }
      } else {
        console.log('No token found');
        setUser(null);
        // Only redirect to signin if we're not already there and not trying to sign up
        const isPublicPage = location.pathname === '/signin' || location.pathname === '/signup';
        if (!isPublicPage) {
          navigate('/signin');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []); // Remove location.pathname from dependencies

  const login = async (token, userData) => {
    try {
      console.log('Login called with:', { token, userData });
      localStorage.setItem('accessToken', token);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      
      if (userData.role === 'staff') {
        console.log('Navigating to staff dashboard');
        navigate('/staff');
      } else {
        console.log('Navigating to customer dashboard');
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log('Logging out');
    localStorage.removeItem('accessToken');
    delete axiosInstance.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/signin');
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 
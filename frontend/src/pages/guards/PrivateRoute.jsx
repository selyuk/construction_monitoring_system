import { Navigate, useLocation } from 'react-router';

export const PrivatRoute = ({ children }) => {
  const isAuth = localStorage.getItem('token');

  const location = useLocation();
  return isAuth ? (
    children
  ) : (
    <Navigate to="/diploma_front/auth/login" state={location} />
  );
};

import { Navigate, useLocation } from 'react-router';

export const PubliceRoute = ({ children }) => {
  const isAuth = localStorage.getItem('token');
  const { state: prevLocation } = useLocation();

  return !isAuth ? (
    children
  ) : (
    <Navigate to={prevLocation ?? '/diploma_front/auth/login'} />
  );
};

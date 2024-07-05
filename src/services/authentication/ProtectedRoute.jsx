import { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, userRole } = useContext(AuthContext);
  const [redirectToHome, setRedirectToHome] = useState(false);

  console.log('ProtectedRoute - User:', user);
  console.log('ProtectedRoute - Loading:', loading);
  console.log('ProtectedRoute - User role:', userRole);

  useEffect(() => {
    if (user && allowedRoles && !allowedRoles.includes(userRole)) {
      console.log('ProtectedRoute - User does not have required role, redirecting to home');
      const timer = setTimeout(() => setRedirectToHome(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [user, userRole, allowedRoles]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log('ProtectedRoute - No user, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (redirectToHome) {
    return <Navigate to="/" replace />;
  }

  console.log('ProtectedRoute - Access granted');
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;

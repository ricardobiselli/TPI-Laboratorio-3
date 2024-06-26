import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  console.log('ProtectedRoute - User:', user);
  console.log('ProtectedRoute - Loading:', loading);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!user) {
    console.log('ProtectedRoute - No user, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  const userRole = user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  console.log('ProtectedRoute - User role:', userRole);

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    console.log('ProtectedRoute - User does not have required role, redirecting to home');
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

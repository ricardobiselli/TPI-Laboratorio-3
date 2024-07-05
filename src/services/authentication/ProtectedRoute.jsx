import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, userRole } = useContext(AuthContext);

  console.log('ProtectedRoute - User:', user);
  console.log('ProtectedRoute - Loading:', loading);
  console.log('ProtectedRoute - User role:', userRole);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log('ProtectedRoute - No user, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    console.log('ProtectedRoute - User does not have required role');
    return (
      <Alert variant="danger">
        Access denied! You do not have the required permissions to view this page.
        <br />
        <Alert.Link href="/">Return to Home page</Alert.Link>
      </Alert>
    );
  }

  console.log('ProtectedRoute - Access granted');
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

// Higher-Order Component for protected routes
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth(); // Get authentication status and user info
  const location = useLocation(); // Get current location

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect if user does not have permission
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Render protected content if authenticated and has permission
  return children;
};

export default ProtectedRoute;

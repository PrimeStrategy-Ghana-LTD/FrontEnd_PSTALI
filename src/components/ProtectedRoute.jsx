// // src/components/ProtectedRoute.jsx
// import React from 'react'
// import { Navigate, Outlet } from 'react-router-dom'

// const ProtectedRoute = ({ allowedRoles, userRole }) => {
//   if (!userRole) return <Navigate to="/" replace /> // Redirect to login if not authenticated
//   return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/unauthorized" replace />
// }

// export default ProtectedRoute


// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, userRole, children }) => {
  // Check if user is authenticated
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Check if user has required role
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render children or outlet
  return children || <Outlet />;
};

export default ProtectedRoute;
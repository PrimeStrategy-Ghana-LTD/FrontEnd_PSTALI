// src/components/RoleBasedAccess.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole, hasPermission } from '../utils/auth';

const RoleBasedAccess = ({ allowedRoles, children, fallback = null }) => {
  const userRole = getUserRole();
  
  if (!userRole) {
    return <Navigate to="/" replace />;
  }
  
  if (!hasPermission(userRole, allowedRoles)) {
    return fallback || <Navigate to="/unauthorized" replace />;
  }
  
  return children;
};

export default RoleBasedAccess;
